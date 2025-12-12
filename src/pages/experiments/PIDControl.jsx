import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const PIDControl = () => {
  const [kp, setKp] = useState(1.0)
  const [ki, setKi] = useState(0.2)
  const [kd, setKd] = useState(0.05)
  const [setpoint, setSetpoint] = useState(50)
  const [processVar, setProcessVar] = useState(0)
  const [error, setError] = useState(0)

  useEffect(() => {
    const e = setpoint - processVar
    setError(e)
    const adjustment = kp * e + ki * e * 0.1 - kd * (processVar * 0.05)
    setProcessVar(prev => prev + adjustment * 0.05)
  }, [kp, ki, kd, setpoint, processVar])

  const experiment = experiments.find(e => e.id === 'pid-control')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('pid-control')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('pid-control', timeSpent)
      }
    }
  }, [isSimulationMode, simulationStartTime, logSimulationStart, logSimulationEnd])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>PID Control Tuning</h1>
          <p>Tune proportional, integral, and derivative gains to reach a setpoint.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>PID Response</h2>
              <p className="section-subtitle">Adjust gains to minimize error</p>

              <div className="diode-readings">
                <div className="reading-item">
                  <span className="reading-label">Setpoint:</span>
                  <span className="reading-value">{setpoint.toFixed(0)}</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Process Variable:</span>
                  <span className="reading-value">{processVar.toFixed(2)}</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Error:</span>
                  <span className="reading-value">{error.toFixed(2)}</span>
                </div>
              </div>

              <div className="energy-gap-info">
                <div className="info-box">
                  <strong>Balance P, I, and D</strong>
                  <p>Use P for responsiveness, I to remove steady-state error, and D to damp oscillations.</p>
                </div>
              </div>
            </div>

            <div className="simulation-controls" style={{ marginTop: '20px' }}>
              <button className="quiz-btn" onClick={() => setShowQuiz(true)}>
                📝 Take Quiz
              </button>
            </div>

            {showQuiz && (
              <div className="quiz-modal-overlay">
                <div className="quiz-modal-content">
                  <button className="close-quiz-btn" onClick={() => setShowQuiz(false)}>
                    ×
                  </button>
                  <ExperimentQuiz
                    experimentId="pid-control"
                    quiz={experiment.quiz}
                    experimentTitle={experiment.title}
                    onClose={() => setShowQuiz(false)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="experiment-sidebar">
            <div className="parameters-section">
              <h3>Gains</h3>
              <p className="section-subtitle">Tune PID gains</p>

              <div className="parameter-control">
                <label>Kp (proportional)</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={kp}
                  onChange={(e) => setKp(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{kp.toFixed(1)}</span>
              </div>

              <div className="parameter-control">
                <label>Ki (integral)</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={ki}
                  onChange={(e) => setKi(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{ki.toFixed(2)}</span>
              </div>

              <div className="parameter-control">
                <label>Kd (derivative)</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={kd}
                  onChange={(e) => setKd(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{kd.toFixed(2)}</span>
              </div>

              <div className="parameter-control">
                <label>Setpoint</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={setpoint}
                  onChange={(e) => setSetpoint(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{setpoint.toFixed(0)}</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Overshoot and damping</li>
                <li>Rise time and settling time</li>
                <li>Steady-state error</li>
                <li>Tuning trade-offs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default PIDControl

