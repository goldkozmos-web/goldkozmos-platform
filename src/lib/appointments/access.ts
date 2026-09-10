export function userCanReadAppointment(opts: {
  viewerId: string | null;
  viewerIsAdmin: boolean;
  appointmentUserId: string;
}) {
  if (!opts.viewerId) return false;
  if (opts.viewerIsAdmin) return true;
  return opts.viewerId === opts.appointmentUserId;
}

export function userCanUpdateAppointmentStatus(opts: {
  viewerIsAdmin: boolean;
}) {
  return opts.viewerIsAdmin;
}

export function userCanInsertAppointment(opts: {
  viewerId: string | null;
  appointmentUserId: string;
}) {
  return Boolean(opts.viewerId) && opts.viewerId === opts.appointmentUserId;
}
