import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type StyledBySydneyBookingBody = {
  name?: string
  phone?: string
  email?: string
  serviceInterest?: string
  desiredDate?: string
  desiredTime?: string
  eventType?: string
  notes?: string
  attribution?: {
    sourcePage?: string
    referrer?: string
    utmSource?: string
    utmCampaign?: string
    utmMedium?: string
    submittedAtClient?: string
  }
}

function getRequiredEnv() {
  return {
    intakeUrl: process.env.AUTOMATIONATION_INTAKE_URL?.trim() || '',
    apiKey: process.env.AUTOMATIONATION_API_KEY?.trim() || '',
    tenantId: process.env.STYLED_BY_SYDNEY_TENANT_ID?.trim() || '',
    bookingUrl: process.env.STYLED_BY_SYDNEY_BOOKING_URL?.trim() || '',
  }
}

function normalizeText(value?: string) {
  return String(value || '').trim()
}

function validateBody(body: StyledBySydneyBookingBody) {
  const name = normalizeText(body.name)
  const phone = normalizeText(body.phone)
  const email = normalizeText(body.email).toLowerCase()

  const errors: string[] = []

  if (!name) {
    errors.push('Please add your name.')
  }

  if (!phone && !email) {
    errors.push('Please add a phone number or email address so Sidney can follow up.')
  }

  return {
    valid: errors.length === 0,
    errors,
    normalized: {
      name,
      phone: phone || null,
      email: email || null,
      serviceInterest: normalizeText(body.serviceInterest) || null,
      desiredDate: normalizeText(body.desiredDate) || null,
      desiredTime: normalizeText(body.desiredTime) || null,
      eventType: normalizeText(body.eventType) || null,
      notes: normalizeText(body.notes) || null,
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const env = getRequiredEnv()
    if (!env.intakeUrl || !env.apiKey || !env.tenantId) {
      console.error('Styled by Sydney intake env is incomplete.', {
        hasIntakeUrl: Boolean(env.intakeUrl),
        hasApiKey: Boolean(env.apiKey),
        hasTenantId: Boolean(env.tenantId),
        hasBookingUrl: Boolean(env.bookingUrl),
      })

      return NextResponse.json(
        {
          error: 'The consultation flow is not configured yet. Please try again after the Automationation intake settings are added.',
        },
        { status: 500 }
      )
    }

    const body = (await request.json()) as StyledBySydneyBookingBody
    const validation = validateBody(body)

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.errors[0],
          details: validation.errors,
        },
        { status: 400 }
      )
    }

    const payload = {
      tenant_id: env.tenantId,
      source_channel: 'website',
      source_detail: 'styled-with-sydney',
      booking_url: env.bookingUrl || null,
      contact: {
        name: validation.normalized.name,
        phone: validation.normalized.phone,
        email: validation.normalized.email,
      },
      message: validation.normalized.notes || '',
      notes: validation.normalized.notes,
      service_interest: validation.normalized.serviceInterest,
      desired_date: validation.normalized.desiredDate,
      desired_time: validation.normalized.desiredTime,
      event_type: validation.normalized.eventType,
      inspiration_metadata: {
        supported_on_site: false,
        follow_up_via_sms_or_email: true,
        todo: 'Add direct inspiration upload support when the stack is ready.',
      },
      attribution: {
        source_page: normalizeText(body.attribution?.sourcePage) || '/booking',
        referrer: normalizeText(body.attribution?.referrer) || null,
        utm_source: normalizeText(body.attribution?.utmSource) || null,
        utm_campaign: normalizeText(body.attribution?.utmCampaign) || null,
        utm_medium: normalizeText(body.attribution?.utmMedium) || null,
        submitted_at_client: normalizeText(body.attribution?.submittedAtClient) || null,
      },
      raw_payload: {
        ...body,
        source: 'styled-with-sydney-booking-form',
      },
      submitted_at: new Date().toISOString(),
    }

    const response = await fetch(env.intakeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.apiKey}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      console.error('Automationation intake request failed.', {
        status: response.status,
        result,
      })

      return NextResponse.json(
        {
          error:
            result?.error ||
            'We could not send your request right now. Please try again in a moment.',
        },
        { status: response.status >= 500 ? 502 : response.status }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Your request is in. You should get a quick confirmation by text or email, and Sidney will guide the right next step from there.',
        intake: {
          queued: result?.queued ?? true,
          duplicate: result?.duplicate ?? false,
          tenantId: result?.tenantId ?? env.tenantId,
        },
      },
      { status: 202 }
    )
  } catch (error) {
    console.error('Styled by Sydney booking intake error:', error)

    return NextResponse.json(
      {
        error: 'We could not send your request right now. Please try again in a moment.',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  const env = getRequiredEnv()

  return NextResponse.json({
    configured: Boolean(env.intakeUrl && env.apiKey && env.tenantId),
    hasBookingUrl: Boolean(env.bookingUrl),
  })
}
