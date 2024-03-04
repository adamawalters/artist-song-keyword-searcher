import ArtistSection from "./Artists/ArtistSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { Artist, Song } from "../Types";
import SongSection from "./Songs/SongSection";
import PastQueriesSection from "./PastQueries/PastQueriesSection";
import { SavedQuery } from "../Types";
import { loadQueries, saveQueryToDatabase, searchSongs } from "./../utils/api";

const Main = () => {
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);
  const [savedQueries, setSavedQueries] = useState<Array<SavedQuery>>();
  const [error, setError] = useState<Error>();
  const [songs, setSongs] = useState<Array<Song>>();
  const [lastUsedKeyword, setLastUsedKeyword] = useState<string>("");
  const [lastUsedArtistName, setLastUsedArtistName] = useState<string>("");

  const songSection = useRef<null | HTMLDivElement>(null);

  //TODO: create a function called SearchSongs. Will be passed to SongSection and PastQueriesSection. will accept a selectedArtist and a searchKeyword. Will return a Promise that resolves to an array of songs.

  async function submitSongSearch(searchKeyword: string, artist: string) {

    /* Used to display the last searched for keyword & artist */
    setLastUsedKeyword(searchKeyword);
    setLastUsedArtistName(artist);
    setSelectedArtist({ name: artist } as Artist);
    //setSongs(null) - add loading in the future

    const response = await searchSongs(searchKeyword, artist);
    setSongs(response.tracks);
    await saveQueryToDatabase({
      search_keyword: searchKeyword,
      artist_name: artist,
      num_songs: response.totalTracks,
    } as SavedQuery);
    // Update recent queries in Main
    fetchQueries();
  }

  /* Only scroll to SongSection if on mobile */
  useEffect(() => {
    if (selectedArtist && !window.matchMedia("(min-width: 768px)").matches) {
      songSection.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedArtist]);

  /* Load recent queries  - used in Main and in SongSection */
  const fetchQueries = useCallback(async () => {
    try {
      const response = await loadQueries(10);
      setSavedQueries(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }, []);

  /* Load recent queries */
  useEffect(() => {
    // TODO: AbortController is not being passed to the fetchQueries function
    const abortController = new AbortController();
    fetchQueries();
    return () => abortController.abort();
  }, [fetchQueries]);

  return (
    <main>
      {error ? <div>{error.message}</div> : null}
      <div className="artist-and-song-wrapper">
        <section id="artist-section">
          <ArtistSection
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
          />
        </section>
        {selectedArtist ? (
          <section id="song-section" ref={songSection}>
            <SongSection
              songs={songs}
              lastUsedArtistName={lastUsedArtistName}
              lastUsedKeyword={lastUsedKeyword}
              submitSongSearch={submitSongSearch}
              fetchQueries={fetchQueries}
              selectedArtist={selectedArtist}
            />
          </section>
        ) : null}
      </div>
      {savedQueries ? (
        <section>
          <PastQueriesSection savedQueries={savedQueries} submitSongSearch={submitSongSearch} />
        </section>
      ) : null}
    </main>
  );
};

export default Main;
