import React from "react";
import {
  FaBell,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const currentUser = {
    fullName: "XXXXXX",
    role: "Compliance Officer",
  };
  return (
    <header className="navbar">
      {/* Search */}
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search contracts & obligations..."
        />
      </div>

      {/* Right Side */}
      <div className="navbar-right">

        {/* Notification */}
        <div className="notification">
          <FaBell />

          <span className="notification-count">
            3
          </span>
        </div>

        {/* User */}
        <div className="user-info">

  <div className="user-avatar">
    {currentUser.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")}
  </div>

  <div className="user-details">
    <h4 className="user-name">{currentUser.fullName}</h4>

    <p className="user-role">
      {currentUser.role}
    </p>
  </div>

</div>

        {/* Logout */}
        <div className="logout-btn">
          <FaSignOutAlt />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
