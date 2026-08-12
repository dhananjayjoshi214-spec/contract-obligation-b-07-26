import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-copy">
          <p className="page-breadcrumb">Enterprise Contract Platform</p>
          <h1>Streamline renewals, compliance, and lifecycle decisions in one command center.</h1>
          <p className="page-subtitle">
            Monitor active deals, upcoming renewals, obligations, and portfolio health with a clear executive view.
          </p>
          <div className="home-actions">
            <Link to="/dashboard" className="btn-primary">
              Open Renewal Dashboard
            </Link>
            <a href="#overview" className="btn-secondary">
              Explore the workspace
            </a>
          </div>
        </div>

        <div className="hero-panel-stack">
          <div className="home-stat-card">
            <p className="stat-label">Active contracts</p>
            <p className="stat-value">244</p>
            <p className="stat-note">+12 this month</p>
          </div>
          <div className="home-stat-card">
            <p className="stat-label">Renewals due</p>
            <p className="stat-value">23</p>
            <p className="stat-note">Next 30 days</p>
          </div>
          <div className="home-stat-card">
            <p className="stat-label">Compliance score</p>
            <p className="stat-value">94.2%</p>
            <p className="stat-note">Healthy portfolio</p>
          </div>
        </div>
      </section>

      <section id="overview" className="home-overview">
        <div className="feature-card">
          <h2>Renewal intelligence</h2>
          <p>Track renewal windows, alerts, approvals, and risk flags with compact executive summaries.</p>
        </div>
        <div className="feature-card">
          <h2>Obligation management</h2>
          <p>Centralize due dates, ownership, and task completion so every compliance milestone stays visible.</p>
        </div>
        <div className="feature-card">
          <h2>Portfolio visibility</h2>
          <p>Understand exposure by category, partner, and region through a simple high-level dashboard.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
