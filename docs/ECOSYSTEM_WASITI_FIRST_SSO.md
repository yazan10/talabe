# WasiTi-first ecosystem integration

This is the integration direction for **WasiTi, Talabe, and Taqqa only**. Wasla is explicitly out of scope.

## Authority and ownership
- **WasiTi is the primary platform and identity authority** for the ecosystem.
- Talabe and Taqqa are companion platforms with their own product workflows and permissions.
- Each platform keeps its own database and domain data. Do not merge databases or copy passwords.
- Existing users should be linked by immutable provider subject IDs, not email alone.

## Shared sign-in (SSO)
Use OAuth 2.0 / OpenID Connect Authorization Code flow with PKCE:
1. Talabe or Taqqa redirects to WasiTi's identity authorization endpoint.
2. The user authenticates in WasiTi (Google, WasiTi session, or email/password supported by WasiTi).
3. The identity provider returns a short-lived authorization code to the exact registered redirect URI.
4. The platform backend exchanges that code server-to-server and validates issuer, audience, state, nonce, PKCE, and signature.
5. The platform creates its own secure session cookie. Never accept identity assertions from browser-supplied profile fields.

No client secrets, signing keys, admin keys, or database credentials in browser code. Use HTTPS, HttpOnly, Secure, SameSite cookies, CSRF/state protections, token expiry, refresh-token rotation/revocation if refresh tokens are used, and auditable account-linking consent.

## Initial integration contract
- Identity: immutable WasiTi user ID (`sub`), issuer (`iss`), audience (`aud`), issued/expiry times; optional approved profile claims.
- Platform user mapping: unique `(issuer, subject)`; store local user ID and platform roles separately.
- Profile sync: opt-in/minimal fields only, with WasiTi as the source of shared profile fields.
- Authorization: per-platform scopes and roles. SSO does not automatically grant driver, merchant, service-provider, or admin roles.
- Events/webhooks: signed, timestamped, replay-protected, retryable; validate signature and event ID.

## Cross-platform responsibilities
- WasiTi: canonical identity, social/profile features, shared account security and account-linking controls.
- Talabe: delivery orders, drivers, companies, delivery status, addresses needed for delivery.
- Taqqa: service requests, service-provider profiles, offers/fulfillment (subject to Taqqa's actual features).
- Cross-platform calls must use server-to-server APIs with scoped credentials. Keep platform data private unless an endpoint explicitly allows sharing.

## Rollout plan
1. Locate and confirm the actual WasiTi and Taqqa repositories and current authentication implementations.
2. Implement WasiTi identity provider endpoints and client registrations; add Google OAuth only in WasiTi.
3. Add Talabe OIDC client, callback, session creation, local account mapping, logout/revocation.
4. Add Taqqa OIDC client and mapping with the same contract.
5. Add versioned APIs, signed webhooks, event idempotency, observability, rate limits, and abuse protection.
6. Test new sign-in, existing-account linking, email mismatch, duplicate users, revoked access, expiry, CSRF/state/nonce/PKCE, cross-platform role boundaries, and failure paths before production rollout.

## Status
Architecture notes only. SSO is **not yet implemented**. WasiTi and Taqqa repository locations must be confirmed before coding the identity provider or client integrations.