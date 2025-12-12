import React, { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const NotFound = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Smart Redirect Logic
        // If the path contains spaces or %20, replace with hyphens and redirect
        const path = location.pathname
        const decodedPath = decodeURIComponent(path)

        if (decodedPath.includes(' ')) {
            const newPath = decodedPath.replace(/ /g, '-') + location.search + location.hash
            console.log(`Auto-redirecting from ${path} to ${newPath}`)
            navigate(newPath, { replace: true })
        }
    }, [location, navigate])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            textAlign: 'center',
            padding: '2rem',
            color: '#2d3748'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ marginBottom: '2rem', color: '#718096' }}>
                The page you are looking for does not exist or has been moved.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        border: '2px solid #e2e8f0',
                        background: 'white',
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Go Back
                </button>
                <Link
                    to="/"
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        background: '#3182ce',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 600
                    }}
                >
                    Go Home
                </Link>
            </div>

            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#cbd5e0' }}>
                Debug: {location.pathname}
            </div>
        </div>
    )
}

export default NotFound
