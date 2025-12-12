import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const FreeFallMotion = () => {
  const [height, setHeight] = useState(100)
  const [mass, setMass] = useState(1.0) // Mass in kg
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [velocity, setVelocity] = useState(0)
  const [distance, setDistance] = useState(0)
  const [hasLanded, setHasLanded] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())

  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start on mount
  useEffect(() => {
    logSimulationStart('free-fall-motion')
    return () => {
      const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
      logSimulationEnd('free-fall-motion', timeSpent)
    }
  }, [])

  const g = 9.8 // m/s²

  const handleHeightChange = (e) => {
    setHeight(parseFloat(e.target.value))
    setTime(0)
    setVelocity(0)
    setDistance(0)
    setHasLanded(false)
  }

  const handleMassChange = (e) => {
    setMass(parseFloat(e.target.value))
  }

  const handleReset = () => {
    setTime(0)
    setVelocity(0)
    setDistance(0)
    setIsPlaying(false)
    setHasLanded(false)
  }

  React.useEffect(() => {
    if (isPlaying && distance < height) {
      const interval = setInterval(() => {
        setTime(prev => prev + 0.05)
        setVelocity(prev => g * (time + 0.05))
        setDistance(prev => {
          const newDist = 0.5 * g * Math.pow(time + 0.05, 2)
          if (newDist >= height) {
            setHasLanded(true)
            setIsPlaying(false)
            return height
          }
          return newDist
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isPlaying, distance, height, time])

  const currentHeight = height - distance
  // FIX: Invert the percentage so ball falls DOWN (100% at top, 0% at bottom)
  const fallPercentage = ((height - distance) / height) * 100

  // Calculate final values (theoretical)
  const finalVelocity = Math.sqrt(2 * g * height)
  const timeTaken = Math.sqrt(2 * height / g)
  const kineticEnergy = 0.5 * mass * velocity * velocity
  const potentialEnergy = mass * g * currentHeight

  const experiment = experiments.find(e => e.id === 'free-fall')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a
              href="/experiments/free-fall"
              className="back-to-theory-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: '#f7fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                color: '#2d3748',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#e2e8f0'
                e.target.style.borderColor = '#cbd5e0'
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#f7fafc'
                e.target.style.borderColor = '#e2e8f0'
              }}
            >
              ← Back to Theory
            </a>
          </div>
          <h1>Free Fall Motion</h1>
          <p>Explore free fall motion and understand the effects of gravity.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Free Fall Simulation</h2>
              <p className="section-subtitle">Interactive free fall visualization</p>

              <div className="freefall-visualization" style={{
                height: '450px',
                background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '2rem',
                border: '1px solid #cbd5e0',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div className="freefall-container" style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%'
                }}>
                  {/* Ground line */}
                  <div className="ground" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: '#2d3748',
                    borderTop: '2px solid #4a5568'
                  }}></div>

                  {/* Falling ball */}
                  <div
                    className="falling-object"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: `${fallPercentage}%`,
                      width: '40px',
                      height: '40px',
                      background: 'radial-gradient(circle at 30% 30%, #e53e3e, #9b2c2c)',
                      borderRadius: '50%',
                      boxShadow: '3px 3px 8px rgba(0,0,0,0.3)',
                      transition: isPlaying ? 'none' : 'all 0.1s',
                      fontSize: '0',
                      zIndex: 10
                    }}
                  >
                  </div>
                </div>
              </div>

              <div className="freefall-readings">
                <div className="reading-item">
                  <span className="reading-label">Mass:</span>
                  <span className="reading-value">{mass.toFixed(1)} kg</span>
                </div>
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
                <div className="reading-item">
                  <span className="reading-label">KE:</span>
                  <span className="reading-value">{kineticEnergy.toFixed(1)} J</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">PE:</span>
                  <span className="reading-value">{potentialEnergy.toFixed(1)} J</span>
                </div>
              </div>

              {hasLanded && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#e6fffa', borderRadius: '8px', border: '2px solid #38b2ac' }}>
                  <h4 style={{ color: '#2c7a7b', marginBottom: '10px' }}>✅ Final Results</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div><strong>Time Taken:</strong> {time.toFixed(2)} s</div>
                    <div><strong>Final Velocity:</strong> {velocity.toFixed(2)} m/s</div>
                    <div><strong>Theoretical Time:</strong> {timeTaken.toFixed(2)} s</div>
                    <div><strong>Theoretical Velocity:</strong> {finalVelocity.toFixed(2)} m/s</div>
                  </div>
                </div>
              )}

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
                <button className="quiz-btn" onClick={() => setShowQuiz(true)}>
                  📝 Take Quiz
                </button>
              </div>

              {showQuiz && (
                <>
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 999
                  }} onClick={() => setShowQuiz(false)}></div>
                  <ExperimentQuiz
                    quiz={experiment?.quiz}
                    experimentTitle={experiment?.title}
                    experimentId={experiment?.id}
                    onClose={() => setShowQuiz(false)}
                  />
                </>
              )}
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

              <div className="parameter-control">
                <label>Object Mass (kg)</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={mass}
                  onChange={handleMassChange}
                  className="slider"
                />
                <span className="parameter-value">{mass.toFixed(1)} kg</span>
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

  return <ExperimentTheory experiment={experiment} />
}

export default FreeFallMotion

