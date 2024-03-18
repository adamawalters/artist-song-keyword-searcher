import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Profile from "./components/Profile/Profile";
import { UserAuthToken } from "Types";
import { useState } from "react";
import { UserContext } from "./utils/context";

function App(){

  const [userToken, setUserToken] = useState<UserAuthToken | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <UserContext.Provider value={{userToken, setUserToken, isLoading, setIsLoading}}>
        <Header />
        <Routes>
          <Route path="/" element={ <Main />} />
          {!isLoading ? <Route path="/profile" element={ userToken ? <Profile /> : < Navigate to= "/" />} />: null}
        </Routes>
        <Footer />
      </UserContext.Provider>
    </Router>
  );

}

export default App;
