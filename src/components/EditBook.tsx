import { useEffect, useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { UpdateBook } from "../service/BookData";

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

function EditBook({
  show,
  handleClose,
  selectedRow,
  handleUpdate,
}: BookEditProps) {

  const [book, setBook] = useState<Book>({
    bookId: "",
    bookName: "",
    author: "",
    edition: "",
    publisher: "",
    isbn: "",
    price: 0,
    totalQty: 0,
    availableQty: 0,
    lastUpdateDate: "",
    lastUpdateTime: "",
  });

  // need load the data when component mounted
  useEffect(() => {
    if (selectedRow) {
        setBook({...selectedRow});
    }
  }, [selectedRow]);

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  }

  const handleSave = async () => {
    try{
        const updatedBook = await UpdateBook(book);
        handleUpdate(updatedBook);
        handleClose();
    }catch(err){
        console.error("Failed to update the book", err);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form */}
        <FloatingLabel controlId="floatingInput" label="Book ID" className="mb-3">
          <Form.Control 
          readOnly
          type="text" 
          name="bookId" 
          value={book.bookId}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control 
          type="text" 
          name="bookName" 
          value={book.bookName}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
          <Form.Control 
          type="text" 
          name="author" 
          value={book.author}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Edition" className="mb-3">
          <Form.Control 
          type="text" 
          name="edition" 
          value={book.edition}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Publisher" className="mb-3">
          <Form.Control 
          type="text" 
          name="publisher" 
          value={book.publisher}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="ISBN" className="mb-3">
          <Form.Control 
          type="text" 
          name="isbn" 
          value={book.isbn}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
          <Form.Control 
          type="number" 
          name="price" 
          value={book.price}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Total Qty" className="mb-3">
          <Form.Control 
          type="number" 
          name="totalQty" 
          value={book.totalQty}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Available Qty" className="mb-3">
          <Form.Control 
          type="number" 
          name="availableQty" 
          value={book.availableQty}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Last Updated Date" className="mb-3">
          <Form.Control 
          readOnly
          type="text" 
          name="lastUpdateDate" 
          value={book.lastUpdateDate}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Last Updated Time" className="mb-3">
          <Form.Control 
          readOnly
          type="text" 
          name="lastUpdateTime" 
          value={book.lastUpdateTime}
          onChange={handleOnChange} />
        </FloatingLabel>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditBook;
