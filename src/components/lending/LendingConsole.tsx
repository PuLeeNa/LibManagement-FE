import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  AddLendingData,
  GetLendings,
  UpdateLending,
  DeleteLending,
} from "../../service/LendingData";
import { GetBooks } from "../../service/BookData";
import { GetMembers } from "../../service/MemberData";
import { Button } from "react-bootstrap";
import EditLendings from "./EditLendings";
import AddLendings from "./AddLendings";
import { toast } from "react-toastify";

export function LendingConsole() {
  interface Lending {
    lendingId: string;
    book: string;
    member: string;
    lendingDate: string;
    returnDate: string;
    isActiveLending: string;
    overdueStatus: number;
    fineAmount: number;
  }

  interface Book {
    bookId: string;
    bookName: string;
  }

  interface Member {
    memberId: string;
    name: string;
  }

  const [lendingData, setLendingData] = useState<Lending[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedRow, setSelectedRow] = useState<Lending | null>(null);
  const [showEditLendingForm, setShowEditLendingForm] = useState(false);
  const [showAddLendingForm, setShowAddLendingForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = lendingData.filter((lending) => {
    const matchesSearch =
      (lending.lendingId?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (lending.book?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (lending.member?.toLowerCase() || "").includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && lending.isActiveLending === "true") ||
      (statusFilter === "returned" && lending.isActiveLending === "false");

    return matchesSearch && matchesStatus;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const loadData = async () => {
    const lendingDetails = await GetLendings();
    const booksData = await GetBooks();
    const membersData = await GetMembers();
    setLendingData(lendingDetails);
    setBooks(booksData);
    setMembers(membersData);
  };

  const getBookName = (bookId: string) => {
    if (books.length === 0) {
      return bookId;
    }
    const book = books.find((b) => b.bookId === bookId);
    return book ? book.bookName : bookId;
  };

  const getMemberName = (memberId: string) => {
    const member = members.find((m) => m.memberId === memberId);
    return member ? member.name : memberId;
  };

  const handleAdd = async (newLending: Lending) => {
    try {
      setLendingData([...lendingData, newLending]);
      setShowAddLendingForm(false);
      await loadData();
      toast.success("Lending added successfully!");
    } catch (error) {
      toast.error("Failed to add lending");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const tHeads: string[] = [
    "Lending Id",
    "Book",
    "Member",
    "Lending Date",
    "Return Date",
    "Is Active Lending",
    "Overdue Status",
    "Fine Amount",
    "Actions",
  ];

  const handleEdit = (row: Lending) => {
    setSelectedRow(row);
    setShowEditLendingForm(true);
  };

  const handleClose = () => {
    setShowEditLendingForm(false);
  };

  const handleUpdate = async (updatedLending: Lending) => {
    try {
      const updatedLendings = lendingData.map((lending) =>
        lending.lendingId === updatedLending.lendingId
          ? updatedLending
          : lending
      );
      setLendingData(updatedLendings);
      await loadData();
      toast.success("Lending updated successfully!");
    } catch (error) {
      toast.error("Failed to update lending");
    }
  };

  const handleDelete = async (lendingId: string) => {
    try {
      await DeleteLending(lendingId);
      setLendingData(
        lendingData.filter((lending) => lending.lendingId !== lendingId)
      );
      toast.success("Lending deleted successfully!");
    } catch (error) {
      console.error("Error deleting lending:", error);
      toast.error("Failed to delete lending");
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "navy", fontWeight: "bold" }}>
            Lending Management
          </h1>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              style={{ width: "150px" }}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="returned">Returned</option>
            </select>
            <input
              type="text"
              placeholder="Search lending..."
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
              onClick={() => setShowAddLendingForm(true)}
              style={{ backgroundColor: "navy", border: "none" }}
            >
              + Add Lending
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #0d6efd" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Total Lendings</h6>
                <h2 className="mb-0">{lendingData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #198754" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Active</h6>
                <h2 className="mb-0 text-success">
                  {
                    lendingData.filter((l) => l.isActiveLending === "true")
                      .length
                  }
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #dc3545" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Overdue</h6>
                <h2 className="mb-0 text-danger">
                  {lendingData.filter((l) => l.overdueStatus === 1).length}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #ffc107" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Total Fines</h6>
                <h2 className="mb-0 text-warning">
                  $
                  {lendingData
                    .reduce((sum, l) => sum + l.fineAmount, 0)
                    .toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Lendings List */}
        <div
          className="card shadow-sm"
          style={{ borderRadius: "15px", border: "none" }}
        >
          <div className="card-body p-0">
            {currentRows.map((row, index) => (
              <div
                key={row.lendingId}
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
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5
                        className="mb-0"
                        style={{ color: "navy", fontWeight: "600" }}
                      >
                        {row.lendingId}
                      </h5>
                      <span
                        className={`badge ${
                          row.isActiveLending === "true"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {row.isActiveLending === "true" ? "Active" : "Returned"}
                      </span>
                      {row.overdueStatus === 1 && (
                        <span className="badge bg-danger">Overdue</span>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <small className="text-muted d-block">Book</small>
                        <b>
                          <span>{getBookName(row.book)}</span>
                        </b>
                      </div>
                      <div className="col-md-3">
                        <small className="text-muted d-block">Member</small>
                        <b>
                          <span>{getMemberName(row.member)}</span>
                        </b>
                      </div>
                      <div className="col-md-2">
                        <small className="text-muted d-block">
                          Lending Date
                        </small>
                        <span>{row.lendingDate}</span>
                      </div>
                      <div className="col-md-2">
                        <small className="text-muted d-block">
                          Return Date
                        </small>
                        <span>{row.returnDate}</span>
                      </div>
                      <div className="col-md-2">
                        <small className="text-muted d-block">
                          Fine Amount
                        </small>
                        <span className="text-danger fw-bold">
                          ${row.fineAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    {row.isActiveLending === "true" && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleEdit(row)}
                      >
                        Book Returned
                      </Button>
                    )}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(row.lendingId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <EditLendings
          show={showEditLendingForm}
          handleClose={handleClose}
          selectedRow={selectedRow}
          handleUpdate={handleUpdate}
          updateLendings={UpdateLending}
        />
        <AddLendings
          show={showAddLendingForm}
          handleClose={() => setShowAddLendingForm(false)}
          handleAdd={handleAdd}
          addLending={AddLendingData}
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
