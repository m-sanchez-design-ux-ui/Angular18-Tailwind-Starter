# Angular + Tailwind Backoffice Starter Kit

> **Portfolio demo.** This is a personal fork of a real starter kit I
> worked on as UI Designer & UI Developer at Origin Solutions. The
> original backend and git history are not included here — this fork
> runs standalone, without any real backend.

## About this project

A reusable Angular + Tailwind CSS starter kit for backoffice-style admin
panels: authentication flow, dashboard shell, a UI Kit page showcasing the
design system's components, grids, cards, dark mode, and a profile/help
section — meant as a base for new internal projects rather than a
client-specific product.

**My role:** UI Designer & UI Developer — design in Figma, and the
front-end implementation in Angular (this repo), including the reusable
component library and design system.

**Stack:** Angular 18 (standalone components), Tailwind CSS, Flowbite.

## What's different in this fork

Authentication is the only part of this starter that talks to a real
backend — every other screen is a self-contained UI showcase, exactly as
in the original project. So the only demo-only addition here is:

- **`src/app/shared/services/mock-api.interceptor.ts`** — intercepts the
  auth endpoints (login, refresh, logout, password reset/change) and
  answers them locally instead of reaching a real server.
- **`src/app/shared/mocks/mock-data.ts`** — builds a fake (but
  correctly-shaped) JWT for the mocked login response, since the app
  decodes the token client-side to read the user's role.
- The real Google reCAPTCHA on the login and password screens was
  removed, since it's tied to a specific verified domain and would break
  as soon as the app is deployed elsewhere.

No other code was changed — the rest of the starter kit behaves exactly
as it did originally.

## Running it locally

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

**Login:** any email with a valid format and any password with 4+
characters will work.

## What you can try

- **Login** (`/auth/signin`) — fake login, no real backend needed.
- **Dashboard** (`/dashboard`)
- **UI Kit / component library** (`/starter-kit/template-components`)
- **Grids** (`/starter-kit/grids`)
- **Cards** (`/starter-kit/template-cards`)
- **Dark mode demo** (`/starter-kit/dark-mode-demo`)
- **Profile** (`/profile`) and **Help** (`/help`)
- Error pages: `/error-404`, `/error-500`

## Code quality

This fork went through a full linting/testing pass on top of the demo
fixes above:

- **ESLint + Prettier** configured (`npm run lint`, `npm run format`) —
  0 errors, with the small remaining set of `any`-type warnings kept as
  visible, tracked technical debt rather than silenced.
- **`ChangeDetectionStrategy.OnPush`** added to a few safe, purely
  presentational components (`error-404`, `error-500`, `breadcrumb`).
  A couple of components that mutate state outside Angular's normal
  change detection (imperative chart updates, a manual RxJS subscription)
  were deliberately left on the default strategy, since OnPush there
  would have silently broken real behavior without also wiring
  `markForCheck()`.
- **Real unit tests** added for the demo's own code (`MockApiInterceptor`,
  the fake JWT builder) and for a few existing pure functions/validators
  that had none (`isValidEmail`, `isValidEmailValidator`, `MustMatch`).
- Fixed several **pre-existing issues** found along the way: a handful of
  broken imports/references that silently blocked the whole test suite
  from ever compiling, a stray duplicate spec file, and leftover strings
  from other client projects this starter kit was copied from.
- `npm test` runs the full suite headlessly and passes clean (52/52).

## Notes

- `npm run build` produces a production build with no dependency on the
  original backend or any external service.

---
Miguel Sánchez — UX/UI Designer & UI Developer
m.sanchez.visual@gmail.com · linkedin.com/in/m-sanchez-murillo
