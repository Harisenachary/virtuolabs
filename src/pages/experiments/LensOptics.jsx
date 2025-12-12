import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { experiments } from '../../data/experiments'
import ExperimentTheory from '../../components/ExperimentTheory'
import ExperimentQuiz from '../../components/ExperimentQuiz'
import { useActivityLogger } from '../../hooks/useActivityLogger'
import './ExperimentPage.css'

const LensOptics = () => {
  const [focalLength, setFocalLength] = useState(10)
  const [objectDistance, setObjectDistance] = useState(25)

  const imageDistance = 1 / ((1 / focalLength) - (1 / objectDistance))
  const magnification = -(imageDistance / objectDistance)

  const experiment = experiments.find(e => e.id === 'lens-optics')
  const [searchParams] = useSearchParams()
  const isSimulationMode = searchParams.get('tab') === 'simulation'
  const [showQuiz, setShowQuiz] = useState(false)
  const [simulationStartTime] = useState(Date.now())
  const { logSimulationStart, logSimulationEnd } = useActivityLogger()

  // Log simulation start
  useEffect(() => {
    if (isSimulationMode) {
      logSimulationStart('lens-optics')
      return () => {
        const timeSpent = Math.floor((Date.now() - simulationStartTime) / 1000)
        logSimulationEnd('lens-optics', timeSpent)
      }
    }
  }, [isSimulationMode, simulationStartTime, logSimulationStart, logSimulationEnd])

  if (isSimulationMode) {
    return (
      <div className="experiment-page">
        <div className="experiment-header">
          <h1>Lens Optics</h1>
          <p>Explore focal length, image distance, and magnification.</p>
        </div>

        <div className="experiment-content">
          <div className="experiment-main">
            <div className="simulation-section">
              <h2>Thin Lens Simulation</h2>
              <p className="section-subtitle">Use lens formula 1/f = 1/v + 1/u</p>

              <div className="projectile-visualization">
                <div className="projectile-container" style={{ maxWidth: '500px' }}>
                  <div className="ground-line" style={{ bottom: '50%' }}></div>
                  <div
                    className="projectile-object"
                    style={{ left: '15%', bottom: '55%', fontSize: '1.2rem' }}
                  >
                    📦 Object
                  </div>
                  <div
                    className="projectile-object"
                    style={{ left: '55%', bottom: '55%', fontSize: '1.2rem' }}
                  >
                    🔍 Lens
                  </div>
                  <div
                    className="projectile-object"
                    style={{ left: '85%', bottom: magnification < 0 ? '45%' : '65%', fontSize: '1.2rem' }}
                  >
                    🖼️ Image
                  </div>
                </div>
              </div>

              <div className="diode-readings">
                <div className="reading-item">
                  <span className="reading-label">Image Distance (v):</span>
                  <span className="reading-value">{imageDistance.toFixed(2)} cm</span>
                </div>
                <div className="reading-item">
                  <span className="reading-label">Magnification (m):</span>
                  <span className="reading-value">{magnification.toFixed(2)}x</span>
                </div>
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
                    experimentId="lens-optics"
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
              <p className="section-subtitle">Adjust lens setup</p>

              <div className="parameter-control">
                <label>Focal Length (cm)</label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={focalLength}
                  onChange={(e) => setFocalLength(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{focalLength.toFixed(0)} cm</span>
              </div>

              <div className="parameter-control">
                <label>Object Distance (cm)</label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={objectDistance}
                  onChange={(e) => setObjectDistance(parseFloat(e.target.value))}
                  className="slider"
                />
                <span className="parameter-value">{objectDistance.toFixed(0)} cm</span>
              </div>
            </div>

            <div className="key-concepts">
              <h3>Key Concepts</h3>
              <ul>
                <li>Lens formula: 1/f = 1/v + 1/u</li>
                <li>Real vs virtual images</li>
                <li>Magnification sign and size</li>
                <li>Focal length effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div >
    )
  }

  return <ExperimentTheory experiment={experiment} />
}

export default LensOptics

