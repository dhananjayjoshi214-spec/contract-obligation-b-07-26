import React from "react";
import {

  FaThLarge,
  FaShieldAlt,
  FaFolderOpen,
  FaClipboardList,
  FaCalendarAlt,
  FaFileAlt,
  FaBell,
  FaChevronLeft,
  FaUserCircle,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          <div className="logo-icon">📄</div>
          <h2>ContractIQ</h2>
        </div>

        <div className="user-card">

          <p className="signed">SIGNED IN AS</p>

          <div className="user-name">
            Sarah Chen
          </div>

          <span className="role">
            Legal Manager
          </span>

        </div>

        <nav>

          <p className="section">WORKSPACE</p>

          <a className="menu-item" href="#">
            <FaThLarge />
            Dashboard
          </a>

          <a className="menu-item" href="#">
            <FaShieldAlt />
            Compliance
          </a>

          <a className="menu-item" href="#">
            <FaFolderOpen />
            Contract Repository
          </a>

          <a className="menu-item" href="#">
            <FaClipboardList />
            Obligation Tracker
          </a>

          <p className="section">RENEWALS</p>

          <a className="menu-item" href="#">
            <FaCalendarAlt />
            Renewal Management
          </a>

          <p className="section">REPORTS</p>

          <a className="menu-item active" href="#">
            <FaFileAlt />
            Reports & Export
          </a>

          <p className="section">TOOLS</p>

          <a className="menu-item" href="#">
            <FaBell />
            Notification Center
          </a>

        </nav>

      </div>

      <div className="collapse">
        <FaChevronLeft />
        Collapse sidebar
      </div>

    </aside>
  );
}
=======
  FaHome,
  FaClipboardCheck,
  FaFolderOpen,
  FaTasks,
  FaChartBar,
  FaBell,
  FaChevronLeft,
} from "react-icons/fa";

const Sidebar = () => {
   const currentUser = {
    fullName: "XXXXXXX",
    role: "Compliance Officer",
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
    <div className="logo">
  <div className="logo-icon">
    CI
  </div>

  <h2>
    Contract<span>IQ</span>
  </h2>
</div>

      {/* User Card */}
     <div className="profile-card">
    <p className="signed-text">SIGNED IN AS</p>

    <div className="profile-info">
  <div className="profile-avatar">
    {currentUser.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")}
  </div>
      </div>
  <div>
    <h4 className="user-name">{currentUser.fullName}</h4>
    <p className="user-role">{currentUser.role}</p>
  </div>
</div>

      {/* Workspace */}
      <div className="menu-section">
        <p className="section-title">WORKSPACE</p>

        <div className="menu-item">
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div className="menu-item active-menu">
          <FaClipboardCheck />
          <span>Compliance</span>
        </div>

        <div className="menu-item">
          <FaFolderOpen />
          <span>Contract Repository</span>
        </div>

        <div className="menu-item">
          <FaTasks />
          <span>Obligation Tracker</span>
        </div>
      </div>

      {/* Reports */}
      <div className="menu-section">
        <p className="section-title">REPORTS</p>

        <div className="menu-item">
          <FaChartBar />
          <span>Reports & Export</span>
        </div>
      </div>

      {/* Tools */}
      <div className="menu-section">
        <p className="section-title">TOOLS</p>

        <div className="menu-item">
          <FaBell />
          <span>Notification Center</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="sidebar-footer">
        <FaChevronLeft />
        <span>Collapse sidebar</span>
      </div>
    </aside>
  );
};

export default Sidebar;

