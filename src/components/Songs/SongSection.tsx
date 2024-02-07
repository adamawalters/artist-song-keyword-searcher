import { ChangeEvent, useState, FormEvent } from "react";
import { Artist, Song, TrackResponse } from "../../Types";
import SongRow from "./SongRow";

export type SongSectionProps = {
  selectedArtist: Artist;
  token: string;
};

const SongSection = ({ selectedArtist, token }: SongSectionProps) => {
  /* use the selected artist ID to fetch top songs by the artist by default - there will be a SongList component
     have a search box for keyword that will update the songList Component  (will search the artist's songs that have a keyword)
     After the user searches, have a counter for number of songs in the songlist 
  */

  const [songs, setSongs] = useState<null | Array<Song>>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [lastUsedKeyword, setLastUsedKeyword] = useState<string>("");
  const [lastUsedArtistName, setLastUsedArtistName] = useState<string>("");
  const [numSongsWithKeyword, setNumSongsWithKeyword] = useState<number | undefined>();

  async function submitKeywordSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLastUsedKeyword(searchKeyword);
    setLastUsedArtistName(selectedArtist.name);
    //setSongs(null)

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

  const songTable = (
    <table className="result-table song-results">
      <thead>
        <tr>
          <th>Song Name</th>
        </tr>
      </thead>
      <tbody>
        {songs
          ? songs.map((song) => <SongRow song={song} key={song.id} />)
          : null}
      </tbody>
    </table>
  );

  return (
    <div>
      <form className="center-container" onSubmit={submitKeywordSearch}>
        <label htmlFor="search-artist">
          <span className="direction-label">
            Enter a keyword to search song titles by {selectedArtist.name}
          </span>
        </label>
        <input
          className="search-box"
          type="text"
          name="search-artist"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchKeyword(e.target.value)
          }
          value={searchKeyword}
          placeholder="Love"
          required
        />
        <div className="keyword-search-button">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
        {numSongsWithKeyword !== undefined ? (
          <div className="song-result-spacer">
            <span className="direction-label">
              Results - there are {numSongsWithKeyword} songs by {lastUsedArtistName} with "{lastUsedKeyword}" in the song title
            </span>
            <div className="table-spacer">{songTable}</div>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default SongSection;
