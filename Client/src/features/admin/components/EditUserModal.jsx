import { Modal, Button, Form } from "react-bootstrap";

function EditUserModal({
  show,
  handleClose,
  editUser,
  handleChange,
  handleUpdate,
}) {
  if (!editUser) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Group className="mb-3">

            <Form.Label>Full Name</Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Role</Form.Label>

            <Form.Select
              name="role"
              value={editUser.role}
              onChange={handleChange}
            >
              <option>Administrator</option>
              <option>Manager</option>
              <option>Employee</option>
            </Form.Select>

          </Form.Group>

          <Form.Group>

            <Form.Label>Status</Form.Label>

            <Form.Select
              name="status"
              value={editUser.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Select>

          </Form.Group>

        </Form>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="warning"
          onClick={handleUpdate}
        >
          Update User
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

export default EditUserModal;