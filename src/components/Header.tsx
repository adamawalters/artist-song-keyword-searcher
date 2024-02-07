import { useRef, useState, useEffect } from "react";
import MusicIcon from "../assets/music-icon.png";
import "./../CSS/header.css";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);


  /* TODO: only show logout button when logged in. This state is in a sibling state (AppRoutes)*/

  function logOut() {
    localStorage.removeItem("token")
    location.reload()
  }

  

  return (
    <header>
      <div className="header-div">
        <div className="title-icon">
          <img src={MusicIcon} />
          <span onClick={() => window.scrollTo(0, 0)}>
            Artist Song Keyword Search
          </span>
        </div>
        <span onClick={() => setNavOpen(!navOpen)}>{!navOpen? <i className="fa fa-bars"></i> : <i className="fa fa-times"></i> }</span>
      </div>
      <nav className="navbar" style={navOpen ? {display: "block"} : {display: "none"}}>
        <a href="#" onClick={()=>logOut()}>Logout</a>
      </nav>
    </header>
  );
};

export default Header;
