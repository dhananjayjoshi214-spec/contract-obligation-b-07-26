function DashboardCard({ title, value, color }) {
  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderLeft: `6px solid ${color}`,
        borderRadius: "12px",
      }}
    >
      <div className="card-body">

        <p
          className="text-muted mb-2"
          style={{ fontSize: "14px" }}
        >
          {title}
        </p>

        <h2
          className="fw-bold"
          style={{ color }}
        >
          {value}
        </h2>

      </div>
    </div>
  );
}

export default DashboardCard;