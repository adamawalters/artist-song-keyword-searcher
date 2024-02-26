import { useState, useCallback } from "react";
import { Artist } from "Types";
import ArtistSearchSection from "./ArtistSearchSection";
import ArtistResultTable from "./ArtistResultTable";
import { searchArtists } from "./../../utils/api";

type ArtistSectionProps = {
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
};

const ArtistSection = ({
  selectedArtist,
  setSelectedArtist,
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

      const response = await searchArtists(searchText, offset)
      setTotalArtistsInResponse(response.totalArtists);
      setArtists(response.artists);
      return () => abortController.abort();
    },
    [searchKey]
  );

  async function handleArtistSearch(newSearchKey: string) {
    loadArtists(0, newSearchKey);
  }


  return (
    <>
      <div className="search-box-divider">
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
