import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    name: "Administrator",
    email: "admin@contractiq.com",
    company: "ContractIQ",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      settings.password &&
      settings.password !== settings.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    alert("Settings saved successfully.");
  };

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        Settings
      </h2>

      <div className="card shadow-sm border-0 p-4">

        <div className="row">

          <div className="col-md-6">

            <div className="mb-3">

              <label className="form-label">
                Administrator Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={settings.name}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Company
              </label>

              <input
                type="text"
                className="form-control"
                name="company"
                value={settings.company}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="col-md-6">

            <div className="mb-3">

              <label className="form-label">
                New Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={settings.password}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        <div className="mt-3">

          <button
            className="btn btn-primary px-4"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;