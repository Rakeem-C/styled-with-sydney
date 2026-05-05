type StyledBySydneyAttribution = {
  sourcePage?: string;
  referrer?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  submittedAtClient?: string;
};

export type StyledBySydneyBookingSubmission = {
  name: string;
  phone?: string | null;
  email?: string | null;
  serviceInterest?: string | null;
  desiredDate?: string | null;
  desiredTime?: string | null;
  eventType?: string | null;
  notes?: string | null;
  preferredContactMethod?: string | null;
  attribution?: StyledBySydneyAttribution | null;
};

export type StyledBySydneyContactSubmission = {
  name: string;
  phone?: string | null;
  email?: string | null;
  subject?: string | null;
  message?: string | null;
  preferredContactMethod?: string | null;
  attribution?: StyledBySydneyAttribution | null;
};

export type StyledBySydneyIntakeConfig = {
  intakeUrl: string;
  intakeToken: string | null;
  apiKey: string | null;
  tenantId: string | null;
  tenantSlug: string;
  bookingUrl: string | null;
};

type AutomationationLeadSourceBody = {
  source: 'WEB_FORM';
  adapter: 'website_form';
  source_detail: string;
  booking_url: string | null;
  source_channel: string;
  source_page: string;
  contact: {
    name: string;
    phone: string | null;
    email: string | null;
  };
  message: string;
  notes: string | null;
  service_interest: string | null;
  desired_date: string | null;
  desired_time: string | null;
  event_type: string | null;
  inspiration_metadata: Record<string, unknown> | null;
  consent: Record<string, unknown> | null;
  raw_payload: Record<string, unknown>;
  submitted_at: string;
  tenant_id?: string;
  tenant_slug?: string;
  intakeToken?: string;
};

function normalizeText(value?: string | null) {
  return String(value || '').trim();
}

function normalizeEmail(value?: string | null) {
  const normalized = normalizeText(value).toLowerCase();
  return normalized || null;
}

function buildSourcePage(input: StyledBySydneyBookingSubmission | StyledBySydneyContactSubmission) {
  return normalizeText(input.attribution?.sourcePage) || '/booking';
}

