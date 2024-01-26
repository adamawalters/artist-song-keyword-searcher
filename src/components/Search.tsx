import SearchForm from "./SearchForm";
import ArtistList from "./ArtistList";
import { useState } from "react";
import { Artist } from "../Types";

export type SearchProps = {
  token: string;
};

const Search = ({ token }: SearchProps) => {
  const [artists, setArtists] = useState<null | Array<Artist>>(null);
  

  async function handleSearch(searchKey: string) {
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
    const responseArtists = parsedResponse.artists.items as Array<Artist>

    setArtists(responseArtists);
  }



  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      {artists ? <ArtistList artists={artists} /> : null}
    </>
  );
};

export default Search;
