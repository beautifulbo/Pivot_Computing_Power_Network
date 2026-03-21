import { test, expect } from '@playwright/test';

const protectedPath = process.env.E2E_PROTECTED_PATH ?? '/tasks';

test('low-privilege user does not see dangerous actions', async ({ page }) => {
  await page.goto(protectedPath);

  await expect(page.getByTestId('restart-task-button')).toHaveCount(0);
  await expect(page.getByTestId('delete-task-button')).toHaveCount(0);
});
