# Supabase Setup Instructions

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://ksilqbnsyeqkcbcijein.supabase.co
2. Click on the **SQL Editor** in the left sidebar
3. Click **New Query**

## Step 2: Run the Schema

1. Open the file `supabase_schema.sql` from your project root
2. Copy the entire SQL content
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl/Cmd + Enter)

This will create:
- ✅ `rooms` table - Stores user rooms (bedroom, kitchen, etc.)
- ✅ `devices` table - Stores devices added to each room
- ✅ `bill_history` table - Stores monthly bill snapshots for comparison
- ✅ Indexes for performance optimization
- ✅ Row Level Security policies (currently allowing public access)

## Step 3: Verify Tables Created

1. Go to **Table Editor** in the left sidebar
2. You should see three new tables:
   - `rooms`
   - `devices`
   - `bill_history`

## How It Works

### Automatic Syncing
- **When you add a room**: Saved to Supabase immediately
- **When you add a device**: Saved to Supabase immediately
- **When you save a bill**: Saved to Supabase immediately
- **On app load**: Data is loaded from Supabase automatically

### User Identification
- Each browser gets a unique `user_id` stored in localStorage
- This allows multiple users to use the app without conflicts
- Data persists across browser sessions

### Fallback to LocalStorage
- If Supabase connection fails, data is saved to localStorage
- When Supabase is back online, you can manually sync by refreshing

## Database Structure

### Rooms Table
```
id (TEXT) - Unique room identifier
user_id (TEXT) - Browser/user identifier
name (TEXT) - Room name (e.g., "Living Room")
icon (TEXT) - Emoji icon
created_at (TIMESTAMP) - Creation timestamp
```

### Devices Table
```
id (TEXT) - Unique device identifier
room_id (TEXT) - Foreign key to rooms
name (TEXT) - Device name
brand (TEXT) - Brand name
wattage (INTEGER) - Power consumption in watts
hours_per_day (REAL) - Usage hours per day
category (TEXT) - Device category
is_custom (BOOLEAN) - Whether user created custom device
created_at (TIMESTAMP) - Creation timestamp
```

### Bill History Table
```
id (TEXT) - Unique snapshot identifier
user_id (TEXT) - Browser/user identifier
timestamp (BIGINT) - Unix timestamp
month (TEXT) - Month name (e.g., "November 2025")
total_cost (REAL) - Total monthly cost
total_units (REAL) - Total kWh consumed
total_co2 (REAL) - Total CO2 emissions
device_count (INTEGER) - Number of devices
rooms (JSONB) - Snapshot of all rooms and devices
state (TEXT) - Indian state selected
rate_per_unit (REAL) - Electricity rate
created_at (TIMESTAMP) - Creation timestamp
```

## Security Note

⚠️ **Current Setup**: Tables allow public read/write access for simplicity.

🔒 **For Production**: You should:
1. Enable Supabase Authentication
2. Update RLS policies to restrict access by authenticated user
3. Replace `user_id` generation with actual Supabase auth user IDs

## Troubleshooting

### Data not syncing?
1. Check browser console for errors
2. Verify Supabase project URL and API key in `src/lib/supabase.ts`
3. Check Supabase dashboard for any quota limits

### Want to reset data?
Run in SQL Editor:
```sql
DELETE FROM devices;
DELETE FROM rooms;
DELETE FROM bill_history;
```

### Check current data:
```sql
SELECT * FROM rooms;
SELECT * FROM devices;
SELECT * FROM bill_history ORDER BY timestamp DESC;
```
