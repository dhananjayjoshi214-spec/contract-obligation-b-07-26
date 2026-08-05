import Sidebar from "../features/admin/components/Sidebar";
import Navbar from "../features/admin/components/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1 bg-light"
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div className="p-4">
          {children}
        </div>
      </div>

    </div>
  );
}

export default AdminLayout;