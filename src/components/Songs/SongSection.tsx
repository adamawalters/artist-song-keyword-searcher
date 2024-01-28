import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { Artist, Song } from "../../Types";
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
  const [numSongsWithKeyword, setNumSongsWithKeyword] = useState(0);

  async function submitKeywordSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams({
      market: `US`,
      limit: `50`,
      type: `track`,
      q: `track:"${searchKeyword}" artist:"${selectedArtist.name}"`,
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

    const totalTracksForQuery: number = parsedResponse.tracks.total;
    const responseTracks: Array<Song> = parsedResponse.tracks.items as Array<Song>;

    setNumSongsWithKeyword(totalTracksForQuery)
    setSongs(responseTracks)

  }

  /*Fetch top songs by artist by default in song section */
  useEffect(() => {
    async function loadTopSongs() {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${selectedArtist.id}/top-tracks?country=US`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const parsedResponse = await response.json();

      const responseTracks = parsedResponse.tracks as Array<Song>;

      setSongs(responseTracks);
    }
    loadTopSongs();
  }, [selectedArtist, token]);

  

  const songTable = (
    <table>
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
      {numSongsWithKeyword ? <h2>There are {numSongsWithKeyword} songs by {selectedArtist.name} with the keyword you entered! </h2>: null}
      <form onSubmit={submitKeywordSearch}>
        <label htmlFor="search-artist">Enter a keyword</label>
        <input
          type="text"
          name="search-artist"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchKeyword(e.target.value)
          }
          value={searchKeyword}
          placeholder="Enter a keyword"
          required
        />
        {songTable}
        <button type="submit">See how many songs have the keyword!</button>
      </form>
    </div>
  );
};

export default SongSection;
