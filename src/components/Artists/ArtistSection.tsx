import { useState, useCallback } from "react";
import { Artist, ArtistSearchResponse } from "Types";
import ArtistSearchSection from "./ArtistSearchSection";
import ArtistResultTable from "./ArtistResultTable";

type ArtistSectionProps = {
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
  token: string;
};

const ArtistSection = ({
  selectedArtist,
  setSelectedArtist,
  token,
}: ArtistSectionProps) => {
  
  const [artists, setArtists] = useState<null | Array<Artist>>(null);
  const [searchKey, setSearchKey] = useState<string>("");
  const [totalArtistsInResponse, setTotalArtistsInResponse] = useState<
    null | number
  >(null);

  
  const loadArtists = useCallback(
    async (offset: number, searchStringFromArtistSearch?: string) => {

      /* Set the search key state to the string from artist search so function can be called by ArtistResultTable without a new search key when called later */
      if (searchStringFromArtistSearch) {
        setSearchKey(searchStringFromArtistSearch);
      }

      /*Use string from artist search if available, otherwise searchKey within state */
      const searchText = searchStringFromArtistSearch || searchKey;

      const abortController = new AbortController();

      const params = new URLSearchParams({
        q: searchText,
        type: "artist",
        market: "US",
        limit: "10",
        offset: offset.toString(),
      });

      const response = await fetch(
        `https://api.spotify.com/v1/search?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: abortController.signal,
        }
      );

      const parsedResponse: ArtistSearchResponse = await response.json();
      const responseArtists = parsedResponse.artists.items;
      setTotalArtistsInResponse(parsedResponse.artists.total);
      setArtists(responseArtists);
      return () => abortController.abort();
    },
    [searchKey, token]
  );

  async function handleArtistSearch(newSearchKey: string) {
    loadArtists(0, newSearchKey);
  }


  return (
    <>
      <div className="section-spacing">
        <ArtistSearchSection handleArtistSearch={handleArtistSearch} />
      </div>
      {artists ? (
        <ArtistResultTable
          artists={artists}
          setSelectedArtist={setSelectedArtist}
          selectedArtist={selectedArtist}
          loadArtists={loadArtists}
          totalArtistsInResponse={totalArtistsInResponse ?? 0}
          searchKey={searchKey}
        />
      ) : null}
    </>
  );
};

export default ArtistSection;
