import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AddStaffData, GetStaffs, UpdateStaff, DeleteStaff } from "../../service/StaffData";
import { Button } from "react-bootstrap";
import EditLe from "./EditLendings";
import AddStaff from "./AddStaff";
import { useLocation } from "react-router";

export function LendingConsole() {
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

  const handleAdd = (newStaff: Staff) => {
    setStaffData([...staffData, newStaff]);
    setShowAddStaffForm(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const staffDetails = await GetStaffs();
      setStaffData(staffDetails);
    };
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

  const handleUpdate = (updatedStaff: Staff) => {
    const updatedStaffs = staffData.map((staff) =>
      staff.staffId === updatedStaff.staffId ? updatedStaff : staff
    );
    setStaffData(updatedStaffs);
  };

  const handleDelete = async (staffId: string) => {
    try {
      await DeleteStaff(staffId);
      setStaffData(staffData.filter((staff) => staff.staffId !== staffId));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const location = useLocation();
  const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
  const formattedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1, -1)+ "f";

  return (
    <>
      <div className="d-flex justify-content-end p-3">
        <Button
          variant="outline-primary"
          onClick={() => setShowAddStaffForm(true)}
        >
          Add {formattedTitle}
        </Button>
      </div>
      <h1 className="p-2 " style={{ color: 'navy' }}>{formattedTitle}</h1>
      <Table striped bordered hover style={{ borderColor: 'navy' }}>
        <thead style={{ backgroundColor: 'navy', color: 'white' }}>
          <tr>
            {tHeads.map((headings) => (
              <th>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staffData.map((row) => (
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
    </>
  );
}

