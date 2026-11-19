-- Talabe independent PostgreSQL schema
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS users (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, phone text NOT NULL UNIQUE, email text UNIQUE,
 password_hash text NOT NULL, role text NOT NULL CHECK(role IN ('user','driver','company','employee')),
 avatar_url text, governorate_id text, region_id text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), is_active boolean NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS companies (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), owner_id uuid NOT NULL REFERENCES users(id), name text NOT NULL,
 type text NOT NULL CHECK(type IN ('restaurant','supermarket','shop','car_dealership','other')), address text, phone text, logo_url text,
 region_id text, subscription_active boolean NOT NULL DEFAULT false, rating numeric(3,2) NOT NULL DEFAULT 0, total_ratings integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS driver_profiles (
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, vehicle_type text NOT NULL CHECK(vehicle_type IN ('motorcycle','car','scooter','electric_bike')),
 vehicle_plate text, is_independent boolean NOT NULL DEFAULT true, company_id uuid REFERENCES companies(id) ON DELETE SET NULL, rating numeric(3,2) NOT NULL DEFAULT 0,
 total_deliveries integer NOT NULL DEFAULT 0, total_ratings integer NOT NULL DEFAULT 0, is_online boolean NOT NULL DEFAULT false, license_image_url text,
 license_verified boolean NOT NULL DEFAULT false, current_lat numeric(10,7), current_lng numeric(10,7), last_location_at timestamptz,
 active_orders integer NOT NULL DEFAULT 0, completed_today integer NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS company_employees (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE, user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 role text NOT NULL DEFAULT 'employee', created_at timestamptz DEFAULT now(), UNIQUE(company_id,user_id)
);
CREATE TABLE IF NOT EXISTS orders (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES users(id), company_id uuid REFERENCES companies(id), driver_id uuid REFERENCES users(id),
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','picked_up','on_the_way','delivered','cancelled')), items jsonb NOT NULL DEFAULT '[]',
 total_amount numeric(12,2) NOT NULL DEFAULT 0, delivery_fee numeric(12,2) NOT NULL DEFAULT 0, address text NOT NULL, region_id text, governorate_id text,
 destination_lat numeric(10,7), destination_lng numeric(10,7), notes text, contact_phone text, created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(), accepted_at timestamptz, delivered_at timestamptz
);
CREATE TABLE IF NOT EXISTS saved_addresses (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, label text NOT NULL, details text NOT NULL,
 address_type text NOT NULL DEFAULT 'other', is_default boolean NOT NULL DEFAULT false, latitude numeric(10,7), longitude numeric(10,7), created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS wallet_accounts (user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, balance numeric(12,2) NOT NULL DEFAULT 0, currency char(3) DEFAULT 'ILS', updated_at timestamptz DEFAULT now());
CREATE TABLE IF NOT EXISTS wallet_transactions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, amount numeric(12,2) NOT NULL, type text NOT NULL, description text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS ratings (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), rater_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, target_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, target_type text NOT NULL CHECK(target_type IN ('driver','company')), stars smallint NOT NULL CHECK(stars BETWEEN 1 AND 5), comment text, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(rater_id,target_id,target_type));
CREATE TABLE IF NOT EXISTS follows (follower_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, followed_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(follower_id,followed_id), CHECK(follower_id<>followed_id));
CREATE TABLE IF NOT EXISTS notifications (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, body text NOT NULL, data jsonb NOT NULL DEFAULT '{}'::jsonb, read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS subscriptions (id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, plan text NOT NULL, amount numeric(12,2) NOT NULL, status text NOT NULL, starts_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS sessions (id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash text NOT NULL UNIQUE, expires_at timestamptz NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS payment_methods (id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, type text NOT NULL, label text NOT NULL, details jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS user_preferences (user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, language text NOT NULL DEFAULT 'ar', appearance text NOT NULL DEFAULT 'light', haptics boolean NOT NULL DEFAULT true, profile_visible boolean NOT NULL DEFAULT true, show_phone boolean NOT NULL DEFAULT false, show_activity boolean NOT NULL DEFAULT true, login_alerts boolean NOT NULL DEFAULT true, notify_orders boolean NOT NULL DEFAULT true, notify_promotions boolean NOT NULL DEFAULT false, notify_messages boolean NOT NULL DEFAULT true, push_enabled boolean NOT NULL DEFAULT false, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS delivery_presence_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), driver_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, online boolean NOT NULL, latitude numeric(10,7), longitude numeric(10,7), created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS orders_customer_created_idx ON orders(customer_id,created_at DESC);
CREATE INDEX IF NOT EXISTS orders_driver_status_idx ON orders(driver_id,status);
CREATE INDEX IF NOT EXISTS orders_company_status_idx ON orders(company_id,status);
CREATE INDEX IF NOT EXISTS driver_profiles_online_idx ON driver_profiles(is_online,last_location_at);
CREATE INDEX IF NOT EXISTS ratings_target_idx ON ratings(target_id,target_type,created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_idx ON notifications(user_id,created_at DESC);
