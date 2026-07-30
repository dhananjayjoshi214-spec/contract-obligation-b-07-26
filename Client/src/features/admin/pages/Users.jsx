import { useState } from "react";

import usersData from "../data/users";

import UserSearch from "../components/UserSearch";
import UserTable from "../components/UserTable";
import UserPagination from "../components/UserPagination";

import AddUserModal from "../components/AddUserModal";
import ViewUserModal from "../components/ViewUserModal";
import EditUserModal from "../components/EditUserModal";
import DeleteUserModal from "../components/DeleteUserModal";

function Users() {

  // ===========================
  // Users
  // ===========================

  const [users, setUsers] = useState(usersData);

  // ===========================
  // New User
  // ===========================

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Employee",
    status: "Active",
  });

  // ===========================
  // Search
  // ===========================

  const [search, setSearch] = useState("");

  // ===========================
  // Pagination
  // ===========================

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  // ===========================
  // Modals
  // ===========================

  const [showAdd, setShowAdd] = useState(false);

  const [showView, setShowView] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  // ===========================
  // Selected User
  // ===========================

  const [selectedUser, setSelectedUser] = useState(null);

  const [editUser, setEditUser] = useState(null);

  const [deleteUser, setDeleteUser] = useState(null);

  // ===========================
  // Search Filter
  // ===========================

  const filteredUsers = users.filter((user) => {

    return (

      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.role
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  // ===========================
  // Pagination
  // ===========================

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers =
    filteredUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  // ===========================
  // Add User
  // ===========================

  const handleChange = (e) => {

    setNewUser({

      ...newUser,

      [e.target.name]: e.target.value,

    });

  };

  const handleSave = () => {

    if (

      newUser.name.trim() === "" ||

      newUser.email.trim() === ""

    ) {

      alert("Please fill all fields.");

      return;

    }

    const user = {

      id: users.length + 1,

      ...newUser,

    };

    setUsers([...users, user]);

    setNewUser({

      name: "",

      email: "",

      role: "Employee",

      status: "Active",

    });

    setShowAdd(false);

  };

  // ===========================
  // Update User
  // ===========================

  const handleUpdate = () => {

    const updatedUsers = users.map((user) =>

      user.id === editUser.id

        ? editUser

        : user

    );

    setUsers(updatedUsers);

    setShowEdit(false);

    setEditUser(null);

  };

  // ===========================
  // Delete User
  // ===========================

  const handleDelete = () => {

    const updatedUsers = users.filter(

      (user) => user.id !== deleteUser.id

    );

    setUsers(updatedUsers);

    setShowDelete(false);

    setDeleteUser(null);

  };
    return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>

          <h2 className="fw-bold">
            User Management
          </h2>

          <p className="text-muted mb-0">
            Total Users :
            <strong> {filteredUsers.length}</strong>
          </p>

        </div>

        <button
          className="btn btn-primary px-4"
          onClick={() => setShowAdd(true)}
        >
          + Add User
        </button>

      </div>

      {/* Search */}

      <UserSearch
        search={search}
        setSearch={setSearch}
      />

      {/* Users Table */}

      <UserTable
        users={currentUsers}

        onView={(user) => {
          setSelectedUser(user);
          setShowView(true);
        }}

        onEdit={(user) => {
          setEditUser(user);
          setShowEdit(true);
        }}

        onDelete={(user) => {
          setDeleteUser(user);
          setShowDelete(true);
        }}
      />

      {/* Pagination */}

      <UserPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {/* ===========================
          Modals
      =========================== */}

      <AddUserModal
        show={showAdd}
        handleClose={() => setShowAdd(false)}
        handleSave={handleSave}
        newUser={newUser}
        handleChange={handleChange}
      />

      <ViewUserModal
        show={showView}
        handleClose={() => {
          setShowView(false);
          setSelectedUser(null);
        }}
        selectedUser={selectedUser}
      />

      <EditUserModal
        show={showEdit}
        handleClose={() => {
          setShowEdit(false);
          setEditUser(null);
        }}
        editUser={editUser}
        handleChange={(e) =>
          setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
          })
        }
        handleUpdate={handleUpdate}
      />

      <DeleteUserModal
        show={showDelete}
        handleClose={() => {
          setShowDelete(false);
          setDeleteUser(null);
        }}
        deleteUser={deleteUser}
        handleDelete={handleDelete}
      />

    </div>
  );
}
export default Users;