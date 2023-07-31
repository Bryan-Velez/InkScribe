import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="header">
      <img
        src="https://raw.githubusercontent.com/Bryan-Velez/InkScribe/main/Frontend-Inkscribe-Studio/src/assets/InkScribe%20Header.png"
        alt=""
  
      />
      
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comicbooks">Comic Books</Link>
      </nav>
    </div>
  );
};

export default Nav;
