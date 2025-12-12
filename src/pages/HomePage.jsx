import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { experiments as experimentsData } from '../data/experiments'
import './HomePage.css'

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels')
  const [selectedSort, setSelectedSort] = useState('Popularity')
  const [activeTab, setActiveTab] = useState('All')

  // Enrich data with view-specific properties (images, description, difficulty)
  // In a real app, this might come from the DB too, but for now we merge or keep hardcoded 
  // if not in the shared file. The shared file only has id, title, category.
  // We'll map the shared ID to the extra details.

  const getExperimentDetails = (id) => {
    const details = {
      'simple-pendulum': {
        difficulty: 'Beginner',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        description: 'Study the motion of a simple pendulum'
      },
      'energy-gap': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        description: 'Measure the energy gap of a P-N junction diode'
      },
      'iv-characteristics': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        description: 'Analyze current-voltage characteristics'
      },
      'free-fall': {
        difficulty: 'Beginner',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        description: 'Explore free fall motion and gravity'
      },
      'projectile-motion': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
        description: 'Study projectile motion trajectories'
      },
      'titration': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
        description: 'Interactive acid-base titration simulation'
      },
      'buffer-capacity': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1581091012184-7c54c53737c1?w=400',
        description: 'Visualize pH response to acid/base additions in buffers'
      },
      'reaction-rate': {
        difficulty: 'Advanced',
        image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400',
        description: 'Explore how temperature and activation energy affect rates'
      },
      'circuit-analysis': {
        difficulty: 'Advanced',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        description: 'Analyze electrical circuits'
      },
      'rlc-resonance': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
        description: 'Explore resonance frequency in RLC circuits'
      },
      'op-amp': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
        description: 'Design inverting and non-inverting amplifiers'
      },
      'hookes-law': {
        difficulty: 'Beginner',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
        description: 'Investigate spring constant and elastic potential energy'
      },
      'lens-optics': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=400',
        description: 'Study focal length, image formation, and magnification'
      },
      'pid-control': {
        difficulty: 'Advanced',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
        description: 'Tune proportional, integral, and derivative gains'
      },
      'fourier-series': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=400',
        description: 'Build signals with harmonics and see waveform changes'
      },
      'neural-activation': {
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
        description: 'Compare ReLU, sigmoid, and tanh activation behaviors'
      }
    }
    return details[id] || {
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      description: 'Interactive STEM experiment'
    }
  }

  const experiments = experimentsData.map(exp => ({
    ...exp,
    ...getExperimentDetails(exp.id)
  }))

  const filteredExperiments = experiments.filter(exp => {
    const categoryMatch = selectedCategory === 'All Categories' || exp.category === selectedCategory || (selectedCategory === 'Advanced STEM' && exp.category === 'Advanced') || (selectedCategory === 'Electrical Engineering' && exp.category === 'Electrical')
    const difficultyMatch = selectedDifficulty === 'All Levels' || exp.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  return (
    <div className="homepage">
      <div className="welcome-banner">
        <h1>Welcome to VirtuoLabs</h1>
        <p>
          Experience interactive virtual labs designed for STEM education.
          Explore physics, chemistry, electrical engineering, and advanced concepts
          through immersive simulations.
        </p>
        <div className="banner-buttons">
          <Link to="/" className="btn btn-primary">Explore Experiments</Link>
          <Link to="/dashboard" className="btn btn-secondary">Learn More</Link>
        </div>
      </div>

      <div className="experiments-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1>Explore Experiments</h1>
            <p style={{ color: '#666' }}>Select a simulation to begin learning</p>
          </div>
          <div className="experiments-count">
            {filteredExperiments.length} available
          </div>
        </div>

        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option>All Categories</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Electrical Engineering</option>
            <option>Advanced STEM</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="filter-select"
          >
            <option>Popularity</option>
            <option>Recent</option>
            <option>Alphabetical</option>
          </select>
        </div>

        <div className="experiments-grid">
          {filteredExperiments.map(exp => (
            <Link
              key={exp.id}
              to={`/experiments/${exp.id}`}
              className="experiment-card"
            >
              <div className="experiment-image">
                <img src={exp.image} alt={exp.title} />
                <span className="experiment-category">{exp.category}</span>
              </div>
              <div className="experiment-info">
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span className="experiment-difficulty">{exp.difficulty}</span>
                  <span style={{ fontSize: '0.9rem', color: '#1a73e8' }}>Start →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

