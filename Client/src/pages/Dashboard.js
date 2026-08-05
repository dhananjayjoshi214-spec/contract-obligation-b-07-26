import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFileContract,
  FaClipboardCheck,
  FaUsers,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}

      <div
        className="bg-dark text-white"
        style={{
          width: "260px",
          minHeight: "100vh",
        }}
      >
        <div className="p-4">

          <h3 className="fw-bold">
            ContractIQ
          </h3>

          <hr />

          <div className="nav flex-column">

            <button className="btn btn-dark text-start mb-2">
              <FaHome className="me-2" />
              Dashboard
            </button>

            <button className="btn btn-dark text-start mb-2">
              <FaFileContract className="me-2" />
              Contracts
            </button>

            <button className="btn btn-dark text-start mb-2">
              <FaClipboardCheck className="me-2" />
              Obligations
            </button>

            <button className="btn btn-dark text-start mb-2">
              <FaUsers className="me-2" />
              Users
            </button>

            <button className="btn btn-dark text-start mb-2">
              <FaCog className="me-2" />
              Settings
            </button>

          </div>

        </div>

      </div>

      {/* Main */}

      <div className="flex-grow-1 bg-light">

        {/* Navbar */}

        <nav className="navbar navbar-light bg-white shadow-sm px-4">

          <h4>
            Dashboard
          </h4>

          <div className="d-flex align-items-center">

            <FaBell
              size={22}
              className="me-4"
            />

            <FaUserCircle
              size={40}
              className="me-2"
            />

            <div className="me-4">

              <strong>
                {user?.full_name}
              </strong>

              <br />

              <small>
                {user?.role}
              </small>

            </div>

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </button>

          </div>

        </nav>

        {/* Welcome */}

        <div className="container mt-5">

          <div className="card shadow border-0 p-4">

            <h2>
              Welcome back,
            </h2>

            <h1 className="fw-bold mt-2">
              {user?.full_name}
            </h1>

            <p className="text-secondary mt-3">
              Manage your contracts, obligations,
              compliance reports and users from
              one centralized dashboard.
            </p>

          </div>

          {/* Cards */}

          <div className="row mt-4">

            <div className="col-md-3">

              <div className="card shadow-sm p-4">

                <h6>
                  Active Contracts
                </h6>

                <h2>
                  24
                </h2>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow-sm p-4">

                <h6>
                  Pending Reviews
                </h6>

                <h2>
                  7
                </h2>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow-sm p-4">

                <h6>
                  Compliance Score
                </h6>

                <h2>
                  98%
                </h2>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow-sm p-4">

                <h6>
                  Team Members
                </h6>

                <h2>
                  15
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;