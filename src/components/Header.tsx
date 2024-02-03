import MusicIcon from "../assets/music-icon.png"


const Header = () => {

  return (
    <header>
      <div className="header-div">
        <img src={MusicIcon} />
        <span onClick={()=>window.scrollTo(0,0)}>Artist Song Keyword Search</span>
      </div>
    </header>
  )
}

export default Header