import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AddBookData, GetBooks, UpdateBook } from "../../service/BookData";
import { Button } from "react-bootstrap";
import EditBook from "./EditBook";
import { DeleteBook } from "../../service/BookData";
import AddBook from "./AddBook";

export function BookConsole() {
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

  const [bookData, setBookData] = useState<Book[]>([]);
  const [selectedRow, setSelectedRow] = useState<Book | null>(null);
  const [showEditBookForm, setShowEditBookForm] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  const handleAdd = (newBook: Book) => {
    setBookData([...bookData, newBook]);
    setShowAddBookForm(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const bookDetails = await GetBooks();
      setBookData(bookDetails);
    };
    loadData();
  }, []);

  const tHeads: string[] = [
    "Book Id",
    "Name",
    "Author",
    "Edition",
    "Publisher",
    "ISBN",
    "Price",
    "Total Qty",
    "Available Qty",
    "Last Update Date",
    "Last Update Time",
    "Actions",
  ];

  const handleEdit = (row: Book) => {
    setSelectedRow(row);
    setShowEditBookForm(true);
  };

  const handleClose = () => {
    setShowEditBookForm(false);
  };

  const handleUpdate = (updatedBook: Book) => {
    const updatedBooks = bookData.map((book) =>
      book.bookId === updatedBook.bookId ? updatedBook : book
    );
    setBookData(updatedBooks);
  };

  const handleDelete = async (bookId: string) => {
    try {
      await DeleteBook(bookId);
      setBookData(bookData.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end p-3">
        <Button
          variant="outline-primary"
          onClick={() => setShowAddBookForm(true)}
        >
          Add
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tHeads.map((headings) => (
              <th>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookData.map((row) => (
            <tr key={row.bookId}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-success"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(row.bookId)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditBook
        show={showEditBookForm}
        handleClose={handleClose}
        selectedRow={selectedRow}
        handleUpdate={handleUpdate}
        updateBooks={UpdateBook}
      />
      <AddBook
        show={showAddBookForm}
        handleClose={() => setShowAddBookForm(false)}
        handleAdd={handleAdd}
        addBook={AddBookData}
      />
    </>
  );
}
