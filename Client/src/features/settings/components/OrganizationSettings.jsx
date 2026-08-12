import {
  FiBriefcase,
  FiGlobe,
  FiCreditCard,
  FiDatabase,
  FiClock,
  FiHeadphones,
} from "react-icons/fi";

const organizationData = [
  {
    icon: <FiBriefcase />,
    title: "Company Name",
    value: "ContractIQ Inc.",
  },
  {
    icon: <FiGlobe />,
    title: "Domain",
    value: "contractiq.com",
  },
  {
    icon: <FiCreditCard />,
    title: "Billing Plan",
    value: "Enterprise - 25 Seats",
  },
  {
    icon: <FiDatabase />,
    title: "Data Region",
    value: "US East (N. Virginia)",
  },
  {
    icon: <FiClock />,
    title: "Timezone",
    value: "Asia/Kolkata (UTC +5:30)",
  },
  {
    icon: <FiHeadphones />,
    title: "Support Contact",
    value: "support@contractiq.com",
  },
];

function OrganizationSettings() {
  return (
    <div className="organization-section">

      <h2 className="section-title">
        Organization Settings
      </h2>

      <p className="section-subtitle">
        Manage your company information, billing, and organizational preferences.
      </p>

      <div className="organization-card">

        {organizationData.map((item) => (

          <div
            key={item.title}
            className="organization-row"
          >

            <div className="organization-left">

              <div className="organization-icon">
                {item.icon}
              </div>

              <div>

                <h5 className="organization-title">
                  {item.title}
                </h5>

                <p className="organization-value">
                  {item.value}
                </p>

              </div>

            </div>

            <button className="edit-btn">
              Edit
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrganizationSettings;