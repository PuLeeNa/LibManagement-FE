import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import {
  AddMemberData,
  GetMembers,
  UpdateMember,
  DeleteMember,
} from "../../service/MemberData";
import { Button } from "react-bootstrap";
import EditMember from "./EditMember";
import AddMember from "./AddMember";
import { useLocation } from "react-router";

export function MemberConsole() {
  interface Member {
    memberId: string;
    name: string;
    email: string;
    membershipDate: string;
  }

  const [memberData, setMemberData] = useState<Member[]>([]);
  const [selectedRow, setSelectedRow] = useState<Member | null>(null);
  const [showEditMemberForm, setShowEditMemberForm] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);

  const loadData = async () => {
    const memberDetails = await GetMembers();
    setMemberData(memberDetails);
  };

  const handleAdd = async (newMember: Member) => {
    setMemberData([...memberData, newMember]);
    setShowAddMemberForm(false);
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const tHeads: string[] = [
    "Member Id",
    "Name",
    "Email",
    "Membership Date",
    "Actions",
  ];

  const handleEdit = (row: Member) => {
    setSelectedRow(row);
    setShowEditMemberForm(true);
  };

  const handleClose = () => {
    setShowEditMemberForm(false);
  };

  const handleUpdate = async (updatedMember: Member) => {
    const updatedMembers = memberData.map((member) =>
      member.memberId === updatedMember.memberId ? updatedMember : member
    );
    setMemberData(updatedMembers);
    await loadData();
  };

  const handleDelete = async (memberId: string) => {
    try {
      await DeleteMember(memberId);
      setMemberData(
        memberData.filter((member) => member.memberId !== memberId)
      );
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end p-3">
        <Button
          variant="outline-primary"
          onClick={() => setShowAddMemberForm(true)}
        >
          Add Member
        </Button>
      </div>
      <h1 className="p-2 " style={{ color: "navy" }}>
        Members
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
          {memberData.map((row) => (
            <tr key={row.memberId}>
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
                    onClick={() => handleDelete(row.memberId)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditMember
        show={showEditMemberForm}
        handleClose={handleClose}
        selectedRow={selectedRow}
        handleUpdate={handleUpdate}
        updateMembers={UpdateMember}
      />
      <AddMember
        show={showAddMemberForm}
        handleClose={() => setShowAddMemberForm(false)}
        handleAdd={handleAdd}
        addMember={AddMemberData}
      />
    </>
  );
}
