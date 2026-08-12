import { useState } from "react";

import Layout from "../../layout/Layout";
import SettingsSidebar from "../components/SettingsSidebar";
import ProfileForm from "../components/ProfileForm";
import SecuritySettings from "../components/SecuritySettings";
import NotificationSettings from "../components/NotificationSettings";
import IntegrationSettings from "../components/IntegrationSettings";
import OrganizationSettings from "../components/OrganizationSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import "../styles/settings.css";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm />;
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "integrations":
        return <IntegrationSettings />;
      case "organization":
        return <OrganizationSettings />;
      case "appearance":
        return <AppearanceSettings />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <Layout>
    <div className="settings-page">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account and platform preferences.</p>
      </div>

      <div className="settings-layout">
        <SettingsSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="settings-content">
          {renderContent()}
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default SettingsPage;