-- Migration: Create activity_log table
-- File: 003_create_activity_log.sql

-- Create activity log table for detailed event tracking
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  experiment_id VARCHAR(100),
  metadata JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  session_id UUID REFERENCES session_tracking(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_timestamp ON activity_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_activity_type ON activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_log_experiment_id ON activity_log(experiment_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own activity logs
CREATE POLICY "Users can view own activity" ON activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own activity logs
CREATE POLICY "Users can insert own activity" ON activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add comments for documentation
COMMENT ON TABLE activity_log IS 'Detailed log of all user activities and interactions';
COMMENT ON COLUMN activity_log.activity_type IS 'Type of activity: simulation_start, simulation_end, quiz_start, quiz_complete, theory_view, etc.';
COMMENT ON COLUMN activity_log.metadata IS 'Flexible JSON field for activity-specific data like scores, parameters, etc.';

-- Common activity types (for reference):
-- 'simulation_start' - User opened a simulation
-- 'simulation_end' - User closed/left a simulation
-- 'simulation_run' - User clicked play/run in simulation
-- 'quiz_start' - User started a quiz
-- 'quiz_complete' - User completed and submitted a quiz
-- 'theory_view' - User viewed theory/procedure tab
-- 'parameter_change' - User changed simulation parameters
