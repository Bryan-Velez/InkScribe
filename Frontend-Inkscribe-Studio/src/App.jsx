import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ComicBook from "./components/ComicBook";
import ComicPage from "./components/ComicPage";
import PanelDesign from "./components/PanelDesign";

const App = () => {
  return (
    <div>
      <h1>Comic Book Creator Studio</h1>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/comicbook" element={<ComicBook />}></Route>
        <Route exact path="/comicpage" element={<ComicPage />}></Route>
        <Route exact path="/paneldesign" element={<PanelDesign />}></Route>
      </Routes>
    </div>
  );
};

export default App;
