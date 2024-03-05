import { ChangeEvent, FormEvent, useEffect, useState  } from "react";


type ArtistSearchSectionProps = {
  handleArtistSearch: (searchKey: string) => void;
  lastUsedArtistName: string;
};

function ArtistSearchSection({ handleArtistSearch, lastUsedArtistName }: ArtistSearchSectionProps) {
  const [searchKey, setSearchKey] = useState("");


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleArtistSearch(searchKey);
  }

  //Update searchKey state when lastUsedArtistName changes (can happen due to PastQueriesSection or ArtistSearchSection)
  useEffect(() => { 
    setSearchKey(lastUsedArtistName);
  }, [lastUsedArtistName]);

  const form = (
    <form className="center-container" onSubmit={handleSubmit}>
      <label htmlFor="artistSearch">
        <p className="direction-label">Search for an artist</p>
      </label>
      <div className="search-input">
        <input
          className="search-box"
          type="text"
          name="artistSearch"
          placeholder="Celine Dion"
          required
          value={searchKey}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );

  return form;
}

export default ArtistSearchSection;
