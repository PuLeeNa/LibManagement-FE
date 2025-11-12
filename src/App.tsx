import React from "react";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "./App.css";
import NavB from "./components/NavB";
import { BookConsole } from "./components/book/BookConsole";
import { MemberConsole } from "./components/member/MemberConsole";
import { StaffConsole } from "./components/staff/StaffConsole";
import LendingConsole from "./components/lending/LendingConsole";

function App() {
  return (
    <>
      <NavB />
      {/* <BookConsole /> */}
      {/* <MemberConsole /> */}
      {/* <StaffConsole /> */}
      <LendingConsole />
    </>
  );
}

export default App;
