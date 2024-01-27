const Login = () => {
  const CLIENT_ID = "c418f8eeb1764167baf4279404c77cba";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  
  return (
    <>
      <h1>Please log in to Spotify</h1>
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>Log in </a>
    </>
  );
};

export default Login;
