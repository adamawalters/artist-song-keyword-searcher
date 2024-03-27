import { UserSavedQuery } from "Types";
import UserQueryItem from "./UserQueryItem";

type UserQueriesSectionProps = {
  userSavedQueries: UserSavedQuery[];
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
  loadArtists: (offset: number, searchStringFromArtistSearch?: string) => void;
  fetchQueries: () => Promise<void>;
};

function UserQueriesSection({userSavedQueries, submitSongSearch, loadArtists, fetchQueries}: UserQueriesSectionProps) {

  return (
    <div className="center-container">
      <h1>Your Saved Queries</h1>
      {userSavedQueries.length ? (
        <div className="saved-queries-wrapper">
          {userSavedQueries.map((query, index) => (
            <UserQueryItem
              key={index}
              query={query}
              submitSongSearch={submitSongSearch}
              loadArtists={loadArtists}
              fetchQueries={fetchQueries}
            />
          ))}
        </div>
      ) : (
        <p>You have no saved queries</p>
      )}
    </div>
  );
}

export default UserQueriesSection;
