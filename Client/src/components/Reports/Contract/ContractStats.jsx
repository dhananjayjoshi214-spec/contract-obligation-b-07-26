import "./Stats.css";

export default function Stats({ stats }) {
  return (
    <div className="stats-grid">
      {stats?.map((item) => (
        <div className="stat-card" key={item.title}>
          <h4>{item.title}</h4>
          <h2>{item.value}</h2>
          <span>{item.change}</span>
        </div>
      ))}
    </div>
  );
}