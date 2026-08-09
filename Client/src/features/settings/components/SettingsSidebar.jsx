import {
  FiUser,
  FiLock,
  FiBell,
  FiSettings,
  FiBriefcase,
  FiDroplet,
} from "react-icons/fi";

const menuItems = [
  {
    id: "profile",
    title: "Profile",
    description: "Name, email, avatar",
    icon: FiUser,
  },
  {
    id: "security",
    title: "Security",
    description: "Password, 2FA, sessions",
    icon: FiLock,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Alerts and preferences",
    icon: FiBell,
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect external tools",
    icon: FiSettings,
  },
  {
    id: "organization",
    title: "Organization",
    description: "Company settings",
    icon: FiBriefcase,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Theme, colors, language",
    icon: FiDroplet,
  },
];

function SettingsSidebar({ activeTab, setActiveTab }) {
  return (
    <div className="settings-sidebar">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`settings-menu-item ${
              activeTab === item.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="menu-icon">
              <Icon />
            </div>

            <div className="menu-content">
              <h6>{item.title}</h6>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SettingsSidebar;