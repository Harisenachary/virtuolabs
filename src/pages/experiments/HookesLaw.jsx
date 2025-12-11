import React, { useState } from 'react'
import './ExperimentPage.css'

const HookesLaw = () => {
  const [springConstant, setSpringConstant] = useState(50)
  const [displacement, setDisplacement] = useState(0.1)

  const force = springConstant * displacement
  const potentialEnergy = 0.5 * springConstant * Math.pow(displacement, 2)

  return (
    <div className="experiment-page">
      <div className="experiment-header">
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

export default HookesLaw

