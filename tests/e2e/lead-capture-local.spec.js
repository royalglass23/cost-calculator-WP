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
