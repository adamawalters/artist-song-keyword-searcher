import { useState, useEffect, useCallback } from "react";
import { Artist, ArtistSearchResponse } from "Types";
import ArtistResultTable from "./ArtistResultTable";
import ArtistSearchSection from "./ArtistSearchSection";
import NewArtistResultTable from "./NewArtistResultTable";

type ArtistSectionProps = {
    selectedArtist: Artist | null;
    setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
    token: string;
}

const ArtistSection = ({ selectedArtist, setSelectedArtist, token }: ArtistSectionProps) => {
  
  const [artists, setArtists] = useState<null | Array<Artist>>(null);
  const [searchKey, setSearchKey] = useState<string>("")
  const [ totalArtistsInResponse, setTotalArtistsInResponse] = useState<null | number>(null)
  
  const loadArtists = useCallback(async (offset: number = 0)=>{
    //setArtists(null) - in future add loading

    const abortController = new AbortController()

    const params = new URLSearchParams({
      q: searchKey,
      type: "artist",
      market: "US",
      limit: "10",
      offset: offset.toString()
  })  

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal
      }
    );

    const parsedResponse : ArtistSearchResponse= await response.json();
    const responseArtists = parsedResponse.artists.items 
    setTotalArtistsInResponse(parsedResponse.artists.total)  
    
    setArtists(responseArtists);
    return ()=> abortController.abort();
    
  }, [searchKey, token])

  async function handleArtistSearch(newSearchKey : string) {
    setSearchKey(newSearchKey);
  }


  useEffect(() => {
    if(!searchKey) return;
    loadArtists();
  
  }, [searchKey, loadArtists])


 
  return (
    <>
      <div className="section-spacing">
          <ArtistSearchSection handleArtistSearch={handleArtistSearch} />
      </div>
      {artists ? 
        // <ArtistResultTable
        //   artists={artists}
        //   setSelectedArtist={setSelectedArtist}
        //   selectedArtist={selectedArtist}
        // />
       <NewArtistResultTable 
           artists={artists}
           setSelectedArtist={setSelectedArtist}
           selectedArtist={selectedArtist}
           loadArtists={loadArtists}
           totalArtistsInResponse={totalArtistsInResponse ?? 0}
      /> : null}
    </>
  );
};

export default ArtistSection;
