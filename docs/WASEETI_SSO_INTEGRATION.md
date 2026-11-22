# Talabe ↔ WasiTi Optional Linking

WasiTi is the ecosystem identity center, but Talabe is independent. WasiTi is not required for registration or login.

## Flow
1. User registers through Talabe.
2. Talabe management confirms/approves their account using Talabe's own process.
3. Only after confirmed approval, settings offer optional Link WasiTi.
4. User authenticates at WasiTi, reviews consent and explicitly approves.
5. Server validates OIDC callback, stores immutable issuer+subject link, and keeps Talabe's own session.
6. Local role, approval and driver/company permissions remain unchanged. User may unlink without deleting either account.

## Rules
- Never auto-link by email, browser profile data or mere account existence.
- SSO cannot create/approve Talabe accounts or grant roles/driver verification/company access.
- Existing accounts remain independent; no passwords are shared or collected by Talabe for WasiTi/Google.
- OIDC Authorization Code + PKCE S256, state/nonce, strict issuer/audience/signature/expiry validation, exact HTTPS redirect, one-time code, backend exchange, explicit consent, minimal scopes, CSRF protection, rate limits, audit and revocation.
- Approval eligibility must be checked against the real Talabe management approval data; do not infer approval from role or registration.

## Server settings (proposed)
WASEETI_ISSUER, WASEETI_CLIENT_ID, WASEETI_CLIENT_SECRET (confidential only), WASEETI_REDIRECT_URI, WASEETI_API_BASE, WASEETI_WEBHOOK_SECRET. Never expose secrets in frontend.

## Contract endpoints (proposal)
GET /api/v1/identity/me; GET /api/v1/identity/connections; POST /api/v1/identity/connections; DELETE /api/v1/identity/connections/:platform.

## Status
Revised requirement is documented, but the Talabe approval schema and WasiTi provider must be inspected and implemented before linking can be safely activated. Talabe currently uses its local phone/password flow.