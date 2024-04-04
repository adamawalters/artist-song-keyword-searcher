import { Artist } from "Types";
import ArtistSearchSection from "./ArtistSearchSection";
import ArtistResultTable from "./ArtistResultTable";

type ArtistSectionProps = {
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
  artists: Array<Artist> | null;
  totalArtistsInResponse: number | null;
  searchKey: string;
  loadArtists: (offset: number, searchStringFromArtistSearch?: string) => void;
  lastUsedArtistName: string;
};

function ArtistSection({
  selectedArtist,
  setSelectedArtist,
  artists,
  totalArtistsInResponse,
  searchKey,
  loadArtists,
  lastUsedArtistName
}: ArtistSectionProps) {


  return (
    <>
      <div className="search-box-divider">
        <ArtistSearchSection loadArtists={loadArtists} lastUsedArtistName={lastUsedArtistName} />
      </div>
      {artists ? (
        <ArtistResultTable
          artists={artists}
          setSelectedArtist={setSelectedArtist}
          selectedArtist={selectedArtist}
          loadArtists={loadArtists}
          totalArtistsInResponse={totalArtistsInResponse ?? 0}
          searchKey={searchKey}
        />
      ) : null}
    </>
  );
}

export default ArtistSection;
