-- Core Entities for SmartPort Dashboard

-- 1. Berths Table
CREATE TABLE IF NOT EXISTS berths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('Available', 'Occupied', 'Maintenance')),
  capacity_tonnage INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Vessels Table
CREATE TABLE IF NOT EXISTS vessels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vessel_id TEXT NOT NULL UNIQUE, -- e.g., 'V-102'
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  eta TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('Approaching', 'Scheduled', 'Delayed', 'At Berth', 'Departed')),
  berth_id UUID REFERENCES berths(id),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Cargo Manifests Table
CREATE TABLE IF NOT EXISTS cargo_manifests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manifest_id TEXT NOT NULL UNIQUE, -- e.g., 'M-1024'
  vessel_id UUID REFERENCES vessels(id),
  type TEXT NOT NULL,
  weight_kg NUMERIC NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'Delayed')),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Operations Table
CREATE TABLE IF NOT EXISTS operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- e.g., 'Vessel Arrival', 'Cargo Loading'
  name TEXT NOT NULL, -- e.g., 'MSC Isabella', 'Terminal 4 - Block B'
  status TEXT NOT NULL,
  severity TEXT DEFAULT 'low',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE berths ENABLE ROW LEVEL SECURITY;
ALTER TABLE vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE cargo_manifests ENABLE ROW LEVEL SECURITY;
ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Public Access Policies (Development)
CREATE POLICY "Public Read Berths" ON berths FOR SELECT USING (true);
CREATE POLICY "Public Read Vessels" ON vessels FOR SELECT USING (true);
CREATE POLICY "Public Read Cargo" ON cargo_manifests FOR SELECT USING (true);
CREATE POLICY "Public Read Operations" ON operations FOR SELECT USING (true);
CREATE POLICY "Public Read Alerts" ON alerts FOR SELECT USING (true);

CREATE POLICY "Public Manage Berths" ON berths FOR ALL USING (true);
CREATE POLICY "Public Manage Vessels" ON vessels FOR ALL USING (true);
CREATE POLICY "Public Manage Cargo" ON cargo_manifests FOR ALL USING (true);
CREATE POLICY "Public Manage Operations" ON operations FOR ALL USING (true);
CREATE POLICY "Public Manage Alerts" ON alerts FOR ALL USING (true);

-- Seed Data
INSERT INTO berths (name, status) VALUES 
('Berth 01', 'Available'),
('Berth 02', 'Available'),
('Berth 03', 'Maintenance'),
('Berth 04', 'Occupied')
ON CONFLICT DO NOTHING;
