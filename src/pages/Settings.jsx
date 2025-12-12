import React, { useState, useEffect } from 'react'
import './Settings.css'

const Settings = () => {
    const [idleTime, setIdleTime] = useState(60)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('virtuolabs_settings')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                if (parsed.idleThreshold) setIdleTime(parsed.idleThreshold)
            } catch (e) {
                console.error("Error parsing settings", e)
            }
        }
    }, [])

    const handleSave = () => {
        const settings = { idleThreshold: parseInt(idleTime) }
        localStorage.setItem('virtuolabs_settings', JSON.stringify(settings))

        // Dispatch custom event to notify AITutor immediately
        window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }))

        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="settings-container">
            <h1>User Settings</h1>

            <div className="setting-card">
                <h2>AI Assistant Configuration</h2>

                <div className="setting-group">
                    <label>Idle Alert Time (seconds)</label>
                    <p className="setting-desc">How long should the screen remain constant before the AI asks if you need help?</p>
                    <input
                        type="number"
                        value={idleTime}
                        onChange={(e) => setIdleTime(e.target.value)}
                        min="10"
                        max="600"
                    />
                </div>

                <div className="setting-actions">
                    <button className="save-btn" onClick={handleSave}>
                        {saved ? 'Saved!' : 'Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
