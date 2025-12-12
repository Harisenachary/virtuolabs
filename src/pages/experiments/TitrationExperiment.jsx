import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const TitrationExperiment = () => {
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'


  // Simulation State
  const [volumeAdded, setVolumeAdded] = useState(0.0)
  const [titrantConcentration, setTitrantConcentration] = useState(0.10)
  const [analyteVolume, setAnalyteVolume] = useState(25)
  const [showEquivalencePoint, setShowEquivalencePoint] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('titration')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('titration', timeSpent)
      }
    }
  }, [isSimulationMode])

  const equivalencePoint = 25.0
  const currentPH = volumeAdded < equivalencePoint
    ? 1.0 + (volumeAdded / equivalencePoint) * 6
    : 14 - ((volumeAdded - equivalencePoint) / equivalencePoint) * 6
  const percentNeutralized = (volumeAdded / equivalencePoint) * 100

  const experimentData = experiments.find(e => e.id === 'titration')

  const handleVolumeChange = (e) => {
    setVolumeAdded(parseFloat(e.target.value))
  }

  const handleTitrantChange = (e) => {
    setTitrantConcentration(parseFloat(e.target.value))
  }

  const handleAnalyteChange = (e) => {
    setAnalyteVolume(parseFloat(e.target.value))
  }

  const handleReset = () => {
    setVolumeAdded(0.0)
  }

  const handleDownload = () => {
    const data = {
      volumeAdded,
      pH: currentPH.toFixed(2),
      equivalencePoint,
      percentNeutralized: percentNeutralized.toFixed(1)
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'titration-data.json'
    a.click()
  }

  const buretteHeight = Math.min((volumeAdded / 50) * 100, 100)

  // SIMULATION VIEW
  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <a href="/experiments/titration" className="back-to-theory-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f7fafc', border: '2px solid #e2e8f0', borderRadius: '8px', color: '#2d3748', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.2s' }} onMouseOver={(e) => { e.target.style.background = '#e2e8f0'; e.target.style.borderColor = '#cbd5e0' }} onMouseOut={(e) => { e.target.style.background = '#f7fafc'; e.target.style.borderColor = '#e2e8f0' }}>← Back to Theory</a>
          </div>
          <h1>{experimentData?.title} - Simulation</h1>
          <p>Interactive Mode</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Titration Setup</h2>
              <p className="section-subtitle">Interactive acid-base titration</p>

              <div className="titration-visualization">
                <div className="titration-setup">
                  <div className="burette">
                    <div
                      className="burette-liquid"
                      style={{ height: `${100 - buretteHeight}%` }}
                    ></div>
                    <div className="burette-liquid-fill" style={{ height: `${buretteHeight}%` }}></div>
                    <div className="burette-label">Burette</div>
                  </div>
                  <div className="flask-container">
                    <div className="conical-flask">
                      <div
                        className="flask-liquid"
                        style={{
                          height: `${Math.min(percentNeutralized / 2 + 20, 90)}%`,
                          backgroundColor: currentPH < 7 ? '#ff6b9d' : currentPH > 7 ? '#4ecdc4' : '#90EE90'
                        }}
                      ></div>
                    </div>
                    <div className="flask-label">Conical Flask</div>
                  </div>
                </div>
              </div>

              <div className="titration-readings" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', background: '#eee', padding: '15px', borderRadius: '8px' }}>
                <div className="reading-item">
                  <span className="reading-label">pH: </span>
                  <span className="reading-value" style={{ fontWeight: 'bold' }}>{currentPH.toFixed(2)}</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Volume: </span>
                  <span className="reading-value" style={{ fontWeight: 'bold' }}>{volumeAdded.toFixed(1)} mL</span>
                </div>
              </div>

              <div className="simulation-controls" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifySelf: 'center' }}>
                <button
                  className="control-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{ alignSelf: 'center' }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button className="control-btn" onClick={handleReset}>
                  ↶
                </button>
                <button className="download-btn" onClick={handleDownload} style={{ padding: '0 15px', borderRadius: '5px' }}>
                  ⬇ Download Data
                </button>
              </div>

              <div className="toggle-switch" style={{ marginTop: '15px' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={showEquivalencePoint}
                    onChange={(e) => setShowEquivalencePoint(e.target.checked)}
                  />
                  <span className="toggle-label" style={{ marginLeft: '10px' }}>Show Equivalence Point</span>
                </label>
              </div>

              {showEquivalencePoint && (
                <div className="equivalence-info" style={{ marginTop: '20px', padding: '15px', background: '#e0f7fa', borderRadius: '8px' }}>
                  <div className="info-box">
                    <strong>Equivalence Point: {equivalencePoint.toFixed(1)} mL</strong>
                    <p>At equivalence point: moles acid = moles base</p>
                  </div>
                </div>
              )}

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
                      experimentId="titration"
                      quiz={experimentData?.quiz}
                      experimentTitle={experimentData?.title}
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
              <p className="section-subtitle">Adjust titration settings</p>

              <div className="parameter-control">
                <label>Volume Added (mL)</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.1"
                  value={volumeAdded}
                  onChange={handleVolumeChange}
                  className="slider"
                />
                <span className="parameter-value">{volumeAdded.toFixed(1)} mL</span>
              </div>

              <div className="parameter-control">
                <label>Titrant Concentration (M)</label>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.01"
                  value={titrantConcentration}
                  onChange={handleTitrantChange}
                  className="slider"
                />
                <span className="parameter-value">{titrantConcentration.toFixed(2)} M</span>
              </div>

              <div className="parameter-control">
                <label>Analyte Volume (mL)</label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={analyteVolume}
                  onChange={handleAnalyteChange}
                  className="slider"
                />
                <span className="parameter-value">{analyteVolume} mL</span>
              </div>
            </div>

            <div className="calculations-section" style={{ background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>Calculations</h3>
              <div className="calc-item" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Current pH:</span>
                <strong>{currentPH.toFixed(2)}</strong>
              </div>
              <div className="calc-item" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Equivalence point:</span>
                <strong>{equivalencePoint.toFixed(1)} mL</strong>
              </div>
              <div className="calc-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>% Neutralized:</span>
                <strong>{Math.min(percentNeutralized, 100).toFixed(1)}%</strong>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Points</h3>
              <ul>
                <li>Sharp pH change at equivalence</li>
                <li>Indicator color change</li>
                <li>Stoichiometric calculations</li>
                <li>Buffer regions</li>
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

export default TitrationExperiment

