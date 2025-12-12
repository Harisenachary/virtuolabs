-- Supabase Database Schema Setup
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- 1. Create user_profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  average_score DECIMAL(10, 2) DEFAULT 0,
  total_experiments INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create experiments table
CREATE TABLE IF NOT EXISTS experiments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  experiment_id TEXT NOT NULL REFERENCES experiments(id),
  experiment_title TEXT NOT NULL,
  score DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_experiment_id ON user_progress(experiment_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for user_profiles
-- Users can only read their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 7. Create RLS policies for experiments (public read access)
CREATE POLICY "Experiments are viewable by everyone" ON experiments
  FOR SELECT USING (true);

-- 8. Create RLS policies for user_progress
-- Users can only view their own progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 9. Insert default experiments
INSERT INTO experiments (id, title, category) VALUES
  ('simple-pendulum', 'Simple Pendulum', 'Physics'),
  ('energy-gap', 'Energy Gap of P-N Junction', 'Physics'),
  ('iv-characteristics', 'I-V Characteristics', 'Electrical'),
  ('titration', 'Acid-Base Titration', 'Chemistry'),
  ('free-fall', 'Free Fall Motion', 'Physics'),
  ('projectile-motion', 'Projectile Motion', 'Physics'),
  ('circuit-analysis', 'AC Circuit Analysis', 'Electrical'),
  ('rlc-resonance', 'RLC Resonance', 'Electrical'),
  ('op-amp', 'Op-Amp Amplifier', 'Electrical'),
  ('hookes-law', 'Hooke''s Law', 'Physics'),
  ('lens-optics', 'Lens Optics', 'Physics'),
  ('pid-control', 'PID Control Tuning', 'Advanced')
ON CONFLICT (id) DO NOTHING;

-- 10. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 11. Create trigger for user_profiles updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: The service role key bypasses RLS, which is why we use it in the backend server
-- This allows the server to perform admin operations like creating users and managing all data

-- ==========================================
-- ADDITIONS FOR ANALYTICS & PROGRESS TRACKING
-- ==========================================

-- 12. Add Activity Tracking Columns to user_progress
ALTER TABLE user_progress 
ADD COLUMN IF NOT EXISTS simulation_started_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS simulation_completed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS simulation_time_spent INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS simulation_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS quiz_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS quiz_best_score INTEGER,
ADD COLUMN IF NOT EXISTS quiz_best_percentage DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS first_accessed_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS total_time_spent INTEGER DEFAULT 0;

COMMENT ON COLUMN user_progress.simulation_time_spent IS 'Total time spent in simulation view (seconds)';
COMMENT ON COLUMN user_progress.total_time_spent IS 'Total time spent on this experiment across all activities (seconds)';

CREATE INDEX IF NOT EXISTS idx_user_progress_user_experiment 
ON user_progress(user_id, experiment_id);

-- 13. Create session_tracking table
CREATE TABLE IF NOT EXISTS session_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_start TIMESTAMP DEFAULT NOW(),
  session_end TIMESTAMP,
  duration INTEGER, 
  experiments_accessed TEXT[],
  quizzes_taken INTEGER DEFAULT 0,
  activities_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_tracking_user_id ON session_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_session_tracking_session_start ON session_tracking(session_start DESC);

ALTER TABLE session_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON session_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON session_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON session_tracking
  FOR UPDATE USING (auth.uid() = user_id);

-- 14. Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  experiment_id VARCHAR(100),
  metadata JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  session_id UUID REFERENCES session_tracking(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_timestamp ON activity_log(timestamp DESC);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activity" ON activity_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

