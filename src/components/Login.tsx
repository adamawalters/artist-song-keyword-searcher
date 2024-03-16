import { UserAuthToken } from "Types";
import { useEffect } from "react";
import { authorizeUser } from "../utils/authorization";
import {getToken} from "../utils/authorization";
import { removeURLParameters } from "../utils/adhoc";


type LoginProps = {
  setUserToken: React.Dispatch<React.SetStateAction<UserAuthToken | null>>
};

function Login({setUserToken} : LoginProps) {

  //adds codeVerifier to localStorage and sends user to Spotify login page
  const handleLogin = async () => {
    await authorizeUser();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    removeURLParameters();
    
    if(!urlParams.has("code") || !code) return;
    if(urlParams.has("error")) { 
        console.error(`urlParams has error: ${error}`);
        return;
    }

    async function login() {
      try {
        const token = await getToken(code!);
        setUserToken(token);
      } catch (error) {
        console.error(error);
      }

    }
    
    login();
    
  }, [setUserToken]);

  return <button onClick={handleLogin}>Login with Spotify</button>;
}

export default Login;
