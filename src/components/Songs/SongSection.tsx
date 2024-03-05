import { useEffect, useState } from "react";
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
  const [numSongsWithKeyword, setNumSongsWithKeyword] = useState<number>();

  //Update numSongsWithKeyword when songs changes
  useEffect(() => { 
    if (songs) {
      setNumSongsWithKeyword(songs.length);
    } 
  }, [songs])

  return (
    <>
      <KeywordSearchSection
        selectedArtist={selectedArtist}
        submitSongSearch={submitSongSearch}
        lastUsedKeyword={lastUsedKeyword}
      />
      {songs ? (
        <>
          <div className="center-container">
            <div className="direction-label">
              {numSongsWithKeyword !== 1
                ? `Results: There are ${numSongsWithKeyword} songs by ${lastUsedArtistName} with "${lastUsedKeyword}" in the song title`
                : `Results: There is ${numSongsWithKeyword} song by ${lastUsedArtistName} with "${lastUsedKeyword}" in the song title`}
            </div>
            <SongTable songs={songs} lastUsedKeyword={lastUsedKeyword} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default SongSection;
