function RecentActivity({ activities = [] }) {
  return (
    <div className="card shadow-sm border-0 p-3">
      <h5 className="mb-3">Recent Activities</h5>

      {activities.length > 0 ? (
        <ul className="list-group list-group-flush">
          {activities.map((item, index) => (
            <li key={index} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted mb-0">No recent activities available.</p>
      )}
    </div>
  );
}

export default RecentActivity;