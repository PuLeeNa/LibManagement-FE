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

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = memberData.filter(
    (member) =>
      (member.memberId?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (member.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (member.email?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

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
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "navy", fontWeight: "bold" }}>
            Members Management
          </h1>
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="form-control"
              style={{ width: "250px" }}
            />
            <Button
              variant="primary"
              onClick={() => setShowAddMemberForm(true)}
              style={{ backgroundColor: "navy", border: "none" }}
            >
              + Add Member
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #0d6efd" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Total Members</h6>
                <h2 className="mb-0">{memberData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid #198754" }}
            >
              <div className="card-body">
                <h6 className="text-muted">Active Members</h6>
                <h2 className="mb-0 text-success">{filteredData.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "15px", borderLeft: "4px solid navy" }}
            >
              <div className="card-body">
                <h6 className="text-muted">New This Month</h6>
                <h2 className="mb-0" style={{ color: "navy" }}>
                  {
                    memberData.filter((m) => {
                      const memberDate = new Date(m.membershipDate);
                      const now = new Date();
                      return (
                        memberDate.getMonth() === now.getMonth() &&
                        memberDate.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div
          className="card shadow-sm"
          style={{ borderRadius: "15px", border: "none" }}
        >
          <div className="card-body p-0">
            {currentRows.map((row, index) => (
              <div
                key={row.memberId}
                className="p-3"
                style={{
                  borderBottom:
                    index !== currentRows.length - 1
                      ? "1px solid #e9ecef"
                      : "none",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <h5
                      className="mb-2"
                      style={{ color: "navy", fontWeight: "600" }}
                    >
                      {row.name}
                    </h5>
                    <div className="row">
                      <div className="col-md-4">
                        <small className="text-muted d-block">Member ID</small>
                        <span>{row.memberId}</span>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted d-block">Email</small>
                        <span>{row.email}</span>
                      </div>
                      <div className="col-md-4">
                        <small className="text-muted d-block">
                          Membership Date
                        </small>
                        <span>{row.membershipDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(row.memberId)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      </div>
    </>
  );
}
