import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Paper,
  Popover,
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

import Table2PayTech from "./TablePopupPay";
import { PayTechInterface } from "../../../interfaces/IPayTech";
import { grey, red, yellow } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

export default function TablePayTech() {
  const params = useParams();
  const navigate = useNavigate();

  const [PayTech, setPayTech] = React.useState<PayTechInterface[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const width = 200;
  const style = {
    maxWidth: width,
    borderStyle: "border-box",
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PayTech.length) : 0;

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

  const apiUrl = "http://localhost:8080";

  const getPayTech = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch(`${apiUrl}/technician-pay/${localStorage.getItem("uid")}`, requestOptions)
    fetch(
      `${apiUrl}/technician-pay/${localStorage.getItem("uid")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPayTech(res.data);
          console.log(res.data);
          console.log(res.data.Note);
        }
      });
  };

  const PayTechDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/delete-pay-tech/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    getPayTech();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 4, color: "indigo", textAlign: "left" }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom component="div">
                บันทึกค่าใช้จ่าย
              </Typography>
            </Box>
          </Box>
          {/* public */}
          <Grid item xs={5}>
            <Button
              id="OrderTech_to_popup"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              size="large"
              color="warning"
              sx={{ color: grey["A200"] }}
            >
              ORDER TECHNICIAN
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Table2PayTech />
            </Popover>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">PayTechID</TableCell>
                  <TableCell align="right">OrderTechID</TableCell>
                  <TableCell align="center">HardwareName</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Note</TableCell>
                  <TableCell align="right">Technician</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PayTech.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.OrderTechID}</TableCell>
                    <TableCell align="right">
                      {row.Hardware.HardwareName}
                    </TableCell>
                    <TableCell align="right">{row.Amount}</TableCell>
                    <TableCell align="right">{row.CostHardware}</TableCell>
                    <TableCell align="right">{row.Note}</TableCell>
                    <TableCell align="right">{row.Technician.Name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        id="Edit_PAY_Table_Normal"
                        size="large"
                        aria-label="Edit"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You will be able to edit this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, edit it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // Swal.fire(
                              //   // 'Deleted!',
                              //   // 'Your file has been deleted.',
                              //    'success'
                              // )
                              navigate({
                                pathname: `/PayTechUpdate/${row.ID}`,
                              });
                            }
                          });
                          // navigate({ pathname: `/PayTechUpdate/${row.ID}` });
                        }}
                        sx={{ color: yellow[800] }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        id="Delete_PAY_Table_Normal"
                        size="large"
                        aria-label="delete"
                        sx={{ color: red[600] }}
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              // Swal.fire(
                              //   // 'Deleted!',
                              //   // 'Your file has been deleted.',
                              //    'success'
                              // )
                              PayTechDelete(row.ID);
                            }
                          });
                        }}

                        // () => PayTechDelete(row.ID)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  colSpan={PayTech.length}
                  count={PayTech.length}
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
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
