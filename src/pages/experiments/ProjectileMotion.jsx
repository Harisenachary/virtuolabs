import React, { useState } from 'react'
import './ExperimentPage.css'

const ProjectileMotion = () => {
  const [initialVelocity, setInitialVelocity] = useState(20)
  const [angle, setAngle] = useState(45)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)

  const g = 9.8
  const angleRad = (angle * Math.PI) / 180
  const maxTime = (2 * initialVelocity * Math.sin(angleRad)) / g
  const maxRange = (initialVelocity * initialVelocity * Math.sin(2 * angleRad)) / g
  const maxHeight = (initialVelocity * initialVelocity * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g)

  const handleVelocityChange = (e) => {
    setInitialVelocity(parseFloat(e.target.value))
    setTime(0)
  }

  const handleAngleChange = (e) => {
    setAngle(parseFloat(e.target.value))
    setTime(0)
  }

  const handleReset = () => {
    setTime(0)
    setIsPlaying(false)
  }

  React.useEffect(() => {
    if (isPlaying && time < maxTime) {
      const interval = setInterval(() => {
        setTime(prev => Math.min(prev + 0.1, maxTime))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, time, maxTime])

  const x = initialVelocity * Math.cos(angleRad) * time
  const y = initialVelocity * Math.sin(angleRad) * time - 0.5 * g * time * time
  const xPercent = (x / maxRange) * 100
  const yPercent = Math.max(0, (y / maxHeight) * 100)

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Projectile Motion</h1>
        <p>Study projectile motion trajectories and understand the physics of motion in two dimensions.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="simulation-section">
            <h2>Projectile Simulation</h2>
            <p className="section-subtitle">Interactive projectile motion visualization</p>

            <div className="projectile-visualization">
              <div className="projectile-container">
                <div className="ground-line"></div>
                <div 
                  className="projectile-object"
                  style={{ 
                    left: `${xPercent}%`,
                    bottom: `${yPercent}%`,
                    transition: isPlaying ? 'none' : 'all 0.1s'
                  }}
                >
                  ⚫
                </div>
                <div className="trajectory-path"></div>
              </div>
            </div>

            <div className="projectile-readings">
              <div className="reading-item">
                <span className="reading-label">X Position:</span>
                <span className="reading-value">{x.toFixed(2)} m</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Y Position:</span>
                <span className="reading-value">{Math.max(0, y).toFixed(2)} m</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Time:</span>
                <span className="reading-value">{time.toFixed(2)} s</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Max Range:</span>
                <span className="reading-value">{maxRange.toFixed(2)} m</span>
              </div>
            </div>

            <div className="simulation-controls">
              <button 
                className="control-btn"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="control-btn" onClick={handleReset}>
                ↻
              </button>
            </div>
          </div>
        </div>

        <div className="experiment-sidebar">
          <div className="parameters-section">
            <h3>Parameters</h3>
            <p className="section-subtitle">Adjust projectile settings</p>

            <div className="parameter-control">
              <label>Initial Velocity (m/s)</label>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="1"
                value={initialVelocity}
                onChange={handleVelocityChange}
                className="slider"
              />
              <span className="parameter-value">{initialVelocity} m/s</span>
            </div>

            <div className="parameter-control">
              <label>Launch Angle (°)</label>
              <input 
                type="range" 
                min="0" 
                max="90" 
                step="1"
                value={angle}
                onChange={handleAngleChange}
                className="slider"
              />
              <span className="parameter-value">{angle}°</span>
            </div>
          </div>

          <div className="key-concepts">
            <h3>Key Concepts</h3>
            <ul>
              <li>Independent horizontal and vertical motion</li>
              <li>Maximum range at 45°</li>
              <li>Parabolic trajectory</li>
              <li>Conservation of energy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectileMotion

