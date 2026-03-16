-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Admin', 'Supervisor', 'Operator', 'Guest')),
  status TEXT NOT NULL CHECK (status IN ('Active', 'Inactive', 'Pending')),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid recursion errors from old versions
DROP POLICY IF EXISTS "Allow public read access" ON users;
DROP POLICY IF EXISTS "Allow public insert access" ON users;
DROP POLICY IF EXISTS "Allow public update access" ON users;
DROP POLICY IF EXISTS "Allow public delete access" ON users;
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Admins can read all data" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Create policies (Simplified for development/demo)
-- In production, these should be tied to auth.uid()
CREATE POLICY "Allow public read access" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON users
  FOR DELETE USING (true);
