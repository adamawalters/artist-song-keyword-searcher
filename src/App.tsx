import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Profile from "./components/Profile";
import { UserAuthToken } from "Types";
import { useState } from "react";

function App(){

  const [userToken, setUserToken] = useState<UserAuthToken | null>(null);

  return (
    <Router>
      <Header setUserToken={setUserToken}  />
      <Routes>
        <Route path="/" element={ <Main />} />
        <Route path="/profile" element={ userToken ? <Profile /> : < Navigate to= "/" />} />
      </Routes>
      <Footer />
    </Router>
  );

}

export default App;
