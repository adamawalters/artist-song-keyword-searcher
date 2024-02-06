import ArtistSearchForm from "./Artists/ArtistSearchSection";
import ArtistResultTable from "./Artists/ArtistResultTable";
import { useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";

export type SearchProps = {
  token: string;
};

const Main = ({ token }: SearchProps) => {
  const [artists, setArtists] = useState<null | Array<Artist>>(null);
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);


  /* TODO: add pagination so users can select between more than the top 5 artists that show up */
  async function handleArtistSearch(searchKey: string) {
    const params = new URLSearchParams({
      q: searchKey,
      type: "artist",
      limit: "5",
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = await response.json();
    const responseArtists = parsedResponse.artists.items as Array<Artist>;

    setArtists(responseArtists);
  }

  return (
    <>
      <section>
        <ArtistSearchForm handleArtistSearch={handleArtistSearch} />
      </section>
      <section>
        {artists ? (
          <ArtistResultTable
            artists={artists}
            setSelectedArtist={setSelectedArtist}
            selectedArtist={selectedArtist}
          />
        ) : null}
      </section>
      <section>
        {selectedArtist ? (
          <SongSection selectedArtist={selectedArtist} token={token} />
        ) : null}
      </section>
    </>
  );
};

export default Main;
