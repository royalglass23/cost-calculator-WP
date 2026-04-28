export interface LeadPayload {
  full_name: string
  email: string
  phone: string
  role?: string
  suburb?: string
  timeframe?: string
  estimate_low: number
  estimate_mid: number
  estimate_high: number
  needs_review: boolean
  review_reasons: string[]
  answers: Record<string, unknown>
  pricing_breakdown: Record<string, unknown>
  honeypot?: string
}

export interface SubmitResult {
  ok: boolean
  leadId?: number
  message: string
}

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const endpoint =
    (window as any).rgCalculator?.endpoint ||
    '/wp-json/royal-glass/v1/leads'

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json()
  return data as SubmitResult
}
