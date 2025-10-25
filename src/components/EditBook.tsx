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
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default EditBook;