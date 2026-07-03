import { test, expect } from '@playwright/test';

test.skip(process.env.LIVE_E2E !== '1', 'Set LIVE_E2E=1 to submit against royalglass.co.nz.');

test('live lead capture can submit a clearly marked test-only enquiry', async ({ page }) => {
  const responses = [];
  page.on('response', async (response) => {
    if (/royal-glass\/v1\/(leads|pricing|estimate-email)|\/api\/lead-intake\/calculator-submit/.test(response.url())) {
      let body = '';
      try {
        body = (await response.text()).slice(0, 1000);
      } catch {
        body = '';
      }
      responses.push({ url: response.url(), status: response.status(), body });
    }
  });

  await page.goto('https://royalglass.co.nz/cost-calculator/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle').catch(() => {});

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

  await page.screenshot({ path: 'lead-capture-e2e-before-live.png', fullPage: true });

  await page.getByPlaceholder(/Sarah Johnson|Smith Builders/i).fill('Codex TEST ONLY Lead');
  await page.getByPlaceholder(/sarah@example.com/i).fill('royalglass666@gmail.com');
  await page.getByPlaceholder(/021 123 4567/i).fill('021 123 4567');
  await page.getByText('Homeowner').first().click();
  await page.getByText('Just planning').first().click();
  await page.getByLabel('Project address').fill('123 TEST ONLY Street, Auckland 1010');
  await page
    .getByPlaceholder(/pool fence needs|balcony is/i)
    .fill('TEST ONLY - E2E lead capture submission by Codex on 2026-07-03 NZT. Please ignore/delete.');
  await page.getByLabel(/I agree Royal Glass may contact me/i).check();

  await page.waitForTimeout(3500);
  await page.getByRole('button', { name: /Show my estimate/i }).click();
  await page.waitForTimeout(15000);
  await page.screenshot({ path: 'lead-capture-e2e-final-live.png', fullPage: true });

  const pageText = await page.locator('body').innerText();
  const leadResponse = responses.find((response) => /\/leads$|\/api\/lead-intake\/calculator-submit$/.test(response.url));

  expect.soft(leadResponse, `lead API response: ${JSON.stringify(responses)}`).toBeTruthy();
  expect.soft(leadResponse?.status, `lead API response: ${JSON.stringify(responses)}`).toBe(201);
  expect(pageText).toMatch(/Your indicative estimate|Share this estimate|Estimate sent/i);
});
