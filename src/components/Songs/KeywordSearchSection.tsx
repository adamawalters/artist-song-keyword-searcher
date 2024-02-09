import { useState } from "react";
import { Artist } from "Types";
import {ChangeEvent } from "react";

type KeywordSearchSectionProps = {
  selectedArtist: Artist;
  submitKeywordSearch: (searchKeyword: string) => Promise<void>;
};

function KeywordSearchSection({
  selectedArtist,
  submitKeywordSearch,
}: KeywordSearchSectionProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  return (
    <form
      className="center-container"
      onSubmit={(e) => {
        e.preventDefault();
        submitKeywordSearch(searchKeyword);
      }}
    >
      <label htmlFor="search-artist">
        <p className="direction-label">
          Enter a keyword to search song titles by {selectedArtist.name}
        </p>
      </label>
      <input
        className="search-box"
        type="text"
        name="search-artist"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchKeyword(e.target.value)
        }
        value={searchKeyword}
        placeholder="Love"
        required
      />
      <div className="keyword-search-button">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default KeywordSearchSection;
