import { Modal, Box, Typography } from "@mui/material";
import { UserSavedQuery } from "Types";
import Tag from "./Tag";
import React, { useState } from "react";
import { createTag } from "../../utils/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "var(--corner-radius-medium)",
  boxShadow: 24,
  p: 4,
};

type TagsModalProps = {
  open: boolean;
  handleClose: () => void;
  fetchQueries: () => Promise<void>;
  query: UserSavedQuery;
};

function TagsModal({ open, handleClose, query, fetchQueries }: TagsModalProps) {
  const [newTag, setNewTag] = useState("");

  const formTags = query.tags.map((tag) => tag);

  async function handleNewTag() {
    //send new tag to database. It will be given an id and associated with the current query
    //reload query so that tagList is updated and the new tag is rendered
    try {
      await createTag(newTag, query._id);
      setNewTag("");
      await fetchQueries();
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
          <div className="query-wrapper-row">
            <input
              placeholder="Enter a new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyPress}
              className="tag-adder-input"
            />
            <button className="submit-button" onClick={handleNewTag}>
              Add Tag
            </button>
          </div>

          <div className="tags-holder">
            <h4>Tag List</h4>
            {formTags.map((tag) => (
              <Tag tag={tag} fetchQueries={fetchQueries} />
            ))}
          </div>
        </Typography>
        <div className="modal-row">
          <button className="delete-button" onClick={handleClose}>
            Done
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default TagsModal;
