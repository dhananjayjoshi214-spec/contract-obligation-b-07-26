import { FiSearch, FiBell } from "react-icons/fi";
import "./layout.css";

function Header() {
  return (
    <header className="app-header">

      <div className="header-left">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <div className="header-right">

        <button className="header-icon">
          <FiBell />
        </button>

        <div className="header-user">

          <div className="header-avatar">
            U
          </div>

          <div>
            <h5>User</h5>
            <p>Administrator</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;