# Supabase Database Migrations for Activity Tracking

## Overview
This directory contains SQL migration files to set up comprehensive student activity tracking in Supabase.

## ⚠️ IMPORTANT: Run migrations in this order!

### 000_create_user_progress_table.sql (RUN THIS FIRST!)
Creates the base `user_progress` table:
- Basic tracking of user progress per experiment
- Includes completion status and scores
- RLS policies for user privacy

### 001_add_activity_tracking_columns.sql
Adds advanced tracking columns to `user_progress`:
- Simulation time tracking
- Quiz attempt tracking
- Best scores
- Timestamps

### 002_create_session_tracking.sql
Creates `session_tracking` table:
- Tracks login sessions
- Session duration
- Experiments accessed per session

### 003_create_activity_log.sql
Creates `activity_log` table:
- Detailed event logging
- Flexible metadata storage
- Links to sessions

## How to Apply Migrations

### Step-by-Step in Supabase Dashboard

1. **Go to Supabase SQL Editor** (you're already there!)

2. **Run Migration 000** (Base Table - REQUIRED FIRST)
   ```
   - Open: 000_create_user_progress_table.sql
   - Copy ALL the SQL code
   - Paste into SQL Editor
   - Click "Run" button
   - Wait for "Success" message
   ```

3. **Run Migration 001** (Add Columns)
   ```
   - Clear the editor
   - Open: 001_add_activity_tracking_columns.sql
   - Copy and paste
   - Click "Run"
   ```

4. **Run Migration 002** (Session Tracking)
   ```
   - Clear the editor
   - Open: 002_create_session_tracking.sql
   - Copy and paste
   - Click "Run"
   ```

5. **Run Migration 003** (Activity Log)
   ```
   - Clear the editor
   - Open: 003_create_activity_log.sql
   - Copy and paste
   - Click "Run"
   ```

## Verification

After running all migrations, verify:
```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_progress', 'session_tracking', 'activity_log');

-- Check user_progress columns
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'user_progress';
```

## Troubleshooting

**Error: "relation user_progress does not exist"**
- Solution: Run migration 000 first!

**Error: "column already exists"**
- Solution: That column was already added, skip to next migration

**Error: "permission denied"**
- Solution: Make sure you're logged into Supabase as the project owner

## Quick Single-File Option

If you prefer, I can create a single combined file with all migrations that you can run once.
