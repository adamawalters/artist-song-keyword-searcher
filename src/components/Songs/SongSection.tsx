import { useEffect, useState } from "react"
import { Artist, Song } from "../../Types"

export type SongSectionProps = {
    selectedArtistID: string
    token: string,
}


const SongSection = ({selectedArtistID, token}: SongSectionProps) => {

  /* use the selected artist ID to fetch top songs by the artist by default - there will be a SongList component
     have a search box for keyword that will update the songList Component  (will search the artist's songs that have a keyword)
     After the user searches, have a counter for number of songs in the songlist 
  */  

  const [songs, setSongs] = useState<null | Array<Song>>(null)   

  /*Fetch top songs */   
  useEffect(()=>{

    async function loadTopSongs(){
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${selectedArtistID}/top-tracks?country=US`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const parsedResponse = await response.json();

      const responseTracks = parsedResponse.tracks as Array<Song>

      setSongs(responseTracks);
    }
    loadTopSongs()


  },[selectedArtistID, token])   

  

  return (
    <div>SongSection</div>
  )
}

export default SongSection