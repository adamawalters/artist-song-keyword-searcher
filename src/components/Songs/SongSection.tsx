import { useState } from "react";
import { Artist, Song, TrackResponse } from "../../Types";
import KeywordSearchSection from "./KeywordSearchSection";
import SongTable from "./SongTable";

export type SongSectionProps = {
  selectedArtist: Artist;
  token: string;
};

const SongSection = ({ selectedArtist, token }: SongSectionProps) => {

  const [songs, setSongs] = useState<null | Array<Song>>(null);
  const [lastUsedKeyword, setLastUsedKeyword] = useState<string>("");
  const [lastUsedArtistName, setLastUsedArtistName] = useState<string>("");
  const [numSongsWithKeyword, setNumSongsWithKeyword] = useState<number | undefined>();


  async function submitKeywordSearch(searchKeyword: string) {
    setLastUsedKeyword(searchKeyword);
    setLastUsedArtistName(selectedArtist.name);
    //setSongs(null) - add loading in the future

    const params = new URLSearchParams({
      q: `track:"${searchKeyword}" artist:"${selectedArtist.name}"`,
      type: `track`,
      market: `US`,
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedResponse = await response.json();
    const trackResponse: TrackResponse = parsedResponse.tracks;
    /*continue performing requests until trackresponse.next is null - append tracks to items  */

    while (trackResponse.next) {
      const currResponse = await fetch(trackResponse.next, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const currParsedResponse = await currResponse.json();
      const currTrackResponse: TrackResponse = currParsedResponse.tracks;

      trackResponse.items.push(...currTrackResponse.items);
      trackResponse.next = currTrackResponse.next;
    }

    removeSongDuplicates(trackResponse);
  }

  function removeSongDuplicates(trackResponse: TrackResponse) {
    const originalTracks: Song[] = trackResponse.items;
    const isrcFilteredTracks: Song[] = [];
    const nameFilteredTracks: Song[] = [];
    const isrc_ids = new Set();
    const song_names = new Set();

    /*Filter based on isrc */
    originalTracks.forEach((track) => {
      if (!isrc_ids.has(track.external_ids.isrc)) {
        isrc_ids.add(track.external_ids.isrc);
        isrcFilteredTracks.push(track);
      }
    });

    /*Filter based on exact name match */
    isrcFilteredTracks.forEach((track) => {
      const additionalInfoRegex = /(?:\([^)]*\)|-).*$/;
      const standardizedTrackName = track.name
        .replace(additionalInfoRegex, "")
        .trim()
        .toLowerCase();

      if (!song_names.has(standardizedTrackName)) {
        song_names.add(standardizedTrackName);
        nameFilteredTracks.push(track);
      }
    });

    const totalTracksForQuery: number = nameFilteredTracks.length;
    setNumSongsWithKeyword(totalTracksForQuery);
    nameFilteredTracks.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    setSongs(nameFilteredTracks);
  }

 
  return (
    <>
        <KeywordSearchSection selectedArtist={selectedArtist} submitKeywordSearch={submitKeywordSearch}/>
        {numSongsWithKeyword !== undefined ? (
          <div className="song-result-spacer">
            <span className="direction-label">
              {numSongsWithKeyword > 1 ? `Results: there are ${numSongsWithKeyword} songs by ${lastUsedArtistName} with "${lastUsedKeyword}" in the song title` : 
                `Results: there is ${numSongsWithKeyword} song by ${lastUsedArtistName} with "${lastUsedKeyword}" in the song title`
              }
            </span>
              <SongTable songs={songs} /> 
          </div>
        ) : null}
      </>
  );
}; 

export default SongSection;
