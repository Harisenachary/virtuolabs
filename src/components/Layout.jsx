import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const [expandedCategories, setExpandedCategories] = useState({
    physics: true,
    electrical: false,
    chemistry: false,
    advanced: false
  })

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">⚗️</span>
            <span className="logo-text">VirtuoLabs</span>
          </div>
          <nav className="top-nav">
            <Link to="/" className={isActive('/') ? 'active' : ''}>Experiments</Link>
            <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>Dashboard</Link>
            <Link to="/progress" className={isActive('/progress') ? 'active' : ''}>Progress</Link>
            <AuthActions />
          </nav>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Student Portal</h3>
            <Link to="/dashboard" className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}>
              <span className="sidebar-icon">🎓</span>
              Dashboard
            </Link>
            <Link to="/progress" className={`sidebar-link ${isActive('/progress') ? 'active' : ''}`}>
              <span className="sidebar-icon">📊</span>
              Progress Tracking
            </Link>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Experiment Categories</h3>

            <div className="category-group">
              <div className="category-header" onClick={() => toggleCategory('physics')}>
                <span className="category-icon">⚛️</span>
                <span>Physics</span>
                <span className="category-arrow">{expandedCategories.physics ? '▼' : '▶'}</span>
              </div>
              {expandedCategories.physics && (
                <div className="category-items">
                  <Link to="/experiments/simple-pendulum" className={`sidebar-link ${isActive('/experiments/simple-pendulum') ? 'active' : ''}`}>
                    Simple Pendulum
                  </Link>
                  <Link to="/experiments/energy-gap" className={`sidebar-link ${isActive('/experiments/energy-gap') ? 'active' : ''}`}>
                    Energy Gap of P-N Junction
                  </Link>
                  <Link to="/experiments/free-fall" className={`sidebar-link ${isActive('/experiments/free-fall') ? 'active' : ''}`}>
                    Free Fall Motion
                  </Link>
                  <Link to="/experiments/projectile-motion" className={`sidebar-link ${isActive('/experiments/projectile-motion') ? 'active' : ''}`}>
                    Projectile Motion
                  </Link>
                  <Link to="/experiments/hookes-law" className={`sidebar-link ${isActive('/experiments/hookes-law') ? 'active' : ''}`}>
                    Hooke's Law
                  </Link>
                  <Link to="/experiments/lens-optics" className={`sidebar-link ${isActive('/experiments/lens-optics') ? 'active' : ''}`}>
                    Lens Optics
                  </Link>
                </div>
              )}
            </div>

            <div className="category-group">
              <div className="category-header" onClick={() => toggleCategory('electrical')}>
                <span className="category-icon">⚡</span>
                <span>Electrical Engineering</span>
                <span className="category-arrow">{expandedCategories.electrical ? '▼' : '▶'}</span>
              </div>
              {expandedCategories.electrical && (
                <div className="category-items">
                  <Link to="/experiments/iv-characteristics" className={`sidebar-link ${isActive('/experiments/iv-characteristics') ? 'active' : ''}`}>
                    I-V Characteristics
                  </Link>
                  <Link to="/experiments/circuit-analysis" className={`sidebar-link ${isActive('/experiments/circuit-analysis') ? 'active' : ''}`}>
                    Circuit Analysis
                  </Link>
                  <Link to="/experiments/rlc-resonance" className={`sidebar-link ${isActive('/experiments/rlc-resonance') ? 'active' : ''}`}>
                    RLC Resonance
                  </Link>
                  <Link to="/experiments/op-amp" className={`sidebar-link ${isActive('/experiments/op-amp') ? 'active' : ''}`}>
                    Op-Amp Amplifier
                  </Link>
                </div>
              )}
            </div>

            <div className="category-group">
              <div className="category-header" onClick={() => toggleCategory('chemistry')}>
                <span className="category-icon">🧪</span>
                <span>Chemistry</span>
                <span className="category-arrow">{expandedCategories.chemistry ? '▼' : '▶'}</span>
              </div>
              {expandedCategories.chemistry && (
                <div className="category-items">
                  <Link to="/experiments/titration" className={`sidebar-link ${isActive('/experiments/titration') ? 'active' : ''}`}>
                    Acid-Base Titration
                  </Link>
                  <Link to="/experiments/buffer-capacity" className={`sidebar-link ${isActive('/experiments/buffer-capacity') ? 'active' : ''}`}>
                    Buffer Capacity
                  </Link>
                  <Link to="/experiments/reaction-rate" className={`sidebar-link ${isActive('/experiments/reaction-rate') ? 'active' : ''}`}>
                    Reaction Rate (Arrhenius)
                  </Link>
                </div>
              )}
            </div>

            <div className="category-group">
              <div className="category-header" onClick={() => toggleCategory('advanced')}>
                <span className="category-icon">💻</span>
                <span>Advanced STEM</span>
                <span className="category-arrow">{expandedCategories.advanced ? '▼' : '▶'}</span>
              </div>
              {expandedCategories.advanced && (
                <div className="category-items">
                  <Link to="/experiments/pid-control" className={`sidebar-link ${isActive('/experiments/pid-control') ? 'active' : ''}`}>
                    PID Control Tuning
                  </Link>
                  <Link to="/experiments/fourier-series" className={`sidebar-link ${isActive('/experiments/fourier-series') ? 'active' : ''}`}>
                    Fourier Series
                  </Link>
                  <Link to="/experiments/neural-activation" className={`sidebar-link ${isActive('/experiments/neural-activation') ? 'active' : ''}`}>
                    Neural Activations
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Resources</h3>
            <Link to="/study-materials" className="sidebar-link">
              <span className="sidebar-icon">📚</span>
              Study Materials
            </Link>
            <Link to="/help" className="sidebar-link">
              <span className="sidebar-icon">❓</span>
              Help & Support
            </Link>
          </div>
        </aside>

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

const AuthActions = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  if (user) {
    const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User'
    return (
      <div className="auth-actions">
        <span className="user-chip">Hi, {userName}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <div className="auth-actions">
      <Link to="/login" className={isActive('/login') ? 'active' : ''}>Login</Link>
      <Link to="/register" className={isActive('/register') ? 'active' : ''}>Register</Link>
    </div>
  )
}

