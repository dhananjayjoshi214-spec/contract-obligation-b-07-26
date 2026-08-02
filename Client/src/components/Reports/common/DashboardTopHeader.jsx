import React, { useEffect, useState } from "react";
import api from "../../../api";
import {
  Search,
  Bell,
  ChevronDown
} from "lucide-react";

import "../../../assets/dashboardTopHeader.css";


export default function DashboardTopHeader() {

  const [user, setUser] = useState({
    name: "",
    role: "",
    initials: ""
  });

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchHeaderData();
  }, []);

  const fetchHeaderData = async () => {
    try {
      const response = await api.get("/api/reports/header");

      setUser(response.data.user);
      setNotificationCount(response.data.notification_count);

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <header className="dashboard-top-header">


      {/* LEFT SECTION */}

      <div className="header-title-section">

        <h1>
          Reports & Export
        </h1>

        <p>
  {new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  })}
</p>

      </div>



      {/* RIGHT SECTION */}

      <div className="header-actions">



        {/* SEARCH */}

        <div className="header-search">

          <Search size={18}/>

          <input
            type="text"
            placeholder="Search contracts, obligations..."
          />

        </div>





        {/* NOTIFICATION */}

        <button className="notification-icon">

          <Bell size={22}/>

          <span className="notification-badge">
  {notificationCount}
</span>

        </button>





        {/* PROFILE */}

        <div className="user-profile">


          <div className="user-avatar">
  {user.initials}
</div>



          <div className="user-details">


            <h4>{user.name}</h4>


            <p>{user.role}</p>


          </div>



          <ChevronDown 
            size={18}
            className="profile-arrow"
          />


        </div>



      </div>


    </header>

  );
}