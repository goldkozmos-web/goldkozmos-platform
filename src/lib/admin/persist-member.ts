import type { User } from "@supabase/supabase-js";

import { isMissingRelation, runPlatformSql } from "./applyPlatformSchema";
import { SITE_MEMBERS_SCHEMA_SQL } from "./member-schema";
import { memberRowFromAuthUser } from "./member-keys";
import {
  coreMemberWrite,
  normalizeMemberWrite,
  type PersistMemberInput,
  type SiteMemberWrite,
} from "./member-write";
import { profilimUserFromAuth } from "../profilim/userFromAuth";
import { isSiteAdminEmail } from "./access";
import { createSupabaseServerClient } from "../supabase/create-server-client";
import { createSupabaseServiceClient } from "../supabase/service";

export type { PersistMemberInput, SiteMemberWrite } from "./member-write";
export { coreMemberWrite, normalizeMemberWrite } from "./member-write";

function asText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export function persistInputFromUser(
  user: User | null | undefined,
  extra?: Partial<PersistMemberInput>,
): PersistMemberInput | null {
  if (!user) return null;
  const mapped = memberRowFromAuthUser(user);
  const fromAuth = profilimUserFromAuth(user);
  const email = extra?.email || mapped?.email || fromAuth?.email || user.email || "";
  const authUserId = extra?.authUserId || user.id;
  if (!email || !authUserId) return null;
  return {
    authUserId,
    email,
    displayName: extra?.displayName || mapped?.displayName || fromAuth?.displayName,
    source: extra?.source || "google",
    firstName: extra?.firstName ?? null,
    lastName: extra?.lastName ?? null,
    city: extra?.city ?? mapped?.city,
    age: extra?.age ?? mapped?.age,
    phone: extra?.phone ?? mapped?.phone,
    interests: extra?.interests ?? mapped?.interests,
    avatarUrl: extra?.avatarUrl || fromAuth?.avatarUrl,
    profileCompleted: extra?.profileCompleted,
  };
}

export async function ensureSiteMembersSchema() {
  return runPlatformSql(async (sql) => {
    await sql.unsafe(SITE_MEMBERS_SCHEMA_SQL);
  });
}

async function writeProfile(
  row: SiteMemberWrite,
  avatarUrl?: string | null,
) {
  const supabase = createSupabaseServiceClient() || (await createSupabaseServerClient());
  if (!supabase) return;
  const admin = isSiteAdminEmail(row.email);
  const payload = {
    id: row.auth_user_id,
    display_name: row.display_name,
    avatar_url: asText(avatarUrl) || null,
    role: admin ? "admin" : "user",
    is_admin: admin,
    updated_at: row.updated_at,
  };
  const first = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
  if (first.error && /is_admin|avatar_url/i.test(first.error.message)) {
    await supabase.from("profiles").upsert(
      {
        id: row.auth_user_id,
        display_name: row.display_name,
        role: admin ? "admin" : "user",
        updated_at: row.updated_at,
      },
      { onConflict: "id" },
    );
  }
}

async function writeMemberRow(row: SiteMemberWrite) {
  const supabase = createSupabaseServiceClient() || (await createSupabaseServerClient());
  if (!supabase) return { ok: false as const, error: "Bağlantı yok." };

  let error = (await supabase.from("site_members").upsert(row, { onConflict: "email" })).error;
  if (error && /column|schema cache|age|first_name|phone|interests/i.test(error.message)) {
    error = (
      await supabase.from("site_members").upsert(coreMemberWrite(row), { onConflict: "email" })
    ).error;
  }
  if (!error) return { ok: true as const };
  return { ok: false as const, error: error.message };
}

async function writeMemberSql(row: SiteMemberWrite) {
  const result = await runPlatformSql(async (sql) => {
    await sql`
      insert into public.site_members as member (
        email, display_name, auth_user_id, source, status, updated_at
      )
      values (
        ${row.email},
        ${row.display_name},
        ${row.auth_user_id}::uuid,
        ${row.source},
        'active',
        ${row.updated_at}::timestamptz
      )
      on conflict (email) do update
      set
        display_name = coalesce(nullif(excluded.display_name, ''), member.display_name),
        auth_user_id = coalesce(excluded.auth_user_id, member.auth_user_id),
        status = 'active',
        updated_at = excluded.updated_at
    `;
    await sql`
      insert into public.profiles as profile (id, display_name, role, is_admin, updated_at)
      values (
        ${row.auth_user_id}::uuid,
        ${row.display_name},
        ${isSiteAdminEmail(row.email) ? "admin" : "user"},
        ${isSiteAdminEmail(row.email)},
        ${row.updated_at}::timestamptz
      )
      on conflict (id) do update
      set
        display_name = coalesce(nullif(excluded.display_name, ''), profile.display_name),
        updated_at = excluded.updated_at
    `;
  });
  if (!result.ok) return { ok: false as const, error: result.error };
  return { ok: true as const };
}

export async function persistSiteMember(input: PersistMemberInput) {
  const row = normalizeMemberWrite(input);
  if (!row) return { ok: false as const, error: "Üye e-postası yok." };

  let wrote = await writeMemberRow(row);
  if (!wrote.ok && isMissingRelation(wrote.error)) {
    await ensureSiteMembersSchema();
    wrote = await writeMemberRow(row);
  }
  if (wrote.ok) {
    await writeProfile(row, input.avatarUrl);
    return wrote;
  }

  const viaSql = await writeMemberSql(row);
  if (viaSql.ok) return viaSql;
  return wrote.error ? wrote : viaSql;
}

export async function persistSiteMemberFromUser(
  user: User | null | undefined,
  extra?: Partial<PersistMemberInput>,
) {
  const input = persistInputFromUser(user, extra);
  if (!input) return { ok: false as const, error: "Oturum yok." };
  return persistSiteMember(input);
}
