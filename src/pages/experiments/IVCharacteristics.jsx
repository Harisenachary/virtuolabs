import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const IVCharacteristics = () => {
  const [scale, setScale] = useState('linear')

  // Generate I-V characteristic data
  const generateData = () => {
    const data = []
    for (let v = 0; v <= 1.45; v += 0.05) {
      let current = 0
      if (v < 1.3) {
        current = Math.pow(10, -12) // Very small reverse/leakage current
      } else {
        // Exponential rise after threshold
        current = Math.exp((v - 1.3) * 15) * 0.001
        if (current > 8) current = 8
      }
      data.push({ voltage: v.toFixed(2), current: current.toFixed(6) })
    }
    return data
  }

  const data = generateData()

  const experiment = experiments.find(e => e.id === 'iv-characteristics')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('iv-characteristics')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('iv-characteristics', timeSpent)
      }
    }
  }, [isSimulationMode])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>I-V Characteristics</h1>
          <p>Current vs Voltage relationship</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="graph-section">
              <div className="scale-selector">
                <button
                  className={scale === 'linear' ? 'scale-btn active' : 'scale-btn'}
                  onClick={() => setScale('linear')}
                >
                  Linear Scale
                </button>
                <button
                  className={scale === 'log' ? 'scale-btn active' : 'scale-btn'}
                  onClick={() => setScale('log')}
                >
                  Log Scale
                </button>
              </div>

              <div className="simulation-controls" style={{ marginLeft: 'auto' }}>
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
                      experimentId="iv-characteristics"
                      quiz={experiment.quiz}
                      experimentTitle={experiment.title}
                      onClose={() => setShowQuiz(false)}
                    />
                  </div>
                </div>
              )}

              <div className="graph-container">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="voltage"
                      label={{ value: 'Voltage (V)', position: 'insideBottom', offset: -5 }}
                      domain={[0, 1.45]}
                    />
                    <YAxis
                      label={{ value: 'Current (A)', angle: -90, position: 'insideLeft' }}
                      domain={scale === 'log' ? ['auto', 'auto'] : [0, 8]}
                      scale={scale === 'log' ? 'log' : 'linear'}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#1a73e8"
                      strokeWidth={2}
                      dot={false}
                      name="current"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="theory-section">
              <h2>Theory</h2>

              <div className="theory-content">
                <h3>P-N Junction Diode</h3>
                <p>
                  A P-N junction diode is formed by joining p-type and n-type semiconductors.
                  The energy gap determines the electrical properties of the diode.
                </p>

                <h3>Energy Gap Measurement</h3>
                <p>
                  The energy gap can be determined by analyzing the I-V characteristics.
                  At low voltages, the current is minimal due to the energy barrier.
                  As the voltage approaches the threshold voltage (related to the energy gap),
                  the current increases exponentially.
                </p>

                <h3>Forward Bias</h3>
                <p>
                  When forward biased, the applied voltage reduces the potential barrier,
                  allowing majority carriers to cross the junction. The current increases
                  exponentially with voltage after the threshold voltage is reached.
                </p>

                <h3>Reverse Bias</h3>
                <p>
                  Under reverse bias, the potential barrier increases, and only a small
                  leakage current flows. The diode acts as an insulator in this region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default IVCharacteristics

