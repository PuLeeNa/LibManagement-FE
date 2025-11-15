import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AddBookData, GetBooks, UpdateBook } from "../../service/BookData";
import { Button } from "react-bootstrap";
import EditBook from "./EditBook";
import { DeleteBook } from "../../service/BookData";
import AddBook from "./AddBook";
import { useLocation } from "react-router";

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
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = bookData.filter((book) =>
  book.bookId.toLowerCase().includes(searchQuery.toLowerCase()) ||
  book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
  book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
  book.isbn.toLowerCase().includes(searchQuery.toLowerCase())
);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const loadData = async () => {
    const bookDetails = await GetBooks();
    setBookData(bookDetails);
  };

  const handleAdd = async (newBook: Book) => {
    setBookData([...bookData, newBook]);
    setShowAddBookForm(false);
    await loadData();
  };

  useEffect(() => {
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

  const handleUpdate = async (updatedBook: Book) => {
    const updatedBooks = bookData.map((book) =>
      book.bookId === updatedBook.bookId ? updatedBook : book
    );
    setBookData(updatedBooks);
    await loadData();
  };

  const handleDelete = async (bookId: string) => {
    try {
      await DeleteBook(bookId);
      setBookData(bookData.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  

  // const location = useLocation();
  // const routeName =
  //   location.pathname.split("/").filter(Boolean).pop() || "Home";
  // const formattedTitle =
  //   routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + "k";

  return (
    <>
      <div className="d-flex justify-content-end p-3 gap-2">
        <h3 className="p-1 " style={{ color: "navy" }}>
        Books
      </h3>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
          className="form-control w-auto"
        />
        <Button
          variant="outline-primary"
          onClick={() => setShowAddBookForm(true)}
        >
          Add Book
        </Button>
      </div>
      <Table striped bordered hover style={{ borderColor: "navy" }}>
        <thead style={{ backgroundColor: "navy", color: "white" }}>
          <tr>
            {tHeads.map((headings) => (
              <th>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
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
      <div className="d-flex justify-content-center gap-2 my-3">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {Array.from(
          { length: Math.ceil(filteredData.length / rowsPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "primary" : "outline-primary"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}

        <Button
          variant="secondary"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
