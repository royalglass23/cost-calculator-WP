# Calculator Lead Reliability Test Report

## Automated Coverage

- Browser same-origin submit: `tests/e2e/lead-capture-local.spec.js` verifies the calculator posts to `/wp-json/royal-glass/v1/leads`, not directly to rgtools, even when `rgtoolsSubmitUrl` is configured.
- Stable submission reference: the same browser spec verifies each submission includes `submissionRef` and a retry after a failed submit reuses the same reference.
- WordPress recovery source guards: `tests/unit/wordpress-outbox-source.test.js` verifies the outbox schema, failed-forward save path, retry scheduling, retry state transitions, admin recovery queue, and exhausted-entry alert path.
- rgtools submit route: `apps/web/app/api/lead-intake/calculator-submit/__tests__/route.test.ts` in `D:\Royal Glass Dev\rgtools` verifies successful trusted submits, preserved calculator details, failure dead-lettering with `submissionRef`, legacy fallback refs, and duplicate retry idempotency with no duplicate lead/email/ServiceM8 work.

## Edge Cases Covered

- Existing calculator payloads without `submissionRef` still receive a fallback reference.
- A failed WordPress submit can be retried from the same browser form without changing `submissionRef`.
- Repeated failed WordPress forwards update one outbox row instead of creating duplicates.
- Automatic and manual retries use the original payload and original `submissionRef`.
- Exhausted outbox entries stop retrying automatically and send one admin alert.
- Duplicate trusted rgtools submissions return the existing lead and skip downstream side effects.

## Live Manual TEST ONLY Flow

Use this only when production verification is needed.

1. Submit the calculator using `royalglass666@gmail.com`.
2. Use a clearly synthetic name such as `TEST ONLY Calculator Reliability`.
3. Put `TEST ONLY - calculator lead reliability verification - safe to delete` in notes.
4. Confirm the browser flow posts through WordPress and shows the estimate result.
5. Confirm rgtools has one calculator lead with the matching `submissionRef`/external reference and calculator details.
6. If testing recovery, temporarily force the rgtools forward to fail, submit once, then restore the config and use RG Calculator > Recovery Queue to retry.
7. Confirm the outbox row becomes `sent` and no duplicate rgtools lead, customer email, or ServiceM8 work is created.

## Cleanup

- Delete or archive any rgtools lead whose name or notes contain `TEST ONLY`.
- Clear any WordPress outbox row whose `submission_ref` belongs to the TEST ONLY run after it is verified.
- Remove any test ServiceM8 inbox/job item if a live downstream sync was intentionally exercised.

## Remaining Risks

- PHP CLI is not installed in this local environment, so WordPress PHP behavior is guarded by source-level tests plus browser regression coverage rather than runtime PHP unit tests.
- Live recovery behavior still depends on WordPress cron execution and the production `RGTOOLS_SUBMIT_SECRET` / `RG_LEAD_NOTIFY_EMAIL` configuration.
