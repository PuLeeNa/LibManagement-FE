import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Book {
    bookId: string;
    bookName: string;
    author: string;
    edition: string;
    publisher: string;
    isbn: string;
    price: number;
    totalQty: number;
    availableQty: number;
    lastUpdateDate: string;
    lastUpdateTime: string;
  }

interface BookEditProps {
    show: boolean;
    handleClose: () => void;
    selectedRow: Book | null;
    handleUpdate: (updatedBook: Book) => void;
}  

function EditBook({ show, handleClose, selectedRow, handleUpdate }: BookEditProps) {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditBook;