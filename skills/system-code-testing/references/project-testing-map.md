# Project Testing Map

## Workspace Layout

The workspace root is `D:\Pivot_Computing_Power_Network`. The main application repo is `D:\Pivot_Computing_Power_Network\Pivot_Computing_Power_Network`.

Use the top-level `D:\Pivot_Computing_Power_Network\PLAN.md` as the target architecture reference: new core platform code should move toward `platform-backend`, `platform-frontend`, and root-level `tests/`, even though the current repo still contains several legacy modules.

## Current Modules

| Module | Stack | Existing Test Shape | Typical Command | Guidance |
| --- | --- | --- | --- | --- |
| `Pivot_Computing_Power_Network/system-template/system-vue` | Vue 2 + Element UI | No formal browser e2e baseline | No test command yet | Add `data-testid` when editing pages; use this module as a Playwright target for shared admin-shell flows. |
| `Pivot_Computing_Power_Network/easyts-web-main` | Vue 2 + Jest | `tests/unit/**/*.spec.js` | `npm run test:unit` | Keep component and utility tests inside `tests/unit`. |
| `Pivot_Computing_Power_Network/ithings-new-main` | React/Umi | `npm test`, legacy Puppeteer helpers in `tests/` | `npm test`, `npm run test:all` | Keep existing unit/integration tests, but prefer new Playwright coverage over growing Puppeteer helpers. |
| `Pivot_Computing_Power_Network/ymir` | React/Umi | in-source `__test__` files | `npm test` | Add close-to-source tests unless the flow is cross-module. |
| `Pivot_Computing_Power_Network/system-template/test_system.py` | Python smoke script | single script | `python test_system.py` | Use for temporary smoke verification only; replace with `pytest` once new backend code exists. |

## Ports and Runtime Targets

The current root README maps these runtime ports:

| Surface | Port |
| --- | --- |
| main platform shell | `8082` |
| Spring Boot backend | `8090` |
| ithings orchestration module | `8000` |
| ymir module | `8001` |
| easyts module | `9528` |

Use these ports when selecting `PLAYWRIGHT_BASE_URL` or when confirming which surface an e2e spec should hit.

## New Platform Target Layout

When a task creates the planned new platform modules, use this structure by default:

| Area | Preferred Location |
| --- | --- |
| backend unit tests | `Pivot_Computing_Power_Network/platform-backend/tests/unit` |
| backend integration tests | `Pivot_Computing_Power_Network/platform-backend/tests/integration` |
| frontend component and state tests | `Pivot_Computing_Power_Network/platform-frontend/src/**/*.spec.ts` or `Pivot_Computing_Power_Network/platform-frontend/tests/unit` |
| browser e2e | `D:\Pivot_Computing_Power_Network\tests\e2e` |
| API or schema contract tests | `D:\Pivot_Computing_Power_Network\tests\contracts` |
| shared seeded data and fixtures | `D:\Pivot_Computing_Power_Network\tests\fixtures` |

Prefer root `tests/e2e` for cross-module user flows that span shell, backend, and one or more submodules.

## Test Selection Heuristics

| Change Type | Minimum Coverage |
| --- | --- |
| pure function, formatter, helper | unit |
| page state mapping, hook, store, selector | unit |
| auth token refresh, permission gate, API adapter | integration |
| order, deployment, refund, node onboarding, scheduler flow | integration plus one high-value e2e |
| page form, list, modal, dangerous action button | unit or integration plus e2e |
| proxy, iframe shell, cross-module route integration | e2e |

## Execution Notes

- Read the target module's `package.json` before assuming install or test commands.
- Do not assume Playwright is already installed in legacy modules.
- Keep new browser automation isolated from legacy Puppeteer helpers unless migration work is explicitly requested.
- When a change spans multiple modules, cover the narrowest module-level risk first, then add one cross-module regression.
