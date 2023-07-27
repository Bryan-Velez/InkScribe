import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ComicBookList from "./components/ComicBookList";
import ComicBookEdit from "./components/ComicBookEdit";
import PanelDesign from "./components/PanelDesign";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div>
      <h1>Inkscribe Studio</h1>
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/comicbooks" element={<ComicBookList />}></Route>
        <Route exact path="/edit/:id" element={<ComicBookEdit />}></Route>
        <Route exact path="/paneldesign" element={<PanelDesign />}></Route>
      </Routes>
    </div>
  );
};

export default App;
