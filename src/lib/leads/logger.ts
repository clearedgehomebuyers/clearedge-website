export type LeadLogEvent =
  | 'request_rejected'
  | 'delivery_started'
  | 'delivery_failed'
  | 'delivery_accepted'
  | 'meta_completed'

export interface LeadLogEntry {
  event: LeadLogEvent
  requestId: string
  leadId?: string
  formVariant?: string
  trafficSource?: string
  destination?: string
  downstreamStatus?: number
  durationMs?: number
  errorCode?: string
  metaStatus?: string
}
/**
 * The type intentionally has no free-form message or data field. This keeps
 * form values, webhook URLs, upstream bodies, and error objects out of logs.
 */
export function logLeadEvent(entry: LeadLogEntry): void {
  console.info(JSON.stringify({ scope: 'lead_intake', ...entry }))
}
