import { SavedQuery } from "Types";
import dayjs from "dayjs";

type UserQueryItemProps = {
  query: SavedQuery;
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
  loadArtists: (offset: number, searchStringFromArtistSearch?: string) => void;
};

function UserQueryItem({ query, submitSongSearch, loadArtists }: UserQueryItemProps) {
  return (
    <div className="query-wrapper">
      <h3>Artist: {query.artist_name}</h3>
      <h3>You: "{query.search_keyword}"</h3>
      <p>Number of songs matching query: {query.num_songs}</p>
      <div className="time-wrapper">
        <p>{dayjs(query.created_at).format("DD MMM")}</p>
        <p>{dayjs(query.created_at).format("h:mm A")}</p>
      </div>
      <button
        className="submit-button"
        onClick={() => {
          loadArtists(0, query.artist_name);
          submitSongSearch(query.search_keyword, query.artist_name);
        }}
      >
        Perform Search Again
      </button>
    </div>
  );
}

export default UserQueryItem;
