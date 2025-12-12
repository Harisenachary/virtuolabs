require('dotenv').config()
const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcryptjs')

const PORT = process.env.PORT || 4001

// Check if Supabase is configured
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const useSupabase = supabaseUrl && supabaseServiceKey && 
                    !supabaseUrl.includes('your_supabase') && 
                    !supabaseServiceKey.includes('your_supabase')

let supabase = null
if (useSupabase) {
  try {
    const { createClient } = require('@supabase/supabase-js')
    supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log('✓ Using Supabase as database backend')
  } catch (err) {
    console.warn('⚠ Supabase client creation failed, falling back to file storage')
  }
}

// File-based storage (fallback)
const DB_PATH = path.join(__dirname, 'db.json')

function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    return { users: [], experiments: defaultExperiments() }
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch (err) {
    console.error('Failed to read db.json, resetting.', err)
    return { users: [], experiments: defaultExperiments() }
  }
}

function saveDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

function defaultExperiments() {
  return [
    { id: 'simple-pendulum', title: 'Simple Pendulum', category: 'Physics' },
    { id: 'energy-gap', title: 'Energy Gap of P-N Junction', category: 'Physics' },
    { id: 'iv-characteristics', title: 'I-V Characteristics', category: 'Electrical' },
    { id: 'titration', title: 'Acid-Base Titration', category: 'Chemistry' },
    { id: 'free-fall', title: 'Free Fall Motion', category: 'Physics' },
    { id: 'projectile-motion', title: 'Projectile Motion', category: 'Physics' },
    { id: 'circuit-analysis', title: 'AC Circuit Analysis', category: 'Electrical' },
    { id: 'rlc-resonance', title: 'RLC Resonance', category: 'Electrical' },
    { id: 'op-amp', title: 'Op-Amp Amplifier', category: 'Electrical' },
    { id: 'hookes-law', title: "Hooke's Law", category: 'Physics' },
    { id: 'lens-optics', title: 'Lens Optics', category: 'Physics' },
    { id: 'pid-control', title: 'PID Control Tuning', category: 'Advanced' }
  ]
}

// Initialize file-based storage if not using Supabase
let db = null
const sessions = new Map() // token -> userId (for file-based auth)

if (!useSupabase || !supabase) {
  db = loadDb()
  console.log('✓ Using file-based storage (db.json)')
  console.log('  To use Supabase, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env')
}

const app = express()
app.use(cors())
app.use(express.json())

// Auth middleware - handles both Supabase JWT and file-based tokens
async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || ''
  const [, token] = auth.split(' ')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (useSupabase && supabase) {
    // Supabase authentication
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token)
      if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError || !profile) {
        return res.status(401).json({ error: 'User profile not found' })
      }

      req.user = {
        id: user.id,
        email: user.email,
        ...profile
      }
      next()
    } catch (err) {
      console.error('Auth middleware error:', err)
      return res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    // File-based authentication
    if (!sessions.has(token)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const userId = sessions.get(token)
    const user = db.users.find(u => u.id === userId)
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = user
    next()
  }
}

// Health check
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    database: useSupabase && supabase ? 'Supabase' : 'File-based (db.json)'
  })
})

