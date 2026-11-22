# Talabe Optional WasiTi Account Linking Release Checklist

## Product behavior
- [ ] Local Talabe registration/login remain unchanged.
- [ ] Read the authoritative management-approval status from the existing Talabe DB before offering link.
- [ ] Pending/unapproved accounts cannot initiate linking.
- [ ] Approved accounts see optional linking under security/account settings.
- [ ] User authenticates at WasiTi and consents; Talabe never collects central or Google passwords.
- [ ] Link is bound to immutable issuer + subject, not email matching.
- [ ] Link status and unlink action are available; unlink does not delete either account.
- [ ] Central identity never changes local role, driver verification, company permissions or approval.

## Backend/security
- [ ] Provider issuer and discovery metadata verified against production deployment.
- [ ] OIDC code flow + PKCE S256, state/nonce, exact redirect URI, backend exchange.
- [ ] Validate signature, issuer, audience, expiry and nonce; reject reused codes.
- [ ] Database link table unique on issuer+subject and local user+issuer; migration reviewed/backed up.
- [ ] CSRF/rate limit/audit/revocation implemented; secrets server-only.
- [ ] Tests include unapproved user, spoofed callback, invalid state, replay, duplicate links, unlink.

## Required configuration
Server environment only: WASEETI_ISSUER, WASEETI_CLIENT_ID, WASEETI_CLIENT_SECRET, WASEETI_REDIRECT_URI, WASEETI_API_BASE. Obtain real values from WasiTi provider; never put secret values in Git.

## Current status
Talabe's existing authentication routes are phone/password. This checklist is not implementation. Linking must remain unavailable until approval status is confirmed from the actual schema, the provider is implemented, credentials are configured, and the flow is tested and deployed.