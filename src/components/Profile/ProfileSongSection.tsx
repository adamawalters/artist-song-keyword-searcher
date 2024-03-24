import { Artist, Song, UserAuthToken } from "../../Types";
import KeywordSearchSection from "../Songs/KeywordSearchSection";
import SongTable from "../Songs/SongTable"
import { saveUserQueryToDatabase } from "../../utils/api"
import { useUserContext } from "../../utils/context";

export type ProfileSongSectionProps = {
  selectedArtist: Artist;
  fetchQueries: () => void;
  lastUsedKeyword: string;
  lastUsedArtistName: string;
  songs?: Array<Song>;
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
};

function ProfileSongSection ({ selectedArtist, lastUsedKeyword, lastUsedArtistName, songs, submitSongSearch, fetchQueries }: ProfileSongSectionProps)  {

  const { userToken } = useUserContext() as {userToken: UserAuthToken}

  async function handleSaveQuery() {
    await saveUserQueryToDatabase({
      search_keyword: lastUsedKeyword,
      artist_name: lastUsedArtistName, 
      /* Function is only invoked after song is checked to be truthy */
      num_songs: songs!.length,
      spotify_id: userToken.profile.id
    })
    fetchQueries();
  }

  return (
    <>
      <KeywordSearchSection
        selectedArtist={selectedArtist}
        submitSongSearch={submitSongSearch}
        lastUsedKeyword={lastUsedKeyword}
      />
      {songs ? (
          <div className="center-container">
            <div className="direction-label">
              {songs.length !== 1
                ? `Results: There are ${songs.length} songs by ${lastUsedArtistName} with "${lastUsedKeyword}" in the song title`
                : `Results: There is ${songs.length} song by ${lastUsedArtistName} with "${lastUsedKeyword}" in the song title`}
            </div>
            <button className="submit-button" onClick={handleSaveQuery}>Save This Query</button>
            <SongTable songs={songs} />
          </div>
      ) : null}
      
    </>
  );
};

export default ProfileSongSection;
