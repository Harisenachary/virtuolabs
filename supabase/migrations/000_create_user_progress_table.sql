-- Migration: Create user_progress table (Base Table)
-- File: 000_create_user_progress_table.sql
-- Run this FIRST before other migrations

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  experiment_id VARCHAR(100) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  last_accessed TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Ensure one record per user per experiment
  UNIQUE(user_id, experiment_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_experiment_id ON user_progress(experiment_id);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own progress
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Add comments
COMMENT ON TABLE user_progress IS 'Tracks student progress across all experiments';
COMMENT ON COLUMN user_progress.experiment_id IS 'ID of the experiment (e.g., simple-pendulum, energy-gap)';
COMMENT ON COLUMN user_progress.completed IS 'Whether student has completed this experiment';
COMMENT ON COLUMN user_progress.score IS 'Overall score/progress for this experiment';
