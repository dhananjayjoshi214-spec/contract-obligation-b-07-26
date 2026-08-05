import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const PageContainer = ({ children }) => {
  return (
    <div>

      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          background: "#F5F7FB",
        }}
      >
        <Navbar />

        {children}

      </div>

    </div>
  );
};

export default PageContainer;