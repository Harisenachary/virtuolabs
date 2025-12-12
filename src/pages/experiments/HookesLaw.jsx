import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const HookesLaw = () => {
  const [springConstant, setSpringConstant] = useState(50)
  const [displacement, setDisplacement] = useState(0.1)

  const force = springConstant * displacement
  const potentialEnergy = 0.5 * springConstant * Math.pow(displacement, 2)

  const experiment = experiments.find(e => e.id === 'hookes-law')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('hookes-law')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('hookes-law', timeSpent)
      }
    }
  }, [isSimulationMode])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a href="/experiments/hookes-law" className="back-to-theory-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f7fafc', border: '2px solid #e2e8f0', borderRadius: '8px', color: '#2d3748', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = '#e2e8f0'; e.target.style.borderColor = '#cbd5e0' }} onMouseOut={(e) => { e.target.style.background = '#f7fafc'; e.target.style.borderColor = '#e2e8f0' }}>← Back to Theory</a>
          </div>
          <h1>Hooke's Law</h1>
          <p>Investigate the relationship between force and displacement in a spring.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Spring Simulation</h2>
              <p className="section-subtitle">Adjust spring constant and displacement</p>

              <div className="pendulum-visualization">
                <div className="freefall-container" style={{ width: '120px' }}>
                  <div className="ground"></div>
                  <div
                    className="falling-object"
                    style={{
                      bottom: `${Math.min(displacement * 500, 90)}%`,
                      fontSize: '2rem'
                    }}
                  >
                    🪝
                  </div>
                </div>
              </div>

              <div className="diode-readings">
                <div className="reading-item">
                  <span className="reading-label">Force:</span>
                  <span className="reading-value">{force.toFixed(2)} N</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Potential Energy:</span>
                  <span className="reading-value">{potentialEnergy.toFixed(2)} J</span>
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
                      experimentId="hookes-law"
                      quiz={experiment.quiz}
                      experimentTitle={experiment.title}
                      onClose={() => setShowQuiz(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="experiment-sidebar">
            <div className="parameters-section">
              <h3>Parameters</h3>
              <p className="section-subtitle">Adjust spring properties</p>

              <div className="parameter-control">
                <label>Spring Constant k (N/m)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={springConstant}
                  onChange={(e) => setSpringConstant(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{springConstant.toFixed(0)} N/m</span>
              </div>

              <div className="parameter-control">
                <label>Displacement (m)</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.3"
                  step="0.01"
                  value={displacement}
                  onChange={(e) => setDisplacement(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{displacement.toFixed(2)} m</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>F = kx</li>
                <li>Elastic potential energy</li>
                <li>Linear elasticity range</li>
                <li>Spring constant effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default HookesLaw

