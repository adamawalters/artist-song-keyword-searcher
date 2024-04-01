import { useEffect } from "react";
import { authorizeUser } from "../utils/authorization";
import {getToken} from "../utils/authorization";
import { removeURLParameters } from "../utils/adhoc";
import { useUserContext } from "../utils/context";



function Login() {

  const { setIsLoading, setUserToken } = useUserContext();

  //adds codeVerifier to localStorage and sends user to Spotify login page
  const handleLogin = async () => {
    await authorizeUser();
  };

  //Logs in user using localStorage or checks url to get token from Spotify after redirect (and sets it in state)
  useEffect(() => {
    if(localStorage.getItem("spotify-auth-token")) {
      const token = JSON.parse(localStorage.getItem("spotify-auth-token")!);
      const requiredAuthFields = [
        "access_token",
        "token_type",
        "expires_in",
        "refresh_token",
        "scope",
        "profile",
        "expiration"
      ];
      if (!requiredAuthFields.every((field) => Object.keys(token).includes(field))){
        localStorage.removeItem("spotify-auth-token");
        throw new Error("Invalid token data from localStorage");
      }
      setUserToken(token);
      setIsLoading(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    removeURLParameters();
    
    if(!urlParams.has("code") || !code) {
      setIsLoading(false);
      return;
    }
    if(urlParams.has("error")) { 
        console.error(`urlParams has error: ${error}`);
        setIsLoading(false);
        return;
    }

    async function login() {
      try {
        const token = await getToken(code!);
        setUserToken(token);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }

    }
    
    login();
    
  }, [setIsLoading, setUserToken]);

  return <button className="submit-button" onClick={handleLogin}>Login with Spotify</button>;
}

export default Login;
