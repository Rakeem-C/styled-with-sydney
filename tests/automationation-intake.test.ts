import assert from 'node:assert/strict';
import test from 'node:test';

import {
  submitStyledBySydneyIntake,
  resolveAutomationationIntakeConfig,
} from '@/lib/automationation-intake';

function withEnv(values: Record<string, string | undefined>) {
  const previous: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(values)) {
    previous[key] = process.env[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  return () => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  };
}

test('styled by sydney intake submits the canonical automationation payload', async () => {
  const restore = withEnv({
    AUTOMATIONATION_INTAKE_URL: 'https://automationation.example/api/intake/v1/leads',
    AUTOMATIONATION_INTAKE_TOKEN: 'styled-by-sydney-intake-token-test',
    AUTOMATIONATION_API_KEY: undefined,
    STYLED_BY_SYDNEY_TENANT_ID: undefined,
    STYLED_BY_SYDNEY_TENANT_SLUG: 'styled-by-sydney',
    STYLED_BY_SYDNEY_BOOKING_URL: 'https://styled-with-sydney.vercel.app/booking',
  });

  const calls: Array<{ url: string; init?: RequestInit }> = [];

  try {
    const result = await submitStyledBySydneyIntake(
      {
        name: 'Ariana Lopez',
        email: 'ariana@example.com',
        phone: '+13237381415',
        serviceInterest: 'Bridal hair styling',
        desiredDate: '2026-08-15',
        desiredTime: '10:00',
        eventType: 'Wedding',
        notes: 'Need polished bridal styling.',
        preferredContactMethod: 'text',
        attribution: {
          sourcePage: '/booking',
          referrer: 'https://example.com',
          submittedAtClient: '2026-05-05T12:00:00.000Z',
        },
      },
      'booking',
      async (url, init) => {
        calls.push({ url: String(url), init });
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Accepted',
            queued: true,
            duplicate: false,
            tenantId: 'tenant-styled',
            tenantSlug: 'styled-by-sydney',
          }),
          {
            status: 202,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    );

    assert.equal(calls.length, 1);
    assert.equal(calls[0]?.url, 'https://automationation.example/api/intake/v1/leads');
    assert.equal(calls[0]?.init?.method, 'POST');

    const headers = calls[0]?.init?.headers as Record<string, string>;
    assert.equal(headers['Content-Type'], 'application/json');

    const payload = JSON.parse(String(calls[0]?.init?.body || '{}'));
    assert.equal(payload.intakeToken, 'styled-by-sydney-intake-token-test');
    assert.equal(payload.tenant_slug, 'styled-by-sydney');
    assert.equal(payload.source_detail, 'styled-with-sydney-booking-form');
    assert.equal(payload.contact.name, 'Ariana Lopez');
    assert.equal(payload.contact.email, 'ariana@example.com');
    assert.equal(payload.service_interest, 'Bridal hair styling');
    assert.equal(payload.inspiration_metadata.preferred_contact_method, 'text');
    assert.equal(result.tenantSlug, 'styled-by-sydney');
    assert.equal(result.duplicate, false);
    assert.equal(result.queued, true);
  } finally {
    restore();
  }
});

test('styled by sydney intake reports a clear configuration error when env is missing', async () => {
  const restore = withEnv({
    AUTOMATIONATION_INTAKE_URL: undefined,
    AUTOMATIONATION_INTAKE_TOKEN: undefined,
    AUTOMATIONATION_API_KEY: undefined,
    STYLED_BY_SYDNEY_TENANT_ID: undefined,
  });

  try {
    assert.equal(resolveAutomationationIntakeConfig(), null);
    await assert.rejects(
      () =>
        submitStyledBySydneyIntake(
          {
            name: 'Ariana Lopez',
            email: 'ariana@example.com',
            message: 'Hello',
          },
          'contact'
        ),
      /consultation form is not configured yet/i
    );
  } finally {
    restore();
  }
});
