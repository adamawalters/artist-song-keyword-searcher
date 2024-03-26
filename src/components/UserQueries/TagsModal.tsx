import { Modal, Box, Typography } from "@mui/material";
import { TagType, UserSavedQuery } from "Types";
import Tag from "./Tag";
import React, { useState } from "react";
import { createTag } from "../../utils/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TagsModalProps = {
  open: boolean;
  handleClose: () => void;
  tags: Array<TagType>;
  fetchQueries: () => Promise<void>;
  query: UserSavedQuery
};

function TagsModal({ open, handleClose, query, fetchQueries }: TagsModalProps) {
  const [newTag, setNewTag] = useState("");

  async function handleNewTag() {
    //send new tag to database. It will be given an id and associated with the current query
    //reload query so that tagList is updated and the new tag is rendered
    try {
      await createTag(newTag, query._id);
      setNewTag("")
    } catch (error) {
      console.log(error);
    }
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    //handleNewTag (create a new tag)
    if (event.key === "Enter") {
      event.preventDefault();
      handleNewTag();
    }
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="confirmation box">
      <Box sx={style}>
        <Typography id="confirmation box" variant="h6" component="h2">
          <h2>Tags</h2>
          <input
            placeholder="Enter a new tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleNewTag}>Add Tag</button>
          <form>
          {query.tags.map((tag) => (
            <Tag tag={tag} fetchQueries={fetchQueries} />
          ))}
          </form>
        </Typography>
        <div className="modal-row">
          <button onClick={handleClose}>Cancel</button>
        </div>
      </Box>
    </Modal>
  );
}

export default TagsModal;
