-- Smart Energy Calculator - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  wattage INTEGER NOT NULL,
  hours_per_day REAL NOT NULL,
  category TEXT NOT NULL,
  is_custom BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bill_history table
CREATE TABLE IF NOT EXISTS bill_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  month TEXT NOT NULL,
  total_cost REAL NOT NULL,
  total_units REAL NOT NULL,
  total_co2 REAL NOT NULL,
  device_count INTEGER NOT NULL,
  rooms JSONB NOT NULL,
  state TEXT NOT NULL,
  rate_per_unit REAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooms_user_id ON rooms(user_id);
CREATE INDEX IF NOT EXISTS idx_devices_room_id ON devices(room_id);
CREATE INDEX IF NOT EXISTS idx_bill_history_user_id ON bill_history(user_id);
CREATE INDEX IF NOT EXISTS idx_bill_history_timestamp ON bill_history(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_history ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since we're using anonymous auth)
-- For production, you should implement proper authentication and user-specific policies

CREATE POLICY "Allow all operations on rooms" ON rooms
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on devices" ON devices
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on bill_history" ON bill_history
  FOR ALL USING (true) WITH CHECK (true);

-- Optional: Add comments for documentation
COMMENT ON TABLE rooms IS 'Stores user-created rooms (bedroom, kitchen, etc.)';
COMMENT ON TABLE devices IS 'Stores electrical devices added to rooms';
COMMENT ON TABLE bill_history IS 'Stores monthly bill snapshots for comparison';
