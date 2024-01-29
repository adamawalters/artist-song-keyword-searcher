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
    <form className="search-form" onSubmit={handleSubmit}>
      <label htmlFor="artistSearch">Enter an artist</label>
      <div className="search-input">
        <input
          type="text"
          name="artistSearch"
          placeholder="Celine Dion"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );

  return form;
};

export default ArtistSearchForm;
