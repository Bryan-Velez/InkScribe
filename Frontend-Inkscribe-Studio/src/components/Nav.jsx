import React from "react";
import { Link } from "react-router-dom";

const div = () => {
  return (
    <div className="header">
      <h1>InkScribe Studio</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comicbooks">Comic Books</Link>
      </nav>
    </div>
  );
};

export default div;
