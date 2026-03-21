import { test, expect } from '@playwright/test';

const entryPath = process.env.E2E_CREATE_FLOW_PATH ?? '/tasks/new';
const listPath = process.env.E2E_LIST_PATH ?? '/tasks';
const seedEndpoint = process.env.E2E_SEED_ENDPOINT;

test('user can create a task or order and observe a valid status', async ({ page, request }) => {
  if (seedEndpoint) {
    await request.post(seedEndpoint, {
      data: {
        name: 'seed-resource',
        status: 'READY',
      },
    });
  }

  await page.goto(entryPath);

  await page.getByTestId('resource-name-input').fill('e2e-demo');
  await page.getByTestId('resource-submit').click();

  await expect(page.getByTestId('resource-status')).toHaveText(/CREATED|PAID|RUNNING/);

  await page.goto(listPath);
  await expect(page.getByText('e2e-demo')).toBeVisible();
});
