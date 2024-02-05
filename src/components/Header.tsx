import MusicIcon from "../assets/music-icon.png"
import "./../CSS/header.css"


const Header = () => {

  return (
    <header>
      <div className="header-div">
        <div className="title-icon">
          <img src={MusicIcon} />
          <span onClick={()=>window.scrollTo(0,0)}>Artist Song Keyword Search</span>
        </div>
        <i className="fa fa-bars"></i>
      </div>
    </header>
  )
}

export default Header