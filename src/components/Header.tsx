import MusicIcon from "../assets/music-icon.png";
import "./../CSS/header.css";
import Login from "./Login";
import { UserAuthToken } from "Types";


type HeaderProps = { 
  setUserToken: React.Dispatch<React.SetStateAction<UserAuthToken | null>>
};

function Header ({setUserToken} : HeaderProps) {

  return (
    <header>
      <div className="header-div">
        <div className="title-icon">
          <img src={MusicIcon} />
          <span onClick={() => window.scrollTo(0, 0)}>TuneTrail</span>
        </div>
        <div className="login-div">
          <Login setUserToken={setUserToken} /> 
      </div>
      </div>
    </header>
  );
}

export default Header;
