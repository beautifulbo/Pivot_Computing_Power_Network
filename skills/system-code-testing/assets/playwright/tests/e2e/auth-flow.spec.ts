import { test, expect } from '@playwright/test';

const loginPath = process.env.E2E_LOGIN_PATH ?? '/login';
const afterLoginUrl = process.env.E2E_AFTER_LOGIN_URL ?? '/dashboard';
const username = process.env.E2E_USERNAME ?? 'demo_user';
const password = process.env.E2E_PASSWORD ?? 'demo_password';

test('user can sign in and reach the dashboard shell', async ({ page }) => {
  await page.goto(loginPath);

  await page.getByTestId('login-username').fill(username);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL(new RegExp(afterLoginUrl));
  await expect(page.getByTestId('dashboard-shell')).toBeVisible();
});

test('user sees a stable error on bad credentials', async ({ page }) => {
  await page.goto(loginPath);

  await page.getByTestId('login-username').fill(username);
  await page.getByTestId('login-password').fill('wrong-password');
  await page.getByTestId('login-submit').click();

  await expect(page.getByTestId('login-error')).toBeVisible();
});
