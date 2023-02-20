import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Button,
  ButtonGroup,
  Grid,
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
import { OrderTechInterface } from "../../../interfaces/IOrderTech";
import Swal from "sweetalert2";
export default function TableOrderTech() {
  const params = useParams();
  const navigate = useNavigate();

  const [OrderTech, setOrderTech] = React.useState<OrderTechInterface[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - OrderTech.length) : 0;

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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const width = 200;
  const style = {
    maxWidth: width,
    borderStyle: "border-box",
  };

  const apiUrl = "http://localhost:8080";

  const getOrderTech = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(
      `${apiUrl}/technician-order-tech-status/${localStorage.getItem("uid")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrderTech(res.data);
          console.log(res.data);
        }
      });
  };

  useEffect(() => {
    getOrderTech();
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
                  <TableCell align="left">OrderTechID</TableCell>
                  <TableCell align="right">OrderID</TableCell>
                  <TableCell align="center">Solving</TableCell>
                  <TableCell align="right">Time Out</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Damage</TableCell>
                  <TableCell align="right">CostDetail</TableCell>
                  <TableCell align="right">Technician</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {OrderTech.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.OrderID}</TableCell>
                    <TableCell align="right" sx={style}>
                      <div style={style}>{row.Solving}</div>{" "}
                    </TableCell>
                    <TableCell align="right">
                      {row.TimeOut.toString()}
                    </TableCell>
                    <TableCell align="right">{row.Status.StatusName}</TableCell>
                    <TableCell align="right">{row.Damage.DamageName}</TableCell>
                    <TableCell align="right">{row.CostDetail.Cost}</TableCell>
                    <TableCell align="right">{row.Technician.Name}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-lable="outlined button group"
                      >
                        <Button
                          id="Select_PAY_Popup"
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "กรุณา ใส่ของในตะกร้าให้ครบก่อนกด confirm หากใส่ยังไม่ครบให้กด Back",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Got it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                navigate({
                                  pathname: `/PayTechCreate/${row.ID}`,
                                });
                              }
                            });
                          }}
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
              </TableBody>
            </Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  colSpan={OrderTech.length}
                  count={OrderTech.length}
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
