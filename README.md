# FurnaceCoat AI

Professional browser-based furnace lining design workspace. Phase 01 is a functional frontend, inspired by the supplied dark industrial dashboard reference.

**DEMO / NOT VALIDATED** — every thermal output and comparison is a fixed illustrative fixture. Material specifications are fictional sample records. No thermal solver, engineering certification, optimization algorithm or machine learning model is implemented.

## Run on macOS

Install an official Node.js LTS release (22 or newer) from https://nodejs.org. In Terminal:

```sh
cd furnacecoat-ai
npm install
npm run dev
```

Open **http://127.0.0.1:5173**. If the port is busy, Vite prints the selected port. Keep the terminal running while using the local application.

```sh
npm test
npm run build
```

The production output is `dist/`. Hosting serves the Vite single-page app, with hash-based page navigation. All eight pages support direct hash navigation.

The checked-in `pnpm-lock.yaml` also supports reproducible installation with `corepack pnpm install --frozen-lockfile` and `corepack pnpm run build` (pnpm 10.11.0). Use one package manager consistently. npm is the simplest macOS setup; pnpm is the package manager used for the initial dependency install.

## Features completed

- Eight navigable responsive pages, persistent sidebar, project selection and creation.
- Project-specific furnace inputs and layer configurations saved in browser localStorage.
- React Hook Form and Zod validation, including temperature relationships, positive dimensions and absolute pressure.
- Rectangular or cylindrical input geometry; cylindrical width represents diameter and height is unused.
- Add, remove, reorder, select material and edit layer thickness. Empty states and missing-property warnings.
- Lining thickness as the sum of user inputs; the shell is excluded. Cross-section is schematic, not to scale.
- Searchable/filterable materials library and material provenance inspector.
- Recharts temperature and concept-comparison plots, clearly labeled unvalidated.
- Deterministic mock analysis service, captured input fingerprint and stale-snapshot messaging.
- Optimization controls filter/sort predefined concepts; no new design is generated.
- `.xlsx` and `.xls` parsing, format/signature/size checks, first-sheet preview, column mapping and numeric validation.
- Downloadable example Excel workbook. No data is uploaded or used for training.
- Transparent report preview, JSON download and browser Print / Save as PDF.
- English interface with an EN toggle to show Persian translations on technical configuration and layer form labels. This is label assistance, not full localization.
- Accessible labels, keyboard focus, reduced-motion support, mobile navigation and print styling.
- Automated checks for furnace validation, layer state, project isolation, navigation, demo labels, mock invariance and Excel mapping.

## Architecture

```text
src/
  App.tsx                  Application shell, page loading, hash navigation
  components/              Shared panels, navigation, charts and wall section
  pages/                   Eight screen modules, loaded on demand
  store/useStore.ts        Typed Zustand state + browser persistence
  domain/types.ts          Furnace, materials, layers, results and API contracts
  data/materials.ts        Explicitly fictional material fixtures
  validation/furnace.ts    Zod input schema and related-field validation
  services/mockThermal.ts  Fixed results + ThermalEngine implementation
  services/excel.ts        Lazy Excel parsing and mapping checks
  services/report.ts       Portable JSON export
  tests/                   Behavioral checks
```

A future validated solver should implement the `ThermalEngine` interface. Replace the domain result contract to carry a genuine validation status and traceable model version before displaying validated output. Do not relabel the current fixtures as validated. Charts take result objects and do not contain the solver.

## Data handling and limitations

- Browser localStorage is local persistence, not a cloud database. Clearing browser data removes projects. JSON export is a download; JSON reimport is not implemented.
- Excel previews are held in page memory and cleared on navigation. The first worksheet only is inspected, up to 500 data rows and 10 MB per file; preview validation does not validate a full dataset. Formulas are not evaluated; source cells are displayed as text.
- Required columns: furnace ID, operating temperature (°C), lining thickness (mm). Shell temperature (°C) and heat flux (W/m²) are optional. Mapping does not convert units or prove engineering validity.
- Workbook parser is lazy-loaded and only processes a user-selected local file. Parser hardening, larger-file streaming and dependency security review remain required before production use with untrusted datasets.
- The listed conductivity has no temperature basis, uncertainty or supplier certification. No physical suitability checks can be inferred.
- Demo heat flux, shell temperature, resistance, loss and profile are intentionally independent of user inputs. “Run demo” refreshes the snapshot metadata, not a calculation.
- Candidate scores and costs are fixed illustrative values. Comparisons are not engineering recommendations.
- No user authentication inside the static app, server storage, collaboration, remote APIs, unit conversion, ML, transients or numerical simulation.

## Pending engineering work

1. Collect verified supplier datasheets and operating data, with units and temperature-dependent properties.
2. Specify geometry, convection, radiation, contact resistance and boundary-condition assumptions.
3. Build a validated thermal service and benchmark against analytical/reference cases.
4. Obtain qualified engineering review of material compatibility, safety and construction requirements.
5. Add constrained optimization after the solver is verified.
6. Establish provenance, data quality, train/test separation and model validation before ML.
7. Add full localization, production data management and dedicated server-generated reports if needed.

## Visual reference

Based on the reference image supplied in the conversation: dark navy workspace, cyan panel borders, warm refractory layers, thermal profile, material records and compact engineering indicators. The 2D wall view is implemented with CSS and supports the actual editable layer list.
