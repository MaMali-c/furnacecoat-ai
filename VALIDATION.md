# Frontend validation record

Date: 2026-11-13

- TypeScript strict check and Vite production build: PASS.
- Vitest: 17 tests, all passed. Covers cross-field furnace validation, layer addition/removal/reordering and totals, project isolation, all eight navigation targets, visible demo labeling, fixed mock invariance and Excel mapping checks.
- Chrome manual desktop review: dashboard renders with charts and schematic; layer add changes total 315 → 365 mm, removal restores 315 mm, reorder changes sequence without changing total, and invalid zero length is rejected with an inline message. Persian technical labels were observed.
- Responsive breakpoints are implemented. A 390 × 844 DevTools preview was attempted, but the browser preview was cropped; complete mobile visual verification remains pending.
- Browser console contained an injected wallet extension error from `in-page.js`; it was unrelated to the app. No app runtime exception was observed in the desktop interactions above.
- Excel mapping validation is tested automatically. Workbook selection/parsing and Print / Save as PDF are implemented but were not exercised end to end in the native browser during this run.
- No engineering calculations, optimization, material qualification or ML validation have been performed. All such UI outputs remain DEMO / NOT VALIDATED.
