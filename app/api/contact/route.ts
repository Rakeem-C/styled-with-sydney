import { NextRequest, NextResponse } from 'next/server';
import {
  submitStyledBySydneyIntake,
  type StyledBySydneyContactSubmission,
} from '@/lib/automationation-intake';

export const dynamic = 'force-dynamic';

function normalizeText(value?: string | null) {
  return String(value || '').trim();
}

function validateBody(body: StyledBySydneyContactSubmission) {
  const name = normalizeText(body.name);
  const email = normalizeText(body.email).toLowerCase();
  const phone = normalizeText(body.phone);
  const message = normalizeText(body.message);

  const errors: string[] = [];

  if (!name) {
    errors.push('Please add your name.');
  }

  if (!email && !phone) {
    errors.push('Please add a phone number or email address so Sidney can follow up.');
  }

  if (!message) {
    errors.push('Please add a message so Sidney knows what you need.');
  }

  return {
    valid: errors.length === 0,
    errors,
    normalized: {
      name,
      phone: phone || null,
      email: email || null,
      subject: normalizeText(body.subject) || null,
      message,
      preferredContactMethod: normalizeText(body.preferredContactMethod) || null,
      attribution: body.attribution || null,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as StyledBySydneyContactSubmission;
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
        subject: validation.normalized.subject,
        message: validation.normalized.message,
        preferredContactMethod: validation.normalized.preferredContactMethod,
        attribution: validation.normalized.attribution,
      },
      'contact'
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
    console.error('Styled by Sydney contact intake error:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'We could not send your message right now. Please try again in a moment.',
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
  });
}
