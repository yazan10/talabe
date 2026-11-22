# Talabe Ecosystem Linking Readiness

## Preserve local authentication
Talabe registration and phone/password login remain the source of the local account and session. Existing accounts must not be migrated or merged.

## Linking target
1. User creates Talabe account and remains on local login.
2. Management approves the account using a verified Talabe approval workflow.
3. Only then, Account > Privacy/Security shows optional Link Waseeti.
4. User authenticates with Waseeti, reads consent, and approves linking.
5. Talabe server validates callback and saves immutable issuer+subject mapping.
6. Unlink/revoke deletes only the link; it does not delete either account.

## Authorization boundaries
Waseeti identity must not grant Talabe roles, account approval, driver license verification, company membership, subscriptions, or permissions. Never match accounts automatically by email.

## Current verified code state
- Local phone/password API and sessions are present.
- Initial database schema has `users.is_active`, but no distinct management-approval column or workflow was confirmed in the inspected migration. Do not treat `is_active` as proof of approval.
- Privacy/Security screen has not yet been connected to account-linking APIs.
- No Talabe link table, callback, or backend exchange is verified.

## Release gates
Before enabling a link button, implement and test a real approval field/workflow, account-link schema, server-side provider exchange, explicit consent, state/nonce/PKCE or equivalent robust OAuth protections, exact callback validation, unlinking, audit logs, and deployment configuration. Preserve all existing account records.
