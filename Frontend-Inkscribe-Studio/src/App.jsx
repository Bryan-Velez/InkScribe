import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ComicBookList from "./components/ComicBookList";
import ComicBookEdit from "./components/ComicBookEdit";
import PageList from "./components/PageList";
import PageEdit from "./components/PageEdit";
import PanelList from "./components/PanelList";
import PanelEdit from "./components/PanelEdit";
import PanelDesign from "./components/PanelDesign";
import Navigation from "./components/Nav";
import './App.css'

const App = () => {
  return (
    <div className="app" style={{marginTop: '250px'}}>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/comicbooks" element={<ComicBookList/>}/>
        <Route path="/comicbooks/:id" element={<ComicBookEdit/>}/>
        <Route path="/comicbooks/:comicBookId/pages" element={<PageList/>}/>
        <Route path="/comicbooks/:comicBookId/pages/:id" element={<PageEdit/>}/>
        <Route path="/comicbooks/:comicBookId/pages/:pageId/panels" element={<PanelList/>}/>
        <Route path="/comicbooks/:comicBookId/pages/:pageId/panels/:id" element={<PanelEdit/>}/>
        <Route path="/paneldesign" element={<PanelDesign />}/>
      </Routes>
    </div>
  );
};

export default App;
