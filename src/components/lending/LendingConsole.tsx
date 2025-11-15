import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  AddLendingData,
  GetLendings,
  UpdateLending,
  DeleteLending,
} from "../../service/LendingData";
import { Button } from "react-bootstrap";
import EditLendings from "./EditLendings";
import AddLendings from "./AddLendings";
import { useLocation } from "react-router";

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

  const [lendingData, setLendingData] = useState<Lending[]>([]);
  const [selectedRow, setSelectedRow] = useState<Lending | null>(null);
  const [showEditLendingForm, setShowEditLendingForm] = useState(false);
  const [showAddLendingForm, setShowAddLendingForm] = useState(false);

  const handleAdd = (newLending: Lending) => {
    setLendingData([...lendingData, newLending]);
    setShowAddLendingForm(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const lendingDetails = await GetLendings();
      setLendingData(lendingDetails);
    };
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

  const handleUpdate = (updatedLending: Lending) => {
    const updatedLendings = lendingData.map((lending) =>
      lending.lendingId === updatedLending.lendingId ? updatedLending : lending
    );
    setLendingData(updatedLendings);
  };

  const handleDelete = async (lendingId: string) => {
    try {
      await DeleteLending(lendingId);
      setLendingData(
        lendingData.filter((lending) => lending.lendingId !== lendingId)
      );
    } catch (error) {
      console.error("Error deleting lending:", error);
    }
  };

  const location = useLocation();
  const routeName =
    location.pathname.split("/").filter(Boolean).pop() || "Home";
  const formattedTitle =
    routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + "f";

  return (
    <>
      <div className="d-flex justify-content-end p-3">
        <Button
          variant="outline-primary"
          onClick={() => setShowAddLendingForm(true)}
        >
          Add {formattedTitle}
        </Button>
      </div>
      <h1 className="p-2 " style={{ color: "navy" }}>
        {formattedTitle}
      </h1>
      <Table striped bordered hover style={{ borderColor: "navy" }}>
        <thead style={{ backgroundColor: "navy", color: "white" }}>
          <tr>
            {tHeads.map((headings) => (
              <th>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lendingData.map((row) => (
            <tr key={row.lendingId}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className="d-flex gap-2">
                  {row.isActiveLending === "true" && (
                    <Button
                      variant="outline-success"
                      onClick={() => handleEdit(row)}
                    >
                      Book Returned
                    </Button>
                  )}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(row.lendingId)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    </>
  );
}
