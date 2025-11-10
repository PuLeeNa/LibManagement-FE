import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

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
  addBook
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
    availableQty: 0
  });

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({...prev, [name]: value}));
  }

  // handle the add book process with the back-end
  const handleOnSubmit = async () => {
    try{
        const newBookDetails = await addBook(newBook);
        handleAdd(newBookDetails);
        handleClose();
    }catch(err){
        console.error("Failed to add the book", err);
    }
  }

  const createFormElement = (label: string, name: keyof Book, type = "text") => 
    (
      <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control 
            type={type}
            name={name}
            value={newBook[name]}
            onChange={handleOnChange} 
            />
          </FloatingLabel>
    )

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {/* Form */}
        {createFormElement("Book Name", "bookName", "text")}
        {createFormElement("Author", "author", "text")}
        {createFormElement("Edition", "edition", "text")}
        {createFormElement("Publisher", "publisher", "text")}
        {createFormElement("ISBN", "isbn", "text")}
        {createFormElement("Price", "price", "number")}
        {createFormElement("Total Qty", "totalQty", "number")}
        {createFormElement("Available Qty", "availableQty", "number")}

        {/* <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
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
        </FloatingLabel> */}
  </Form>
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
