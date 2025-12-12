import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient'

/**
 * Hook to track user session time and activity
 * Automatically starts when user is logged in
 * Saves session data to database on logout or page close
 */
export const useSessionTracker = () => {
    const [sessionId, setSessionId] = useState(null)
    const [sessionTime, setSessionTime] = useState(0) // seconds
    const [isActive, setIsActive] = useState(true)
    const [experimentsAccessed, setExperimentsAccessed] = useState(new Set())

    const sessionStartRef = useRef(null)
    const lastActivityRef = useRef(Date.now())
    const intervalRef = useRef(null)
    const IDLE_TIMEOUT = 5 * 60 * 1000 // 5 minutes in milliseconds

    // Start session when user logs in
    useEffect(() => {
        const startSession = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user && !sessionId) {
                // Create new session in database
                const { data, error } = await supabase
                    .from('session_tracking')
                    .insert({
                        user_id: user.id,
                        session_start: new Date().toISOString(),
                        experiments_accessed: [],
                        quizzes_taken: 0,
                        activities_count: 0
                    })
                    .select()
                    .single()

                if (data && !error) {
                    setSessionId(data.id)
                    sessionStartRef.current = Date.now()
                }
            }
        }

        startSession()
    }, [sessionId])

    // Track session time with idle detection
    useEffect(() => {
        if (!sessionId) return

        // Update session time every second
        intervalRef.current = setInterval(() => {
            const now = Date.now()
            const timeSinceLastActivity = now - lastActivityRef.current

            // Check if user is idle (no activity for IDLE_TIMEOUT)
            if (timeSinceLastActivity > IDLE_TIMEOUT) {
                setIsActive(false)
            } else {
                setIsActive(true)
                setSessionTime(prev => prev + 1)
            }
        }, 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [sessionId])

    // Track user activity to reset idle timer
    useEffect(() => {
        const handleActivity = () => {
            lastActivityRef.current = Date.now()
            setIsActive(true)
        }

        // Listen for user activity
        window.addEventListener('mousemove', handleActivity)
        window.addEventListener('keydown', handleActivity)
        window.addEventListener('scroll', handleActivity)
        window.addEventListener('click', handleActivity)

        return () => {
            window.removeEventListener('mousemove', handleActivity)
            window.removeEventListener('keydown', handleActivity)
            window.removeEventListener('scroll', handleActivity)
            window.removeEventListener('click', handleActivity)
        }
    }, [])

    // Save session on page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            endSession()
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [sessionId, sessionTime, experimentsAccessed])

    // End session function
    const endSession = async () => {
        if (!sessionId) return

        try {
            await supabase
                .from('session_tracking')
                .update({
                    session_end: new Date().toISOString(),
                    duration: sessionTime,
                    experiments_accessed: Array.from(experimentsAccessed)
                })
                .eq('id', sessionId)
        } catch (error) {
            console.error('Error ending session:', error)
        }
    }

    // Track experiment access
    const trackExperimentAccess = (experimentId) => {
        setExperimentsAccessed(prev => new Set([...prev, experimentId]))
    }

    // Update quiz count
    const incrementQuizCount = async () => {
        if (!sessionId) return

        await supabase
            .from('session_tracking')
            .update({
                quizzes_taken: supabase.rpc('increment', { row_id: sessionId })
            })
            .eq('id', sessionId)
    }

    // Format time for display
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`
        } else {
            return `${secs}s`
        }
    }

    return {
        sessionId,
        sessionTime,
        formattedTime: formatTime(sessionTime),
        isActive,
        trackExperimentAccess,
        incrementQuizCount,
        endSession
    }
}

export default useSessionTracker
