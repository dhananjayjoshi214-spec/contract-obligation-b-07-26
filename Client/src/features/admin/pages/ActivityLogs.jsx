import { useState } from "react";
import activityLogsData from "../data/activityLogs";

function ActivityLogs() {
  const [search, setSearch] = useState("");

  const filteredLogs = activityLogsData.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Activity Logs
        </h2>

        <span className="badge bg-primary fs-6">
          {filteredLogs.length} Records
        </span>

      </div>

      <div className="mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="card shadow-sm border-0">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>

                <th>ID</th>

                <th>User</th>

                <th>Action</th>

                <th>Date</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredLogs.map((log) => (

                <tr key={log.id}>

                  <td>{log.id}</td>

                  <td>{log.user}</td>

                  <td>{log.action}</td>

                  <td>{log.date}</td>

                  <td>

                    <span
                      className={`badge ${
                        log.status === "Success"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {log.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ActivityLogs;