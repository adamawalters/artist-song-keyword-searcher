import { Artist } from "Types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import { Box, TablePagination } from "@mui/material";
import { useState } from "react";

export type ArtistResultTableProps = {
  artists: Array<Artist>;
  selectedArtist: Artist | null;
  setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
  loadArtists: (offset: number) => void,
  totalArtistsInResponse: number,
};

const NewArtistResultTable = ({
  artists,
  setSelectedArtist,
  selectedArtist,
  loadArtists,
  totalArtistsInResponse
}: ArtistResultTableProps) => {
  const [page, setPage] = useState(0);

  function handlePageChange(_event: unknown, newPage: number) {
    setPage(newPage);
    loadArtists(newPage * 10)
  }
  

  return (
    <div className="center-container">
    <p className="direction-label">
        Select an artist from search results{" "}
    </p>
        <Box sx={{width: 700}}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" className="select-artist-form"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Artist Name</TableCell>
                  <TableCell align="center">Artist Photo</TableCell>
                  <TableCell align="center">Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artists.map((artist) => (
                  <TableRow
                    hover
                    key={artist.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => setSelectedArtist(artist)}
                    selected={
                      selectedArtist ? artist.id === selectedArtist.id : false
                    }
                  >
                    <TableCell align="center" component={"th"} scope="row">
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
                      <Radio
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

export default NewArtistResultTable;
