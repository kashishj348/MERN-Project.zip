import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Home() {
  const [apiStatus, setApiStatus] = useState({ online: false, message: 'Connecting...' })
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setApiStatus({ online: true, message: `System Connected (MongoDB: ${data.dbConnected ? 'Online' : 'Simulated'})` }))
      .catch(err => setApiStatus({ online: false, message: 'Backend Disconnected' }))
  }, [])

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">Aura.</div>
        <div style={{ color: 'var(--text-secondary)' }}>Welcome to the Future</div>
      </nav>

      <main className="hero">
        <h1 className="hero-title">
          Build Something <span>Extraordinary.</span>
        </h1>
        <p className="hero-subtitle">
          Your full-stack MERN platform is live and fully integrated. Experience a premium, dynamic, and seamless web ecosystem hosted on Azure.
        </p>
        <button className="cta-button" onClick={() => navigate('/projects')}>
          View Database Demo
        </button>
      </main>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Lightning Fast</h3>
          <p>Powered by Vite and React, pushing performance boundaries with instantaneous HMR and optimized builds.</p>
        </div>
        <div className="feature-card" style={{ animationDelay: '0.2s', animation: 'fadeIn 1.7s ease-out' }}>
          <span className="feature-icon">🛡️</span>
          <h3>Full-Stack Ready</h3>
          <p>Seamlessly integrated with an Express MongoDB backend. View the next page to interact with the database!</p>
        </div>
      </section>

      <div className="api-status">
        <div className={`status-dot ${apiStatus.online ? 'online' : 'offline'}`}></div>
        <span style={{ color: apiStatus.online ? '#94a3b8' : '#ef4444' }}>
          {apiStatus.message}
        </span>
      </div>
    </div>
  )
}
