import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AddBookData, GetBooks, UpdateBook } from "../../service/BookData";
import { Button } from "react-bootstrap";
import EditBook from "./EditBook";
import { DeleteBook } from "../../service/BookData";
import AddBook from "./AddBook";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

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

  const filteredData = bookData.filter(
    (book) =>
      (book.bookId?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (book.bookName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (book.author?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (book.publisher?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (book.isbn?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const loadData = async () => {
    const bookDetails = await GetBooks();
    setBookData(bookDetails);
  };

  const handleAdd = async (newBook: Book) => {
    try {
      setBookData([...bookData, newBook]);
      setShowAddBookForm(false);
      await loadData();
      toast.success("Book added successfully!");
    } catch (error) {
      toast.error("Failed to add book");
    }
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
    try {
      const updatedBooks = bookData.map((book) =>
        book.bookId === updatedBook.bookId ? updatedBook : book
      );
      setBookData(updatedBooks);
      await loadData();
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  const handleDelete = async (bookId: string) => {
    try {
      await DeleteBook(bookId);
      setBookData(bookData.filter((book) => book.bookId !== bookId));
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  // const location = useLocation();
  // const routeName =
  //   location.pathname.split("/").filter(Boolean).pop() || "Home";
  // const formattedTitle =
  //   routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + "k";

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "navy", fontWeight: "bold" }}>
            Books Management
          </h1>
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="form-control"
              style={{ width: "250px" }}
            />
            <Button
              variant="primary"
              onClick={() => setShowAddBookForm(true)}
              style={{ backgroundColor: "navy", border: "none" }}
            >
              + Add Book
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #0d6efd" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Total Books</h6>
                <h2 className="mb-0">{bookData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #198754" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Available</h6>
                <h2 className="mb-0 text-success">
                  {bookData.reduce((sum, book) => sum + book.availableQty, 0)}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #ffc107" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Total Quantity</h6>
                <h2 className="mb-0 text-warning">
                  {bookData.reduce((sum, book) => sum + book.totalQty, 0)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div
          className="card shadow-sm"
          style={{ borderRadius: "15px", border: "none" }}
        >
          <div className="card-body p-0">
            {currentRows.map((row, index) => (
              <div
                key={row.bookId}
                className="p-3"
                style={{
                  borderBottom:
                    index !== currentRows.length - 1
                      ? "1px solid #e9ecef"
                      : "none",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h5
                      className="mb-2"
                      style={{ color: "navy", fontWeight: "600" }}
                    >
                      {row.bookName}
                    </h5>
                    <div className="row">
                      <div className="col-md-4">
                        <small className="text-muted d-block">Book ID</small>
                        <span>{row.bookId}</span>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted d-block">Author</small>
                        <span>{row.author}</span>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted d-block">Publisher</small>
                        <span>{row.publisher}</span>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-3">
                        <small className="text-muted d-block">Edition</small>
                        <span>{row.edition}</span>
                      </div>
                      <div className="col-md-3">
                        <small className="text-muted d-block">ISBN</small>
                        <span>{row.isbn}</span>
                      </div>
                      <div className="col-md-2">
                        <small className="text-muted d-block">Price</small>
                        <span className="fw-bold">${row.price}</span>
                      </div>
                      <div className="col-md-2">
                        <small className="text-muted d-block">Total Qty</small>
                        <span>{row.totalQty}</span>
                      </div>
                      <div className="col-md-2">
                        <small className="text-muted d-block">Available</small>
                        <span className="text-success fw-bold">
                          {row.availableQty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(row.bookId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
            disabled={
              currentPage === Math.ceil(filteredData.length / rowsPerPage)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
