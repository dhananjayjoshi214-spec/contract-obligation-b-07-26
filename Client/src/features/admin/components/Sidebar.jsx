import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaFileContract,
  FaClipboardList,
  FaSyncAlt,
  FaBell,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      name: "Contracts",
      icon: <FaFileContract />,
      path: "#",
    },
    {
      name: "Obligations",
      icon: <FaClipboardList />,
      path: "#",
    },
    {
      name: "Renewals",
      icon: <FaSyncAlt />,
      path: "#",
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      path: "/admin/notifications",
    },
    {
      name: "Activity Logs",
      icon: <FaHistory />,
      path: "/admin/activity-logs",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#1e293b",
      }}
    >
      <div className="text-center py-4">
        <h3 className="text-white fw-bold">
          ContractIQ
        </h3>

        <small className="text-secondary">
          Admin Panel
        </small>
      </div>

      <div className="px-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none rounded px-3 py-3 mb-2 ${
                isActive
                  ? "bg-primary text-white"
                  : "text-light"
              }`
            }
          >
            <span className="me-3 fs-5">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}

        <hr className="text-secondary" />

        <div className="d-flex align-items-center text-danger px-3 py-3">
          <FaSignOutAlt className="me-3" />
          Logout
        </div>

      </div>
    </div>
  );
}

export default Sidebar;