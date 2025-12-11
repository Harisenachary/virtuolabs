import React from 'react'
import './ProgressTracking.css'

const ProgressTracking = () => {
  const courses = [
    { name: 'Physics', completed: 8, total: 12, percentage: 67, color: '#1a73e8' },
    { name: 'Chemistry', completed: 5, total: 10, percentage: 50, color: '#34a853' },
    { name: 'Electrical Engineering', completed: 6, total: 8, percentage: 75, color: '#9c27b0' },
    { name: 'Mathematics', completed: 3, total: 6, percentage: 50, color: '#ff9800' }
  ]

  return (
    <div className="progress-tracking">
      <div className="progress-header">
        <h1>📈 Progress Tracking</h1>
      </div>

      <div className="progress-metrics">
        <div className="metric-card streak">
          <div className="metric-icon">📅</div>
          <div className="metric-content">
            <h2>12 days</h2>
            <p>Keep it going!</p>
          </div>
        </div>

        <div className="metric-card time">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <h2>45.5h</h2>
            <p>This semester</p>
          </div>
        </div>

        <div className="metric-card score">
          <div className="metric-icon">🎯</div>
          <div className="metric-content">
            <h2>89%</h2>
            <p>All experiments</p>
          </div>
        </div>
      </div>

      <div className="course-progress">
        <h2>Course Progress</h2>
        <p className="subtitle">Your completion status across all subjects</p>

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
      </div>
    </div>
  )
}

export default ProgressTracking

