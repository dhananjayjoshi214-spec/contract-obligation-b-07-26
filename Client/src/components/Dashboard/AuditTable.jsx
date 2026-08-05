import React, { useEffect, useState } from "react";
import api from "../../api";

const AuditTable = () => {
  const [audits, setAudits] = useState([]);

  useEffect(() => {
    loadAudits();
  }, []);

  const loadAudits = async () => {
    try {
      const response = await api.get("/dashboard/audits");
      setAudits(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "badge completed";
      case "In Progress":
        return "badge progress";
      case "Terminated":
        return "badge failed";
      default:
        return "badge";
    }
  };

  return (
    <div className="table-card">

      <div className="table-header">
        <h2>Recent Audits</h2>
      </div>

      <table className="audit-table">

        <thead>
          <tr>
            <th>Audit</th>
            <th>Department</th>
            <th>Auditor</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Score</th>
          </tr>
        </thead>

        <tbody>
          {audits.map((audit, index) => (
            <tr key={index}>

              <td>{audit.audit}</td>

              <td>{audit.department}</td>

              <td>{audit.auditor}</td>

              <td>
                <span className={getStatusClass(audit.status)}>
                  {audit.status}
                </span>
              </td>

              <td
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {audit.score}
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default AuditTable;