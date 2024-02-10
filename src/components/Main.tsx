import ArtistSection from "./Artists/ArtistSection";
import { useState } from "react";
import { Artist } from "../Types";
import SongSection from "./Songs/SongSection";

export type SearchProps = {
  token: string;
};

const Main = ({ token }: SearchProps) => {
  
  const [selectedArtist, setSelectedArtist] = useState<null | Artist>(null);

  return (
    <>
      <section>
        <ArtistSection 
        selectedArtist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
        token={token}
        />
      </section>
      <section id="song-section">
        {selectedArtist ? (
          <SongSection selectedArtist={selectedArtist} token={token} />
        ) : null}
      </section>
    </>
  );
};

export default Main;
