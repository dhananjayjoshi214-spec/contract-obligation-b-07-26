import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  FaExclamationTriangle,
  FaFileContract,
  FaUserSlash,
  FaClipboardList,
  FaSyncAlt,
} from "react-icons/fa";



const getIcon = (title) => {
  if (title.includes("Expired"))
    return <FaFileContract />;

  if (title.includes("owner"))
    return <FaUserSlash />;

  if (title.includes("Obligations"))
    return <FaExclamationTriangle />;

  if (title.includes("documentation"))
    return <FaClipboardList />;

  return <FaSyncAlt />;
};

const getClass = (level) => {
  switch (level) {
    case "High":
      return "level high";

    case "Medium":
      return "level medium";

    default:
      return "level low";
  }
};

const RiskIndicators = () => {
  const [risks, setRisks] = useState([]);
  useEffect(() => {
  loadRisks();
}, []);

const loadRisks = async () => {
  try {
    const response = await api.get("/dashboard/risks");
    setRisks(response.data);
  } catch (error) {
    console.error(error);
  }
};
 return (
  <div className="chart-card risk-section">
    <h3 style={{ marginBottom: "20px" }}>
      Risk Indicators
    </h3>

    {risks.map((risk, index) => (
      <div className="risk-row" key={index}>

        <div className="risk-left">
          <div className="risk-icon">
            {getIcon(risk.title)}
          </div>

          <div>
            <div className="risk-title">
              {risk.title}
            </div>

            <div className="risk-items">
              {risk.count} Items
            </div>
          </div>
        </div>

        <span className={getClass(risk.level)}>
          {risk.level}
        </span>

      </div>
    ))}
  </div>
);
};

export default RiskIndicators;