import { Modal, Button } from "react-bootstrap";

function DeleteUserModal({
  show,
  handleClose,
  deleteUser,
  handleDelete,
}) {
  if (!deleteUser) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>

        <Modal.Title>
          Delete User
        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <h5 className="text-danger">
          Are you sure?
        </h5>

        <p>
          You are about to delete:
        </p>

        <div className="border rounded p-3 bg-light">

          <strong>Name:</strong> {deleteUser.name}
          <br />

          <strong>Email:</strong> {deleteUser.email}
          <br />

          <strong>Role:</strong> {deleteUser.role}

        </div>

        <p className="mt-3 text-muted">
          This action cannot be undone.
        </p>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={handleDelete}
        >
          Delete User
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

export default DeleteUserModal;