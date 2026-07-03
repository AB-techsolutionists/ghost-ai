Clerk is already installed and connected. Wire it into the Next.js app: provider, auth pages, redirects, route protection, and user menu.

## Design

Use Clerk’s `dark` theme from `@clerk/ui/themes` as the base.

Override Clerk appearance variables using the app’s existing CSS variables. Do not hardcode colors.

### Sign-in and sign-up pages:

- large screens: 50/50 two-panel layout
- left panel (`bg-elevated`): app logo at top-left, heading + description below, 3 feature rows with icon, title, and description
- right panel (`bg-base`): centered Clerk form
- small screens: form only (left panel hidden)
- no gradients
- no oversized hero sections
- no feature cards
- no scroll-heavy layouts

Keep the layout minimal and professional.

## Implementation

Wrap the root layout with `ClerkProvider` using Clerk’s `dark` theme and pass `ui={ui}` from `@clerk/ui`.

Create sign-in and sign-up pages using Clerk components (`SignIn` / `SignUp` from `@clerk/nextjs`). Must use catch-all route files: `/sign-in/[[...rest]]/page.tsx` and `/sign-up/[[...rest]]/page.tsx` — Clerk's components need the catch-all for internal routing (forgot password, etc.). Non-catch-all routes will throw a runtime error.

Use `proxy.ts` at the project root, not `middleware.ts`.

Pass `signInUrl` and `signUpUrl` to `clerkMiddleware` options. Include `/__clerk/(.*)` in the proxy matcher for Clerk Frontend API routing.

Define public routes using `createRouteMatcher` for `/sign-in(.*)` and `/sign-up(.*)` (the `(.*)` suffix is required to cover catch-all sub-paths). Protect everything else by default.

Set env vars:
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`

Update `/`:

- authenticated users redirect to `/editor`
- unauthenticated users redirect to `/sign-in`

Add Clerk’s built-in `UserButton` to the editor navbar right section for profile settings and logout.

Keep Clerk’s default user menu and profile flows intact. Do not rebuild or heavily customize Clerk internals.

Use existing Clerk env vars. Do not rename or invent new ones.

## Dependencies

install: @clerk/ui.

## Check When Done

- `proxy.ts` exists at the root with `signInUrl`/`signUpUrl` options and `/__clerk/(.*)` in matcher
- env vars `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` are set
- sign-in and sign-up pages use catch-all routes (`[[...rest]]`)
- `createRouteMatcher` patterns include `(.*)` suffix for catch-all coverage
- all routes are protected except public auth paths
- auth pages use CSS variables with no hardcoded colors
- `ClerkProvider` wraps the root layout
- `npm run build` passes