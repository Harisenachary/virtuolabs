import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const Register = () => {
  const { register, error, setError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleKeyPress = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className={`auth-card ${mounted ? 'loaded' : ''}`}>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Join VirtuoLabs to track your experiments</p>
        </div>
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className={`input-wrapper ${nameFocused ? 'focused' : ''}`}>
              <input 
                id="name"
                name="name" 
                value={form.name} 
                onChange={onChange}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                placeholder="Enter your full name"
                required 
              />
              <span className="input-icon">👤</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className={`input-wrapper ${emailFocused ? 'focused' : ''}`}>
              <input 
                id="email"
                name="email" 
                type="email" 
                value={form.email} 
                onChange={onChange}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="Enter your email"
                required 
              />
              <span className="input-icon">📧</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrapper password-wrapper ${passwordFocused ? 'focused' : ''}`}>
              <input 
                id="password"
                name="password" 
                type={showPassword ? 'text' : 'password'}
                value={form.password} 
                onChange={onChange}
                onKeyDown={handleKeyPress}
                onKeyUp={handleKeyPress}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="Enter your password"
                required 
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {capsLockOn && passwordFocused && (
              <div className="caps-lock-warning">
                ⚠️ Caps Lock is on
              </div>
            )}
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" className="auth-btn" disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="register-link">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register