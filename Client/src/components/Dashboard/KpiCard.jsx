import React from "react";
import {
  FaShieldAlt,
  FaCalendarTimes,
  FaExclamationTriangle,
  FaClipboardCheck,
} from "react-icons/fa";

const KpiCard = ({ title, value, trend, color }) => {
  const getIcon = () => {
    switch (title) {
      case "Overall Compliance":
        return <FaShieldAlt />;
      case "Missed Deadlines":
        return <FaCalendarTimes />;
      case "Risk Flags":
        return <FaExclamationTriangle />;
      case "Audits Completed":
        return <FaClipboardCheck />;
      default:
        return <FaShieldAlt />;
    }
  };

  return (
    <div className="dashboard-card">

      <div className="kpi-header">

        <div
          className="kpi-icon"
          style={{ backgroundColor: color }}
        >
          {getIcon()}
        </div>

        <span
          className="kpi-trend"
          style={{ color }}
        >
          {trend}
        </span>

      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div className="kpi-title">
        {title.toUpperCase()}
      </div>

    </div>
  );
};

export default KpiCard;