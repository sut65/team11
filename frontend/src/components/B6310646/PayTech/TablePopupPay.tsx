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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const width = 200;
  const style = {
    maxWidth : width,
    borderStyle: "border-box"
  }

  const apiUrl = "http://localhost:8080";

  const getOrderTech = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/order-teches`, requestOptions)
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
            <Table  sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">OrderTechID</TableCell>
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
                    <TableCell  align="right" sx={style}><div style = {style}>{row.Solving}</div> </TableCell>
                    <TableCell align="right">{row.TimeOut.toString()}</TableCell>
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
                          onClick={() =>
                            navigate({ pathname: `/PayTechCreate/${row.ID}` })
                          }
                          variant="contained"
                          color="secondary"
                          size="medium"                        >
                          select
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
