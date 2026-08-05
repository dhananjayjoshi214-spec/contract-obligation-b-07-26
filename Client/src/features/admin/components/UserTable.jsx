import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card shadow-sm border-0">

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead className="table-light">

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Status</th>

              <th width="180">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length > 0 ? (

              users.map((user) => (

                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>

                    <span
                      className={`badge ${
                        user.status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => onView(user)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(user)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(user)}
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-4"
                >
                  No users found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserTable;