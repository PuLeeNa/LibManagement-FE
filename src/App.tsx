import React from "react";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "./App.css";
import NavB from "./components/NavB";
import { BookConsole } from "./components/book/BookConsole";
import { MemberConsole } from "./components/member/MemberConsole";
import { StaffConsole } from "./components/StaffConsole";

function App() {
  return (
    <>
      <NavB />
      {/* <BookConsole /> */}
      {/* <MemberConsole /> */}
      <StaffConsole />
    </>
  );
}

export default App;
