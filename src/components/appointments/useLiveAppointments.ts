"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { mapAppointmentRow } from "../../lib/appointments/map";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";
import type {
  AppointmentRecord,
  AppointmentRow,
} from "../../lib/appointments/types";

export function useLiveAppointments(options: {
  enabled: boolean;
  mineOnly: boolean;
  userId?: string | null;
  onInsert?: (appointment: AppointmentRecord) => void;
}) {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const onInsertRef = useRef(options.onInsert);

  onInsertRef.current = options.onInsert;

  const applyRow = useCallback((row: AppointmentRow) => {
    const mapped = mapAppointmentRow(row);
    if (!mapped) return;

    setAppointments((current) => {
      const index = current.findIndex((item) => item.id === mapped.id);
      if (index === -1) {
        return [mapped, ...current];
      }

      const next = [...current];
      next[index] = mapped;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!options.enabled) {
      setAppointments([]);
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;
    setLoading(true);

    let request = supabase
      .from("appointments")
      .select(
        "id, user_id, service_id, service_name, appointment_date, start_time, end_time, status, client_name, client_email, created_at, updated_at",
      )
      .order("created_at", { ascending: false });

    if (options.mineOnly && options.userId) {
      request = request.eq("user_id", options.userId);
    }

    void request.then(({ data }) => {
        if (cancelled) return;
        const rows = ((data ?? []) as AppointmentRow[])
          .map(mapAppointmentRow)
          .filter((item) => item !== null);
        setAppointments(rows);
        setLoading(false);
      });

    const channel = supabase
      .channel(options.mineOnly ? "appointments-mine" : "appointments-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        (payload) => {
          const row = (payload.new ?? payload.old) as AppointmentRow | null;
          if (!row?.id) return;

          if (
            options.mineOnly &&
            options.userId &&
            row.user_id &&
            row.user_id !== options.userId
          ) {
            return;
          }

          if (payload.eventType === "INSERT" && payload.new) {
            const mapped = mapAppointmentRow(payload.new as AppointmentRow);
            if (mapped) {
              onInsertRef.current?.(mapped);
            }
          }

          if (payload.eventType === "DELETE") {
            setAppointments((current) =>
              current.filter((item) => item.id !== row.id),
            );
            return;
          }

          applyRow(row);
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [applyRow, options.enabled, options.mineOnly, options.userId]);

  return { appointments, loading, setAppointments };
}
