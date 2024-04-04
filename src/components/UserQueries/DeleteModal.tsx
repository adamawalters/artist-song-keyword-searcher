import {Modal, Box, Typography} from '@mui/material' 
import { UserSavedQuery } from 'Types';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


type DeleteModalProps = {
    open: boolean,
    handleClose: ()=>void,
    query: UserSavedQuery,
    handleDelete: ()=> Promise<void>
}


function DeleteModal({open, handleClose, query, handleDelete}: DeleteModalProps) {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="confirmation box"
  >
    <Box sx={style}>
      <Typography id="confirmation box" variant="h6" component="h2">
        <h3>Are you sure you want to delete this query?</h3>
        <p>Artist name: {query.artist_name}</p>
        <p>Search keyword: {query.search_keyword}</p>
        <p>Number of songs: {query.num_songs}</p>
      </Typography>
      <div className="modal-row">
        <button onClick={async ()=> {await handleDelete(); handleClose()}}>Delete Query</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </Box>
  </Modal>
  )
}

export default DeleteModal