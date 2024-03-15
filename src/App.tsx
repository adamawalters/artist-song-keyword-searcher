import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Profile from "./components/Profile";

function App(){

  const loggedIn = false;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={ <Main />} />
        <Route path="/profile" element={ loggedIn? <Profile /> : < Navigate to= "/" />} />
      </Routes>
      <Footer />
    </Router>
  );
  
}

export default App;
