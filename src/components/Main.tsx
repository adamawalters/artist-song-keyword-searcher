import ArtistSection from "./Artists/ArtistSection";
import { useEffect, useRef, useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";
import PastQueriesSection from "./PastQueries/PastQueriesSection";



const Main = () => {
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);

  const songSection = useRef<null | HTMLDivElement>(null);

  /* Only scroll to SongSection if small */
  useEffect(() => {
    if (selectedArtist && !(window.matchMedia('(min-width: 768px)').matches)) {
      songSection.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedArtist]);

  return (
    <main>
      <div className="artist-and-song-wrapper">
        <section id="artist-section">
          <ArtistSection
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
          />
        </section>
          {selectedArtist ? (
            <section id="song-section" ref={songSection}>
              <SongSection selectedArtist={selectedArtist}/>
            </section>
          ) : null}
      </div>
      <section>
        <PastQueriesSection />
      </section>
    </main>
  );
};

export default Main;
