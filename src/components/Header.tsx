import { useRef, useState, useEffect } from "react";
import MusicIcon from "../assets/music-icon.png";
import "./../CSS/header.css";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navbar = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navbar.current) {
      navOpen
        ? (navbar.current.style.display = "block")
        : (navbar.current.style.display = "none");
    }
  }, [navOpen]);

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
      <nav className="navbar" ref={navbar}>
        <a href="#" onClick={()=>logOut()}>Logout</a>
      </nav>
    </header>
  );
};

export default Header;
