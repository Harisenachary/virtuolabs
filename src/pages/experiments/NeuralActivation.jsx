import React, { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import './ExperimentPage.css'

const activations = {
  relu: (x) => Math.max(0, x),
  sigmoid: (x) => 1 / (1 + Math.exp(-x)),
  tanh: (x) => Math.tanh(x)
}

const NeuralActivation = () => {
  const [range, setRange] = useState(4)

  const data = useMemo(() => {
    const pts = []
    for (let x = -range; x <= range; x += range / 20) {
      pts.push({
        x: Number(x.toFixed(2)),
        relu: Number(activations.relu(x).toFixed(3)),
        sigmoid: Number(activations.sigmoid(x).toFixed(3)),
        tanh: Number(activations.tanh(x).toFixed(3))
      })
    }
    return pts
  }, [range])

  return (
    <div className="experiment-page">
      <div className="experiment-header">
        <h1>Neural Activations</h1>
        <p>Compare ReLU, sigmoid, and tanh activation curves.</p>
      </div>

      <div className="experiment-content">
        <div className="experiment-main">
          <div className="graph-section">
            <h2>Activation Curves</h2>
            <p className="section-subtitle">Output vs input</p>
            <div className="graph-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" label={{ value: 'Input', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Activation', angle: -90, position: 'insideLeft' }} domain={[-1.1, 1.5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="relu" stroke="#1a73e8" strokeWidth={2} dot={false} name="ReLU" />
                  <Line type="monotone" dataKey="sigmoid" stroke="#e65100" strokeWidth={2} dot={false} name="Sigmoid" />
                  <Line type="monotone" dataKey="tanh" stroke="#7b1fa2" strokeWidth={2} dot={false} name="Tanh" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="experiment-sidebar">
          <div className="parameters-section">
            <h3>Parameters</h3>
            <p className="section-subtitle">Adjust input range</p>

            <div className="parameter-control">
              <label>Input Range (±)</label>
              <input type="range" min="2" max="10" step="0.5" value={range} onChange={(e) => setRange(parseFloat(e.target.value))} className="slider" />
              <span className="parameter-value">±{range.toFixed(1)}</span>
            </div>
          </div>

          <div className="key-concepts">
            <h3>Key Concepts</h3>
            <ul>
              <li>Non-linear activation shapes</li>
              <li>Saturation vs linear regions</li>
              <li>ReLU sparsity</li>
              <li>Sigmoid/tanh bounds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeuralActivation

