import ArtistSection from "./Artists/ArtistSection";
import { useEffect, useRef, useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";

export type SearchProps = {
  token: string;
};

const Main = ({ token }: SearchProps) => {
  
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);

  const songSection = useRef<null | HTMLDivElement>(null)

  useEffect(()=>{
    songSection.current?.scrollIntoView({behavior: "smooth"})
  }, [selectedArtist])


  return (
    <>
      <section>
        <ArtistSection 
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
        token={token}
        />
      </section>
      <section id="song-section" ref={songSection}>
        {selectedArtist ? (
          <SongSection selectedArtist={selectedArtist} token={token} />
        ) : null}
      </section>
    </>
  );
};

export default Main;
