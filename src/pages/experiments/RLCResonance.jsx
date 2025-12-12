import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const RLCResonance = () => {
  const [inductance, setInductance] = useState(0.05)
  const [capacitance, setCapacitance] = useState(0.0005)
  const [resistance, setResistance] = useState(10)

  const resonanceFrequency = 1 / (2 * Math.PI * Math.sqrt(inductance * capacitance))
  const qualityFactor = (1 / resistance) * Math.sqrt(inductance / capacitance)

  const experiment = experiments.find(e => e.id === 'rlc-resonance')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('rlc-resonance')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('rlc-resonance', timeSpent)
      }
    }
  }, [isSimulationMode])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>RLC Resonance</h1>
          <p>Explore resonance frequency and quality factor in RLC circuits.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Resonance Visualization</h2>
              <p className="section-subtitle">Adjust L, C, and R to see resonance changes</p>

              <div className="diode-readings">
                <div className="reading-item">
                  <span className="reading-label">Resonant Frequency:</span>
                  <span className="reading-value">{resonanceFrequency.toFixed(1)} Hz</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Quality Factor (Q):</span>
                  <span className="reading-value">{qualityFactor.toFixed(2)}</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Inductance:</span>
                  <span className="reading-value">{(inductance * 1000).toFixed(1)} mH</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Capacitance:</span>
                  <span className="reading-value">{(capacitance * 1e6).toFixed(1)} μF</span>
                </div>
              </div>

              <div className="energy-gap-info">
                <div className="info-box">
                  <strong>Peak response at resonance</strong>
                  <p>The circuit exhibits maximum voltage across L and C at the resonant frequency.</p>
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
                      experimentId="rlc-resonance"
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
              <p className="section-subtitle">Adjust R, L, and C</p>

              <div className="parameter-control">
                <label>Inductance (H)</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.005"
                  value={inductance}
                  onChange={(e) => setInductance(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{inductance.toFixed(3)} H</span>
              </div>

              <div className="parameter-control">
                <label>Capacitance (F)</label>
                <input
                  type="range"
                  min="0.0001"
                  max="0.002"
                  step="0.0001"
                  value={capacitance}
                  onChange={(e) => setCapacitance(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{capacitance.toFixed(4)} F</span>
              </div>

              <div className="parameter-control">
                <label>Resistance (Ω)</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={resistance}
                  onChange={(e) => setResistance(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{resistance.toFixed(0)} Ω</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Resonance frequency</li>
                <li>Quality factor</li>
                <li>Bandwidth and damping</li>
                <li>Energy exchange between L and C</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default RLCResonance

