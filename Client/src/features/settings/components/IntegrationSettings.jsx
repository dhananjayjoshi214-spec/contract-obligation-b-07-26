const integrations = [
  {
    name: "Slack",
    description: "Contract and compliance notifications",
    initials: "SL",
    connected: true,
    color: "#4A154B",
  },
  {
    name: "Salesforce",
    description: "CRM contract synchronization",
    initials: "SF",
    connected: true,
    color: "#00A1E0",
  },
  {
    name: "DocuSign",
    description: "Electronic signature workflow",
    initials: "DS",
    connected: false,
    color: "#FFB300",
  },
  {
    name: "Google Drive",
    description: "Cloud document storage",
    initials: "GD",
    connected: false,
    color: "#34A853",
  },
  {
    name: "Microsoft Teams",
    description: "Team collaboration and alerts",
    initials: "MT",
    connected: false,
    color: "#6264A7",
  },
  {
    name: "OneDrive",
    description: "Microsoft cloud storage",
    initials: "OD",
    connected: false,
    color: "#0078D4",
  },
  {
    name: "Dropbox",
    description: "File sharing and storage",
    initials: "DB",
    connected: false,
    color: "#0061FF",
  },
  {
    name: "Outlook",
    description: "Email and calendar integration",
    initials: "OL",
    connected: false,
    color: "#0078D4",
  },
];

function IntegrationSettings() {
  return (
    <div className="integration-section">

      <h2 className="section-title">
        Integrations
      </h2>

      <p className="section-subtitle">
        Connect external applications and services to streamline your workflow.
      </p>

      <div className="integration-card">

        {integrations.map((item) => (

          <div
            key={item.name}
            className="integration-row"
          >

            <div className="integration-left">

              <div
                className="integration-logo"
                style={{
                  background: item.color,
                }}
              >
                {item.initials}
              </div>

              <div>

                <h5 className="integration-title">
                  {item.name}
                </h5>

                <p className="integration-desc">
                  {item.description}
                </p>

              </div>

            </div>

            <button
              className={
                item.connected
                  ? "disconnect-btn"
                  : "connect-btn"
              }
            >
              {item.connected
                ? "Disconnect"
                : "Connect"}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default IntegrationSettings;