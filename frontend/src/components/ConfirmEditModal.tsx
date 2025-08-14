import { Modal, Button } from 'react-bootstrap';

interface ConfirmEditModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmEditModal({ show, onConfirm, onCancel }: ConfirmEditModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to save changes to this book?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Yes, Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmEditModal;