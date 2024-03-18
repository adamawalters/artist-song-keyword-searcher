import { useEffect, useState } from "react";
import { useUserContext } from "../../utils/context";
import { fetchTopSongs } from "../../utils/authorization";
import { Song } from "Types";

function TopSongs() {
  const { userToken } = useUserContext();
  const [topSongs, setTopSongs] = useState<Array<Song>>([]);

  useEffect(() => {
    async function loadTopSongs() {
      try {
        const responseSongs = await fetchTopSongs(userToken);
        setTopSongs(responseSongs);
      } catch (error) {
        console.error(error);
      }
    }
    loadTopSongs();
  }, [userToken]);

  return <div>{topSongs ? topSongs.map((song) => song.name) : null}</div>;
}

export default TopSongs;
