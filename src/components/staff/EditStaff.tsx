import { useEffect, useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

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

interface StaffEditProps {
  show: boolean;
  handleClose: () => void;
  selectedRow: Staff | null;
  handleUpdate: (updatedStaff: Staff) => void;
  updateStaffs: (staff: Staff) => Promise<void>;
}

function EditStaff({
  show,
  handleClose,
  selectedRow,
  handleUpdate,
  updateStaffs
}: StaffEditProps) {

  const [staff, setStaff] = useState<Staff>({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    joinDate: "",
    lastUpdateDate: "",
    lastUpdateTime: "",
    phone: "",
    role: ""
  });

  // need load the data when component mounted
  useEffect(() => {
    if (selectedRow) {
        setStaff({...selectedRow});
    }
  }, [selectedRow]);

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({
      ...staff,
      [e.target.name]: e.target.value,
    });
  }

  const handleSave = async () => {
    try{
        await updateStaffs(staff);
        handleUpdate(staff);
        handleClose();
    }catch(err){
        console.error("Failed to update the staff", err);
    }
  }

  const renderFloatingTable = (label: string, name: keyof Staff, type = "text", readOnly = false) => 
  (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
          <Form.Control 
          type={type}
          name={name}
          value={staff[name]}
          onChange={handleOnChange} 
          readOnly={readOnly}
          />
        </FloatingLabel>
  )

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {/* Form */}
        {renderFloatingTable("Member Id", "staffId", "text", true)}
        {renderFloatingTable("First Name", "firstName", "text", false)}
        {renderFloatingTable("Last Name", "lastName", "text", false)}
        {renderFloatingTable("Email", "email", "text", false)}
        {renderFloatingTable("Join Date", "joinDate", "text", true)}
        {renderFloatingTable("Last Update Date", "lastUpdateDate", "text", true)}
        {renderFloatingTable("Last Update Time", "lastUpdateTime", "text", true)}
        {renderFloatingTable("Phone", "phone", "text", false)}
        {renderFloatingTable("Role", "role", "text", false)}
        </Form>
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

export default EditStaff;
