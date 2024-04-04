import { Artist, Song } from "../../Types";
import KeywordSearchSection from "./KeywordSearchSection";
import SongTable from "./SongTable";

export type SongSectionProps = {
  selectedArtist: Artist;
  fetchQueries: () => void;
  lastUsedKeyword: string;
  lastUsedArtistName: string;
  songs?: Array<Song>;
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
};

const SongSection = ({ selectedArtist, lastUsedKeyword, lastUsedArtistName, songs, submitSongSearch }: SongSectionProps) => {

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
            <SongTable songs={songs} />
          </div>
      ) : null}
    </>
  );
};

export default SongSection;
