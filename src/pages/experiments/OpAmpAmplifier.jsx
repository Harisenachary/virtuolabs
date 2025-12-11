import React, { useState } from 'react'
import './ExperimentPage.css'

const OpAmpAmplifier = () => {
  const [rIn, setRIn] = useState(10)
  const [rFeedback, setRFeedback] = useState(47)
  const [inputVoltage, setInputVoltage] = useState(0.2)

  const gain = rFeedback / rIn
  const outputVoltage = inputVoltage * gain

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

export default OpAmpAmplifier

