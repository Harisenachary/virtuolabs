# Supabase Backend Setup Guide

This guide will help you set up Supabase as the backend for VirtuoLabs.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js installed on your system

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the project details:
   - Name: `virtuolabs` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
4. Click "Create new project"
5. Wait for the project to be created (takes a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **service_role** key (under "Project API keys" > "service_role" - keep this secret!)

## Step 3: Set Up Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Supabase credentials:
   ```
   SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   PORT=4001
   ```

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `server/supabase-setup.sql`
4. Click "Run" to execute the SQL
5. Verify the tables were created by going to **Table Editor** - you should see:
   - `user_profiles`
   - `experiments`
   - `user_progress`

## Step 5: Install Dependencies

```bash
npm install
```

This will install:
- `@supabase/supabase-js` - Supabase JavaScript client
- `dotenv` - Environment variable management

## Step 6: Start the Server

```bash
npm run server
```

You should see:
```
API server running on http://localhost:4001
Using Supabase as database backend
```

## Database Schema

### Tables

1. **user_profiles**
   - `id` (UUID, primary key) - References auth.users
   - `name` (TEXT)
   - `email` (TEXT, unique)
   - `average_score` (DECIMAL)
   - `total_experiments` (INTEGER)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

2. **experiments**
   - `id` (TEXT, primary key)
   - `title` (TEXT)
   - `category` (TEXT)
   - `created_at` (TIMESTAMP)

3. **user_progress**
   - `id` (UUID, primary key)
   - `user_id` (UUID, foreign key to user_profiles)
   - `experiment_id` (TEXT, foreign key to experiments)
   - `experiment_title` (TEXT)
   - `score` (DECIMAL)
   - `created_at` (TIMESTAMP)

### Security

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- The backend uses the service_role key to bypass RLS for admin operations
- **Important**: Never expose the service_role key in client-side code!

## Migration from File-Based Storage

The API endpoints remain the same, so no frontend changes are required. The backend now uses Supabase instead of the `db.json` file.

## Troubleshooting

### "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"
- Make sure you created a `.env` file with the correct values
- Verify the file is in the project root directory

### "User already exists" error
- Supabase Auth handles user registration differently
- Check the Supabase dashboard > Authentication > Users to see existing users

### RLS Policy errors
- Make sure you ran the SQL setup script completely
- Check that RLS policies were created in Supabase dashboard > Authentication > Policies

## API Endpoints (Unchanged)

All endpoints work the same as before:
- `GET /health` - Health check
- `GET /experiments` - List all experiments
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /me` - Get current user (requires auth token)
- `GET /progress` - Get user progress (requires auth token)
- `POST /progress` - Save progress (requires auth token)

## Next Steps

- The `db.json` file is no longer needed (but kept for reference)
- All data is now stored in Supabase
- You can view and manage data in the Supabase dashboard

