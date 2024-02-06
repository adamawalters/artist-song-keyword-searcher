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
      <span className="direction-label">
        Search results - please select an artist{" "}
      </span>
      <form className="select-artist-form">
        <div className="table-spacer">{artistTable}</div>
        </form>
    </div>
  );
};

export default ArtistResultTable;
