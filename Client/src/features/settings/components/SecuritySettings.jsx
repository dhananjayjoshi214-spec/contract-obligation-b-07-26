import {
  FiLock,
  FiShield,
  FiMonitor,
  FiSmartphone,
} from "react-icons/fi";

function SecuritySettings() {
  return (
    <div className="security-section">

      <h2 className="section-title">
        Security Settings
      </h2>

      <p className="section-subtitle">
        Manage your password, authentication, and active sessions.
      </p>

      {/* Password */}

      <div className="security-card">

        <div className="security-item">

          <div className="security-left">

            <div className="security-icon">
              <FiLock />
            </div>

            <div>

              <h4 className="security-title">
                Password
              </h4>

              <p className="security-desc">
                Last changed 3 months ago
              </p>

            </div>

          </div>

          <button className="link-btn">
            Change
          </button>

        </div>

      </div>

      {/* Two Factor Authentication */}

      <div className="security-card">

        <div className="security-item">

          <div className="security-left">

            <div className="security-icon green">
              <FiShield />
            </div>

            <div>

              <h4 className="security-title">
                Two Factor Authentication
              </h4>

              <p className="security-desc">
                Authenticator app is enabled
              </p>

            </div>

          </div>

          <span className="status enabled">
            Enabled
          </span>

        </div>

      </div>

      {/* Active Sessions */}

      <h3 className="card-heading">
        Active Sessions
      </h3>

      <div className="security-card">

        <div className="session-row">

          <div className="session-left">

            <div className="session-device">
              <FiMonitor />
            </div>

            <div>

              <h5 className="session-title">
                Windows • Chrome
              </h5>

              <p className="session-desc">
                Current Session
              </p>

            </div>

          </div>

          <span className="status current">
            Current
          </span>

        </div>

        <div className="session-row">

          <div className="session-left">

            <div className="session-device">
              <FiSmartphone />
            </div>

            <div>

              <h5 className="session-title">
                Android • Chrome
              </h5>

              <p className="session-desc">
                Last active yesterday
              </p>

            </div>

          </div>

          <button className="danger-btn">
            Revoke
          </button>

        </div>

      </div>

    </div>
  );
}

export default SecuritySettings;