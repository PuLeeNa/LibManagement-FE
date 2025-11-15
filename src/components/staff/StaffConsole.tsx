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
      <div className="d-flex justify-content-between p-3 gap-2">
        <h1 className="p-1 " style={{ color: "navy" }}>
          Staff
        </h1>
        <div className="d-flex justify-content-end p-3 gap-2">
          <input
            type="text"
            placeholder="Search staff..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
            className="form-control w-auto"
          />
          <Button
            variant="outline-primary"
            onClick={() => setShowAddStaffForm(true)}
          >
            Add Staff
          </Button>
        </div>
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
            <tr key={row.staffId}>
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
                    onClick={() => handleDelete(row.staffId)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    </>
  );
}
