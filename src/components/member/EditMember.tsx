import { useEffect, useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

interface Member {
  memberId: string;
  name: string;
  email: string;
  membershipDate: string;
}

interface MemberEditProps {
  show: boolean;
  handleClose: () => void;
  selectedRow: Member | null;
  handleUpdate: (updatedMember: Member) => void;
  updateMembers: (member: Member) => Promise<void>;
}

function EditMember({
  show,
  handleClose,
  selectedRow,
  handleUpdate,
  updateMembers
}: MemberEditProps) {

  const [member, setMember] = useState<Member>({
    memberId: "",
    name: "",
    email: "",
    membershipDate: "",
  });

  // need load the data when component mounted
  useEffect(() => {
    if (selectedRow) {
        setMember({...selectedRow});
    }
  }, [selectedRow]);

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  }

  const handleSave = async () => {
    try{
        await updateMembers(member);
        handleUpdate(member);
        handleClose();
    }catch(err){
        console.error("Failed to update the member", err);
    }
  }

  const renderFloatingTable = (label: string, name: keyof Member, type = "text", readOnly = false) => 
  (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
          <Form.Control 
          type={type}
          name={name}
          value={member[name]}
          onChange={handleOnChange} 
          readOnly={readOnly}
          />
        </FloatingLabel>
  )

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {/* Form */}
        {renderFloatingTable("Member Id", "memberId", "text", true)}
        {renderFloatingTable("Name", "name", "text", false)}
        {renderFloatingTable("Email", "email", "text", false)}
        {renderFloatingTable("Membership Date", "membershipDate", "text", true)}
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

export default EditMember;
