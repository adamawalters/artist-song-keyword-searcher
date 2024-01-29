import { Artist } from "../../Types";
import ArtistRow from "./ArtistRow";

export type ArtistSectionProps = {
  artists: Array<Artist>;
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
};

const ArtistSection = ({ artists, setSelectedArtist, selectedArtist }: ArtistSectionProps) => {

 
  const artistRows = artists.map((artist) => {
    return <ArtistRow setSelectedArtist={setSelectedArtist} selectedArtist={selectedArtist} key={artist.id} artist={artist} />;
  });


  const artistTable = (
    <table>
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
    <>
      <form className="select-artist-form">
        {artistTable}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ArtistSection;
