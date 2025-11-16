import { useState, useEffect } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import { GetBooks } from "../../service/BookData";
import { GetMembers } from "../../service/MemberData";

interface Lending {
  LendingId: string;
  book: string;
  member: string;
  isActiveLending: string;
}

interface Book {
  bookId: string;
  bookName: string;
}

interface Member {
  memberId: string;
  name: string;
}

function AddLendings({ show, handleClose, handleAdd, addLending }: any) {
  const [newLending, setNewLending] = useState<Lending>({
    LendingId: "",
    book: "",
    member: "",
    isActiveLending: "true",
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const booksData = await GetBooks();
        const membersData = await GetMembers();
        setBooks(booksData);
        setMembers(membersData);
      } catch (error) {
        console.error("Error loading books/members:", error);
      }
    };
    if (show) {
      loadData();
    }
  }, [show]);

  // add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLending((prev) => ({ ...prev, [name]: value }));
  };

  // handle the add book process with the back-end
  const handleOnSubmit = async () => {
    try {
      const newLendingDetails = await addLending(newLending);
      handleAdd(newLendingDetails);
      handleClose();
    } catch (err) {
      console.error("Failed to add the lending", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Lending</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Form */}
          <FloatingLabel
            controlId="bookSelect"
            label="Select Book"
            className="mb-3"
          >
            <Form.Select
              name="book"
              value={newLending.book}
              onChange={(e) =>
                setNewLending({ ...newLending, book: e.target.value })
              }
            >
              <option value="">Choose a book...</option>
              {books.map((book) => (
                <option key={book.bookId} value={book.bookId}>
                  {book.bookName} (ID: {book.bookId})
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="memberSelect"
            label="Select Member"
            className="mb-3"
          >
            <Form.Select
              name="member"
              value={newLending.member}
              onChange={(e) =>
                setNewLending({ ...newLending, member: e.target.value })
              }
            >
              <option value="">Choose a member...</option>
              {members.map((member) => (
                <option key={member.memberId} value={member.memberId}>
                  {member.name} (ID: {member.memberId})
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
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
