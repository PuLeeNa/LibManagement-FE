import React from "react";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "./App.css";
import NavB from "./components/NavB";
import { BookConsole } from "./components/book/BookConsole";
import { MemberConsole } from "./components/member/MemberConsole";

function App() {
  return (
    <>
      <NavB />
      {/* <BookConsole /> */}
      <MemberConsole />
    </>
  );
}

export default App;
