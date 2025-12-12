import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { experiments, categories } from '../data/experiments'
import './Simulations.css'

const Simulations = () => {
    const [selectedSubject, setSelectedSubject] = useState(null)

    // Group experiments by category
    const experimentsBySubject = experiments.reduce((acc, exp) => {
        // Map data category to display category
        const categoryMap = {
            'Physics': 'Physics',
            'Chemistry': 'Chemistry',
            'Electrical': 'Electrical',
            'Advanced': 'Advanced'
        }
        const key = categoryMap[exp.category] || exp.category
        if (!acc[key]) acc[key] = []
        acc[key].push(exp)
        return acc
    }, {})

    return (
        <div className="simulations-page">
            <div className="simulations-header">
                <h1>Interactive Simulations</h1>
                <p>Select a subject to explore virtual experiments and run simulations.</p>
            </div>

            <div className="subjects-grid">
                {Object.entries(categories).map(([key, info]) => (
                    <div
                        key={key}
                        className={`subject-card ${selectedSubject === key ? 'active' : ''}`}
                        onClick={() => setSelectedSubject(key === selectedSubject ? null : key)}
                        style={{ '--subject-color': info.color }}
                    >
                        <div className="subject-icon">{info.icon}</div>
                        <h3>{key}</h3>
                        <span className="scount">
                            {experimentsBySubject[key]?.length || 0} Simulations
                        </span>
                    </div>
                ))}
            </div>

            {selectedSubject && (
                <div className="simulations-list-container">
                    <h2 style={{ color: categories[selectedSubject].color }}>
                        {selectedSubject} Simulations
                    </h2>
                    <div className="simulations-list">
                        {experimentsBySubject[selectedSubject]?.map(exp => (
                            <div key={exp.id} className="simulation-item-card">
                                <h4>{exp.title}</h4>
                                <div className="sim-actions">
                                    <Link
                                        to={`/experiments/${exp.id}?tab=simulation`}
                                        className="btn-launch"
                                        style={{ backgroundColor: categories[selectedSubject].color }}
                                    >
                                        ▶ Launch Simulation
                                    </Link>
                                    <Link
                                        to={`/experiments/${exp.id}?tab=theory`}
                                        className="link-theory"
                                    >
                                        Read Theory
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Simulations
