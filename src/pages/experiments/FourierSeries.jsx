import React, { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import { useEffect } from 'react'
import './ExperimentPage.css'

const FourierSeries = () => {
  const [harmonics, setHarmonics] = useState(3)
  const [amplitude, setAmplitude] = useState(1)

  const data = useMemo(() => {
    const points = []
    for (let x = 0; x <= 2 * Math.PI; x += Math.PI / 24) {
      let y = 0
      for (let n = 1; n <= harmonics; n += 2) {
        y += (4 * amplitude / (Math.PI * n)) * Math.sin(n * x) // square wave series (odd harmonics)
      }
      points.push({ x: Number(x.toFixed(2)), y: Number(y.toFixed(3)) })
    }
    return points
  }, [harmonics, amplitude])

  const experiment = experiments.find(e => e.id === 'fourier-series')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('fourier-series')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('fourier-series', timeSpent)
      }
    }
  }, [isSimulationMode, simulationStartTime, logSimulationStart, logSimulationEnd])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>Fourier Series</h1>
          <p>Build a square-like wave using odd harmonics and see how the waveform changes.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="graph-section">
              <h2>Waveform</h2>
              <p className="section-subtitle">Odd harmonics of sine components</p>
              <div className="graph-container">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" label={{ value: 'Angle (rad)', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#6a1b9a" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
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
                    experimentId="fourier-series"
                    quiz={experiment.quiz}
                    experimentTitle={experiment.title}
                    onClose={() => setShowQuiz(false)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="experiment-sidebar">
            <div className="parameters-section">
              <h3>Parameters</h3>
              <p className="section-subtitle">Adjust the series</p>

              <div className="parameter-control">
                <label>Odd Harmonics Count</label>
                <input type="range" min="1" max="15" step="2" value={harmonics} onChange={(e) => setHarmonics(parseInt(e.target.value, 10))} className="slider" />
                <span className="parameter-value">{harmonics} harmonics</span>
              </div>

              <div className="parameter-control">
                <label>Amplitude</label>
                <input type="range" min="0.5" max="2" step="0.1" value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))} className="slider" />
                <span className="parameter-value">{amplitude.toFixed(1)}</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Fourier series decomposition</li>
                <li>Square wave approximation</li>
                <li>Gibbs phenomenon near edges</li>
                <li>Role of higher harmonics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default FourierSeries

