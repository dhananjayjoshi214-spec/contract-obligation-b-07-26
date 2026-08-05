import { Modal, Button } from "react-bootstrap";

function ViewUserModal({
  show,
  handleClose,
  selectedUser,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {selectedUser && (

          <div>

            <p><strong>ID:</strong> {selectedUser.id}</p>

            <p><strong>Name:</strong> {selectedUser.name}</p>

            <p><strong>Email:</strong> {selectedUser.email}</p>

            <p><strong>Role:</strong> {selectedUser.role}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  selectedUser.status === "Active"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {selectedUser.status}
              </span>
            </p>

          </div>

        )}

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

export default ViewUserModal;