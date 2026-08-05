import React, { useEffect, useState } from "react";
import api from "../../api";

const AuditSummary = () => {
  const [auditSummary, setAuditSummary] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    failed: 0,
  });

  useEffect(() => {
    loadAuditSummary();
  }, []);

  const loadAuditSummary = async () => {
    try {
      const response = await api.get("/dashboard/audits");

      const audits = response.data;

      setAuditSummary({
        total: audits.length,
        completed: audits.filter(
          (a) => a.status === "Completed"
        ).length,
        inProgress: audits.filter(
          (a) => a.status === "In Progress"
        ).length,
        failed: audits.filter(
    (a) => a.status === "Failed"
    ).length,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Total Audits",
      value: auditSummary.total,
      color: "#111827",
    },
    {
      title: "Completed",
      value: auditSummary.completed,
      color: "#22C55E",
    },
    {
      title: "In Progress",
      value: auditSummary.inProgress,
      color: "#F59E0B",
    },
    {
      title: "Failed",
      value: auditSummary.failed,
      color: "#EF4444",
    },
  ];

  return (
    <div className="audit-summary-section">

      <h2 className="section-heading">
        Audit Summary
      </h2>

      <div className="audit-summary">

        {cards.map((card, index) => (
          <div
            key={index}
            className="summary-card"
          >
            <h1
              style={{
                color: card.color,
              }}
            >
              {card.value}
            </h1>

            <p>{card.title}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default AuditSummary;