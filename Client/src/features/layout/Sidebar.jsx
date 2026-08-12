import {
  FiHome,
  FiFileText,
  FiCalendar,
  FiRefreshCw,
  FiCheckCircle,
  FiBarChart2,
  FiBell,
  FiClipboard,
  FiUsers,
  FiSettings,
  FiChevronLeft,
} from "react-icons/fi";

import "./layout.css";

const menu = [
  { name: "Dashboard", icon: FiHome },
  { name: "Contracts", icon: FiFileText },
  { name: "Obligations", icon: FiCalendar },
  { name: "Renewals", icon: FiRefreshCw },
  { name: "Compliance", icon: FiCheckCircle },
  { name: "Reports", icon: FiBarChart2 },
  { name: "Notifications", icon: FiBell },
  { name: "Audit Logs", icon: FiClipboard },
  { name: "Users", icon: FiUsers },
  { name: "Settings", icon: FiSettings },
];

function Sidebar() {
  return (
    <aside className="app-sidebar">

      <h2 className="logo">
        ContractIQ
      </h2>

      <nav>

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.name}
              className={`sidebar-item ${
                item.name === "Settings" ? "active" : ""
              }`}
            >

              <Icon />

              <span>{item.name}</span>

            </div>

          );

        })}

      </nav>

      <div className="sidebar-footer">

        <div className="user-box">

          <div className="user-avatar">
            U
          </div>

          <div>

            <h5>User</h5>

            <p>Loading...</p>

          </div>

        </div>

        <div className="collapse">

          <FiChevronLeft />

          Collapse

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;