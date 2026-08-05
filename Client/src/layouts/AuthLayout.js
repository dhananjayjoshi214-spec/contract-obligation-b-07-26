import logo from "../assets/logo.png";

function AuthLayout({ children }) {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0 min-vh-100">

        {/* Left Panel */}

        <div
          className="col-lg-4 text-white d-flex flex-column justify-content-between p-5"
          style={{ background: "#111827" }}
        >
          <div>

            <div className="d-flex align-items-center mb-5">

              <img
                src={logo}
                alt="logo"
                width="50"
                className="me-3"
              />

              <h2 className="fw-bold m-0">
                ContractIQ
              </h2>

            </div>

            <h1
              className="fw-bold"
              style={{
                fontSize: "3.2rem",
                lineHeight: "1.2",
              }}
            >
              Enterprise-grade
              <br />
              contract
              <br />
              intelligence.
            </h1>

            <p
              className="mt-4"
              style={{
                color: "#b8c1d1",
                fontSize: "18px",
              }}
            >
              Centralize your contract portfolio,
              automate obligation tracking,
              and maintain regulatory compliance.
            </p>

            <div className="mt-5">

              <p>🛡️ SOC 2 Type II certified platform</p>

              <p>🔒 End-to-end AES-256 encryption</p>

              <p>🌐 GDPR & CCPA compliant infrastructure</p>

            </div>

          </div>

          <div>

            <hr style={{ borderColor: "#374151" }} />

            <p className="text-light">
              Trusted by 500+ legal teams worldwide
            </p>

            <h5 className="text-warning">
              ★★★★★
            </h5>

            <small style={{ color: "#9ca3af" }}>
              4.9/5 • 2,400 reviews
            </small>

          </div>

        </div>

        {/* Right Panel */}

        <div
          className="col-lg-8 d-flex justify-content-center align-items-center"
          style={{
            background: "#f5f7fb",
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;