function buildBasePayload(
  input: StyledBySydneyBookingSubmission | StyledBySydneyContactSubmission,
  formType: 'booking' | 'contact',
  config: StyledBySydneyIntakeConfig
): AutomationationLeadSourceBody {
  const sourcePage = buildSourcePage(input);
  const preferredContactMethod = normalizeText(input.preferredContactMethod || null) || null;
  const sourceDetail = formType === 'contact' ? 'styled-with-sydney-contact-form' : 'styled-with-sydney-booking-form';
  const bookingUrl = config.bookingUrl || null;
  const name = normalizeText(input.name);
  const phone = normalizeText(input.phone || null) || null;
  const email = normalizeEmail(input.email || null);
  const submittedAt = normalizeText(input.attribution?.submittedAtClient) || new Date().toISOString();

  if (formType === 'contact') {
    const contactInput = input as StyledBySydneyContactSubmission;
    const subject = normalizeText(contactInput.subject || null);
    const message = normalizeText(contactInput.message || null);
    const combinedMessage = [subject ? `Subject: ${subject}` : null, message].filter(Boolean).join('\n\n');

    return {
      source: 'WEB_FORM',
      adapter: 'website_form',
      source_detail: sourceDetail,
      booking_url: bookingUrl,
      source_channel: 'website',
      source_page: sourcePage,
      contact: {
        name,
        phone,
        email,
      },
      message: combinedMessage || message || subject || '',
      notes: [
        subject ? `Subject: ${subject}` : null,
        message ? `Message: ${message}` : null,
        preferredContactMethod ? `Preferred contact method: ${preferredContactMethod}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      service_interest: null,
      desired_date: null,
      desired_time: null,
      event_type: null,
      inspiration_metadata: {
        preferred_contact_method: preferredContactMethod,
        form_type: formType,
      },
      consent: null,
      raw_payload: {
        formType,
        source_site: 'styled-with-sydney',
        ...input,
        attribution: input.attribution || null,
        sourcePage,
      },
      submitted_at: submittedAt,
      ...(config.intakeToken
        ? {
            intakeToken: config.intakeToken,
            tenant_slug: config.tenantSlug,
          }
        : {
            tenant_id: config.tenantId || undefined,
            tenant_slug: config.tenantSlug,
          }),
    };
  }

  const bookingInput = input as StyledBySydneyBookingSubmission;
  const notes = normalizeText(bookingInput.notes || null);

  return {
    source: 'WEB_FORM',
    adapter: 'website_form',
    source_detail: sourceDetail,
    booking_url: bookingUrl,
    source_channel: 'website',
    source_page: sourcePage,
    contact: {
      name,
      phone,
      email,
    },
    message: notes || [bookingInput.serviceInterest, bookingInput.eventType].filter(Boolean).join(' | ') || '',
    notes: [
      notes ? `Notes: ${notes}` : null,
      preferredContactMethod ? `Preferred contact method: ${preferredContactMethod}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
    service_interest: normalizeText(bookingInput.serviceInterest || null) || null,
    desired_date: normalizeText(bookingInput.desiredDate || null) || null,
    desired_time: normalizeText(bookingInput.desiredTime || null) || null,
    event_type: normalizeText(bookingInput.eventType || null) || null,
    inspiration_metadata: {
      preferred_contact_method: preferredContactMethod,
      form_type: formType,
    },
    consent: null,
    raw_payload: {
      formType,
      source_site: 'styled-with-sydney',
      ...input,
      attribution: input.attribution || null,
      sourcePage,
    },
    submitted_at: submittedAt,
    ...(config.intakeToken
      ? {
          intakeToken: config.intakeToken,
          tenant_slug: config.tenantSlug,
        }
      : {
          tenant_id: config.tenantId || undefined,
          tenant_slug: config.tenantSlug,
        }),
  };
}

export function resolveAutomationationIntakeConfig(): StyledBySydneyIntakeConfig | null {
  const intakeUrl = process.env.AUTOMATIONATION_INTAKE_URL?.trim() || '';
  const intakeToken = process.env.AUTOMATIONATION_INTAKE_TOKEN?.trim() || null;
  const apiKey = process.env.AUTOMATIONATION_API_KEY?.trim() || null;
  const tenantId = process.env.STYLED_BY_SYDNEY_TENANT_ID?.trim() || null;
  const tenantSlug = process.env.STYLED_BY_SYDNEY_TENANT_SLUG?.trim() || 'styled-by-sydney';
  const bookingUrl = process.env.STYLED_BY_SYDNEY_BOOKING_URL?.trim() || null;

  if (!intakeUrl) {
    return null;
  }

  if (!intakeToken && !(apiKey && tenantId)) {
    return null;
  }

  return {
    intakeUrl,
    intakeToken,
    apiKey,
    tenantId,
    tenantSlug,
    bookingUrl,
  };
}

export async function submitStyledBySydneyIntake(
  input: StyledBySydneyBookingSubmission | StyledBySydneyContactSubmission,
  formType: 'booking' | 'contact',
  fetchImpl: typeof fetch = fetch
) {
  const config = resolveAutomationationIntakeConfig();

  if (!config) {
    throw new Error('The consultation form is not configured yet.');
  }

  const payload = buildBasePayload(input, formType, config);
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (!config.intakeToken && config.apiKey) {
    headers.Authorization = `Bearer ${config.apiKey}`;
  }

  const response = await fetchImpl(config.intakeUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.error ||
        'We could not send your request right now. Please try again in a moment.'
    );
  }

  return {
    success: true,
    message:
      result?.message ||
      'Your request is in. Sidney will text or email you with the best next step based on your service and date.',
    queued: result?.queued ?? true,
    duplicate: result?.duplicate ?? false,
    tenantId: result?.tenantId ?? null,
    tenantSlug: result?.tenantSlug ?? config.tenantSlug,
    payload,
  };
}
