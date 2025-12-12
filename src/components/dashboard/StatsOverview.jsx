import React from 'react'

const StatsOverview = ({ stats }) => {
    const { totalTime, experimentsCompleted, avgQuizScore, totalQuizzes } = stats

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        return `${hours}h ${minutes}m`
    }

    const cards = [
        {
            label: 'Total Time',
            value: formatTime(totalTime),
            icon: '⏱️',
            color: '#3b82f6'
        },
        {
            label: 'Experiments Accessed',
            value: experimentsCompleted,
            icon: '🔬',
            color: '#10b981'
        },
        {
            label: 'Avg Quiz Score',
            value: `${avgQuizScore}%`,
            icon: '📊',
            color: '#f59e0b'
        },
        {
            label: 'Quizzes Taken',
            value: totalQuizzes,
            icon: '📝',
            color: '#8b5cf6'
        }
    ]

    return (
        <div className="stats-grid">
            {cards.map((card, index) => (
                <div key={index} className="stat-card" style={{ borderTop: `4px solid ${card.color}` }}>
                    <div className="stat-icon" style={{ background: `${card.color}20` }}>{card.icon}</div>
                    <div className="stat-content">
                        <h3>{card.value}</h3>
                        <p>{card.label}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatsOverview
