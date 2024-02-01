import ArtistSearchForm from "./ArtistSearchForm";
import ArtistSection from "./Artists/ArtistSection";
import { useEffect, useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";

export type SearchProps = {
  token: string;
};

const Search = ({ token }: SearchProps) => {
  const [artists, setArtists] = useState<null | Array<Artist>>(null);
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);


  /* TODO: add pagination so users can select between more than the top 5 artists that show up*/
  async function handleSearch(searchKey: string) {
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

  /* By default before user searches - load top artists*/
  // useEffect(() => {
  //   async function loadTopArtists() {
  //     const response = await fetch(
  //       `https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const parsedResponse = await response.json();
  //     console.log(parsedResponse);
  //     const responseArtists = parsedResponse.artists as Array<Artist>;

  //     setArtists(responseArtists);
  //   }

  //   loadTopArtists();
  // }, [token]);

  return (
    <>
      <section>
        <ArtistSearchForm handleSearch={handleSearch} />
      </section>
      <section>
        {artists ? (
          <ArtistSection
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

export default Search;
