import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    streak: 0,
    studyTime: 0,
    averageScore: 0
  })
  const [recentExperiments, setRecentExperiments] = useState([])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch User Profile for stats
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('average_score')
        .eq('id', user.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError)
      }

      // Fetch ALL Progress for stats (not just limit 3)
      const { data: allProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (progressError) {
        console.error('Error fetching progress:', progressError)
      }

      // Calculate Stats
      const validProgress = allProgress || []

      // Streak: Count unique dates
      const uniqueDates = new Set(validProgress.map(p => new Date(p.created_at).toDateString()))
      const streak = uniqueDates.size

      // Study Time: Estimate 1.5h per experiment
      // Study Time: Convert seconds to hours
      const totalSeconds = validProgress.reduce((acc, curr) => acc + (curr.total_time_spent || 0), 0)
      const studyTime = (totalSeconds / 3600).toFixed(1)

      // Average Score (Prefer percentage)
      const totalScore = validProgress.reduce((acc, curr) => acc + (curr.quiz_best_percentage || curr.score || 0), 0)
      const avgScore = validProgress.length ? Math.round(totalScore / validProgress.length) : 0

      setStats({
        streak: streak,
        studyTime: studyTime,
        averageScore: avgScore || profile?.average_score || 0
      })

      if (allProgress) {
        setRecentExperiments(allProgress.slice(0, 3))
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your VirtuoLabs dashboard. Track your progress and access your experiments.</p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>{stats.streak} days</h3>
            <p>Learning Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{stats.studyTime}h</h3>
            <p>Total Study Time</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{stats.averageScore}%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div className="recent-experiments">
        <h2>Recent Experiments</h2>
        <div className="experiments-list">
          {recentExperiments.length === 0 ? (
            <div className="experiment-item">
              <p>No recent experiments found.</p>
            </div>
          ) : (
            recentExperiments.map((exp) => (
              <div className="experiment-item" key={exp.id}>
                <span className="experiment-name">{exp.experiment_title || 'Untitled Experiment'}</span>
                <span className="experiment-date">{formatDate(exp.created_at)}</span>
                {(exp.quiz_best_percentage || exp.score) !== null && (
                  <span className="experiment-score">
                    Score: {Math.round(exp.quiz_best_percentage || exp.score || 0)}%
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

