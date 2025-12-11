import React, { useState } from 'react'
import './ExperimentPage.css'

const SimplePendulum = () => {
  const [length, setLength] = useState(1.0)
  const [angle, setAngle] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [period, setPeriod] = useState(2.0)

  const handleLengthChange = (e) => {
    const newLength = parseFloat(e.target.value)
    setLength(newLength)
    // Calculate period: T = 2π√(L/g), where g = 9.8 m/s²
    setPeriod(2 * Math.PI * Math.sqrt(newLength / 9.8))
  }

  const handleAngleChange = (e) => {
    setAngle(parseFloat(e.target.value))
  }

  const handleReset = () => {
    setLength(1.0)
    setAngle(30)
    setIsPlaying(false)
    setPeriod(2.0)
  }

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Simple Pendulum</h1>
        <p>Study the motion of a simple pendulum and understand harmonic motion principles.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="simulation-section">
            <h2>Pendulum Simulation</h2>
            <p className="section-subtitle">Interactive pendulum motion visualization</p>

            <div className="pendulum-visualization">
              <div className="pendulum-setup">
                <div className="pendulum-support"></div>
                <div 
                  className="pendulum-string"
                  style={{ 
                    transform: `rotate(${isPlaying ? Math.sin(Date.now() / 1000) * angle : angle}deg)`,
                    transformOrigin: 'top center'
                  }}
                >
                  <div className="pendulum-bob"></div>
                </div>
              </div>
            </div>

            <div className="pendulum-readings">
              <div className="reading-item">
                <span className="reading-label">Length:</span>
                <span className="reading-value">{length.toFixed(2)} m</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Period:</span>
                <span className="reading-value">{period.toFixed(2)} s</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Angle:</span>
                <span className="reading-value">{angle}°</span>
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
            <p className="section-subtitle">Adjust pendulum settings</p>

            <div className="parameter-control">
              <label>Length (m)</label>
              <input 
                type="range" 
                min="0.5" 
                max="3.0" 
                step="0.1"
                value={length}
                onChange={handleLengthChange}
                className="slider"
              />
              <span className="parameter-value">{length.toFixed(2)} m</span>
            </div>

            <div className="parameter-control">
              <label>Initial Angle (°)</label>
              <input 
                type="range" 
                min="5" 
                max="60" 
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
              <li>Period depends on length, not mass</li>
              <li>Small angle approximation</li>
              <li>Simple harmonic motion</li>
              <li>Energy conservation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimplePendulum

