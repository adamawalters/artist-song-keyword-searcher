import { useEffect, useState } from "react";
import { useUserContext } from "../../utils/context";
import { fetchTopSongs } from "../../utils/authorization";
import { Song } from "Types";
import SongTable from "../Songs/SongTable";

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

  return (
    <section id="top-song-section">
      <h2>Your Top Songs</h2>
      <SongTable songs={topSongs} />
    </section>
  );
}

export default TopSongs;
