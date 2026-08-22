import { Routes, Route, Navigate, Link } from "react-router-dom";

// --- IMPORT ONLY YOUR WORK ---
import AdminLayout from "./layout/AdminLayout";
import Users from "./features/admin/pages/Users";

// ⚠️ IMPORTANT: Update this path if your Renewal Dashboard is in a different folder!
import RenewalDashboard from "./pages/RenewalDashboard"; 

// --- SIMPLE NAVIGATION BAR ---
function MentorNavBar() {
  return (
    <div style={{ padding: '15px', background: '#002855', color: 'white', display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
      <h3 style={{ margin: 0, paddingRight: '20px', borderRight: '2px solid white' }}>My Project Work</h3>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', padding: '5px 10px', background: '#005b9f', borderRadius: '4px' }}>
        👤 User Management
      </Link>
      <Link to="/renewal" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', padding: '5px 10px', background: '#005b9f', borderRadius: '4px' }}>
        🔄 Renewal Dashboard
      </Link>
    </div>
  );
}

// --- MAIN APP (LOCKED TO YOUR WORK) ---
export default function App() {
  return (
    <div>
      <MentorNavBar />
      <Routes>
        {/* Make User Management the default home page */}
        <Route path="/" element={<AdminLayout><Users /></AdminLayout>} />
        
        {/* Your Renewal Dashboard */}
        <Route path="/renewal" element={<RenewalDashboard />} />

        {/* If the mentor clicks anything else, redirect them back to your work */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}