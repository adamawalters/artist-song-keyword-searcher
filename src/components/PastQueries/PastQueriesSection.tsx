import { SavedQuery } from "Types";
import PastQueryItem from "./PastQueryItem";

type PastQueriesSectionProps = {
  savedQueries: SavedQuery[];
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
};

function PastQueriesSection({ savedQueries, submitSongSearch }: PastQueriesSectionProps) {
  return (
    <div className="center-container">
      <h1>Recent Queries</h1>
      <div className="saved-queries-wrapper">
        {savedQueries.map((query, index) => (
          <PastQueryItem key={index} query={query} submitSongSearch={submitSongSearch} />
        ))}
      </div>
    </div>
  );
}

export default PastQueriesSection;
