import { useState } from "react";
import { Artist, Song } from "../../Types";
import KeywordSearchSection from "./KeywordSearchSection";
import SongTable from "./SongTable";
import { searchSongs } from "./../../utils/api";

export type SongSectionProps = {
  selectedArtist: Artist;
};

const SongSection = ({ selectedArtist }: SongSectionProps) => {
  const [songs, setSongs] = useState<null | Array<Song>>(null);
  const [lastUsedKeyword, setLastUsedKeyword] = useState<string>("");
  const [lastUsedArtistName, setLastUsedArtistName] = useState<string>("");
  const [numSongsWithKeyword, setNumSongsWithKeyword] = useState<
    number | undefined
  >();

  async function submitKeywordSearch(searchKeyword: string) {
    setLastUsedKeyword(searchKeyword);
    setLastUsedArtistName(selectedArtist.name);
    //setSongs(null) - add loading in the future

    const response = await searchSongs(searchKeyword, selectedArtist.name)
    const tracks = response.tracks;
    const numSongs = response.totalTracks
    setSongs(tracks)
    setNumSongsWithKeyword(numSongs)

  }



  return (
    <>
      <KeywordSearchSection
        selectedArtist={selectedArtist}
        submitKeywordSearch={submitKeywordSearch}
      />
      {numSongsWithKeyword !== undefined ? (
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
