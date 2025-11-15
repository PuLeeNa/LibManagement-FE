import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

interface Lending {
  LendingId: string;
  book: string;
  member: string;
  isActiveLending: string;
}

function AddLendings({
  show,
  handleClose,
  handleAdd,
  addLending
}: any) {

  const [newLending, setNewLending] = useState<Lending>({
    LendingId: "",
    book: "",
    member: "",
    isActiveLending: "true",
  });

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLending((prev) => ({...prev, [name]: value}));
  }

  // handle the add book process with the back-end
  const handleOnSubmit = async () => {
    try{
        const newLendingDetails = await addLending(newLending);
        handleAdd(newLendingDetails);
        handleClose();
    }catch(err){
        console.error("Failed to add the lending", err);
    }
  }

  const createFormElement = (label: string, name: keyof Lending, type = "text") => 
    (
      <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
            <Form.Control 
            type={type}
            name={name}
            value={newLending[name]}
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
        {createFormElement("Book", "book", "text")}
        {createFormElement("Member", "member", "text")}
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

export default AddLendings;
