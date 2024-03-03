import { SavedQuery } from "Types";

type PastQueryItemProps = {
    query : SavedQuery
}


function PastQueryItem({ query } : PastQueryItemProps) {
    

  console.log(JSON.stringify(query))  
  return (
    <div className="query-wrapper">
      <p>Search keyword: "{query.search_keyword}"</p>
      <p>Artist: "{query.artist_name}"</p>
      <p>Number of songs: {query.num_songs}</p>
      <p>Date performed: {query.created_at}</p>
      <p>Perform Search</p>
    </div>
  );
}

export default PastQueryItem;
