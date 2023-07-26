import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ComicBookList from "./components/ComicBookList";
import ComicPage from "./components/PageDetails";
import PanelDesign from "./components/PanelDesign";

const App = () => {
  return (
    <div>
      <h1>Comic Book Creator Studio</h1>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/comiclist" element={<ComicBookList />}></Route>
        <Route exact path="/comicpage" element={<ComicPage />}></Route>
        <Route exact path="/paneldesign" element={<PanelDesign />}></Route>
      </Routes>
    </div>
  );
};

export default App;
