function UserSearch({ search, setSearch }) {
  return (
    <div className="mb-4">

      <input
        type="text"
        className="form-control"
        placeholder="Search by name, email or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>
  );
}

export default UserSearch;