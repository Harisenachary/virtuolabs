import React, { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import StatsOverview from './StatsOverview'
import ActivityTimeline from './ActivityTimeline'
import ProgressCharts from './ProgressCharts'
import './Dashboard.css'

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalTime: 0,
        experimentsCompleted: 0,
        avgQuizScore: 0,
        totalQuizzes: 0
    })
    const [recentActivity, setRecentActivity] = useState([])
    const [quizData, setQuizData] = useState([])
    const [timeData, setTimeData] = useState([])

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            // Fetch user progress
            const { data: progress } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)

            // Fetch recent activity
            const { data: activity } = await supabase
                .from('activity_log')
                .select('*')
                .eq('user_id', user.id)
                .order('timestamp', { ascending: false })
                .limit(10)

            // Calculate Stats
            if (progress) {
                let totalTime = 0
                let totalScore = 0
                let quizCount = 0
                let experimentsAccessed = progress.length
                let quizChartData = []
                let timeChartData = []

                progress.forEach(p => {
                    // Aggregate Time (using updated column names)
                    totalTime += (p.total_time_spent || 0) + (p.simulation_time_spent || 0)

                    // Quiz Stats
                    if (p.quiz_best_percentage) {
                        totalScore += p.quiz_best_percentage
                        quizCount++
                    }

                    // Chart Data
                    const expName = p.experiment_id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

                    if (p.quiz_best_percentage) {
                        quizChartData.push({
                            name: expName,
                            score: p.quiz_best_percentage
                        })
                    }

                    if (p.simulation_time_spent > 60) {
                        timeChartData.push({
                            name: expName,
                            minutes: Math.round(p.simulation_time_spent / 60)
                        })
                    }
                })

                setStats({
                    totalTime,
                    experimentsCompleted: experimentsAccessed,
                    avgQuizScore: quizCount > 0 ? Math.round(totalScore / quizCount) : 0,
                    totalQuizzes: quizCount
                })

                setQuizData(quizChartData)
                setTimeData(timeChartData)
            }

            if (activity) {
                setRecentActivity(activity)
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="loading-spinner">Loading dashboard...</div>
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Student Dashboard</h1>
                <p className="welcome-text">Track your learning progress and performance</p>
            </div>

            <StatsOverview stats={stats} />

            <ProgressCharts quizData={quizData} timeData={timeData} />

            <div className="timeline-section">
                <ActivityTimeline activities={recentActivity} />
            </div>
        </div>
    )
}

export default Dashboard
