import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
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
import { PayTechInterface } from "../../../interfaces/IPayTech";
import { red, yellow } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function TableinEdit() {
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

  const apiUrl = "http://localhost:8080";

  const getPayTech = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/pay-teches`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPayTech(res.data);
          console.log(res.data);
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
        <Paper sx={{ p: 0 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">PayTechID</TableCell>
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
