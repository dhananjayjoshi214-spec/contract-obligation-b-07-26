import { useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

function AppearanceSettings() {

  const [theme, setTheme] = useState("light");
  const [color, setColor] = useState("#2563eb");

  const colors = [
    "#2563eb",
    "#7c3aed",
    "#10b981",
    "#f97316",
    "#ef4444",
    "#06b6d4",
  ];

  return (
    <div className="appearance-section">

      <h2 className="section-title">
        Appearance
      </h2>

      <p className="section-subtitle">
        Customize your workspace.
      </p>

      {/* Theme */}

      <div className="settings-card">

        <h4 className="card-title">
          Theme
        </h4>

        <div className="theme-grid">

          <div
            className={`theme-card ${
              theme === "light" ? "selected-theme" : ""
            }`}
            onClick={() => setTheme("light")}
          >
            <FiSun size={28} />
            <h5>Light</h5>
            <p>Clean interface</p>
          </div>

          <div
            className={`theme-card ${
              theme === "dark" ? "selected-theme" : ""
            }`}
            onClick={() => setTheme("dark")}
          >
            <FiMoon size={28} />
            <h5>Dark</h5>
            <p>Easy on eyes</p>
          </div>

          <div
            className={`theme-card ${
              theme === "system" ? "selected-theme" : ""
            }`}
            onClick={() => setTheme("system")}
          >
            <FiMonitor size={28} />
            <h5>System</h5>
            <p>Follow device</p>
          </div>

        </div>

      </div>

      {/* Accent Colors */}

      <div className="settings-card">

        <h4 className="card-title">
          Accent Color
        </h4>

        <div className="color-row">

          {colors.map((item) => (

            <div
              key={item}
              className={`color-circle ${
                color === item ? "selected-color" : ""
              }`}
              style={{
                background: item,
              }}
              onClick={() => setColor(item)}
            />

          ))}

        </div>

      </div>

      {/* Display */}

      <div className="settings-card">

        <h4 className="card-title">
          Display Preferences
        </h4>

        <div className="display-row">

          <span>Compact Mode</span>

          <input type="checkbox" />

        </div>

        <div className="display-row">

          <span>Animations</span>

          <input type="checkbox" defaultChecked />

        </div>

      </div>

      {/* Language */}

      <div className="appearance-card">

        <h4 className="card-title">
          Language
        </h4>

        <select className="language-select">

          <option>English</option>

          <option>Hindi</option>

          <option>French</option>

          <option>German</option>

        </select>

      </div>

    </div>
  );
}

export default AppearanceSettings;