import { useEffect, useState } from "react";
import { Artist } from "Types";
import {ChangeEvent } from "react";

type KeywordSearchSectionProps = {
  selectedArtist: Artist;
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
  lastUsedKeyword: string;
};

function KeywordSearchSection({ selectedArtist, submitSongSearch, lastUsedKeyword }: KeywordSearchSectionProps) {
  
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => { 
    setSearchKeyword(lastUsedKeyword);
  }, [lastUsedKeyword])

  return (
    <div className="search-box-divider">
      <form
        className="center-container"
        onSubmit={(e) => {
          e.preventDefault();
          submitSongSearch(searchKeyword, selectedArtist.name);
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
    </div>
  );
}

export default KeywordSearchSection;
