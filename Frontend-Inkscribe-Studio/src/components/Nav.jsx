import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

  const navStyle = {
   
      marginRight: '10px', 
      padding: '8px 16px',
      textDecoration: 'none',
      color: '#604aeb',
      fontWeight: '900',
      transition: 'color 0.25s',
      backgroundColor: '#ff8800c4',
      border: '1px solid #604aeb',
      borderRadius: '50px',

      
    // .nav-link:hover {
    //   color: #ff9564;
    
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
