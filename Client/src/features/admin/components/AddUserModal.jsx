import { Modal, Button, Form } from "react-bootstrap";

function AddUserModal({
  show,
  handleClose,
  handleSave,
  newUser,
  handleChange,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          <Form.Group className="mb-3">

            <Form.Label>Full Name</Form.Label>

            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={newUser.name}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={handleChange}
            />

          </Form.Group>

          <Form.Group className="mb-3">

            <Form.Label>Role</Form.Label>

            <Form.Select
              name="role"
              value={newUser.role}
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
              value={newUser.status}
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
          variant="primary"
          onClick={handleSave}
        >
          Save User
        </Button>

      </Modal.Footer>

    </Modal>
  );
}

export default AddUserModal;