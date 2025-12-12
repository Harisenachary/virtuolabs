-- Migration: Create session_tracking table
-- File: 002_create_session_tracking.sql

-- Create session tracking table to log user sessions
CREATE TABLE IF NOT EXISTS session_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_start TIMESTAMP DEFAULT NOW(),
  session_end TIMESTAMP,
  duration INTEGER, -- Duration in seconds
  experiments_accessed TEXT[], -- Array of experiment IDs accessed during session
  quizzes_taken INTEGER DEFAULT 0,
  activities_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_session_tracking_user_id ON session_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_session_tracking_session_start ON session_tracking(session_start DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE session_tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own sessions
CREATE POLICY "Users can view own sessions" ON session_tracking
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own sessions
CREATE POLICY "Users can insert own sessions" ON session_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own sessions
CREATE POLICY "Users can update own sessions" ON session_tracking
  FOR UPDATE USING (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE session_tracking IS 'Tracks individual user login sessions and activity';
COMMENT ON COLUMN session_tracking.duration IS 'Session duration in seconds';
COMMENT ON COLUMN session_tracking.experiments_accessed IS 'Array of experiment IDs user interacted with during session';
