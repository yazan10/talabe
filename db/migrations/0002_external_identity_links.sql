-- Optional Waseeti identity linking for existing Talabe accounts.
-- Additive only: no existing account, role, verification, or approval is modified.
-- Linking endpoints must enforce the management-approved account state before inserting rows.
CREATE TABLE IF NOT EXISTS external_identity_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  issuer text NOT NULL CHECK (length(trim(issuer)) BETWEEN 1 AND 500),
  subject text NOT NULL CHECK (length(trim(subject)) BETWEEN 1 AND 500),
  provider text NOT NULL DEFAULT 'waseeti' CHECK (provider = 'waseeti'),
  linked_at timestamptz NOT NULL DEFAULT now(),
  unlinked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT external_identity_links_provider_subject_unique UNIQUE (provider, issuer, subject)
);

-- Prevent multiple Waseeti identities being attached to one Talabe account.
CREATE UNIQUE INDEX IF NOT EXISTS external_identity_links_one_waseeti_per_user
  ON external_identity_links(user_id, provider)
  WHERE unlinked_at IS NULL;

CREATE INDEX IF NOT EXISTS external_identity_links_user_idx
  ON external_identity_links(user_id);

CREATE TABLE IF NOT EXISTS external_identity_link_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider = 'waseeti'),
  event_type text NOT NULL CHECK (event_type IN ('link_started','linked','unlinked','link_failed')),
  issuer text,
  subject text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS external_identity_link_events_user_created_idx
  ON external_identity_link_events(user_id, created_at DESC);
