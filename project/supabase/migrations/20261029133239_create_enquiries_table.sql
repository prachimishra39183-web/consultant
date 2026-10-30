/*
# Create enquiries table (public enquiry form)

1. New Tables
- `enquiries`
  - `id` (uuid, primary key)
  - `name` (text, required, max 120 chars)
  - `email` (text, required, max 255 chars)
  - `phone` (text, optional, max 30 chars)
  - `interest` (text, required: the package or service the visitor asked about, max 80 chars)
  - `message` (text, optional, max 2000 chars)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Row level security enabled on `enquiries`.
- Visitors (anon role) may only INSERT new enquiries. They cannot read, edit or delete any enquiry.
- Column-level checks in the insert policy keep field lengths within the limits above.
- Reading enquiries is reserved for the admin dashboard, which will be added later.

3. Notes
- No existing data is changed.
- The statement is idempotent and safe to re-run.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  interest text NOT NULL CHECK (char_length(interest) BETWEEN 1 AND 80),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND char_length(interest) BETWEEN 1 AND 80
  AND (message IS NULL OR char_length(message) <= 2000)
);
