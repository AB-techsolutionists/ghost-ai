installHook.js:1 Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview
overrideMethod @ installHook.js:1
editor:1 The resource https://expert-lamprey-30.clerk.accounts.dev/npm/@clerk/ui@1/dist/ui.browser.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
editor:1 The resource https://expert-lamprey-30.clerk.accounts.dev/npm/@clerk/ui@1/dist/ui.browser.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.
editor:1 The resource https://expert-lamprey-30.clerk.accounts.dev/npm/@clerk/ui@1/dist/ui.browser.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.

why do i have these in browser console? 

also, when trying oauth login, the long link and white page still appears for 1 sec and then takes me to /editor and my terminal still shows this

> ghost-ai@0.1.0 dev
> next dev --webpack

▲ Next.js 16.2.10 (webpack)
- Local:         http://localhost:3000
- Network:       http://192.168.100.7:3000
- Environments: .env.local
✓ Ready in 500ms

Attention: Clerk collects telemetry data from its SDKs when connected to development instances.
The data collected is used to inform Clerk's product roadmap.
To learn more, including how to opt-out from the telemetry program, visit: https://clerk.com/docs/telemetry.

○ Compiling /editor ...
 GET /editor 200 in 5.6s (next.js: 4.5s, proxy.ts: 741ms, application-code: 268ms)
[browser] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (https://expert-lamprey-30.clerk.accounts.dev/npm/@clerk/clerk-js@6/dist/clerk.browser.js:12:6133)
 POST /editor 200 in 66ms (next.js: 3ms, proxy.ts: 20ms, application-code: 42ms)
  └─ ƒ invalidateCacheAction() in 11ms ..//node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js
 GET /sign-in 200 in 2.0s (next.js: 1900ms, proxy.ts: 20ms, application-code: 85ms)
 GET /sign-in 200 in 287ms (next.js: 240ms, proxy.ts: 17ms, application-code: 30ms)
 GET /sign-in/SignIn_clerk_catchall_check_1783089139833 200 in 294ms (next.js: 20ms, proxy.ts: 13ms, application-code: 261ms)
 GET /sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F.well-known%2Fappspecific%2Fcom.chrome.devtools.json 200 in 66ms (next.js: 9ms, proxy.ts: 12ms, application-code: 44ms)
 GET /sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F.well-known%2Fappspecific%2Fcom.chrome.devtools.json 200 in 90ms (next.js: 12ms, proxy.ts: 23ms, application-code: 55ms)
 GET / 307 in 1239ms (next.js: 955ms, proxy.ts: 10ms, application-code: 274ms)
 GET /editor 200 in 89ms (next.js: 11ms, proxy.ts: 8ms, application-code: 71ms)
[browser] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (https://expert-lamprey-30.clerk.accounts.dev/npm/@clerk/clerk-js@6/dist/clerk.browser.js:12:6133)
 POST /editor 200 in 82ms (next.js: 3ms, proxy.ts: 10ms, application-code: 69ms)
  └─ ƒ invalidateCacheAction() in 14ms ..//node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js
 GET /sign-in 200 in 67ms (next.js: 18ms, proxy.ts: 15ms, application-code: 33ms)
 GET /sign-in 200 in 109ms (next.js: 65ms, proxy.ts: 13ms, application-code: 30ms)
 GET /sign-in/SignIn_clerk_catchall_check_1783089176075 200 in 113ms (next.js: 11ms, proxy.ts: 15ms, application-code: 88ms)
 GET / 307 in 62ms (next.js: 7ms, proxy.ts: 9ms, application-code: 46ms)
 GET /editor 200 in 43ms (next.js: 2ms, proxy.ts: 7ms, application-code: 34ms)
[browser] Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview (https://expert-lamprey-30.clerk.accounts.dev/npm/@clerk/clerk-js@6/dist/clerk.browser.js:12:6133)
 GET /editor 200 in 32ms (next.js: 4ms, proxy.ts: 8ms, application-code: 20ms)

 ---

## Resolution

### Preload warnings (3× `ui.browser.js`)
Clerk injects `<link rel="preload">` for the UI bundle eagerly. `<UserButton>` loads the UI lazily (on popover open). The browser thinks the preload wasn't used because it fires a few seconds after `load` — but it IS used on first interaction. **Purely cosmetic, ignore.**

### Dev keys warning
Clerk always prints this with `pk_test_*` keys in development mode. **Cosmetic, ignore.**

### OAuth white-page flash
**Root cause**: Old `page.tsx` was a server component calling `auth()` + `redirect()`. During OAuth handshake, the browser hit `/?__clerk_handshake=...`, waited ~1s for the server to call `auth()` and fire a 307 redirect to `/editor`, showing a white page during the wait.

**Fix applied**:
1. Converted `app/page.tsx` to `"use client"` — uses `useAuth()` + `router.replace()` client-side
2. Shows a branded loading shell (centered "GHOST AI" + pulsing dot) while Clerk initializes
3. Eliminates the server-side 307 redirect round-trip entirely
4. `afterSignOutUrl` moved from `<UserButton>` (invalid — `UserButtonProps` lacks it) to `<ClerkProvider>` (valid — part of `ClerkOptions` via `AfterSignOutUrl` type)

**Remaining**: Any residual flash is the time Clerk JS takes to boot from CDN (~200-400ms). This is inherent to Clerk's multi-domain handshake and will be faster in production.