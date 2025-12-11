import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ExperimentPage.css'

const EnergyGapExperiment = () => {
  const [voltage, setVoltage] = useState(0.70)
  const [temperature, setTemperature] = useState(300)
  const [current, setCurrent] = useState(0.001000)
  const [showEnergyGap, setShowEnergyGap] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const energyGap = 1.12

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

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Energy Gap of P-N Junction Diode</h1>
        <p>Measure the energy gap of a P-N junction diode and understand semiconductor principles.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="simulation-section">
            <h2>Diode Simulation</h2>
            <p className="section-subtitle">Interactive P-N junction diode characteristics</p>

            <div className="diode-visualization">
              <div className="diode-bar">
                <div className="p-region" style={{ width: '50%' }}>P</div>
                <div className="n-region" style={{ width: '50%' }}>N</div>
              </div>
            </div>

            <div className="diode-readings">
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
              <div className="toggle-switch">
                <label>
                  <input 
                    type="checkbox" 
                    checked={showEnergyGap}
                    onChange={(e) => setShowEnergyGap(e.target.checked)}
                  />
                  <span className="toggle-label">Show Energy Gap</span>
                </label>
              </div>
              <button className="download-btn" onClick={handleDownload}>
                ⬇ Download Data
              </button>
            </div>

            {showEnergyGap && (
              <div className="energy-gap-info">
                <div className="info-box">
                  <strong>Energy Gap (Eg): {energyGap} eV</strong>
                  <p>The energy gap determines the minimum voltage required for current conduction in a diode.</p>
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
              <li>Energy gap affects threshold voltage</li>
              <li>Temperature affects current</li>
            </ul>
          </div>

          <div className="related-experiments">
            <h3>Related Experiments</h3>
            <Link to="/experiments/iv-characteristics" className="related-link">
              View I-V Characteristics →
            </Link>
          </div>

          <button className="share-btn">
            📤 Share Experiment
          </button>
        </div>
      </div>
    </div>
  )
}

export default EnergyGapExperiment

