import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

  const navStyle = {
   
      marginRight: '10px', 
      padding: '8px 16px',
      textDecoration: 'none',
      color: 'white',
      fontWeight: '900',
      transition: 'color 0.25s',
      backgroundColor: 'red',
      backgroundSize: '110px',
      backgroundPosition: 'center',
      border: '3px solid #007bff',
      borderRadius: '50px',
      height: '30px',
      boxShadow: '-6px 6px 10px rgba(120, 120, 120)',
  }


  return (
    <div className="header">
      <img
        src="https://raw.githubusercontent.com/Bryan-Velez/InkScribe/main/Frontend-Inkscribe-Studio/src/assets/InkScribe%20Header.png"
        alt=""
  
      />
      
      <nav>
        <Link to="/" style={navStyle}>Home</Link>
        <Link to="/comicbooks" style={navStyle}>Comic Books</Link>
      </nav>
    </div>
  );
};

export default Nav;
