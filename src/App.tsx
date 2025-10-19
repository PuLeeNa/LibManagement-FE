import React from 'react';
// @ts-ignore: allow side-effect import of CSS without type declarations
import './App.css';
import NavB from './components/NavB';
import { BookConsole } from './components/BookConsole';

function App() {
  return (
    <>
    <NavB/>
    <BookConsole/>
    </>
  );
}

export default App;
