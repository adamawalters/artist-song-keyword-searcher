import { useUserContext } from "../utils/context";
import MusicIcon from "../assets/music-icon.png";
import "./../CSS/header.css";
import Login from "./Login";
import { useLocation, Link } from "react-router-dom";

function Header() {
  const { userToken } = useUserContext();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("spotify-auth-token");
    window.location.reload();
  }

  return (
    <header>
      <div className="header-div">
        <div className="title-icon">
          <img src={MusicIcon} />
          <span onClick={() => window.scrollTo(0, 0)}>TuneTrail</span>
        </div>
        {!userToken ? (
          <div className="login-div">
            <Login />
          </div>
        ) : (
          <>
            <button className="submit-button" onClick={handleLogout}>
              Logout
            </button>
            <Link to={location.pathname === "/profile"? "/main" : "/profile"} className="submit-button">
             { location.pathname === "/profile"? "Main Page" : "My Profile"}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
