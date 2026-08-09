import { useState } from "react";
import {
  FiMail,
  FiMessageSquare,
  FiBell,
  FiRefreshCw,
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    app: true,
    renewal: true,
    obligations: true,
    compliance: true,
    approval: true,
    digest: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "email",
      icon: <FiMail />,
      title: "Email Notifications",
      desc: "Receive updates via email.",
    },
    {
      key: "sms",
      icon: <FiMessageSquare />,
      title: "SMS Notifications",
      desc: "Receive important alerts via SMS.",
    },
    {
      key: "app",
      icon: <FiBell />,
      title: "In-App Notifications",
      desc: "Get alerts inside the application.",
    },
    {
      key: "renewal",
      icon: <FiRefreshCw />,
      title: "Contract Renewals",
      desc: "Receive reminders before contracts expire.",
    },
    {
      key: "obligations",
      icon: <FiCalendar />,
      title: "Obligation Due Dates",
      desc: "Get notified before obligation deadlines.",
    },
    {
      key: "compliance",
      icon: <FiAlertCircle />,
      title: "Compliance Alerts",
      desc: "Receive compliance and risk notifications.",
    },
    {
      key: "approval",
      icon: <FiCheckCircle />,
      title: "Approval Requests",
      desc: "Stay informed about approval workflows.",
    },
    {
      key: "digest",
      icon: <FiFileText />,
      title: "Weekly Digest",
      desc: "Receive a weekly activity summary.",
    },
  ];

  return (
    <div className="notification-section">

      <h2 className="section-title">
        Notification Preferences
      </h2>

      <p className="section-subtitle">
        Choose how you want to receive updates and reminders.
      </p>

      <div className="notification-card">

        {items.map((item) => (

          <div
            className="notification-row"
            key={item.key}
          >

            <div className="notification-left">

              <div className="notification-icon">
                {item.icon}
              </div>

              <div>

                <h5 className="notification-title">
                  {item.title}
                </h5>

                <p className="notification-desc">
                  {item.desc}
                </p>

              </div>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() => toggle(item.key)}
              />

              <span className="slider"></span>

            </label>

          </div>

        ))}

      </div>

      <div className="button-group">

        <button className="save-btn">
          Save Preferences
        </button>

      </div>

    </div>
  );
}

export default NotificationSettings;