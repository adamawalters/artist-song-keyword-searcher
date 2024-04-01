import { useEffect, useState } from "react";
import { useUserContext } from "../../utils/context";
import { fetchTopSongs } from "../../utils/authorization";
import { Song, UserAuthToken } from "Types";
import SongTable from "../Songs/SongTable";


function TopSongs() {
  /* userToken is truthy always b/c of conditional statement on App.tsx */
  const { userToken } = useUserContext() as { userToken: UserAuthToken };
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
      <div className="center-container">
        <h2>Your Top Songs</h2>
        <SongTable songs={topSongs} />
      </div>
    </section>
  );
}

export default TopSongs;