// Get experiments
app.get('/experiments', async (_req, res) => {
  try {
    if (useSupabase && supabase) {
      const { data: experiments, error } = await supabase
        .from('experiments')
        .select('*')
        .order('title')

      if (error) {
        console.error('Error fetching experiments:', error)
        return res.status(500).json({ error: 'Failed to fetch experiments' })
      }
      return res.json({ experiments: experiments || [] })
    } else {
      // File-based
      return res.json({ experiments: db.experiments || [] })
    }
  } catch (err) {
    console.error('Error in /experiments:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Register user
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body || {}

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' })
  }

  try {
    if (useSupabase && supabase) {
      // Supabase registration
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', email.toLowerCase())
        .single()

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        password: password,
        email_confirm: true
      })

      if (authError) {
        console.error('Auth error:', authError)
        return res.status(400).json({ error: authError.message || 'Failed to create user' })
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          name: name,
          email: email.toLowerCase(),
          average_score: 0,
          total_experiments: 0
        })
        .select()
        .single()

      if (profileError) {
        await supabase.auth.admin.deleteUser(authData.user.id)
        return res.status(500).json({ error: 'Failed to create user profile' })
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password
      })

      if (sessionError || !sessionData.session) {
        return res.status(500).json({ error: 'Failed to create session' })
      }

      return res.json({
        token: sessionData.session.access_token,
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          averageScore: profile.average_score,
          totalExperiments: profile.total_experiments
        }
      })
    } else {
      // File-based registration
      const exists = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (exists) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const user = {
        id: uuid(),
        name,
        email: email.toLowerCase(),
        passwordHash: bcrypt.hashSync(password, 10),
        progress: [],
        averageScore: 0,
        totalExperiments: 0
      }
      db.users.push(user)
      saveDb(db)
      const token = uuid()
      sessions.set(token, user.id)
      return res.json({ token, user: publicUser(user) })
    }
  } catch (err) {
    console.error('Error in /auth/register:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login user
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  try {
    if (useSupabase && supabase) {
      // Supabase login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password
      })

      if (authError || !authData.session) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError || !profile) {
        return res.status(401).json({ error: 'User profile not found' })
      }

      return res.json({
        token: authData.session.access_token,
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          averageScore: profile.average_score,
          totalExperiments: profile.total_experiments
        }
      })
    } else {
      // File-based login
      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }
      const token = uuid()
      sessions.set(token, user.id)
      return res.json({ token, user: publicUser(user) })
    }
  } catch (err) {
    console.error('Error in /auth/login:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user
app.get('/me', authMiddleware, async (req, res) => {
  try {
    if (useSupabase && supabase) {
      res.json({
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          averageScore: req.user.average_score,
          totalExperiments: req.user.total_experiments
        }
      })
    } else {
      res.json({ user: publicUser(req.user) })
    }
  } catch (err) {
    console.error('Error in /me:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user progress
app.get('/progress', authMiddleware, async (req, res) => {
  try {
    if (useSupabase && supabase) {
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching progress:', error)
        return res.status(500).json({ error: 'Failed to fetch progress' })
      }

      const formattedProgress = (progress || []).map(p => ({
        id: p.id,
        experimentId: p.experiment_id,
        experimentTitle: p.experiment_title,
        score: p.score,
        date: p.created_at
      }))

      return res.json({ progress: formattedProgress })
    } else {
      // File-based
      return res.json({ progress: req.user.progress || [] })
    }
  } catch (err) {
    console.error('Error in /progress:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Save progress
app.post('/progress', authMiddleware, async (req, res) => {
  const { experimentId, experimentTitle, score } = req.body || {}

  if (!experimentId || typeof score !== 'number') {
    return res.status(400).json({ error: 'experimentId and numeric score are required' })
  }

  try {
    if (useSupabase && supabase) {
      // Supabase save progress
      const { data: progressEntry, error: progressError } = await supabase
        .from('user_progress')
        .insert({
          user_id: req.user.id,
          experiment_id: experimentId,
          experiment_title: experimentTitle || experimentId,
          score: score
        })
        .select()
        .single()

      if (progressError) {
        console.error('Error saving progress:', progressError)
        return res.status(500).json({ error: 'Failed to save progress' })
      }

      const { data: allProgress, error: fetchError } = await supabase
        .from('user_progress')
        .select('score')
        .eq('user_id', req.user.id)

      if (fetchError) {
        console.error('Error fetching all progress:', fetchError)
        return res.status(500).json({ error: 'Failed to calculate average' })
      }

      const totalExperiments = allProgress.length
      const sum = allProgress.reduce((acc, p) => acc + (p.score || 0), 0)
      const averageScore = totalExperiments ? Math.round((sum / totalExperiments) * 100) / 100 : 0

      await supabase
        .from('user_profiles')
        .update({
          total_experiments: totalExperiments,
          average_score: averageScore
        })
        .eq('id', req.user.id)

      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false })

      const formattedProgress = (progress || []).map(p => ({
        id: p.id,
        experimentId: p.experiment_id,
        experimentTitle: p.experiment_title,
        score: p.score,
        date: p.created_at
      }))

      return res.json({
        progress: formattedProgress,
        averageScore: averageScore
      })
    } else {
      // File-based save progress
      const entry = {
        id: uuid(),
        experimentId,
        experimentTitle: experimentTitle || experimentId,
        score,
        date: new Date().toISOString()
      }
      req.user.progress = req.user.progress || []
      req.user.progress.push(entry)
      req.user.totalExperiments = req.user.progress.length
      const sum = req.user.progress.reduce((acc, p) => acc + (p.score || 0), 0)
      req.user.averageScore = req.user.totalExperiments ? Math.round((sum / req.user.totalExperiments) * 100) / 100 : 0
      saveDb(db)
      return res.json({ progress: req.user.progress, averageScore: req.user.averageScore })
    }
  } catch (err) {
    console.error('Error in /progress POST:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

function publicUser(user) {
  const { passwordHash, ...rest } = user
  return rest
}

app.listen(PORT, () => {
  console.log(`\n🚀 API server running on http://localhost:${PORT}\n`)
})
