import { useState } from "react";
import MusicIcon from "../assets/music-icon.png";
import "./../CSS/header.css";

type HeaderProps = {
  token: string;
};

const Header = ({ token }: HeaderProps) => {
  const [navOpen, setNavOpen] = useState(false);

  /* TODO: only show logout button when logged in. This state is in a sibling state (AppRoutes)*/

  function logOut() {
    localStorage.removeItem("token");
    location.reload();
  }

  return (
    <header>
      <div className="header-div">
        <div className="title-icon">
          <img src={MusicIcon} />
          <span onClick={() => window.scrollTo(0, 0)}>TuneTrail</span>
        </div>
        {token ? (
          <span onClick={() => setNavOpen(!navOpen)}>
            <i className={navOpen ? "fa fa-times" : "fa fa-bars"}></i>
          </span>
        ) : null}
      </div>
      <nav className="navbar" style={{ display: navOpen ? "block" : "none" }}>
        <a href="#" onClick={() => logOut()}>
          Logout
        </a>
      </nav>
    </header>
  );
};

export default Header;
