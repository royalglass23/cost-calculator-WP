import { test, expect } from '@playwright/test';

test('lead capture posts a clearly marked test-only lead payload', async ({ page }) => {
  let submittedPayload = null;

  await page.route('**/wp-json/royal-glass/v1/pricing', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/wp-json/royal-glass/v1/leads', async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, leadId: 999001 }),
    });
  });

  await page.goto('/');

  await page.getByText('Premium Pool Fence').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Spigot Round').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Concrete').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Chrome').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();

  await page.getByPlaceholder(/Sarah Johnson|Smith Builders/i).fill('Codex TEST ONLY Lead');
  await page.getByPlaceholder(/sarah@example.com/i).fill('royalglass666@gmail.com');
  await page.getByPlaceholder(/021 123 4567/i).fill('021 123 4567');
  await page.getByText('Homeowner').first().click();
  await page.getByText('Just planning').first().click();
  await page.getByLabel('Project address').fill('123 TEST ONLY Street, Auckland 1010');
  await page
    .getByPlaceholder(/pool fence needs|balcony is/i)
    .fill('TEST ONLY - E2E lead capture submission by Codex. Please ignore/delete.');
  await page.getByLabel(/I agree Royal Glass may contact me/i).check();

  await page.waitForTimeout(3100);
  await page.getByRole('button', { name: /Show my estimate/i }).click();

  await expect(page.getByText(/Your indicative estimate|Royal Glass estimate/i)).toBeVisible();
  expect(submittedPayload?.lead?.email).toBe('royalglass666@gmail.com');
  expect(submittedPayload?.lead?.notes).toContain('TEST ONLY');
  expect(submittedPayload?.lead?.firstName).toBe('Codex');
  expect(submittedPayload?.lead?.lastName).toBe('TEST ONLY Lead');
  expect(submittedPayload?.lead?.consent).toBe(true);
  expect(submittedPayload?.submissionRef).toMatch(/^rgcalc_[a-z0-9]+_[a-z0-9]+$/);
});

test('lead capture uses WordPress leads endpoint even when rgtools submit URL is configured', async ({ page }) => {
  let bridgeAttempted = false;
  let submittedPayload = null;

  await page.addInitScript(() => {
    window.rgCalculatorConfig = {
      restUrl: '/wp-json/royal-glass/v1',
      rgtoolsSubmitUrl: 'https://rgtools.example.test/api/lead-intake/calculator-submit',
      nonce: 'test-nonce',
      googleMapsKey: '',
      turnstileSiteKey: '',
      assetsUrl: '',
    };
  });

  await page.route('**/wp-json/royal-glass/v1/pricing', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('https://rgtools.example.test/api/lead-intake/calculator-submit', async (route) => {
    bridgeAttempted = true;
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ ok: false }),
    });
  });

  await page.route('**/wp-json/royal-glass/v1/leads', async (route) => {
    submittedPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, leadId: 999002 }),
    });
  });

  await page.goto('/');

  await page.getByText('Premium Pool Fence').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Spigot Round').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Concrete').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Chrome').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();

  await page.getByPlaceholder(/Sarah Johnson|Smith Builders/i).fill('Codex TEST ONLY Lead');
  await page.getByPlaceholder(/sarah@example.com/i).fill('royalglass666@gmail.com');
  await page.getByPlaceholder(/021 123 4567/i).fill('021 123 4567');
  await page.getByText('Homeowner').first().click();
  await page.getByText('Just planning').first().click();
  await page.getByLabel('Project address').fill('123 TEST ONLY Street, Auckland 1010');
  await page
    .getByPlaceholder(/pool fence needs|balcony is/i)
    .fill('TEST ONLY - E2E lead capture fallback submission by Codex. Please ignore/delete.');
  await page.getByLabel(/I agree Royal Glass may contact me/i).check();

  await page.waitForTimeout(3100);
  await page.getByRole('button', { name: /Show my estimate/i }).click();

  await expect(page.getByText(/Your indicative estimate|Royal Glass estimate/i)).toBeVisible();
  expect(bridgeAttempted).toBe(false);
  expect(submittedPayload?.lead?.email).toBe('royalglass666@gmail.com');
  expect(submittedPayload?.lead?.notes).toContain('TEST ONLY');
});

