import DashboardCard from "../components/DashboardCard";
import ContractsChart from "../components/ContractsChart";
import RecentActivity from "../components/RecentActivity";
import RecentNotifications from "../components/RecentNotifications";
import UpcomingRenewals from "../components/UpcomingRenewals";
function Dashboard() {
  return (
    <div>

      {/* Welcome Section */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Welcome Back 👋
        </h2>

        <p className="text-muted">
          Here's what's happening in your organization today.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Total Users"
            value="120"
            color="#0d6efd"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Contracts"
            value="58"
            color="#198754"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Pending Approvals"
            value="18"
            color="#ffc107"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Renewals"
            value="9"
            color="#dc3545"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Notifications"
            value="14"
            color="#6610f2"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Compliance"
            value="96%"
            color="#20c997"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Reports"
            value="45"
            color="#fd7e14"
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <DashboardCard
            title="Activity Logs"
            value="245"
            color="#6f42c1"
          />
        </div>


        <div className="row mt-4">

  <div className="col-lg-8">

    <ContractsChart />

  </div>

  <div className="col-lg-4">

    <RecentActivity />

  </div>

</div>

<div className="row mt-4">

  <div className="col-lg-6">

    <RecentNotifications />

  </div>

  <div className="col-lg-6">

    <UpcomingRenewals />

  </div>

</div>

        <div className="mt-4">

          <ContractsChart />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;