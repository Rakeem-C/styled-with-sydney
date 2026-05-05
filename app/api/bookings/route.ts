import { NextRequest, NextResponse } from 'next/server';
import {
  submitStyledBySydneyIntake,
  type StyledBySydneyBookingSubmission,
} from '@/lib/automationation-intake';

export const dynamic = 'force-dynamic';

function normalizeText(value?: string | null) {
  return String(value || '').trim();
}

function validateBody(body: StyledBySydneyBookingSubmission) {
  const name = normalizeText(body.name);
  const phone = normalizeText(body.phone);
  const email = normalizeText(body.email).toLowerCase();

  const errors: string[] = [];

  if (!name) {
    errors.push('Please add your name.');
  }

  if (!phone && !email) {
    errors.push('Please add a phone number or email address so Sidney can follow up.');
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
      preferredContactMethod: normalizeText(body.preferredContactMethod) || null,
      attribution: body.attribution || null,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as StyledBySydneyBookingSubmission;
    const validation = validateBody(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.errors[0],
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    const result = await submitStyledBySydneyIntake(
      {
        name: validation.normalized.name,
        phone: validation.normalized.phone,
        email: validation.normalized.email,
        serviceInterest: validation.normalized.serviceInterest,
        desiredDate: validation.normalized.desiredDate,
        desiredTime: validation.normalized.desiredTime,
        eventType: validation.normalized.eventType,
        notes: validation.normalized.notes,
        preferredContactMethod: validation.normalized.preferredContactMethod,
        attribution: validation.normalized.attribution,
      },
      'booking'
    );

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        intake: {
          queued: result.queued,
          duplicate: result.duplicate,
          tenantSlug: result.tenantSlug,
        },
      },
      { status: result.duplicate ? 200 : 202 }
    );
  } catch (error) {
    console.error('Styled by Sydney booking intake error:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'We could not send your request right now. Please try again in a moment.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(
      process.env.AUTOMATIONATION_INTAKE_URL?.trim() &&
        (process.env.AUTOMATIONATION_INTAKE_TOKEN?.trim() ||
          (process.env.AUTOMATIONATION_API_KEY?.trim() && process.env.STYLED_BY_SYDNEY_TENANT_ID?.trim()))
    ),
    hasBookingUrl: Boolean(process.env.STYLED_BY_SYDNEY_BOOKING_URL?.trim()),
  });
}
