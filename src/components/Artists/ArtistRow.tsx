import { useState } from "react";
import { Artist } from "../../Types";

type ArtistRowProps = {
  artist: Artist;
  setSelectedArtistID: React.Dispatch<React.SetStateAction<string>>;
  selectedArtistID: string;
};

const ArtistRow = ({
  artist,
  selectedArtistID,
  setSelectedArtistID,
}: ArtistRowProps) => {
  /* input is readOnly b/c its checked value is maintained by the selected Artist state all other rows share
    table row updates the state when it's clicked which updates respective radio buttons
    The input changes if another radio button is selected, but that doesn't trigger onChange, so changing one radio button to select an artists wouldn't subsequently undo that change b/c other radio buttons also change and set the state to that artist
  */
  const row = (
    <tr onClick={() => setSelectedArtistID(artist.id)}>
      <td>{artist.name}</td>
      <td>
        {artist.images.length ? (
          <img src={artist.images[0].url}></img>
        ) : (
          "No image found"
        )}
      </td>
      <td>
        <input
          type="radio"
          name="selected_artist_id"
          value={artist.id}
          required
          readOnly
          checked={artist.id === selectedArtistID}
        />
      </td>
    </tr>
  );

  return row;
};

export default ArtistRow;
