import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

interface Staff {
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

function AddStaff({
  show,
  handleClose,
  handleAdd,
  addStaff
}: any) {

  const [newStaff, setNewStaff] = useState<Staff>({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: ""
  });

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({...prev, [name]: value}));
  }

  // handle the add book process with the back-end
  const handleOnSubmit = async () => {
    try{
        const newStaffDetails = await addStaff(newStaff);
        handleAdd(newStaffDetails);
        handleClose();
    }catch(err){
        console.error("Failed to add the staff", err);
    }
  }

  const createFormElement = (label: string, name: keyof Staff, type = "text") => 
    (
      <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control 
            type={type}
            name={name}
            value={newStaff[name]}
            onChange={handleOnChange} 
            />
          </FloatingLabel>
    )

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {/* Form */}
        {createFormElement("First Name", "firstName", "text")}
        {createFormElement("Last Name", "lastName", "text")}
        {createFormElement("Email", "email", "text")}
        {createFormElement("Phone", "phone", "text")}
        {createFormElement("Role", "role", "text")}
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

export default AddStaff;
