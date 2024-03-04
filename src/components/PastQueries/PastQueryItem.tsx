import { SavedQuery } from "Types";
import dayjs from "dayjs";

type PastQueryItemProps = {
    query : SavedQuery
}

function PastQueryItem({ query } : PastQueryItemProps) {
    
  return (
    <div className="query-wrapper">
      <h3>Artist: {query.artist_name}</h3>
      <h3>User searched for: "{query.search_keyword}"</h3>
      <p>Number of songs matching query: {query.num_songs}</p>
      <div className="time-wrapper">
        <p>{dayjs(query.created_at).format("DD MMM")}</p>
        <p>{dayjs(query.created_at).format("h:mm A")}</p>
      </div>
      <button className="submit-button">Perform Search</button>
    </div>
  );
}

export default PastQueryItem;
