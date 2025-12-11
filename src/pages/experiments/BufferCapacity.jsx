import React, { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './ExperimentPage.css'

// Simple Henderson-Hasselbalch approximation for buffer pH
function calculatePH(ha, a, pKa = 4.75) {
  if (ha <= 0 || a <= 0) return 7
  return pKa + Math.log10(a / ha)
}

const BufferCapacity = () => {
  const [acidConc, setAcidConc] = useState(0.1)
  const [baseConc, setBaseConc] = useState(0.1)
  const [volume, setVolume] = useState(25)

  const data = useMemo(() => {
    // simulate titration of buffer with small acid/base increments
    const steps = []
    for (let add = -10; add <= 10; add += 1) {
      const ha = Math.max(acidConc * volume + (add < 0 ? Math.abs(add) * 0.01 : 0), 0.0001)
      const a = Math.max(baseConc * volume + (add > 0 ? add * 0.01 : 0), 0.0001)
      steps.push({ added: add, pH: +calculatePH(ha, a).toFixed(2) })
    }
    return steps
  }, [acidConc, baseConc, volume])

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Buffer Capacity</h1>
        <p>See how buffer pH resists change when small amounts of acid or base are added.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="graph-section">
            <h2>pH vs Added Acid/Base</h2>
            <p className="section-subtitle">Negative = added acid, Positive = added base (mL equiv.)</p>
            <div className="graph-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="added" label={{ value: 'Added volume (relative)', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[0, 14]} label={{ value: 'pH', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="pH" stroke="#1a73e8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="experiment-sidebar">
          <div className="parameters-section">
            <h3>Parameters</h3>
            <p className="section-subtitle">Adjust buffer components</p>

            <div className="parameter-control">
              <label>Acid Concentration (M)</label>
              <input type="range" min="0.05" max="0.5" step="0.01" value={acidConc} onChange={(e) => setAcidConc(parseFloat(e.target.value))} className="slider" />
              <span className="parameter-value">{acidConc.toFixed(2)} M</span>
            </div>

            <div className="parameter-control">
              <label>Base Concentration (M)</label>
              <input type="range" min="0.05" max="0.5" step="0.01" value={baseConc} onChange={(e) => setBaseConc(parseFloat(e.target.value))} className="slider" />
              <span className="parameter-value">{baseConc.toFixed(2)} M</span>
            </div>

            <div className="parameter-control">
              <label>Buffer Volume (mL)</label>
              <input type="range" min="10" max="100" step="5" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="slider" />
              <span className="parameter-value">{volume.toFixed(0)} mL</span>
            </div>
          </div>

          <div className="key-concepts">
            <h3>Key Concepts</h3>
            <ul>
              <li>Buffers resist pH change</li>
              <li>Conjugate acid/base ratio controls pH</li>
              <li>Capacity increases with concentration</li>
              <li>Best buffering near pKa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BufferCapacity

