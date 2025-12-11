import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your VirtuoLabs dashboard. Track your progress and access your experiments.</p>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <h3>12 days</h3>
            <p>Learning Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>45.5h</h3>
            <p>Total Study Time</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>89%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div className="recent-experiments">
        <h2>Recent Experiments</h2>
        <div className="experiments-list">
          <div className="experiment-item">
            <span className="experiment-name">Energy Gap of P-N Junction</span>
            <span className="experiment-date">2 days ago</span>
          </div>
          <div className="experiment-item">
            <span className="experiment-name">Acid-Base Titration</span>
            <span className="experiment-date">5 days ago</span>
          </div>
          <div className="experiment-item">
            <span className="experiment-name">Simple Pendulum</span>
            <span className="experiment-date">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

