---
name: system-code-testing
description: Add or update tests for this repository's system code. Use when a task changes backend APIs, frontend pages, state flows, permissions, orders, deployments, nodes, or other user-visible behavior and Codex needs to add tests, write regression coverage, add Playwright checks, do frontend-backend integration testing, or choose between unit, integration, and end-to-end coverage across the current multi-module repo and the planned platform-backend/platform-frontend services.
---

# System Code Testing

## Quick Start

1. Identify the changed business flow before choosing a test.
2. Add the lowest test layer that can catch the risk, then add Playwright if the change affects browser-visible behavior or frontend-backend integration.
3. Reuse the module's existing runner when one already exists.
4. Prefer Playwright for new browser tests; do not extend legacy Puppeteer unless the user explicitly asks for it.
5. Keep core e2e flows real, stable, and deterministic.

Read [references/project-testing-map.md](references/project-testing-map.md) first for module locations and commands. Read [references/playwright-baseline.md](references/playwright-baseline.md) when adding or updating browser tests. Copy from `assets/playwright/` when bootstrapping new Playwright coverage.

## Choose the Test Layer

- Use unit tests for pure rules, formatters, permission helpers, data transforms, selectors, and small state transitions.
- Use integration tests for API plus DB collaboration, auth refresh, order or deployment state machines, worker jobs, and failure compensation.
- Use end-to-end tests for login, list or detail pages, forms, create actions, restart or stop or delete actions, status changes, and permission visibility.

If a change touches payment, deployment, node onboarding, scheduling, or permissions, add at least one non-trivial regression test. Do not rely on manual clicking alone.

## Follow the Repo Mapping

- Keep legacy-module tests inside the owning module.
- Use the existing command first if the module already has a stable test runner.
- For new platform code, default to:
  - `platform-backend/tests/unit`
  - `platform-backend/tests/integration`
  - `platform-frontend/src/**/*.spec.ts`
  - `platform-frontend/tests/unit`
  - `tests/e2e`
  - `tests/contracts`
  - `tests/fixtures`

Use [references/project-testing-map.md](references/project-testing-map.md) to decide where the code belongs before creating files.

## Write Stable Browser Tests

- Keep login, core business APIs, status transitions, and create or restart or delete flows unmocked in e2e.
- Mock only external dependencies such as SMS, email, maps, or third-party payment providers.
- Add `data-testid` on interactive or state-bearing elements before writing fragile selectors.
- Prefer `getByTestId`, `getByRole`, or stable labels over long CSS selectors or raw text matching.
- Never introduce `page.waitForTimeout(...)` when a state assertion or network-visible condition can be awaited instead.
- Prefer API or fixture seeding over long UI setup sequences.

## Cover the Highest-Risk Flows First

Protect these flows first when time is limited:

1. Login success and failure
2. List query success and failure
3. Form submit or create task or create order
4. Status transition after creation
5. Restart or stop or delete
6. Permission checks for dangerous actions

If a change affects deployment or node lifecycle, include one happy path and one failure-path regression when feasible.

## Use the Current Repo Conventions

- `Pivot_Computing_Power_Network/system-template/system-vue` is a Vue 2 admin shell without a formal browser e2e baseline. Add Playwright for new end-to-end coverage when touching shared platform flows.
- `Pivot_Computing_Power_Network/easyts-web-main` already has Jest unit tests under `tests/unit`.
- `Pivot_Computing_Power_Network/ithings-new-main` has React/Umi tests plus legacy Puppeteer helpers under `tests/`.
- `Pivot_Computing_Power_Network/ymir` uses `umi-test` and in-source `__test__` files.
- `Pivot_Computing_Power_Network/system-template/test_system.py` is a legacy Python smoke script. Use it only as temporary smoke coverage; prefer structured `pytest` suites for new backend code.

Read commands and caveats in [references/project-testing-map.md](references/project-testing-map.md) before executing anything. Do not assume every module uses the same Node version or runner.

## Finish With Evidence

- Run the smallest relevant subset first, then broaden only if the change is cross-cutting.
- If you add Playwright, keep trace, screenshot, and video collection enabled on failure or retry.
- Report which flow was covered, where the new test lives, what command ran, and what risk remains untested.
- If reliable automation is blocked, state the blocker explicitly and add the smallest meaningful smoke test instead of leaving the area uncovered.
