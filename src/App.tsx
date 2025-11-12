import React from "react";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "./App.css";
import NavB from "./components/NavB";
import { BookConsole } from "./components/book/BookConsole";
import { MemberConsole } from "./components/member/MemberConsole";
import { StaffConsole } from "./components/staff/StaffConsole";
import LendingConsole from "./components/lending/LendingConsole";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavB />
          <Routes>
            <Route path="/" element = {<BookConsole />} />
            <Route path="/book" element = {<BookConsole />}/>
            <Route path="/member" element = {<MemberConsole />} />
            <Route path="/staff" element = {<StaffConsole />} />
            <Route path="/lending" element = {<LendingConsole />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
