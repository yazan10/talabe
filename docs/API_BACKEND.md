# Talabe API — Neon Backend

The Vercel project uses the independent Neon PostgreSQL project **talabe**. The web app sends requests to same-origin `/api` functions. No browser code receives the database URL.

## Server environment variables
- `TALABE_DATABASE_URL`: Neon connection string (sensitive).
- `TALABE_ADMIN_KEY`: server-side driver verification key (sensitive).

## Authentication
- `POST /api/auth/register`: creates a user, driver profile, or company; bcrypt password hash; starts a 30-day HTTP-only session cookie.
- `POST /api/auth/login`: phone + password; starts session.
- `GET /api/auth/me`: current account/session.
- `POST /api/auth/logout`: revokes session.
Session cookies are HTTP-only, Secure, SameSite=Lax. Sessions are hashed in the database.

## Customers
- `GET /api/orders`: current user's order history.
- `POST /api/orders`: create delivery request; validates selected driver is online, verified, recently seen and below active-order limit. Delivery fees remain 0 until a real pricing rule/provider is configured; no fee is fabricated.
- `PATCH /api/orders/:id/status`: status transitions with role checks.
- `GET /api/drivers/available?governorate=...`: actual verified drivers online, heartbeat <3 minutes, ranked by distance when GPS is supplied, then rating.
- `GET/POST /api/addresses`, `PATCH/DELETE /api/addresses/:id`: account-owned saved addresses.
- `GET /api/follows`, `POST/DELETE /api/follows`: persisted following.
- `GET /api/ratings?targetId=...`, `POST /api/ratings`: persisted ratings and aggregate.
- `GET /api/notifications`, `PATCH /api/notifications/read`.
- `GET/PATCH /api/notifications/preferences`.
- `GET /api/wallet`: current balance and ledger.
- `GET/POST /api/payment-methods`, `DELETE /api/payment-methods/:id`: test card metadata only (last 4 digits), no payment processing.

## Drivers
- `PUT /api/drivers/presence`: driver sets online/offline and sends GPS heartbeat.
- Driver dashboard loads assigned orders and updates them through status API.
- A driver must be verified before appearing in the customer availability API.
- Driver license verification: `POST /api/admin/verify-driver` with `Authorization: Bearer <TALABE_ADMIN_KEY>`, body `{ "driverId": "<user UUID>", "verified": true }`. This key must only be used server-side or by an administrator; never put it in browser code.

## Companies
- `GET /api/company`: company information and real counts.
- `GET /api/employees`: company employee list.
- `POST /api/employees`: owner creates an employee or driver account, linking it to the company.
- `DELETE /api/employees/:userId`: owner removes the company link.

## Known limitations
This initial backend provides account/session and persistence for the core app. There is not yet a real payment gateway, subscription billing, push-notification delivery, company marketplace ordering, or an administrator UI. Driver verification requires an administrator action. Saved card records are demo metadata and are not charged.
