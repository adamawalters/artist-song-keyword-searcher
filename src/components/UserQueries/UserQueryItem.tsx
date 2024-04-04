import { UserSavedQuery } from "Types";
import dayjs from "dayjs";
import { deleteUserQueryItem } from "../../utils/api";
import { useState } from 'react'
import TagsModal from "./TagsModal";
import DeleteModal from "./DeleteModal";



type UserQueryItemProps = {
  query: UserSavedQuery;
  submitSongSearch: (searchKeyword: string, artist: string) => Promise<void>;
  loadArtists: (offset: number, searchStringFromArtistSearch?: string) => void;
  fetchQueries: () => Promise<void>;
};

function UserQueryItem({
  query,
  submitSongSearch,
  loadArtists,
  fetchQueries,
}: UserQueryItemProps) {

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [tagsOpen, setTagsOpen] = useState<boolean>(false)


  function handleDeleteClose(){
    setDeleteOpen(false)
  }


  function handleTagsClose(){
    setTagsOpen(false)
  }

 
  async function handleDelete() {
    try {
      await deleteUserQueryItem(query._id);
      await fetchQueries();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <DeleteModal open={deleteOpen} query={query}  handleClose={handleDeleteClose} handleDelete={handleDelete}/>
      <TagsModal fetchQueries={fetchQueries} open={tagsOpen} handleClose={handleTagsClose} query={query} />
      <div className="query-wrapper">
        <div className="query-wrapper-row">
          <h3>Artist: {query.artist_name}</h3>
          <i className="fa-solid fa-xmark" onClick={()=>setDeleteOpen(true)}></i>
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
          {query.tags.length ? (
            <>
              <p>Tags: {query.tags.map(tag => tag.tag_content).join(";")}</p>
              <button onClick={() => setTagsOpen(true)} className="submit-button">
                Edit Tags
              </button>
            </>
          ) : <button className ="submit-button" onClick={()=>setTagsOpen(true)}> Add Tags </button>}
      </div>
    </>
  );
}

export default UserQueryItem;
