import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const OpAmpAmplifier = () => {
  const [rIn, setRIn] = useState(10)
  const [rFeedback, setRFeedback] = useState(47)
  const [inputVoltage, setInputVoltage] = useState(0.2)

  const gain = rFeedback / rIn
  const outputVoltage = inputVoltage * gain

  const experiment = experiments.find(e => e.id === 'op-amp')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('op-amp')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('op-amp', timeSpent)
      }
    }
  }, [isSimulationMode])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>Op-Amp Inverting Amplifier</h1>
          <p>Experiment with resistor ratios to set amplifier gain.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Amplifier Simulation</h2>
              <p className="section-subtitle">Adjust input voltage and resistor values</p>

              <div className="diode-readings">
                <div className="reading-item">
                  <span className="reading-label">Input Voltage:</span>
                  <span className="reading-value">{inputVoltage.toFixed(2)} V</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Gain:</span>
                  <span className="reading-value">{gain.toFixed(2)}x</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Output Voltage:</span>
                  <span className="reading-value">{outputVoltage.toFixed(2)} V</span>
                </div>
              </div>

              <div className="energy-gap-info">
                <div className="info-box">
                  <strong>Gain = -Rf / Rin</strong>
                  <p>In an inverting op-amp, the voltage gain is set by the ratio of feedback to input resistors.</p>
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
                      experimentId="op-amp"
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
              <p className="section-subtitle">Adjust resistor ratio</p>

              <div className="parameter-control">
                <label>Input Resistor Rin (kΩ)</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={rIn}
                  onChange={(e) => setRIn(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{rIn.toFixed(0)} kΩ</span>
              </div>

              <div className="parameter-control">
                <label>Feedback Resistor Rf (kΩ)</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={rFeedback}
                  onChange={(e) => setRFeedback(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{rFeedback.toFixed(0)} kΩ</span>
              </div>

              <div className="parameter-control">
                <label>Input Voltage (V)</label>
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.01"
                  value={inputVoltage}
                  onChange={(e) => setInputVoltage(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{inputVoltage.toFixed(2)} V</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Inverting amplifier configuration</li>
                <li>Closed-loop gain</li>
                <li>Role of feedback</li>
                <li>Input and output limits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default OpAmpAmplifier

