
import ReportsDashboard from "./pages/ReportsDashboard";

function App() {
  return <ReportsDashboard />;
}

export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComplianceDashboard from "./pages/ComplianceDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComplianceDashboard />} />
        <Route path="/compliance" element={<ComplianceDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;import { Routes, Route, Navigate } from "react-router-dom";

import ComplianceDashboard from "./pages/ComplianceDashboard";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./features/admin/pages/Dashboard";
import Users from "./features/admin/pages/Users";
import ActivityLogs from "./features/admin/pages/ActivityLogs";
import Notifications from "./features/admin/pages/Notifications";
import Settings from "./features/admin/pages/Settings";

function App() {
  return (
    <Routes>
      {/* Existing routes */}
      <Route path="/" element={<ComplianceDashboard />} />
      <Route path="/compliance" element={<ComplianceDashboard />} />

      {/* Your Admin Panel */}
      <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
      <Route path="/admin/activity-logs" element={<AdminLayout><ActivityLogs /></AdminLayout>} />
      <Route path="/admin/notifications" element={<AdminLayout><Notifications /></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />

      {/* Optional redirect */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;

