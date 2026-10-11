-- SGC Reboot: Supabase Database Schema
-- Run this in your Supabase SQL Editor to initialize the database tables.

-- 1. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT NOT NULL,
  year TEXT NOT NULL,
  image TEXT NOT NULL,
  linkedin TEXT,
  category TEXT NOT NULL CHECK (category IN ('Office Bearer', 'Lead & Handler', 'Committee Member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS & Public Read Access
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);

-- 2. ALUMNI TABLE
CREATE TABLE IF NOT EXISTS alumni (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  former_role TEXT NOT NULL,
  current_designation TEXT NOT NULL,
  company_or_institution TEXT NOT NULL,
  package_or_honor TEXT,
  image TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  batch TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on alumni" ON alumni FOR SELECT USING (true);

-- 3. DAILY SESSIONS TABLE
CREATE TABLE IF NOT EXISTS daily_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  week_number INT NOT NULL,
  title TEXT NOT NULL,
  session_date TEXT NOT NULL,
  session_time TEXT NOT NULL,
  handler TEXT NOT NULL,
  domain TEXT NOT NULL,
  overview TEXT NOT NULL,
  image TEXT,
  status TEXT NOT NULL DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE daily_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on daily_sessions" ON daily_sessions FOR SELECT USING (true);
