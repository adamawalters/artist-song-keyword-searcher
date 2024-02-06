const LoginPage = () => {
  const CLIENT_ID = "c418f8eeb1764167baf4279404c77cba";
  const REDIRECT_URI = import.meta.env.PROD ? "https://spotify-song-keyword-search.vercel.app/" :  "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  
  return (
      <div className="center-container">
        <h1>Please log in to Spotify</h1>
        <a
        className="submit-button"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>Log in </a>
      </div>
  );
};

export default LoginPage;
