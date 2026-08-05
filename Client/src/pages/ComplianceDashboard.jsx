import React, { useEffect, useState } from "react";
import "../assets/dashboard.css";

import api from "../api";

import PageContainer from "../layouts/PageContainer";
import KpiCard from "../components/Dashboard/KpiCard";
import DepartmentChart from "../components/Dashboard/DepartmentChart";
import RiskTrendChart from "../components/Dashboard/RiskTrendChart";
import AuditSummary from "../components/Dashboard/AuditSummary";
import AuditTable from "../components/Dashboard/AuditTable";
import RiskIndicators from "../components/Dashboard/RiskIndicators";

const ComplianceDashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.get("/dashboard/metrics");

      setMetrics([
        
          {
         id: 1,
        title: "Overall Compliance",
        value: response.data.overallCompliance + "%",
        trend: "Current",
      color: "#22C55E",
          },    

          {
          id: 2,
          title: "Missed Deadlines",
          value: response.data.missedDeadlines,
          trend: "Current",
          color: "#EF4444",
        },
        {
          id: 3,
          title: "Risk Flags",
          value: response.data.riskFlags,
         trend: "Current",
          color: "#F59E0B",
        },
        {
          id: 4,
          title: "Audits Completed",
          value: response.data.auditsCompleted,
          trend: "Current",
          color: "#3B82F6",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <div className="dashboard-content">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Compliance Dashboard
            </h1>

            <p className="dashboard-subtitle">
  {new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}
</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          {metrics.map((item) => (
            <KpiCard
              key={item.id}
              title={item.title}
              value={item.value}
              trend={item.trend}
              color={item.color}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="chart-grid">
          <DepartmentChart />
          <RiskTrendChart />
        </div>

        {/* Bottom Section */}
        <div className="bottom-grid">

          <div className="left-section">
            <AuditSummary />
            <AuditTable />
          </div>

          <div className="right-section">
            <RiskIndicators />
          </div>

        </div>

      </div>
    </PageContainer>
  );
};

export default ComplianceDashboard;
