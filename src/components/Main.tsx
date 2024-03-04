import ArtistSection from "./Artists/ArtistSection";
import { useCallback, useEffect, useRef, useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";
import PastQueriesSection from "./PastQueries/PastQueriesSection";
import { SavedQuery } from "../Types";
import { loadQueries } from "./../utils/api";

const Main = () => {
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);
  const [savedQueries, setSavedQueries] = useState<Array<SavedQuery>>();
  const [error, setError] = useState<Error>();

  const songSection = useRef<null | HTMLDivElement>(null);

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
            <SongSection fetchQueries={fetchQueries} selectedArtist={selectedArtist} />
          </section>
        ) : null}
      </div>
      {savedQueries ? (
        <section>
          <PastQueriesSection savedQueries={savedQueries} />
        </section>
      ) : null}
    </main>
  );
};

export default Main;
