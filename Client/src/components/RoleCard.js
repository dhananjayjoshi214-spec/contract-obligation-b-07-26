function RoleCard({
  title,
}) {
  return (
    <button
      type="button"
      className="btn btn-outline-secondary w-100 mb-2 rounded-3"
    >
      {title}
    </button>
  );
}

export default RoleCard;