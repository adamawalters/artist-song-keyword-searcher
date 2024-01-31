import { ChangeEvent, FormEvent, useState } from "react";

type ArtistSearchFormProps = {
  handleSearch: (searchKey: string) => Promise<void>;
};

const ArtistSearchForm = ({ handleSearch }: ArtistSearchFormProps) => {
  const [searchKey, setSearchKey] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch(searchKey);
  }

  const form = (
    <form className="center-container" onSubmit={handleSubmit}>
      <label htmlFor="artistSearch"><span className="direction-label">Enter an artist</span></label>
      <div className="search-input">
        <input
          className="search-box"
          type="text"
          name="artistSearch"
          placeholder="Celine Dion"
          required
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  );


  return form
};

export default ArtistSearchForm;
