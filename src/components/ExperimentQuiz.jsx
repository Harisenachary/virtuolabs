import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useActivityLogger } from '../hooks/useActivityLogger'
import '../pages/experiments/ExperimentPage.css'

const ExperimentQuiz = ({ quiz, experimentTitle, experimentId, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
    const [isSaving, setIsSaving] = useState(false)
    const [startTime] = useState(Date.now())

    const { logQuizStart, logQuizComplete } = useActivityLogger()

    // Log quiz start when component mounts
    React.useEffect(() => {
        if (quiz && quiz.length > 0 && experimentId) {
            logQuizStart(experimentId)
        }
    }, [experimentId])

    if (!quiz || quiz.length === 0) {
        return (
            <div className="quiz-container">
                <div className="quiz-header">
                    <h2>Quiz Not Available</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
                <p>Quiz questions are coming soon for this experiment!</p>
            </div>
        )
    }

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: answerIndex
        })
    }

    const handleNext = () => {
        if (currentQuestion < quiz.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const handleSubmit = async () => {
        setIsSaving(true)

        // Calculate score
        let correctCount = 0
        quiz.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                correctCount++
            }
        })

        const percentage = (correctCount / quiz.length) * 100

        // Save to Supabase via Activity Logger
        try {
            const timeTaken = (Date.now() - startTime) / 1000 // seconds
            await logQuizComplete(experimentId, correctCount, quiz.length, percentage, timeTaken)
        } catch (error) {
            console.error('Error saving quiz:', error)
        }

        setScore(correctCount)
        setShowResults(true)
        setIsSaving(false)
    }

    const handleRetake = () => {
        setCurrentQuestion(0)
        setSelectedAnswers({})
        setShowResults(false)
        setScore(0)
    }

    if (showResults) {
        const percentage = (score / quiz.length) * 100
        const passed = percentage >= 70

        return (
            <div className="quiz-container">
                <div className="quiz-header">
                    <h2>Quiz Results</h2>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>

                <div className="quiz-results">
                    <div className={`score-display ${passed ? 'passed' : 'failed'}`}>
                        <h1>{score}/{quiz.length}</h1>
                        <p className="percentage">{percentage.toFixed(0)}%</p>
                        <p className="status">{passed ? '✅ Passed!' : '❌ Failed'}</p>
                    </div>

                    <div className="results-summary">
                        <h3>Review Your Answers</h3>
                        {quiz.map((q, index) => {
                            const userAnswer = selectedAnswers[index]
                            const isCorrect = userAnswer === q.correctAnswer

                            return (
                                <div key={index} className={`answer-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <p className="question-text"><strong>Q{index + 1}:</strong> {q.question}</p>
                                    <p className="user-answer">
                                        Your answer: {q.options[userAnswer] || 'Not answered'}
                                        {isCorrect ? ' ✓' : ' ✗'}
                                    </p>
                                    {!isCorrect && (
                                        <p className="correct-answer">
                                            Correct answer: {q.options[q.correctAnswer]}
                                        </p>
                                    )}
                                    {q.explanation && (
                                        <p className="explanation">{q.explanation}</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="quiz-actions">
                        <button onClick={handleRetake} className="retake-btn">Retake Quiz</button>
                        <button onClick={onClose} className="close-quiz-btn">Close</button>
                    </div>
                </div>
            </div>
        )
    }

    const question = quiz[currentQuestion]
    const progress = ((currentQuestion + 1) / quiz.length) * 100

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>{experimentTitle} - Quiz</h2>
                <button onClick={onClose} className="close-btn">×</button>
            </div>

            <div className="quiz-progress">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="progress-text">Question {currentQuestion + 1} of {quiz.length}</p>
            </div>

            <div className="quiz-question">
                <h3>{question.question}</h3>
                <div className="quiz-options">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`quiz-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(index)}
                        >
                            <div className="option-radio">
                                {selectedAnswers[currentQuestion] === index && <div className="radio-selected"></div>}
                            </div>
                            <span className="option-text">{option}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="quiz-navigation">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="nav-btn"
                >
                    ← Previous
                </button>

                {currentQuestion === quiz.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(selectedAnswers).length !== quiz.length || isSaving}
                        className="submit-btn"
                    >
                        {isSaving ? 'Saving...' : 'Submit Quiz'}
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="nav-btn next-btn"
                    >
                        Next →
                    </button>
                )}
            </div>
        </div>
    )
}

export default ExperimentQuiz
