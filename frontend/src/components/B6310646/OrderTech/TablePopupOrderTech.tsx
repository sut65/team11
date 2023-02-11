import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Button,
  ButtonGroup,
  Paper,
  SwipeableDrawer,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { ORDERInterface } from "../../../interfaces/ORDERUI";

//  publicccccccccccccccccccccccccccccccccccccccccccc
export default function Table2Order() {
  const params = useParams();
  const navigate = useNavigate();

  const [Order, setOrder] = React.useState<ORDERInterface[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Order.length) : 0;

  const apiUrl = "http://localhost:8080";

  const getOrder = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/GetListOrder`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrder(res.data);
          console.log(res.data);
        }
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">OrderID</TableCell>
                  <TableCell align="center">Time in</TableCell>
                  <TableCell align="right">Reason</TableCell>
                  <TableCell align="right">Limits</TableCell>
                  <TableCell align="right">Case</TableCell>
                  <TableCell align="right">State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? Order.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : Order
                ).map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>

                    <TableCell align="right">
                      {row.Date_time?.toString()}
                    </TableCell>
                    <TableCell align="right">{row.Reason}</TableCell>
                    <TableCell align="right">{row.Limits}</TableCell>
                    <TableCell align="right">{row.CASE.Level_case}</TableCell>
                    <TableCell align="right">{row.State.State}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-lable="outlined button group"
                      >
                        <Button
                          onClick={() =>
                            navigate({ pathname: `/OrderTechCreate/${row.ID}` })
                          }
                          variant="contained"
                          color="secondary"
                          size="medium"
                        >
                          select
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[3, 6, 10, { label: "All", value: -1 }]}
                    colSpan={Order.length}
                    count={Order.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
