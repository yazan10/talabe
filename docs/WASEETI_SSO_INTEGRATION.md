# Talabe ↔ WasiTi Integration

WasiTi is the canonical identity provider for Talabe. Talabe keeps its delivery database, role model and own secure session cookie.

## Shared sign-in
- Primary: **Continue with WasiTi** using OIDC Authorization Code + PKCE S256.
- WasiTi account methods: existing WasiTi session, email/password and Google (when configured/enabled centrally).
- Talabe's existing phone/password login remains available during migration.
- Do not collect Google credentials in Talabe or accept profile data sent from the browser as proof of identity.
- Link accounts only with explicit consent/proof of control; never merge solely by matching email.

## Client setup (server-only environment)
- `WASEETI_ISSUER`: verified HTTPS WasiTi issuer/domain.
- `WASEETI_CLIENT_ID`: registered Talabe client ID.
- `WASEETI_CLIENT_SECRET`: only if the client is confidential; server-side only.
- `WASEETI_REDIRECT_URI`: exact Talabe callback URL.
- `WASEETI_API_BASE`: verified WasiTi API base URL.
- `WASEETI_WEBHOOK_SECRET`: signing secret for server-to-server events; never in browser.

## OIDC flow
1. Talabe server creates state, nonce and PKCE verifier/challenge; stores them in a short-lived secure session.
2. Redirect to WasiTi authorization endpoint with exact redirect URI, code response, scopes `openid profile email`, state, nonce, challenge and S256.
3. Callback validates state, exchanges code server-side and validates issuer, audience, signature, expiry, nonce and PKCE.
4. Map `issuer + subject` to a Talabe local account. If no mapping exists, create a Talabe account and require the user to choose/confirm Talabe role and required delivery-specific fields. Never auto-promote.
5. Create Talabe's own HttpOnly Secure SameSite session cookie and redirect to the requested safe local route.
6. Logout clears Talabe session; central logout/revocation behavior must be agreed and implemented.

## Platform API contract (proposal)
Talabe owns:
- `GET /api/v1/talabe/orders` — orders for the authenticated user.
- `GET /api/v1/talabe/driver/availability` — verified drivers only, with permitted location filtering.
- `POST /api/v1/talabe/orders` — create delivery order, with role and input validation.
- `GET /api/v1/talabe/companies/:id` — only approved public company fields.
- `POST /api/v1/talabe/events` — service-authenticated, signed/idempotent event intake.

WasiTi does not get blanket access to Talabe's delivery data. Cross-app data requires explicit scope, user consent and a server-side endpoint.

## Status
SSO client/API integration is not activated yet. Talabe currently authenticates through its own phone/password backend. This document is the contract for the implementation; production requires the central WasiTi provider endpoints, registered client/redirect URI, secret environment variables and end-to-end tests.