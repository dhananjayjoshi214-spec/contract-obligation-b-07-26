function RenewalDashboard({ renewals = [], searchQuery = '', onExport, onAdd }) {
 
  const q = (searchQuery || '').toLowerCase();
  const list = renewals.filter(r => 
    (r.name && r.name.toLowerCase().includes(q)) || 
    ((r.department || r.dept || '').toLowerCase().includes(q))
  );

 
  const totalContracts = renewals.length;
  const upcomingCount = renewals.filter(r => r.status === "Upcoming" || (r.daysRemaining > 0 && r.daysRemaining <= 30)).length;
  const pendingCount = renewals.filter(r => r.status === "In Progress" || r.priority === "High").length;
  const expiringThisWeek = renewals.filter(r => r.daysRemaining >= 0 && r.daysRemaining <= 7).length;
  // Calculate compliance as percentage of contracts that are NOT expired
  const complianceScore = totalContracts > 0 
    ? Math.round((renewals.filter(r => r.status !== "Expired" && r.daysRemaining >= 0).length / totalContracts) * 100) 
    : 100;


  const deptCounts = renewals.reduce((acc, r) => {
    const d = r.department || r.dept || 'Unassigned';
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
  
  const portfolioData = Object.keys(deptCounts).map((key) => ({
    name: key,
    value: deptCounts[key],
    percentage: Math.round((deptCounts[key] / (totalContracts || 1)) * 100)
  })).sort((a, b) => b.value - a.value).slice(0, 4); // Show top 4 departments
  const dotColors = ["blue", "green", "orange", "purple"];

  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthIndex = new Date().getMonth();
  const last6Months = Array.from({length: 6}, (_, i) => {
    const d = new Date();
    d.setMonth(currentMonthIndex - 5 + i);
    return { label: monthNames[d.getMonth()], count: 0 };
  });

  renewals.forEach(r => {
    if(r.renewalDate) {
      const m = parseInt(r.renewalDate.split('-')[1], 10) - 1; 
      const match = last6Months.find(lm => lm.label === monthNames[m]);
      if(match) match.count += 1;
    }
  });
  const maxMonthlyCount = Math.max(...last6Months.map(m => m.count), 1);

 
  const recentActivity = [...renewals].reverse().slice(0, 3);
  const upcomingDeadlines = [...renewals]
    .filter(r => r.daysRemaining !== undefined)
    .sort((a, b) => a.daysRemaining - b.daysRemaining)
    .slice(0, 2); 

  return (
    <div className="renewal-dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-header">
          <div className="header-copy">
            <p className="page-breadcrumb">Renewal Dashboard</p>
            <h1>Legal Manager Dashboard</h1>
            <p className="page-subtitle">
              Monitor contract renewals, obligations, compliance, and upcoming deadlines in one place.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary" onClick={() => onExport && onExport()}>Export</button>
            <button className="btn-primary" onClick={() => onAdd && onAdd()}>+ Add Renewal</button>
          </div>
        </div>

        <div className="cards-grid">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <p className="stat-label">Active Contracts</p>
            <p className="stat-value">{totalContracts}</p>
            <p className="stat-note">Live Database</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <p className="stat-label">Upcoming Renewals</p>
            <p className="stat-value">{upcomingCount}</p>
            <p className="stat-note">Next 30 days</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <p className="stat-label">Pending Obligations</p>
            <p className="stat-value">{pendingCount}</p>
            <p className="stat-note">Action Needed</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <p className="stat-label">Compliance Score</p>
            <p className="stat-value">{complianceScore}%</p>
            <p className="stat-note">Active vs Expired</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <p className="stat-label">Expiring This Week</p>
            <p className="stat-value">{expiringThisWeek}</p>
            <p className="stat-note">Action required</p>
          </div>
        </div>
      </section>

      <section className="panel-card" style={{ padding: 0 }}>
        <div style={{ padding: 18, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700 }}>Upcoming Renewals — Priority View</div>
          <a href="#" style={{ color: 'var(--primary)' }}>Full tracking table →</a>
        </div>
        <div style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--muted)', fontSize: 13 }}>
                <th style={{ padding: '14px 18px' }}>Contract name</th>
                <th style={{ padding: '14px 18px' }}>Department</th>
                <th style={{ padding: '14px 18px' }}>Renewal date</th>
                <th style={{ padding: '14px 18px' }}>Days remaining</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.id || item.contractId} style={{ borderTop: '1px solid var(--border)', background: 'white' }}>
                  <td style={{ padding: '14px 18px' }}>{item.name}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>{item.department || item.dept}</td>
                  <td style={{ padding: '14px 18px' }}>{item.renewalDate}</td>
                  <td style={{ padding: '14px 18px', color: item.daysRemaining < 0 ? 'var(--danger)' : 'var(--success)' }}>{item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)}d overdue` : `${item.daysRemaining}d remaining`}</td>
                  <td style={{ padding: '14px 18px' }}><span style={{ padding: '6px 10px', borderRadius: 8, background: '#fff5f5', color: '#bf1650', border: '1px solid #fde2e2' }}>{item.status}</span></td>
                  <td style={{ padding: '14px 18px' }}><span style={{ padding: '6px 10px', borderRadius: 8, background: '#f3f4f6', color: '#0f172a' }}>{item.priority}</span></td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>No renewals match your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-main">
        <div className="main-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Contract activity</h2>
              <p>Renewal pipeline timeline</p>
            </div>
            <select>
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="chart-area">
            <div className="chart-bars" aria-label="Bar chart showing contract activity">
              {last6Months.map((month, index) => (
                <div className="bar-column" key={index}>
                  <div className="bar-fill" style={{ height: `${(month.count / maxMonthlyCount) * 100}%`, minHeight: month.count > 0 ? '10%' : '0%' }} />
                  <span>{month.label}</span>
                </div>
              ))}
            </div>
            <div className="chart-summary">
              <div>
                <span className="summary-label">Renewal success</span>
                <strong>{complianceScore}%</strong>
              </div>
              <div>
                <span className="summary-label">At risk</span>
                <strong>{pendingCount} contracts</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="side-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Portfolio by type</h2>
              <p>Strategic mix across the portfolio</p>
            </div>
          </div>
          <div className="ring-chart" aria-label="Donut chart summary">
            <div className="ring-center">{portfolioData.length > 0 ? portfolioData[0].percentage : 0}%</div>
          </div>
          <div className="portfolio-list">
            {portfolioData.map((dept, index) => (
              <div className="portfolio-item" key={dept.name}>
                <span className={`dot ${dotColors[index % dotColors.length]}`}></span>
                {dept.name} <span>{dept.percentage}%</span>
              </div>
            ))}
            {portfolioData.length === 0 && (
              <div className="portfolio-item text-muted">No data available</div>
            )}
          </div>
        </div>
      </section>

      <section className="dashboard-footer-grid">
        <div className="footer-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Recent Database Additions</h2>
              <p>Latest workflow updates</p>
            </div>
          </div>
          {recentActivity.map(item => (
            <div className="activity-item" key={item.id || item.contractId}>
              <strong>{item.owner}</strong> added <span>{item.name}</span>
              <div className="activity-time">Status: {item.status}</div>
            </div>
          ))}
          {recentActivity.length === 0 && <div className="activity-item">No recent activity</div>}
        </div>

        <div className="footer-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Upcoming deadlines</h2>
              <p>Items requiring attention this week</p>
            </div>
          </div>
          {upcomingDeadlines.map(item => (
            <div className="deadline-item" key={item.id || item.contractId}>
              <div>
                <strong>{item.name}</strong>
                <div className="deadline-meta">{item.owner} · Due {item.renewalDate}</div>
              </div>
              <span className={`status ${item.daysRemaining < 0 ? 'overdue' : 'in-progress'}`}>
                {item.daysRemaining < 0 ? 'Overdue' : 'Upcoming'}
              </span>
            </div>
          ))}
          {upcomingDeadlines.length === 0 && <div className="deadline-item">No upcoming deadlines</div>}
        </div>
      </section>
    </div>
  )
}

export default RenewalDashboard