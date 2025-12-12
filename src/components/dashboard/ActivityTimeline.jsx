import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const ActivityTimeline = ({ activities }) => {
    if (!activities || activities.length === 0) {
        return (
            <div className="timeline-empty">
                <p>No recent activity found.</p>
            </div>
        )
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case 'simulation_start': return '🧪'
            case 'simulation_end': return '🏁'
            case 'quiz_start': return '📝'
            case 'quiz_complete': return '🏆'
            case 'experiment_view': return '📖'
            default: return '📍'
        }
    }

    const getActivityText = (activity) => {
        const { activity_type, experiment_id, metadata } = activity
        const expName = experiment_id?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

        switch (activity_type) {
            case 'simulation_start':
                return `Started ${expName} simulation`
            case 'simulation_end':
                return `Completed ${expName} simulation session`
            case 'quiz_start':
                return `Started ${expName} quiz`
            case 'quiz_complete':
                return `Completed ${expName} quiz with score ${metadata?.score}/${metadata?.total} (${metadata?.percentage}%)`
            case 'experiment_view':
                return `Studying ${expName}`
            default:
                return 'Activity logged'
        }
    }

    return (
        <div className="activity-timeline">
            <h3>Recent Activity</h3>
            <div className="timeline-list">
                {activities.map((activity) => (
                    <div key={activity.id} className="timeline-item">
                        <div className="timeline-icon">
                            {getActivityIcon(activity.activity_type)}
                        </div>
                        <div className="timeline-content">
                            <p className="timeline-text">{getActivityText(activity)}</p>
                            <span className="timeline-time">
                                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActivityTimeline
