import { useState } from "react";
import { Artist } from "../../Types";
import ArtistRow from "./ArtistRow";

export type ArtistSectionProps = {
  artists: Array<Artist>;
  selectedArtistID: string;
  setSelectedArtistID: React.Dispatch<React.SetStateAction<string>>;
};

const ArtistSection = ({ artists, setSelectedArtistID, selectedArtistID }: ArtistSectionProps) => {

 
  const artistRows = artists.map((artist) => {
    return <ArtistRow setSelectedArtistID={setSelectedArtistID} selectedArtistID={selectedArtistID} key={artist.id} artist={artist} />;
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
      <form>
        {artistTable}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ArtistSection;
