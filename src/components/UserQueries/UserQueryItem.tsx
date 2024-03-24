import { UserSavedQuery } from "Types";
import dayjs from "dayjs";
import { deleteUserQueryItem } from "../../utils/api";

type UserQueryItemProps = {
  query: UserSavedQuery;
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
  loadArtists: (offset: number, searchStringFromArtistSearch?: string) => void;
  fetchQueries: () => Promise<void>
};

function UserQueryItem({ query, submitSongSearch, loadArtists, fetchQueries }: UserQueryItemProps) {

  async function handleDelete(){
    try {
      await deleteUserQueryItem(query._id)
      await fetchQueries()
    } catch (error) { 
      console.error(error)
    }
  }

  return (
    <div className="query-wrapper">
      <div className="query-wrapper-row">
        <h3>Artist: {query.artist_name}</h3>
        <i className="fa-solid fa-xmark" onClick={handleDelete}></i>
      </div>
      <h3>You searched for: "{query.search_keyword}"</h3>
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
