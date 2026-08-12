import { FiCamera } from "react-icons/fi";

function ProfileForm() {
  return (
    <div className="profile-section">

      <h2 className="section-title">
        Profile Information
      </h2>

      <p className="section-subtitle">
        Update your personal information and account details.
      </p>

      <div className="profile-header">

        <div className="profile-avatar">

          <div className="avatar-circle">
            U
          </div>

          <div className="avatar-info">

            <h4>John Doe</h4>

            <button className="change-photo-btn">
              <FiCamera />
              <span>Change Photo</span>
            </button>

          </div>

        </div>

      </div>

      <div className="profile-grid">

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="John"
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Doe"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="+91 9876543210"
          />
        </div>

        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            placeholder="UI Designer"
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            placeholder="Design"
          />
        </div>

        <div className="form-group full-width">
          <label>Timezone</label>

          <select>
            <option>IST (Indian Standard Time)</option>
            <option>UTC</option>
            <option>GMT</option>
          </select>
        </div>

      </div>

      <div className="button-group">

        <button className="save-btn">
          Save Changes
        </button>

        <button className="cancel-btn">
          Cancel
        </button>

      </div>

    </div>
  );
}

export default ProfileForm;