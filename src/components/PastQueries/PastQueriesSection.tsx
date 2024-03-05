import { SavedQuery } from "Types";
import PastQueryItem from "./PastQueryItem";

type PastQueriesSectionProps = {
  savedQueries: SavedQuery[];
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
  loadArtists: (offset: number, searchStringFromArtistSearch?: string) => void;
};

function PastQueriesSection({savedQueries, submitSongSearch, loadArtists,}: PastQueriesSectionProps) {
  return (
    <div className="center-container">
      <h1>Recent Queries</h1>
      {savedQueries.length ? (
        <div className="saved-queries-wrapper">
          {savedQueries.map((query, index) => (
            <PastQueryItem
              key={index}
              query={query}
              submitSongSearch={submitSongSearch}
              loadArtists={loadArtists}
            />
          ))}
        </div>
      ) : (
        <p>No recent queries</p>
      )}
    </div>
  );
}

export default PastQueriesSection;
