import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import { useEffect, useState } from 'react'
import './ExperimentPage.css'

const CircuitAnalysis = () => {
  const [voltage, setVoltage] = useState(12)
  const [resistance, setResistance] = useState(10)
  const [capacitance, setCapacitance] = useState(0.001)
  const [frequency, setFrequency] = useState(60)

  const current = voltage / resistance
  const reactanceC = 1 / (2 * Math.PI * frequency * capacitance)

  const experiment = experiments.find(e => e.id === 'circuit-analysis')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('circuit-analysis')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('circuit-analysis', timeSpent)
      }
    }
  }, [isSimulationMode, simulationStartTime, logSimulationStart, logSimulationEnd])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>AC Circuit Analysis</h1>
          <p>Analyze voltage, current, and capacitive reactance in an AC circuit.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Circuit Simulation</h2>
              <p className="section-subtitle">Interactive AC circuit parameters</p>

              <div className="diode-readings">
                <div className="reading-item">
                  <span className="reading-label">Supply Voltage:</span>
                  <span className="reading-value">{voltage.toFixed(1)} V</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Load Resistance:</span>
                  <span className="reading-value">{resistance.toFixed(1)} Ω</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Capacitive Reactance:</span>
                  <span className="reading-value">{reactanceC.toFixed(2)} Ω</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Current:</span>
                  <span className="reading-value">{current.toFixed(2)} A</span>
                </div>
              </div>

              <div className="simulation-controls">
                <div className="toggle-switch">
                  <label>
                    <input type="checkbox" checked readOnly />
                    <span className="toggle-label">Live values</span>
                  </label>
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
                      experimentId="circuit-analysis"
                      quiz={experiment.quiz}
                      experimentTitle={experiment.title}
                      onClose={() => setShowQuiz(false)}
                    />
                  </div>
                </div>
              )}

              <div className="energy-gap-info">
                <div className="info-box">
                  <strong>Ohm's Law & Impedance</strong>
                  <p>Explore how voltage, resistance, and capacitive reactance influence current flow.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="experiment-sidebar">
            <div className="parameters-section">
              <h3>Parameters</h3>
              <p className="section-subtitle">Adjust circuit settings</p>

              <div className="parameter-control">
                <label>Supply Voltage (V)</label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="0.5"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{voltage.toFixed(1)} V</span>
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
                <span className="parameter-value">{resistance.toFixed(1)} Ω</span>
              </div>

              <div className="parameter-control">
                <label>Capacitance (F)</label>
                <input
                  type="range"
                  min="0.0001"
                  max="0.005"
                  step="0.0001"
                  value={capacitance}
                  onChange={(e) => setCapacitance(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{capacitance.toFixed(4)} F</span>
              </div>

              <div className="parameter-control">
                <label>Frequency (Hz)</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{frequency.toFixed(0)} Hz</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Ohm's law and impedance</li>
                <li>Effect of capacitance on AC circuits</li>
                <li>Frequency response</li>
                <li>Phase relationships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default CircuitAnalysis

