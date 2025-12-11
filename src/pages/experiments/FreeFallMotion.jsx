import React, { useState } from 'react'
import './ExperimentPage.css'

const FreeFallMotion = () => {
  const [height, setHeight] = useState(100)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [velocity, setVelocity] = useState(0)
  const [distance, setDistance] = useState(0)

  const g = 9.8 // m/s²

  const handleHeightChange = (e) => {
    setHeight(parseFloat(e.target.value))
    setTime(0)
    setVelocity(0)
    setDistance(0)
  }

  const handleReset = () => {
    setTime(0)
    setVelocity(0)
    setDistance(0)
    setIsPlaying(false)
  }

  React.useEffect(() => {
    if (isPlaying && distance < height) {
      const interval = setInterval(() => {
        setTime(prev => prev + 0.1)
        setVelocity(prev => prev + g * 0.1)
        setDistance(prev => {
          const newDist = prev + velocity * 0.1 + 0.5 * g * 0.01
          return Math.min(newDist, height)
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying, distance, height, velocity])

  const currentHeight = height - distance
  const fallPercentage = (distance / height) * 100

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Free Fall Motion</h1>
        <p>Explore free fall motion and understand the effects of gravity.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="simulation-section">
            <h2>Free Fall Simulation</h2>
            <p className="section-subtitle">Interactive free fall visualization</p>

            <div className="freefall-visualization">
              <div className="freefall-container">
                <div className="ground"></div>
                <div 
                  className="falling-object"
                  style={{ 
                    bottom: `${fallPercentage}%`,
                    transition: isPlaying ? 'none' : 'all 0.1s'
                  }}
                >
                  ⚫
                </div>
              </div>
            </div>

            <div className="freefall-readings">
              <div className="reading-item">
                <span className="reading-label">Height:</span>
                <span className="reading-value">{currentHeight.toFixed(2)} m</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Velocity:</span>
                <span className="reading-value">{velocity.toFixed(2)} m/s</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Time:</span>
                <span className="reading-value">{time.toFixed(2)} s</span>
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
            <p className="section-subtitle">Adjust experiment settings</p>

            <div className="parameter-control">
              <label>Initial Height (m)</label>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="10"
                value={height}
                onChange={handleHeightChange}
                className="slider"
              />
              <span className="parameter-value">{height} m</span>
            </div>
          </div>

          <div className="key-concepts">
            <h3>Key Concepts</h3>
            <ul>
              <li>Acceleration due to gravity (g = 9.8 m/s²)</li>
              <li>Velocity increases linearly with time</li>
              <li>Distance increases quadratically</li>
              <li>Air resistance neglected</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeFallMotion

