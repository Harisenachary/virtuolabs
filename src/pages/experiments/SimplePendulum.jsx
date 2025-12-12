import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const SimplePendulum = () => {
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'

  const [length, setLength] = useState(1.0)
  const [angle, setAngle] = useState(30)
  const [mass, setMass] = useState(1.0) // Mass in kg
  const [isPlaying, setIsPlaying] = useState(false)
  const [period, setPeriod] = useState(2.0)
  const [activeTab, setActiveTab] = useState('theory')
  const [animationTime, setAnimationTime] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())

  const { logSimulationStart, logSimulationEnd } = useActivityLogger()
  const experimentData = experiments.find(e => e.id === 'simple-pendulum')

  // Log simulation start on mount
  useEffect(() => {
    logSimulationStart('simple-pendulum')
    return () => {
      const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
      logSimulationEnd('simple-pendulum', timeSpent)
    }
  }, [])



  // Damping parameters - heavier pendulums have less damping (less air resistance effect)
  const baseDampingCoefficient = 0.05
  const dampingCoefficient = baseDampingCoefficient / mass // Heavier = slower damping
  const timeToRest = 60 * (mass / 1.0) // Heavier pendulums take longer to stop

  // Animation loop for smooth oscillation with damping
  useEffect(() => {
    if (isPlaying) {
      if (animationTime >= timeToRest) {
        setIsPlaying(false)
        return
      }
      const interval = setInterval(() => {
        setAnimationTime(prev => {
          const newTime = prev + 0.05
          if (newTime >= timeToRest) {
            setIsPlaying(false)
            return timeToRest
          }
          return newTime
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isPlaying, animationTime, timeToRest])

  const handleLengthChange = (e) => {
    const newLength = parseFloat(e.target.value)
    setLength(newLength)
    // Calculate period: T = 2π√(L/g), where g = 9.8 m/s²
    // NOTE: Period is INDEPENDENT of mass!
    setPeriod(2 * Math.PI * Math.sqrt(newLength / 9.8))
  }

  const handleAngleChange = (e) => {
    setAngle(parseFloat(e.target.value))
  }

  const handleMassChange = (e) => {
    setMass(parseFloat(e.target.value))
  }

  const handleReset = () => {
    setLength(1.0)
    setAngle(30)
    setMass(1.0)
    setIsPlaying(false)
    setPeriod(2.0)
    setAnimationTime(0)
  }

  // Calculate current swing angle with exponential decay (damping)
  const dampingFactor = Math.exp(-dampingCoefficient * animationTime)
  const currentAmplitude = angle * dampingFactor
  const currentAngle = isPlaying ? Math.sin(animationTime * 2) * currentAmplitude : angle
  const timeRemaining = Math.max(0, timeToRest - animationTime)

  // SIMULATION VIEW (When launched from Simulations page)
  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a
              href={`/experiments/${experimentData?.id}`}
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
          <h1>{experimentData?.title} - Simulation</h1>
          <p>Interactive Mode</p>
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
                      transform: `rotate(${currentAngle}deg)`,
                      transformOrigin: 'top center',
                      transition: 'none'
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
                  <span className="reading-label">Mass:</span>
                  <span className="reading-value">{mass.toFixed(1)} kg</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Period:</span>
                  <span className="reading-value">{period.toFixed(2)} s</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Angle:</span>
                  <span className="reading-value">{angle}°</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Current Amplitude:</span>
                  <span className="reading-value">{currentAmplitude.toFixed(1)}°</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Time Until Rest:</span>
                  <span className="reading-value" style={{ color: timeRemaining < 10 ? '#e53e3e' : '#2d3748' }}>
                    {timeRemaining.toFixed(1)} s
                  </span>
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
                    quiz={experimentData?.quiz}
                    experimentTitle={experimentData?.title}
                    experimentId={experimentData?.id}
                    onClose={() => setShowQuiz(false)}
                  />
                </>
              )}
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

              <div className="parameter-control">
                <label>Bob Mass (kg)</label>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
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
                <li>Period depends on length, NOT mass</li>
                <li>Heavier masses take longer to stop (less air resistance)</li>
                <li>Small angle approximation</li>
                <li>Simple harmonic motion</li>
                <li>Energy conservation</li>
              </ul>
            </div>
          </div>
        </div>
      </div >
    )
  }

  // THEORY & PROCEDURE VIEW (Default)
  return <ExperimentTheory experiment={experimentData} />
}

export default SimplePendulum

