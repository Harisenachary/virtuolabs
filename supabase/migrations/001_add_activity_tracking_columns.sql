-- Migration: Add Activity Tracking Columns to user_progress
-- File: 001_add_activity_tracking_columns.sql

-- Add new columns to user_progress table for comprehensive tracking
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

-- Add comment for documentation
COMMENT ON COLUMN user_progress.simulation_time_spent IS 'Total time spent in simulation view (seconds)';
COMMENT ON COLUMN user_progress.total_time_spent IS 'Total time spent on this experiment across all activities (seconds)';
COMMENT ON COLUMN user_progress.quiz_best_score IS 'Best quiz score achieved (number correct out of total)';
COMMENT ON COLUMN user_progress.quiz_best_percentage IS 'Best quiz percentage achieved';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_progress_user_experiment 
ON user_progress(user_id, experiment_id);
