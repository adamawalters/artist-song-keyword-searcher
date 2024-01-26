import { useEffect, useState } from "react";

const CLIENT_ID = "c418f8eeb1764167baf4279404c77cba";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  });

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const params = new URLSearchParams({
      q: searchKey,
      type: "artist",
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params}`,
      options
    );

    const parsedResponse = await response.json();
    console.log(parsedResponse);
    const responseArtists = parsedResponse.artists.items;
    console.log(responseArtists);

    setArtists(responseArtists);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={"100%"} src={artist.images[0].url} alt="" />
        ) : (
          <div>No Image</div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <div className="app">
      <header className="App-header">
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify here
        </a>
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        {renderArtists()}
      </header>
    </div>
  );
}

export default App;
