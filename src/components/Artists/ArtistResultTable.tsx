import { Artist } from "Types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import {styled} from '@mui/material/styles'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0B65C2',
      color: theme.palette.common.white,
    }
  }));


export type ArtistResultTableProps = {
  artists: Array<Artist>;
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
  loadArtists: (offset: number) => void,
  totalArtistsInResponse: number,
  searchKey: string
};

const ArtistResultTable = ({
  artists,
  setSelectedArtist,
  selectedArtist,
  loadArtists,
  totalArtistsInResponse,
  searchKey
}: ArtistResultTableProps) => {

  const [page, setPage] = useState(0);

  function handlePageChange(_event: unknown, newPage: number) {
    setPage(newPage);
    loadArtists(newPage * 10)
  }

    /*  Need to set page back to 0 whenever keyword changes*/
    useEffect(() => {
      setPage(0)
    }, [searchKey])
    

  return (
    <div className="center-container">
    <p className="direction-label">
        Select an artist from search results{" "}
    </p>
        <Box sx={{width: `100%`}}>
          <TableContainer sx={{maxHeight: 400}} component={Paper}>
            <Table stickyHeader aria-label="simple table" className="result-table select-artist-form"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Artist Name</StyledTableCell>
                  <StyledTableCell align="center">Artist Photo</StyledTableCell>
                  <StyledTableCell align="center">Select</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artists.map((artist) => (
                  <TableRow
                    hover
                    key={artist.id}
                    onClick={() => setSelectedArtist(artist)}
                    selected={
                      selectedArtist ? artist.id === selectedArtist.id : false
                    }
                  >
                    <TableCell align="center" component={"td"} scope="row">
                      {artist.name}
                    </TableCell>
                    <TableCell align="center">
                      {artist.images.length ? (
                        <img src={artist.images[0].url} />
                      ) : (
                        "No image found"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <input
                        type="radio"
                        checked={
                          selectedArtist ? artist.id === selectedArtist.id : false
                        }
                        name="selected_artist"
                        value={artist.id}
                        required
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            count={totalArtistsInResponse}
            rowsPerPage={10}
            page={page}
            onPageChange={handlePageChange}
            component='div'
            rowsPerPageOptions={[]}
          />
        </Box>
    </div>
  );
};

export default ArtistResultTable;
