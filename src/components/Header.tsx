import { useUserContext } from "../utils/context";
import MusicIcon from "../assets/music-icon.png";
import "./../CSS/header.css";
import Login from "./Login";



function Header () {

  const { userToken } = useUserContext()

  return (
    <header>
      <div className="header-div">
        <div className="title-icon">
          <img src={MusicIcon} />
          <span onClick={() => window.scrollTo(0, 0)}>TuneTrail</span>
        </div>
        {!userToken ? <div className="login-div">
          <Login /> 
        </div>: null }
      </div>
    </header>
  );
}

export default Header;
