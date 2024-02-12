import ArtistSection from "./Artists/ArtistSection";
import { useEffect, useRef, useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";

export type MainProps = {
  token: string;
};

const Main = ({ token }: MainProps) => {
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);

  const songSection = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (selectedArtist) {
      songSection.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedArtist]);

  return (
    <>
      <section id="artist-section">
        <ArtistSection
          selectedArtist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          token={token}
        />
      </section>
        {selectedArtist ? (
          <section id="song-section" ref={songSection}>
            <SongSection selectedArtist={selectedArtist} token={token} />
          </section>
        ) : null}
      
    </>
  );
};

export default Main;