test('lead capture keeps the same submission reference when a failed submit is retried', async ({ page }) => {
  const submissionRefs = [];
  let attempt = 0;

  await page.route('**/wp-json/royal-glass/v1/pricing', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/wp-json/royal-glass/v1/leads', async (route) => {
    attempt += 1;
    const payload = route.request().postDataJSON();
    submissionRefs.push(payload.submissionRef);

    if (attempt === 1) {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Temporary rgtools failure' }),
      });
      return;
    }

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, leadId: 999003 }),
    });
  });

  await page.goto('/');

  await page.getByText('Premium Pool Fence').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Spigot Round').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Concrete').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Chrome').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();

  await page.getByPlaceholder(/Sarah Johnson|Smith Builders/i).fill('Codex TEST ONLY Lead');
  await page.getByPlaceholder(/sarah@example.com/i).fill('royalglass666@gmail.com');
  await page.getByPlaceholder(/021 123 4567/i).fill('021 123 4567');
  await page.getByText('Homeowner').first().click();
  await page.getByText('Just planning').first().click();
  await page.getByLabel('Project address').fill('123 TEST ONLY Street, Auckland 1010');
  await page
    .getByPlaceholder(/pool fence needs|balcony is/i)
    .fill('TEST ONLY - E2E lead capture retry submission by Codex. Please ignore/delete.');
  await page.getByLabel(/I agree Royal Glass may contact me/i).check();

  await page.waitForTimeout(3100);
  await page.getByRole('button', { name: /Show my estimate/i }).click();
  await expect(page.getByText('Temporary rgtools failure')).toBeVisible();

  await page.getByRole('button', { name: /Show my estimate/i }).click();

  await expect(page.getByText(/Your indicative estimate|Royal Glass estimate/i)).toBeVisible();
  expect(submissionRefs).toHaveLength(2);
  expect(submissionRefs[0]).toMatch(/^rgcalc_[a-z0-9]+_[a-z0-9]+$/);
  expect(submissionRefs[1]).toBe(submissionRefs[0]);
});

test('lead capture gets a fresh Turnstile token when retrying after a failed forward', async ({ page }) => {
  const submissionRefs = [];
  const turnstileTokens = [];
  let attempt = 0;

  await page.addInitScript(() => {
    window.rgCalculatorConfig = {
      restUrl: '/wp-json/royal-glass/v1',
      rgtoolsSubmitUrl: '',
      nonce: 'test-nonce',
      googleMapsKey: '',
      turnstileSiteKey: 'test-site-key',
      assetsUrl: '',
    };

    let tokenNumber = 0;
    let callback = null;
    window.turnstile = {
      render: (_el, options) => {
        callback = options.callback;
        return 'widget-1';
      },
      remove: () => {},
      reset: () => {},
      execute: () => {
        tokenNumber += 1;
        callback?.(`token-${tokenNumber}`);
      },
    };
  });

  await page.route('**/wp-json/royal-glass/v1/pricing', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/wp-json/royal-glass/v1/leads', async (route) => {
    attempt += 1;
    const payload = route.request().postDataJSON();
    submissionRefs.push(payload.submissionRef);
    turnstileTokens.push(payload.turnstileToken);

    if (attempt === 1) {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Temporary rgtools failure' }),
      });
      return;
    }

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, leadId: 999004 }),
    });
  });

  await page.goto('/');

  await page.getByText('Premium Pool Fence').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Spigot Round').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Concrete').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByText('Chrome').first().click();
  await page.getByRole('button', { name: /Continue/i }).click();

  await page.getByPlaceholder(/Sarah Johnson|Smith Builders/i).fill('Codex TEST ONLY Lead');
  await page.getByPlaceholder(/sarah@example.com/i).fill('royalglass666@gmail.com');
  await page.getByPlaceholder(/021 123 4567/i).fill('021 123 4567');
  await page.getByText('Homeowner').first().click();
  await page.getByText('Just planning').first().click();
  await page.getByLabel('Project address').fill('123 TEST ONLY Street, Auckland 1010');
  await page
    .getByPlaceholder(/pool fence needs|balcony is/i)
    .fill('TEST ONLY - E2E lead capture Turnstile retry submission by Codex. Please ignore/delete.');
  await page.getByLabel(/I agree Royal Glass may contact me/i).check();

  await page.waitForTimeout(3100);
  await page.getByRole('button', { name: /Show my estimate/i }).click();
  await expect(page.getByText('Temporary rgtools failure')).toBeVisible();

  await page.getByRole('button', { name: /Show my estimate/i }).click();

  await expect(page.getByText(/Your indicative estimate|Royal Glass estimate/i)).toBeVisible();
  expect(submissionRefs).toHaveLength(2);
  expect(submissionRefs[1]).toBe(submissionRefs[0]);
  expect(turnstileTokens).toEqual(['token-1', 'token-2']);
});
