import React, { useState } from 'react'
import './ExperimentPage.css'

const TitrationExperiment = () => {
  const [volumeAdded, setVolumeAdded] = useState(0.0)
  const [titrantConcentration, setTitrantConcentration] = useState(0.10)
  const [analyteVolume, setAnalyteVolume] = useState(25)
  const [showEquivalencePoint, setShowEquivalencePoint] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const equivalencePoint = 25.0
  const currentPH = volumeAdded < equivalencePoint 
    ? 1.0 + (volumeAdded / equivalencePoint) * 6 
    : 14 - ((volumeAdded - equivalencePoint) / equivalencePoint) * 6
  const percentNeutralized = (volumeAdded / equivalencePoint) * 100

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

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Interactive acid-base titration</h1>
        <p>Interactive acid-base titration</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="simulation-section">
            <h2>Titration Setup</h2>
            <p className="section-subtitle">Interactive acid-base titration</p>

            <div className="titration-visualization">
              <div className="burette">
                <div 
                  className="burette-liquid" 
                  style={{ height: `${100 - buretteHeight}%` }}
                ></div>
                <div className="burette-label">Burette</div>
              </div>
              <div className="flask-container">
                <div className="conical-flask">
                  <div 
                    className="flask-liquid"
                    style={{ 
                      height: `${Math.min(percentNeutralized / 2, 50)}%`,
                      backgroundColor: currentPH < 7 ? '#ff6b9d' : currentPH > 7 ? '#4ecdc4' : '#90EE90'
                    }}
                  ></div>
                </div>
                <div className="flask-label">Conical Flask</div>
              </div>
            </div>

            <div className="titration-readings">
              <div className="reading-item">
                <span className="reading-label">pH:</span>
                <span className="reading-value">{currentPH.toFixed(2)}</span>
              </div>
              <div className="reading-item">
                <span className="reading-label">Volume:</span>
                <span className="reading-value">{volumeAdded.toFixed(1)} mL</span>
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
                ↶
              </button>
              <div className="toggle-switch">
                <label>
                  <input 
                    type="checkbox" 
                    checked={showEquivalencePoint}
                    onChange={(e) => setShowEquivalencePoint(e.target.checked)}
                  />
                  <span className="toggle-label">Show Equivalence Point</span>
                </label>
              </div>
              <button className="download-btn" onClick={handleDownload}>
                ⬇ Download Data
              </button>
            </div>

            {showEquivalencePoint && (
              <div className="equivalence-info">
                <div className="info-box">
                  <strong>Equivalence Point: {equivalencePoint.toFixed(1)} mL</strong>
                  <p>At equivalence point: moles acid = moles base</p>
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

          <div className="calculations-section">
            <h3>Calculations</h3>
            <div className="calc-item">
              <span>Current pH:</span>
              <strong>{currentPH.toFixed(2)}</strong>
            </div>
            <div className="calc-item">
              <span>Equivalence point:</span>
              <strong>{equivalencePoint.toFixed(1)} mL</strong>
            </div>
            <div className="calc-item">
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

          <button className="share-btn">
            📤 Share Experiment
          </button>
        </div>
      </div>
    </div>
  )
}

export default TitrationExperiment

