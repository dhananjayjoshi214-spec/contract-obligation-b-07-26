import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar bg-white shadow-sm px-4">

      <h4 className="fw-bold m-0">
        Dashboard
      </h4>

      <div className="d-flex align-items-center">

        <FaBell
          size={22}
          className="me-4"
        />

        <FaUserCircle
          size={35}
          className="me-2"
        />

        <div>

          <strong>
            Administrator
          </strong>

          <br />

          <small className="text-muted">
            System Admin
          </small>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;