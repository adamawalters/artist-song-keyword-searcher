import { SavedQuery } from "Types";
import PastQueryItem from "./PastQueryItem";

type PastQueriesSectionProps = {
  savedQueries: SavedQuery[];
};

function PastQueriesSection({ savedQueries }: PastQueriesSectionProps) {
  return (
    <div className="center-container">
      <h1>Recent Queries</h1>
      <div className="saved-queries-wrapper">
        {savedQueries.map((query, index) => (
          <PastQueryItem key={index} query={query} />
        ))}
      </div>
    </div>
  );
}

export default PastQueriesSection;
