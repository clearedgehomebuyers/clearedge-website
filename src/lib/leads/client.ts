import type {
  ConfirmedLeadResponse,
  FailedLeadResponse,
  LeadSubmission,
} from './types'

export class LeadSubmissionError extends Error {
  constructor(
    public readonly code: string,
    public readonly referenceId?: string,
  ) {
    super(code)
    this.name = 'LeadSubmissionError'
  }
}
function isConfirmedLeadResponse(value: unknown): value is ConfirmedLeadResponse {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<ConfirmedLeadResponse>
  return (
    candidate.ok === true &&
    candidate.delivery === 'zapier_accepted' &&
    typeof candidate.leadId === 'string' &&
    typeof candidate.metaEventId === 'string'
  )
}

export async function submitLead(
  submission: LeadSubmission,
): Promise<ConfirmedLeadResponse> {
  let response: Response
  try {
    response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })
  } catch {
    throw new LeadSubmissionError('network_error')
  }

  const body = (await response.json().catch(() => null)) as
    | ConfirmedLeadResponse
    | FailedLeadResponse
    | null

  if (response.status !== 201 || !isConfirmedLeadResponse(body)) {
    throw new LeadSubmissionError(
      body && body.ok === false ? body.error : 'delivery_failed',
      body && body.ok === false ? body.referenceId : undefined,
    )
  }

  return body
}
