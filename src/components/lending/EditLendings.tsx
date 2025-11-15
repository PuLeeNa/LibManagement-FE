import { useEffect, useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

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


interface LendingEditProps {
  show: boolean;
  handleClose: () => void;
  selectedRow: Lending | null;
  handleUpdate: (updatedLending: Lending) => void;
  updateLendings: (lending: Lending) => Promise<void>;
}

function EditLendings({
  show,
  handleClose,
  selectedRow,
  handleUpdate,
  updateLendings
}: LendingEditProps) {

  const [lending, setLending] = useState<Lending>({
    lendingId: "",
    book: "",
    member: "",
    lendingDate: "",
    returnDate: "",
    isActiveLending: "true",
    overdueStatus: 0,
    fineAmount: 0,
  });

  // need load the data when component mounted
  useEffect(() => {
    if (selectedRow) {
        setLending({...selectedRow});
    }
  }, [selectedRow]);

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLending({
      ...lending,
      [e.target.name]: e.target.value,
    });
  }

  const handleSave = async () => {
    try{
        await updateLendings(lending);
        handleUpdate(lending);
        handleClose();
    }catch(err){
        console.error("Failed to update the lending", err);
    }
  }

  const renderFloatingTable = (label: string, name: keyof Lending, type = "text", readOnly = false) => 
  (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
          <Form.Control 
          type={type}
          name={name}
          value={lending[name]}
          onChange={handleOnChange} 
          readOnly={readOnly}
          />
        </FloatingLabel>
  )

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Lending</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {/* Form */}
        {renderFloatingTable("Lending Id", "lendingId", "text", true)}
        {renderFloatingTable("Book", "book", "text", true)}
        {renderFloatingTable("Member", "member", "text", true)}
        {renderFloatingTable("Lending Date", "lendingDate", "text", true)}
        {renderFloatingTable("Return Date", "returnDate", "text", true)}
        {renderFloatingTable("Is Active Lending", "isActiveLending", "text", true)}
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

export default EditLendings;
