import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  AddStaffData,
  GetStaffs,
  UpdateStaff,
  DeleteStaff,
} from "../../service/StaffData";
import { Button } from "react-bootstrap";
import EditStaff from "./EditStaff";
import AddStaff from "./AddStaff";
import { useLocation } from "react-router";

export function StaffConsole() {
  interface Staff {
    staffId: string;
    firstName: string;
    lastName: string;
    email: string;
    joinDate: string;
    lastUpdateDate: string;
    lastUpdateTime: string;
    phone: string;
    role: string;
  }

  const [staffData, setStaffData] = useState<Staff[]>([]);
  const [selectedRow, setSelectedRow] = useState<Staff | null>(null);
  const [showEditStaffForm, setShowEditStaffForm] = useState(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = staffData.filter(
    (staff) =>
      (staff.staffId?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (staff.firstName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (staff.lastName?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (staff.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (staff.phone?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (staff.role?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const loadData = async () => {
    const staffDetails = await GetStaffs();
    setStaffData(staffDetails);
  };

  const handleAdd = async (newStaff: Staff) => {
    setStaffData([...staffData, newStaff]);
    setShowAddStaffForm(false);
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const tHeads: string[] = [
    "Staff Id",
    "First Name",
    "Last Name",
    "Email",
    "Join Date",
    "Last Update Date",
    "Last Update Time",
    "Phone",
    "Role",
    "Actions",
  ];

  const handleEdit = (row: Staff) => {
    setSelectedRow(row);
    setShowEditStaffForm(true);
  };

  const handleClose = () => {
    setShowEditStaffForm(false);
  };

  const handleUpdate = async (updatedStaff: Staff) => {
    const updatedStaffs = staffData.map((staff) =>
      staff.staffId === updatedStaff.staffId ? updatedStaff : staff
    );
    setStaffData(updatedStaffs);
    await loadData();
  };

  const handleDelete = async (staffId: string) => {
    try {
      await DeleteStaff(staffId);
      setStaffData(staffData.filter((staff) => staff.staffId !== staffId));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "navy", fontWeight: "bold" }}>
            Staff Management
          </h1>
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="Search staff..."
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
              onClick={() => setShowAddStaffForm(true)}
              style={{ backgroundColor: "navy", border: "none" }}
            >
              + Add Staff
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
                <h6 className="text-muted">Total Staff</h6>
                <h2 className="mb-0">{staffData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #198754" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Active Staff</h6>
                <h2 className="mb-0 text-success">{filteredData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid navy" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Departments</h6>
                <h2 className="mb-0" style={{ color: "navy" }}>
                  {new Set(staffData.map((s) => s.role)).size}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div
          className="card shadow-sm"
          style={{ borderRadius: "15px", border: "none" }}
        >
          <div className="card-body p-0">
            {currentRows.map((row, index) => (
              <div
                key={row.staffId}
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
                        {row.firstName} {row.lastName}
                      </h5>
                      <span className="badge bg-primary">{row.role}</span>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <small className="text-muted d-block">Staff ID</small>
                        <span>{row.staffId}</span>
                      </div>
                      <div className="col-md-3">
                        <small className="text-muted d-block">Email</small>
                        <span>{row.email}</span>
                      </div>
                      <div className="col-md-3">
                        <small className="text-muted d-block">Phone</small>
                        <span>{row.phone}</span>
                      </div>
                      <div className="col-md-3">
                        <small className="text-muted d-block">Join Date</small>
                        <span>{row.joinDate}</span>
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
                      onClick={() => handleDelete(row.staffId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <EditStaff
          show={showEditStaffForm}
          handleClose={handleClose}
          selectedRow={selectedRow}
          handleUpdate={handleUpdate}
          updateStaffs={UpdateStaff}
        />
        <AddStaff
          show={showAddStaffForm}
          handleClose={() => setShowAddStaffForm(false)}
          handleAdd={handleAdd}
          addStaff={AddStaffData}
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
