import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { experiments, categories } from '../data/experiments'
import './ProgressTracking.css'

const ProgressTracking = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({
    streak: 0,
    timeSpent: 0,
    averageScore: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProgress()
    }
  }, [user])

  const fetchProgress = async () => {
    try {
      setLoading(true)

      // Fetch all progress for user
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error

      calculateStats(progress || [])
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (userProgress) => {
    // 1. Calculate Course Progress
    const courseStats = Object.keys(categories).map(catName => {
      const catExperiments = experiments.filter(e => e.category === catName || (catName === 'Electrical' && e.category === 'Electrical'))
      // Map 'Electrical Engineering' to 'Electrical' for match if needed, but here we used 'Electrical' in data file.
      // Adjusting categories to match data file: Physics, Chemistry, Electrical, Advanced

      const completedCount = catExperiments.reduce((acc, exp) => {
        const isCompleted = userProgress.some(p => p.experiment_id === exp.id)
        return acc + (isCompleted ? 1 : 0)
      }, 0)

      const total = catExperiments.length
      const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100)

      return {
        name: catName,
        completed: completedCount,
        total: total,
        percentage: percentage,
        color: categories[catName].color
      }
    })

    setCourses(courseStats)

    // 2. Calculate Metrics

    // Average Score
    // Average Score (Only count quizzes actually taken)
    const takenQuizzes = userProgress.filter(p => p.score !== null && p.score !== undefined)
    const totalScore = takenQuizzes.reduce((acc, curr) => acc + (curr.score || 0), 0)
    const averageScore = takenQuizzes.length ? Math.round(totalScore / takenQuizzes.length) : 0

    // Streak (Simplified: Count unique dates)
    const uniqueDates = new Set(userProgress.map(p => new Date(p.created_at).toDateString()))
    const streak = uniqueDates.size

    // Time Spent (Estimated: e.g. 1 hour per experiment)
    const timeSpent = userProgress.length * 1.5 // 1.5 hours per experiment estimate

    setStats({
      streak,
      timeSpent,
      averageScore
    })
  }

  return (
    <div className="progress-tracking">
      <div className="progress-header">
        <h1>📈 Real-time Progress</h1>
      </div>

      <div className="progress-metrics">
        <div className="metric-card streak">
          <div className="metric-icon">📅</div>
          <div className="metric-content">
            <h2>{stats.streak} days</h2>
            <p>Active Days</p>
          </div>
        </div>

        <div className="metric-card time">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h2>{stats.timeSpent}h</h2>
            <p>Estimated Time</p>
          </div>
        </div>

        <div className="metric-card score">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h2>{stats.averageScore}%</h2>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div className="course-progress">
        <h2>Course Progress</h2>
        <p className="subtitle">Your completion status across all subjects</p>

        {loading ? (
          <div className="loading-state">Loading progress...</div>
        ) : (
          <div className="courses-list">
            {courses.map((course, index) => (
              <div key={index} className="course-item">
                <div className="course-header">
                  <div className="course-info">
                    <span className="course-dot" style={{ backgroundColor: course.color }}></span>
                    <span className="course-name">{course.name}</span>
                  </div>
                  <span className="course-percentage">{course.percentage}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${course.percentage}%`,
                      backgroundColor: course.color
                    }}
                  ></div>
                </div>
                <div className="course-stats">
                  {course.completed}/{course.total} experiments
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressTracking

