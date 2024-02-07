import { Artist } from "../../Types";
import ArtistRow from "./ArtistRow";

export type ArtistResultTableProps = {
  artists: Array<Artist>;
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
};

const ArtistResultTable = ({
  artists,
  setSelectedArtist,
  selectedArtist,
}: ArtistResultTableProps) => {
  const artistRows = artists.map((artist) => {
    return (
      <ArtistRow
        setSelectedArtist={setSelectedArtist}
        selectedArtist={selectedArtist}
        key={artist.id}
        artist={artist}
      />
    );
  });

  const artistTable = (
    <table className="result-table">
      <thead>
        <tr>
          <th>Artist Name</th>
          <th>Artist Photo</th>
          <th>Select</th> 
        </tr>
      </thead>
      <tbody>{artistRows}</tbody>
    </table>
  );

  return (
    <div className="center-container">
      <p className="direction-label">
        Select an artist from search results{" "}
      </p>
      <form className="select-artist-form">
        {artistTable}
        </form>
    </div>
  );
};

export default ArtistResultTable;
