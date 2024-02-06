import { useState } from "react";
import { Artist } from "Types";
import ArtistResultTable from "./ArtistResultTable";
import ArtistSearchSection from "./ArtistSearchSection";

type ArtistSectionProps = {
    selectedArtist: Artist | null;
    setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
    token: string;
}

const ArtistSection = ({ selectedArtist, setSelectedArtist, token }: ArtistSectionProps) => {
  const [artists, setArtists] = useState<null | Array<Artist>>(null);

  /* TODO: add pagination so users can select between more than the top 5 artists that show up */
  async function handleArtistSearch(searchKey: string) {
    const params = new URLSearchParams({
      q: searchKey,
      type: "artist",
      limit: "5",
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
    const responseArtists = parsedResponse.artists.items as Array<Artist>;

    setArtists(responseArtists);
  }

  return (
    <>
      <div className="section-spacing">
          <ArtistSearchSection handleArtistSearch={handleArtistSearch} />
      </div>
      {artists ? (
        <ArtistResultTable
          artists={artists}
          setSelectedArtist={setSelectedArtist}
          selectedArtist={selectedArtist}
        />
      ) : null}
    </>
  );
};

export default ArtistSection;
