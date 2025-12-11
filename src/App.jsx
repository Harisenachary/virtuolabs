import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import ProgressTracking from './pages/ProgressTracking'
import EnergyGapExperiment from './pages/experiments/EnergyGapExperiment'
import IVCharacteristics from './pages/experiments/IVCharacteristics'
import TitrationExperiment from './pages/experiments/TitrationExperiment'
import SimplePendulum from './pages/experiments/SimplePendulum'
import FreeFallMotion from './pages/experiments/FreeFallMotion'
import ProjectileMotion from './pages/experiments/ProjectileMotion'
import CircuitAnalysis from './pages/experiments/CircuitAnalysis'
import RLCResonance from './pages/experiments/RLCResonance'
import OpAmpAmplifier from './pages/experiments/OpAmpAmplifier'
import HookesLaw from './pages/experiments/HookesLaw'
import LensOptics from './pages/experiments/LensOptics'
import PIDControl from './pages/experiments/PIDControl'
import BufferCapacity from './pages/experiments/BufferCapacity'
import ReactionRate from './pages/experiments/ReactionRate'
import FourierSeries from './pages/experiments/FourierSeries'
import NeuralActivation from './pages/experiments/NeuralActivation'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Layout>
                <ProgressTracking />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/energy-gap"
          element={
            <ProtectedRoute>
              <Layout>
                <EnergyGapExperiment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/iv-characteristics"
          element={
            <ProtectedRoute>
              <Layout>
                <IVCharacteristics />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/titration"
          element={
            <ProtectedRoute>
              <Layout>
                <TitrationExperiment />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/simple-pendulum"
          element={
            <ProtectedRoute>
              <Layout>
                <SimplePendulum />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/free-fall"
          element={
            <ProtectedRoute>
              <Layout>
                <FreeFallMotion />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/projectile-motion"
          element={
            <ProtectedRoute>
              <Layout>
                <ProjectileMotion />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/circuit-analysis"
          element={
            <ProtectedRoute>
              <Layout>
                <CircuitAnalysis />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/rlc-resonance"
          element={
            <ProtectedRoute>
              <Layout>
                <RLCResonance />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/op-amp"
          element={
            <ProtectedRoute>
              <Layout>
                <OpAmpAmplifier />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/hookes-law"
          element={
            <ProtectedRoute>
              <Layout>
                <HookesLaw />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/lens-optics"
          element={
            <ProtectedRoute>
              <Layout>
                <LensOptics />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/pid-control"
          element={
            <ProtectedRoute>
              <Layout>
                <PIDControl />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/buffer-capacity"
          element={
            <ProtectedRoute>
              <Layout>
                <BufferCapacity />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/reaction-rate"
          element={
            <ProtectedRoute>
              <Layout>
                <ReactionRate />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/fourier-series"
          element={
            <ProtectedRoute>
              <Layout>
                <FourierSeries />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/experiments/neural-activation"
          element={
            <ProtectedRoute>
              <Layout>
                <NeuralActivation />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

