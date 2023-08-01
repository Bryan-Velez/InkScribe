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
      backgroundColor: '#f36c2ecb',
      backgroundSize: '110px',
      backgroundPosition: 'center',
      border: '1px solid blue',
      borderRadius: '50px',
      height: '30px',
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
