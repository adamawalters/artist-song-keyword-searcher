import { Song } from "Types"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TablePagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {styled} from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0B65C2',
      color: theme.palette.common.white,
    }
  }));

type SongTableProps = {
    songs: Song[] | undefined,
    lastUsedKeyword: string;
}

function SongTable({songs, lastUsedKeyword}: SongTableProps) {

  const [page, setPage] = useState(0);

  function handlePageChange(_event: unknown, newPage: number) {
    setPage(newPage);
  }

  /*  Need to set page back to 0 whenever keyword changes*/
  useEffect(()=>{
    setPage(0)
  }, [lastUsedKeyword])



  /*
  - Since I'm fetching all the songs from the artist, I need to filter to 10 songs at once to render
  - This changes based on the current page
  */
  const visibleSongs = useMemo(()=> {
    if(!songs){
        return;
    }
    return songs.slice(page * 10, page * 10 + 10)
  }, [songs, page])

  return (
        <Box sx={{width: `100%`}}>
            <TableContainer  sx={{maxHeight: 400}} component={Paper}>
                <Table stickyHeader aria-label="simple table" className="result-table song-results">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Song Name</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visibleSongs
                      ? visibleSongs.map((song) => <TableRow hover key={song.id}>
                        <TableCell align="center" component={"td"} scope="row">
                            <a href={`https://open.spotify.com/track/${song.id}`} target="_blank">{song.name}</a>
                            </TableCell>
                      </TableRow>)
                      : null}
                  </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={songs?.length ?? 0}
                rowsPerPage={10}
                page={page}
                onPageChange={handlePageChange}
                component='div'
                rowsPerPageOptions={[]}
              />
        </Box>
  )
}

export default SongTable