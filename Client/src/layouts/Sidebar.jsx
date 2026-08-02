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