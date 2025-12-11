import React, { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './ExperimentPage.css'

// Arrhenius equation: k = A * exp(-Ea / (R*T))
const R = 8.314 // J/(mol*K)

const ReactionRate = () => {
  const [activationEnergy, setActivationEnergy] = useState(50000) // J/mol
  const [temperature, setTemperature] = useState(298) // K
  const [preExponential, setPreExponential] = useState(1e7) // s^-1

  const rateAtT = useMemo(() => preExponential * Math.exp(-activationEnergy / (R * temperature)), [activationEnergy, preExponential, temperature])

  const data = useMemo(() => {
    const points = []
    for (let t = 280; t <= 360; t += 5) {
      const k = preExponential * Math.exp(-activationEnergy / (R * t))
      points.push({ temp: t, rate: Number(k.toExponential(3)) })
    }
    return points
  }, [activationEnergy, preExponential])

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Reaction Rate (Arrhenius)</h1>
        <p>See how temperature and activation energy affect reaction rate.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="graph-section">
            <h2>Rate vs Temperature</h2>
            <p className="section-subtitle">Arrhenius relationship k = A · e^(-Ea/RT)</p>
            <div className="graph-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="temp" label={{ value: 'Temperature (K)', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Rate (s⁻¹)', angle: -90, position: 'insideLeft' }} domain={['auto', 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#e65100" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="diode-readings" style={{ marginTop: '1.5rem' }}>
            <div className="reading-item">
              <span className="reading-label">Current Temp:</span>
              <span className="reading-value">{temperature.toFixed(0)} K</span>
            </div>
            <div className="reading-item">
              <span className="reading-label">Rate k:</span>
              <span className="reading-value">{rateAtT.toExponential(3)} s⁻¹</span>
            </div>
          </div>
        </div>

        <div className="experiment-sidebar">
          <div className="parameters-section">
            <h3>Parameters</h3>
            <p className="section-subtitle">Adjust kinetic variables</p>

            <div className="parameter-control">
              <label>Activation Energy (kJ/mol)</label>
              <input type="range" min="20" max="120" step="2" value={activationEnergy / 1000} onChange={(e) => setActivationEnergy(parseFloat(e.target.value) * 1000)} className="slider" />
              <span className="parameter-value">{(activationEnergy / 1000).toFixed(0)} kJ/mol</span>
            </div>

            <div className="parameter-control">
              <label>Pre-exponential A (s⁻¹)</label>
              <input type="range" min="6" max="12" step="0.1" value={Math.log10(preExponential)} onChange={(e) => setPreExponential(Math.pow(10, parseFloat(e.target.value)))} className="slider" />
              <span className="parameter-value">10^{Math.log10(preExponential).toFixed(1)} s⁻¹</span>
            </div>

            <div className="parameter-control">
              <label>Temperature (K)</label>
              <input type="range" min="280" max="360" step="2" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} className="slider" />
              <span className="parameter-value">{temperature.toFixed(0)} K</span>
            </div>
          </div>

          <div className="key-concepts">
            <h3>Key Concepts</h3>
            <ul>
              <li>Arrhenius equation</li>
              <li>Temperature sensitivity of rates</li>
              <li>Activation energy barrier</li>
              <li>Pre-exponential factor as collision frequency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactionRate

