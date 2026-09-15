import { runReminderTick } from "@/lib/cron/runReminders";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return runReminderTick(request);
}
