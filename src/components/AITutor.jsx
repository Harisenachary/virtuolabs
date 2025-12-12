import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { experiments } from '../data/experiments'
import './AITutor.css'

const AITutor = () => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your Virtual Lab Assistant. I'm here to help you learn.", sender: 'ai' }
    ])
    const [experimentId, setExperimentId] = useState(null)
    const [idleTime, setIdleTime] = useState(0)

    const [hasNotifiedIdle, setHasNotifiedIdle] = useState(false)
    const [idleThreshold, setIdleThreshold] = useState(300) // Default 5 minutes

    // Load Settings
    useEffect(() => {
        const loadSettings = () => {
            const stored = localStorage.getItem('virtuolabs_settings')
            if (stored) {
                try {
                    const parsed = JSON.parse(stored)
                    if (parsed.idleThreshold) setIdleThreshold(parsed.idleThreshold)
                } catch (e) {
                    console.error(e)
                }
            }
        }
        loadSettings()

        const handleSettingsChange = (e) => {
            if (e.detail && e.detail.idleThreshold) {
                setIdleThreshold(e.detail.idleThreshold)
            }
        }

        window.addEventListener('settingsChanged', handleSettingsChange)
        return () => window.removeEventListener('settingsChanged', handleSettingsChange)
    }, [])

    // Voice Input State
    const [isListening, setIsListening] = useState(false)
    const recognitionRef = React.useRef(null)

    // Animation states
    const [isBouncing, setIsBouncing] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Speech Synthesis
    const speak = (text) => {
        if (isMuted || !window.speechSynthesis) return

        // Cancel previous speech to avoid overlap
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 1.0
        utterance.pitch = 1.1
        utterance.volume = 1.0

        const voices = window.speechSynthesis.getVoices()
        const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.includes('en')) || voices[0]
        if (preferredVoice) utterance.voice = preferredVoice

        window.speechSynthesis.speak(utterance)
    }

    // Speak when new AI message is added
    useEffect(() => {
        const lastMsg = messages[messages.length - 1]
        // Only speak if it's a NEW message (we check ID or just leverage dependency change)
        // And if sender is AI
        if (lastMsg && lastMsg.sender === 'ai') {
            speak(lastMsg.text)
        }
    }, [messages])

    // Detect current experiment
    useEffect(() => {
        const path = location.pathname
        if (path.includes('/experiments/')) {
            const id = path.split('/experiments/')[1]
            setExperimentId(id)
            // Reset messages on experiment change? Maybe keep history?
            // Removed automatic speech announcement as per user request
            // addMessage(`You are now viewing ${id}. Let me know if you need help!`, 'ai')
        } else {
            setExperimentId(null)
        }
    }, [location.pathname])

    // Idle Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setIdleTime(prev => prev + 1)
        }, 1000)

        const resetIdle = () => {
            setIdleTime(0)
            setHasNotifiedIdle(false)
            setIsBouncing(false)
        }
        window.addEventListener('mousemove', resetIdle)
        window.addEventListener('keydown', resetIdle)
        window.addEventListener('click', resetIdle)
        window.addEventListener('scroll', resetIdle)

        return () => {
            clearInterval(timer)
            window.removeEventListener('mousemove', resetIdle)
            window.removeEventListener('keydown', resetIdle)
            window.removeEventListener('click', resetIdle)
            window.removeEventListener('scroll', resetIdle)
        }
    }, [])

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = false // Disable continuous to listen to full thought then stop
            recognitionRef.current.interimResults = false
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onresult = (event) => {
                // Get the latest result
                const lastResultIndex = event.results.length - 1
                const transcript = event.results[lastResultIndex][0].transcript

                // Only process if valid text
                if (transcript.trim()) {
                    addMessage(transcript, 'user')

                    // Process response
                    setTimeout(() => {
                        const response = generateResponse(transcript)
                        addMessage(response, 'ai')
                    }, 500)
                }
            }

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error)
                // If error is 'no-speech', we might want to ignore.
                if (event.error !== 'no-speech') {
                    setIsListening(false)
                }
            }

            recognitionRef.current.onend = () => {
                // If user meant to keep listening, we might need to restart,
                // but usually 'continuous' handles it.
                // We'll trust the button toggle for explicit stop.
                // But browsers force stop sometimes.
                // For now, let's sync state.
                // If we think we are listening but browser stopped, update state
                // OR autorestart? Autorestart is aggressive.
                // Let's just sync state to stopped so UI shows button correct.
                setIsListening(false)
            }
        }
    }, [])

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition not supported in this browser. Try Chrome.')
            return
        }
        if (isListening) {
            recognitionRef.current.stop()
        } else {
            recognitionRef.current.start()
            setIsListening(true)
        }
    }
    // Check Rules
    useEffect(() => {
        // Global Idle Rule (Applies everywhere now)
        if (idleTime >= idleThreshold && !hasNotifiedIdle) {
            // Only if experiment is active give specific help, else generic
            const msg = experimentId
                ? "I noticed you've been inactive for 5 minutes. Suggestion: Check the 'Procedure' tab or ask me 'How do I start?'"
                : "It's been a while! Why not explore the 'Free Fall' or 'Pendulum' experiments?"

            addMessage(msg, 'ai')
            setIsOpen(true)
            setHasNotifiedIdle(true)
            triggerBounce()
        }

        if (!experimentId) return // Skip specific rules if not in experiment

        // Rule 2: Realtime Quiz Monitoring
        const subscription = supabase
            .channel('public:user_progress')
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'user_progress', filter: `experiment_id=eq.${experimentId}` },
                (payload) => {
                    const newData = payload.new
                    if (newData.quiz_percentage !== undefined) {
                        if (newData.quiz_percentage < 60) {
                            addMessage("I noticed you struggled a bit with the quiz. Would you like me to explain the key concepts again?", 'ai')
                            setIsOpen(true)
                        } else if (newData.quiz_percentage === 100) {
                            addMessage("Perfect score! Great job mastering this topic!", 'ai')
                            setIsOpen(true)
                        }
                    }
                    if (newData.simulation_attempts > 5 && newData.simulation_attempts % 5 === 0) {
                        addMessage("You seem to be trying this simulation many times. Would you like a hint on how to proceed?", 'ai')
                        setIsOpen(true)
                    }
                }
            )
            .subscribe()

        return () => supabase.removeChannel(subscription)

    }, [idleTime, experimentId])

    const addMessage = (text, sender) => {
        setMessages(prev => {
            const lastMsg = prev[prev.length - 1]
            // Deduplication
            if (lastMsg && lastMsg.text === text && lastMsg.sender === sender) {
                return prev
            }
            return [...prev, { id: Date.now(), text, sender }]
        })
    }

    const handleUserMessage = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            const text = e.target.value
            addMessage(text, 'user')
            e.target.value = ''

            // Simple Response Logic
            setTimeout(() => {
                const response = generateResponse(text)
                addMessage(response, 'ai')
            }, 1000)
        }
    }

    // Enhanced AI Response Logic
    const generateResponse = (input) => {
        const lower = input.toLowerCase()

        // 1. Check for specific definition requests (Common Dictionary)
        const dictionary = {
            'velocity': "Velocity is just speed with a direction! Like saying '50 miles per hour North'.",
            'gravity': "Gravity is the invisible pull that brings everything down to Earth. It's what keeps us from floating away!",
            'pendulum': "A pendulum is a weight hanging from a string that swings back and forth. It's used to tell time and measure gravity!",
            'voltage': "Voltage is like the electrical pressure that pushes current through a circuit. Higher voltage means more push!",
            'current': "Current is the actual flow of electrons through a wire, similar to water flowing through a pipe.",
            'resistance': "Resistance is how much a material fights against the flow of electricity. It's like a narrow section in a water pipe.",
            'lens': "A lens is a curved piece of transparent material that bends light to focus or spread it out.",
            'friction': "Friction is a force that opposes motion between two surfaces that are touching.",
            'force': "A force is a push or a pull upon an object resulting from its interaction with another object.",
            'resonance': "Resonance happens when a system is driven at its natural frequency, causing large vibrations or signals.",
            'frequency': "Frequency is how often something happens per second, measured in Hertz (Hz).",
            'amplitude': "Amplitude is the maximum extent of a vibration or oscillation, measured from the position of equilibrium.",
            'capacitor': "A capacitor is a device that stores electrical energy in an electric field. Think of it like a small battery that charges and discharges very quickly.",
            'inductor': "An inductor is a coil of wire that stores energy in a magnetic field when current flows through it.",
            'titration': "Titration is a technique where a solution of known concentration is used to determine the concentration of an unknown solution.",
            'buffer': "A buffer is a solution that resists changes in pH when small amounts of acid or base are added.",
            'pka': "pKa is a number that describes how acidic a particular hydrogen atom in a molecule is. Lower pKa means stronger acid.",
            'activation': "Activation function determines if a neuron should fire. Common ones are ReLU, Sigmoid, and Tanh.",
            'pid': "PID stands for Proportional-Integral-Derivative. It's a control loop mechanism used to correct errors in a system automatically.",
            'diode': "A diode is an electronic component that allows current to flow in only one direction. It's like a one-way valve for electricity!",
            'transistor': "A transistor is a semiconductor device used to amplify or switch electrical signals and power.",
            'relativity': "General relativity explains gravity as the curvature of spacetime caused by mass and energy.",
            'quantum': "Quantum mechanics deals with the behavior of matter and light on the atomic and subatomic scale.",
            'thermodynamics': "Thermodynamics is the branch of physics that deals with heat, work, and temperature, and their relation to energy and radiation."
        }

        // Check dictionary matches
        for (const [key, value] of Object.entries(dictionary)) {
            if (lower.includes(key)) return value
        }

        // 2. Dynamic Search in Experiments Data
        // Search for theory or formulas matching the user query
        if (experiments) {
            for (const exp of experiments) {
                // Check if query mentions the experiment title significantly
                const titleWords = exp.title.toLowerCase().split(' ').filter(w => w.length > 3)
                const isAboutExperiment = titleWords.some(w => lower.includes(w))

                if (isAboutExperiment || (experimentId === exp.id && lower.includes('this experiment'))) {
                    if (lower.includes('formula') || lower.includes('equation')) {
                        if (exp.formulas && exp.formulas.length > 0) {
                            const f = exp.formulas[0]
                            return `For ${exp.title}, a key formula is ${f.label}: ${f.equation}.`
                        }
                        return `I don't have a specific formula list for ${exp.title} right here.`
                    }
                    if (lower.includes('conduct') || lower.includes('procedure') || lower.includes('do')) {
                        if (exp.procedure && exp.procedure.length > 0) {
                            return `To do the ${exp.title} experiment: ${exp.procedure[0]} Check the procedure tab for full steps!`
                        }
                    }
                    // Extract first meaningful sentence from theory
                    const theoryClean = exp.theory.replace(/###/g, '').replace(/\*/g, '').split('\n').filter(l => l.trim().length > 20)[0]
                    if (theoryClean) return `Here is some info on ${exp.title}: ${theoryClean}`
                }
            }
        }

        if (lower.includes('explain') || lower.includes('what is')) {
            return "I can explain many concepts! Try asking about 'Resonance', 'Titration', 'Theory of Relativity' or standard physics terms."
        }

        if (lower.includes('help')) return "I can explain concepts like 'Gravity', 'Voltage', 'Resonance', 'Titration' or help you with the current experiment."
        if (lower.includes('confusion') || lower.includes('confus')) return "Don't worry! Physics and Science can be tricky. Ask me about a specific term you see on the screen."
        if (lower.includes('quiz')) return "The quiz questions are based on the Theory section. Make sure to read it through!"

        // Default fallback with more personality
        const fallbacks = [
            "That's a great question! I'm constantly learning. Try asking me about 'Velocity', 'Resonance', 'Titration', or 'PID Control'.",
            "I'm not sure I know that one yet, but I'm great at Physics and Chemistry! Ask me about 'Gravity' or 'Acids'.",
            "Could you rephrase that? I can tell you about formulas, theories, or definitions for our experiments."
        ]
        return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    }

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    // Trigger Bounce
    const triggerBounce = () => {
        setIsBouncing(true)
        setTimeout(() => setIsBouncing(false), 2000)
    }

    // REMOVED experimentId check to allow Global access
    // if (!experimentId) return null

    return (
        <div className={`ai-tutor-container ${isOpen ? 'open' : 'closed'} ${isBouncing ? 'bounce-animation' : ''}`}>
            {/* Avatar Decoration - Now Clickable */}
            <div className="ai-avatar-floating" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                <img src="/ai_avatar.png" alt="AI" className="avatar-img" />
            </div>

            <div className="ai-tutor-header" onClick={() => !isSettingsOpen && setIsOpen(!isOpen)}>
                <span className="ai-title">Lab Assistant</span>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <span
                        className="ai-settings-toggle"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsSettingsOpen(true)
                        }}
                        title="Settings"
                    >
                        ⚙️
                    </span>
                    <span
                        className="ai-mute"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsMuted(!isMuted)
                        }}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </span>
                    <span className="ai-toggle">{isOpen ? '−' : '+'}</span>
                </div>
            </div>

            {/* Settings Sidebar */}
            <div className={`ai-settings-sidebar ${isSettingsOpen ? 'open' : ''}`}>
                <div className="settings-header">
                    <h3>AI Settings</h3>
                    <button className="close-settings" onClick={() => setIsSettingsOpen(false)}>×</button>
                </div>
                <div className="settings-content">
                    <div className="setting-item">
                        <label>Idle Alert Threshold</label>
                        <div className="slider-container">
                            <input
                                type="range"
                                min="60"
                                max="600"
                                step="60"
                                value={idleThreshold}
                                onChange={(e) => {
                                    const newVal = parseInt(e.target.value)
                                    setIdleThreshold(newVal)
                                    localStorage.setItem('virtuolabs_settings', JSON.stringify({ idleThreshold: newVal }))
                                }}
                                className="settings-slider"
                            />
                            <span className="slider-value">{Math.floor(idleThreshold / 60)} min</span>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="ai-tutor-body">
                    <div className="messages-list">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-area" style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            placeholder={isListening ? "Listening..." : "Ask for help..."}
                            onKeyDown={handleUserMessage}
                        />
                        <button
                            className={`mic-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleListening}
                            title="Speak to AI"
                        >
                            {isListening ? '🛑' : '🎤'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AITutor
