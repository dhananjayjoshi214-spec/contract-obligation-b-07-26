import { useState } from "react";
import notificationsData from "../data/notifications";

function Notifications() {
  const [search, setSearch] = useState("");

  const filteredNotifications = notificationsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.message.toLowerCase().includes(search.toLowerCase())
  );

  const getBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Notifications</h2>

        <span className="badge bg-primary fs-6">
          {filteredNotifications.length} Notifications
        </span>
      </div>

      <div className="mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {filteredNotifications.map((notification) => (

        <div
          key={notification.id}
          className="card shadow-sm border-0 mb-3"
        >

          <div className="card-body">

            <div className="d-flex justify-content-between">

              <h5 className="mb-1">
                {notification.title}
              </h5>

              <span
                className={`badge bg-${getBadgeColor(
                  notification.priority
                )}`}
              >
                {notification.priority}
              </span>

            </div>

            <p className="text-muted mt-2 mb-2">
              {notification.message}
            </p>

            <small className="text-secondary">
              {notification.time}
            </small>

          </div>

        </div>

      ))}

    </div>
  );
}

export default Notifications;