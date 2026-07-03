# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 01: Design System & UI Primitives ✅
- Feature 02: Editor Shell ✅
- Feature 03: Authentication ✅

## Current Goal

- Clerk auth is wired and stable.

## Completed

### Feature 01 — Design System & UI Primitives
- Scaffolded Next.js 16.2.10 with TypeScript, Tailwind v4, App Router
- Initialized shadcn/ui with `base-nova` style (uses `@base-ui/react`, not Radix)
- Installed `lucide-react` for icons
- Created `lib/utils.ts` with `cn()` helper
- Added 7 UI primitives: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea
- Themed `globals.css` with ghost-ai dark-only palette (no light mode)

### Feature 02 — Editor Shell
- `components/editor/editor-navbar.tsx` — fixed top bar with sidebar toggle (`PanelLeftOpen`/`PanelLeftClose` icons), dark bg + bottom border
- `components/editor/project-sidebar.tsx` — floating slide-in from left, Projects title + close button, shadcn Tabs (My Projects / Shared) with empty placeholders, full-width New Project button with Plus icon
- Verified Dialog pattern: existing `Dialog` supports title (`DialogTitle`), description (`DialogDescription`), footer actions (`DialogFooter`), and uses globals.css color tokens

### Feature 03 — Authentication (Clerk)
- Installed `@clerk/ui` and wrapped root layout with `ClerkProvider` using Clerk's `dark` theme, `ui={ui}`, and CSS variable overrides (no hardcoded colors)
- Created `proxy.ts` (Next.js v16, replaces `middleware.ts`) with `clerkMiddleware`, `createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])`, `signInUrl`/`signUpUrl` options, and `/__clerk/(.*)` in matcher
- Auth pages as optional catch-all routes (`[[...rest]]/page.tsx`) — required by Clerk's `<SignIn>`/`<SignUp>` for internal sub-path routing (forgot-password, factor-one, etc.)
- Auth layout: 50/50 split — left panel (`bg-elevated`) with GHOST AI logo, heading, description, 3 feature rows with icons; right panel (`bg-base`) with centered Clerk form. Small screens: form only.
- Environment variables: `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`, `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT=/editor`, `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT=/editor`
- Editor page (`app/editor/page.tsx`) with `<UserButton>` in the navbar right section

### Auth Fixes & Polish
- Moved `afterSignOutUrl="/sign-in"` from `<UserButton>` (invalid — `UserButtonProps` only has `showName`, `defaultOpen`, `userProfileUrl`, `userProfileMode`) to `<ClerkProvider>` (valid — `AfterSignOutUrl` is part of `ClerkOptions`)
- Converted `app/page.tsx` from server component (`auth()` + `redirect()`) to client component (`useAuth()` + `router.replace()`) — eliminates the 307 redirect round-trip during OAuth handshake, shows branded loading shell instead of white page

## In Progress

- None yet.

## Next Up

- Define the next feature.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- shadcn/ui `base-nova` style chosen (uses Base UI components instead of Radix).
- Dark-only theme: all CSS variables are set to ghost-ai palette values (no light mode).
- Custom CSS properties from `ui-context.md` mapped to Tailwind utility classes via `@theme inline`.

## Session Notes

- Next.js 16.2.10 scaffolded with TypeScript, Tailwind v4, App Router.
- shadcn/ui initialized. Components use `@base-ui/react` (new default).
- Notable: Next.js v16 uses Turbopack by default, requires async request APIs, and renames `middleware.ts` to `proxy.ts`.
- `components/ui/*` files should NOT be modified (per spec).
- The workspace root warning about multiple lockfiles may need `turbopack.root` in next.config.ts.
