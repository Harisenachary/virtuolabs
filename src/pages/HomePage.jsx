import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels')
  const [selectedSort, setSelectedSort] = useState('Popularity')
  const [activeTab, setActiveTab] = useState('All')

  const experiments = [
    {
      id: 'simple-pendulum',
      title: 'Simple Pendulum',
      category: 'Physics',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      description: 'Study the motion of a simple pendulum'
    },
    {
      id: 'energy-gap',
      title: 'Energy Gap of P-N Junction',
      category: 'Physics',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      description: 'Measure the energy gap of a P-N junction diode'
    },
    {
      id: 'iv-characteristics',
      title: 'I-V Characteristics',
      category: 'Electrical Engineering',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      description: 'Analyze current-voltage characteristics'
    },
    {
      id: 'free-fall',
      title: 'Free Fall Motion',
      category: 'Physics',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      description: 'Explore free fall motion and gravity'
    },
    {
      id: 'projectile-motion',
      title: 'Projectile Motion',
      category: 'Physics',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      description: 'Study projectile motion trajectories'
    },
    {
      id: 'titration',
      title: 'Acid-Base Titration',
      category: 'Chemistry',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      description: 'Interactive acid-base titration simulation'
    },
    {
      id: 'buffer-capacity',
      title: 'Buffer Capacity',
      category: 'Chemistry',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1581091012184-7c54c53737c1?w=400',
      description: 'Visualize pH response to acid/base additions in buffers'
    },
    {
      id: 'reaction-rate',
      title: 'Reaction Rate (Arrhenius)',
      category: 'Chemistry',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400',
      description: 'Explore how temperature and activation energy affect rates'
    },
    {
      id: 'circuit-analysis',
      title: 'Circuit Analysis',
      category: 'Electrical Engineering',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      description: 'Analyze electrical circuits'
    },
    {
      id: 'rlc-resonance',
      title: 'RLC Resonance',
      category: 'Electrical Engineering',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
      description: 'Explore resonance frequency in RLC circuits'
    },
    {
      id: 'op-amp',
      title: 'Op-Amp Amplifier',
      category: 'Electrical Engineering',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
      description: 'Design inverting and non-inverting amplifiers'
    },
    {
      id: 'hookes-law',
      title: 'Hooke\'s Law',
      category: 'Physics',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
      description: 'Investigate spring constant and elastic potential energy'
    },
    {
      id: 'lens-optics',
      title: 'Lens Optics',
      category: 'Physics',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=400',
      description: 'Study focal length, image formation, and magnification'
    },
    {
      id: 'pid-control',
      title: 'PID Control Tuning',
      category: 'Advanced STEM',
      difficulty: 'Advanced',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
      description: 'Tune proportional, integral, and derivative gains'
    },
    {
      id: 'fourier-series',
      title: 'Fourier Series',
      category: 'Advanced STEM',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=400',
      description: 'Build signals with harmonics and see waveform changes'
    },
    {
      id: 'neural-activation',
      title: 'Neural Activations',
      category: 'Advanced STEM',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
      description: 'Compare ReLU, sigmoid, and tanh activation behaviors'
    }
  ]

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
        <h2>Explore Experiments</h2>
        
        <div className="experiment-tabs">
          <button 
            className={activeTab === 'All' ? 'active' : ''}
            onClick={() => setActiveTab('All')}
          >
            All
          </button>
          <button 
            className={activeTab === 'Featured' ? 'active' : ''}
            onClick={() => setActiveTab('Featured')}
          >
            Featured
          </button>
          <button 
            className={activeTab === 'Recent' ? 'active' : ''}
            onClick={() => setActiveTab('Recent')}
          >
            Recent
          </button>
          <button 
            className={activeTab === 'Resources' ? 'active' : ''}
            onClick={() => setActiveTab('Resources')}
          >
            Resources
          </button>
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

        <div className="experiments-count">
          {experiments.length} experiments available
        </div>

        <div className="experiments-grid">
          {experiments.map(exp => {
            const routeMap = {
              'simple-pendulum': '/experiments/simple-pendulum',
              'energy-gap': '/experiments/energy-gap',
              'iv-characteristics': '/experiments/iv-characteristics',
              'free-fall': '/experiments/free-fall',
              'projectile-motion': '/experiments/projectile-motion',
              'titration': '/experiments/titration',
              'circuit-analysis': '/experiments/circuit-analysis',
              'rlc-resonance': '/experiments/rlc-resonance',
              'op-amp': '/experiments/op-amp',
              'hookes-law': '/experiments/hookes-law',
              'lens-optics': '/experiments/lens-optics',
              'pid-control': '/experiments/pid-control',
              'buffer-capacity': '/experiments/buffer-capacity',
              'reaction-rate': '/experiments/reaction-rate',
              'fourier-series': '/experiments/fourier-series',
              'neural-activation': '/experiments/neural-activation'
            }
            return (
            <Link 
              key={exp.id} 
              to={routeMap[exp.id] || '#'}
              className="experiment-card"
            >
              <div className="experiment-image">
                <img src={exp.image} alt={exp.title} />
                <span className="experiment-category">{exp.category}</span>
              </div>
              <div className="experiment-info">
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
                <span className="experiment-difficulty">{exp.difficulty}</span>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomePage

