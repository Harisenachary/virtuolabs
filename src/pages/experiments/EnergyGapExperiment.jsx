import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const EnergyGapExperiment = () => {
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'


  // Simulation State
  const [voltage, setVoltage] = useState(0.70)
  const [temperature, setTemperature] = useState(300)
  const [current, setCurrent] = useState(0.001000)
  const [showEnergyGap, setShowEnergyGap] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())

  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start on mount
  useEffect(() => {
    logSimulationStart('energy-gap')
    return () => {
      const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
      logSimulationEnd('energy-gap', timeSpent)
    }
  }, [])

  const energyGap = 1.12
  const experimentData = experiments.find(e => e.id === 'energy-gap')

  const handleVoltageChange = (e) => {
    const newVoltage = parseFloat(e.target.value)
    setVoltage(newVoltage)
    // Calculate current based on voltage (simplified model)
    if (newVoltage > 0.7) {
      setCurrent(0.001 * Math.exp((newVoltage - 0.7) * 10))
    } else {
      setCurrent(0.000001)
    }
  }

  const handleTemperatureChange = (e) => {
    setTemperature(parseFloat(e.target.value))
  }

  const handleReset = () => {
    setVoltage(0.70)
    setTemperature(300)
    setCurrent(0.001000)
  }

  const handleDownload = () => {
    const data = {
      voltage,
      current,
      temperature,
      energyGap
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'diode-data.json'
    a.click()
  }

  // SIMULATION VIEW
  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a href="/experiments/energy-gap" className="back-to-theory-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f7fafc', border: '2px solid #e2e8f0', borderRadius: '8px', color: '#2d3748', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = '#e2e8f0'; e.target.style.borderColor = '#cbd5e0' }} onMouseOut={(e) => { e.target.style.background = '#f7fafc'; e.target.style.borderColor = '#e2e8f0' }}>← Back to Theory</a>
          </div>
          <h1>{experimentData?.title} - Simulation</h1>
          <p>Interactive Mode</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Diode Simulation</h2>
              <p className="section-subtitle">Interactive P-N junction diode characteristics</p>

              <div className="diode-visualization">
                <div className="diode-bar" style={{ position: 'relative', overflow: 'visible' }}>
                  <div className="p-region">P</div>
                  <div className="n-region">N</div>

                  {/* Animated Electrons - only show when playing and voltage > 0.7V */}
                  {isPlaying && voltage > 0.7 && (
                    <>
                      {[...Array(8)].map((_, i) => {
                        // Random vertical position for each electron
                        const randomTop = 15 + Math.random() * 70
                        const randomDelay = Math.random() * 2
                        const randomDuration = 2 + Math.random() * 2

                        return (
                          <div
                            key={i}
                            className="electron"
                            style={{
                              position: 'absolute',
                              width: '8px',
                              height: '8px',
                              background: '#1a73e8',
                              borderRadius: '50%',
                              top: `${randomTop}%`,
                              animation: `electronFlow ${randomDuration / Math.sqrt(current * 1000)}s linear infinite, electronWobble ${1 + Math.random()}s ease-in-out infinite`,
                              animationDelay: `${randomDelay}s`,
                              boxShadow: '0 0 8px #1a73e8, 0 0 15px #1a73e8',
                              zIndex: 10
                            }}
                          />
                        )
                      })}
                    </>
                  )}
                </div>

                <style>{`
                  @keyframes electronFlow {
                    0% {
                      left: 60%;
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      left: 30%;
                      opacity: 0;
                    }
                  }
                  
                  @keyframes electronWobble {
                    0%, 100% {
                      transform: translateY(0px);
                    }
                    25% {
                      transform: translateY(-5px);
                    }
                    75% {
                      transform: translateY(5px);
                    }
                  }
                  
                  .diode-visualization {
                    margin: 20px 0;
                  }
                `}</style>
              </div>

              <div className="diode-readings" style={{ marginTop: '20px' }}>
                <div className="reading-item">
                  <span className="reading-label">P-N Junction Diode</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">V =</span>
                  <span className="reading-value">{voltage.toFixed(2)}V</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">I =</span>
                  <span className="reading-value">{current.toFixed(6)}A</span>
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
                <button className="download-btn" onClick={handleDownload} style={{ padding: '0 15px', borderRadius: '5px' }}>
                  Download Data
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

              {showEnergyGap && (
                <div className="energy-gap-info" style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                  <div className="info-box">
                    <strong>Energy Gap (Eg): {energyGap} eV</strong>
                    <p>The energy gap determines the minimum voltage required for current conduction.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="experiment-sidebar">
            <div className="parameters-section">
              <h3>Parameters</h3>
              <p className="section-subtitle">Adjust diode settings</p>

              <div className="parameter-control">
                <label>Temperature (K)</label>
                <input
                  type="range"
                  min="250"
                  max="400"
                  value={temperature}
                  onChange={handleTemperatureChange}
                  className="slider"
                />
                <span className="parameter-value">{temperature} K</span>
              </div>

              <div className="parameter-control">
                <label>Applied Voltage (V)</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={voltage}
                  onChange={handleVoltageChange}
                  className="slider"
                />
                <span className="parameter-value">{voltage.toFixed(2)} V</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Forward bias reduces barrier</li>
                <li>Reverse bias increases barrier</li>
                <li>Energy gap determines conduction</li>
                <li>Temperature affects leakage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // THEORY VIEW (Default)
  return <ExperimentTheory experiment={experimentData} />
}

export default EnergyGapExperiment

