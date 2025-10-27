import { useEffect, useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { AddBookData } from "../service/Books/AddBookData"

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

// interface BookEditProps {
//   show: boolean;
//   handleClose: () => void;
//   selectedRow: Book | null;
//   handleUpdate: (updatedBook: Book) => void;
// }

function AddBook({
  show,
  handleClose,
  handleAdd,
}: any) {

  const [newBook, setNewBook] = useState<Book>({
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

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  }

  // handle the add book process with the back-end
  const handleOnSubmit = async () => {
    try{
        const newBookDetails = await AddBookData(newBook);
        handleAdd(newBookDetails);
        handleClose();
    }catch(err){
        console.error("Failed to add the book", err);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form */}
        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control 
          type="text" 
          name="bookName" 
          value={newBook.bookName}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
          <Form.Control 
          type="text" 
          name="author" 
          value={newBook.author}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Edition" className="mb-3">
          <Form.Control 
          type="text" 
          name="edition" 
          value={newBook.edition}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Publisher" className="mb-3">
          <Form.Control 
          type="text" 
          name="publisher" 
          value={newBook.publisher}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="ISBN" className="mb-3">
          <Form.Control 
          type="text" 
          name="isbn" 
          value={newBook.isbn}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
          <Form.Control 
          type="number" 
          name="price" 
          value={newBook.price}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Total Qty" className="mb-3">
          <Form.Control 
          type="number" 
          name="totalQty" 
          value={newBook.totalQty}
          onChange={handleOnChange} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput" label="Available Qty" className="mb-3">
          <Form.Control 
          type="number" 
          name="availableQty" 
          value={newBook.availableQty}
          onChange={handleOnChange} />
        </FloatingLabel>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBook;
