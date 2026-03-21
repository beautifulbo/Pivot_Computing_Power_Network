# Playwright Baseline

## Purpose

Use Playwright as the default browser-level regression tool for this workspace. The goal is not to cover every page immediately; the goal is to protect the main flows that AI-assisted changes break most often.

## Core Principles

- Keep core business flows real. Do not mock login, core CRUD, status transitions, task creation, order creation, restart, stop, or delete when the purpose is frontend-backend integration.
- Mock only non-core external dependencies such as SMS, email, maps, or third-party payment providers.
- Add stable selectors before writing tests. Prefer `data-testid`.
- Avoid fixed sleeps. Wait on visible state, URL changes, API effects, or status text.
- Seed data deterministically. Prefer test-only APIs, fixtures, or setup scripts over lengthy manual UI setup.

## First Flows to Protect

1. Login success and failure
2. List load success and failure
3. Form submit or create task or create order
4. Status change after creation
5. Restart or stop or delete
6. Permission-based visibility of dangerous actions

## Selector Rules

Prefer:

```html
<button data-testid="restart-task-button">Restart</button>
```

Avoid:

- long CSS paths
- unstable generated class names
- assertions that depend only on Chinese copy when a stable selector is available

## Waiting Rules

Prefer:

```ts
await expect(page.getByTestId('task-status')).toHaveText(/CREATED|RUNNING/);
```

Avoid:

```ts
await page.waitForTimeout(5000);
```

## Minimal Setup Pattern

Use `assets/playwright/playwright.config.ts` as the starting point. Drive it with environment variables instead of hard-coding one module:

- `PLAYWRIGHT_BASE_URL`
- `PLAYWRIGHT_WEB_COMMAND`
- `CI`

Suggested local targets:

| Target | Example `PLAYWRIGHT_BASE_URL` |
| --- | --- |
| main shell | `http://127.0.0.1:8082` |
| ithings dev app | `http://127.0.0.1:8000` |
| ymir dev app | `http://127.0.0.1:8001` |
| easyts dev app | `http://127.0.0.1:9528` |

## Data Seeding Pattern

Prefer API-based seeding when a test environment exposes dedicated endpoints:

```ts
await request.post('http://127.0.0.1:8090/test/tasks/seed', {
  data: { name: 'seed-task', status: 'RUNNING' },
});
```

If no test-only API exists yet:

- add a fixture loader only for dev or test
- or prepare deterministic DB fixtures
- or keep the UI setup minimal and explicit

Never expose `/test/*` endpoints in production.

## Failure Artifacts

Keep these enabled for new Playwright suites:

- `trace: 'on-first-retry'`
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`

Use traces first when a failure is timing-related or depends on request order.

## Migration Note for This Repo

`ithings-new-main/tests/` contains legacy Puppeteer helpers. Do not keep expanding that path by default. For any new browser regression, prefer Playwright templates from `assets/playwright/` and put the final spec in the module or root location that matches the actual user flow.
