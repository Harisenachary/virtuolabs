
import { supabase } from '../supabaseClient'
import { useCallback, useMemo } from 'react'

/**
 * Hook to log detailed user activities
 * Logs events to activity_log table for analytics
 */
export const useActivityLogger = () => {

    const logActivity = useCallback(async (activityType, experimentId = null, metadata = {}) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) return

            await supabase.from('activity_log').insert({
                user_id: user.id,
                activity_type: activityType,
                experiment_id: experimentId,
                metadata: metadata,
                timestamp: new Date().toISOString()
            })
        } catch (error) {
            console.error('Error logging activity:', error)
        }
    }, [])

    // Specific activity logging functions
    const logSimulationStart = useCallback(async (experimentId) => {
        await logActivity('simulation_start', experimentId)

        // Update user_progress
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            try {
                // Fetch existing progress to increment attempts
                const { data: existing } = await supabase
                    .from('user_progress')
                    .select('simulation_attempts')
                    .match({ user_id: user.id, experiment_id: experimentId })
                    .single()

                const attempts = (existing?.simulation_attempts || 0) + 1

                await supabase
                    .from('user_progress')
                    .upsert({
                        user_id: user.id,
                        experiment_id: experimentId,
                        simulation_started_at: new Date().toISOString(),
                        simulation_attempts: attempts,
                        last_accessed: new Date().toISOString()
                    }, {
                        onConflict: 'user_id,experiment_id'
                    })
            } catch (err) {
                console.error('Error updating progress start:', err)
            }
        }
    }, [logActivity])

    const logSimulationEnd = useCallback(async (experimentId, timeSpent) => {
        await logActivity('simulation_end', experimentId, { timeSpent })

        // Update user_progress
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            try {
                // Fetch existing progress to update time
                const { data: existing } = await supabase
                    .from('user_progress')
                    .select('simulation_time_spent, total_time_spent')
                    .match({ user_id: user.id, experiment_id: experimentId })
                    .single()

                const currentSimTime = existing?.simulation_time_spent || 0
                const currentTotalTime = existing?.total_time_spent || 0

                await supabase
                    .from('user_progress')
                    .upsert({
                        user_id: user.id,
                        experiment_id: experimentId,
                        simulation_completed_at: new Date().toISOString(),
                        simulation_time_spent: currentSimTime + timeSpent,
                        total_time_spent: currentTotalTime + timeSpent
                    }, {
                        onConflict: 'user_id,experiment_id'
                    })
            } catch (err) {
                console.error('Error updating progress end:', err)
            }
        }
    }, [logActivity])

    const logQuizStart = useCallback(async (experimentId) => {
        await logActivity('quiz_start', experimentId)
    }, [logActivity])

    const logQuizComplete = useCallback(async (experimentId, score, total, percentage, timeTaken) => {
        await logActivity('quiz_complete', experimentId, {
            score,
            total,
            percentage,
            timeTaken
        })

        // Update user_progress with best score
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            try {
                // Get existing best score
                const { data: existing } = await supabase
                    .from('user_progress')
                    .select('quiz_best_score, quiz_attempts, quiz_best_percentage')
                    .match({ user_id: user.id, experiment_id: experimentId })
                    .single()

                const isBestScore = !existing || existing.quiz_best_score === null || score > existing.quiz_best_score
                const attempts = (existing?.quiz_attempts || 0) + 1

                await supabase
                    .from('user_progress')
                    .upsert({
                        user_id: user.id,
                        experiment_id: experimentId,
                        quiz_score: score,
                        quiz_total: total,
                        quiz_percentage: percentage,
                        quiz_best_score: isBestScore ? score : existing?.quiz_best_score,
                        quiz_best_percentage: isBestScore ? percentage : existing?.quiz_best_percentage,
                        quiz_attempts: attempts,
                        score: isBestScore ? Math.round(percentage) : existing?.score, // Ensure generic score is percentage
                        last_accessed: new Date().toISOString()
                    }, {
                        onConflict: 'user_id,experiment_id'
                    })
            } catch (err) {
                console.error('Error updating quiz progress:', err)
            }
        }
    }, [logActivity])

    const logTheoryView = useCallback(async (experimentId) => {
        await logActivity('theory_view', experimentId)
    }, [logActivity])

    const logSimulationRun = useCallback(async (experimentId, parameters = {}) => {
        await logActivity('simulation_run', experimentId, { parameters })
    }, [logActivity])

    const logParameterChange = useCallback(async (experimentId, parameter, value) => {
        await logActivity('parameter_change', experimentId, { parameter, value })
    }, [logActivity])

    return useMemo(() => ({
        logActivity,
        logSimulationStart,
        logSimulationEnd,
        logQuizStart,
        logQuizComplete,
        logTheoryView,
        logSimulationRun,
        logParameterChange
    }), [
        logActivity,
        logSimulationStart,
        logSimulationEnd,
        logQuizStart,
        logQuizComplete,
        logTheoryView,
        logSimulationRun,
        logParameterChange
    ])
}

export default useActivityLogger
