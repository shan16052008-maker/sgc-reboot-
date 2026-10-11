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
DROP POLICY IF EXISTS "Allow public read access on daily_sessions" ON daily_sessions;
CREATE POLICY "Allow public read access on daily_sessions" ON daily_sessions FOR SELECT USING (true);

-- 4. MEMBER PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  reg_no TEXT,
  department TEXT,
  role TEXT DEFAULT 'Trainee',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS: Public read, authenticated users can update only their own profile
DROP POLICY IF EXISTS "Allow public read access on profiles" ON profiles;
CREATE POLICY "Allow public read access on profiles" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow users to update own profile" ON profiles;
CREATE POLICY "Allow users to update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow users to insert own profile" ON profiles;
CREATE POLICY "Allow users to insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Automatic Profile Creation Trigger on Supabase Auth Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, reg_no, department, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'reg_no',
    NEW.raw_user_meta_data->>'department',
    COALESCE(NEW.raw_user_meta_data->>'role', 'Trainee')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
