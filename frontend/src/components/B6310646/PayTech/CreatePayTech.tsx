import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Autocomplete, IconButton, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect } from "react";
import TableinPayTech2 from "./TableInPayTechCreate";
import { OrderTechInterface } from "../../../interfaces/IOrderTech";
import {
  PayTechInterface,
  HardwareInterface,
} from "../../../interfaces/IPayTech";
import { TechnicianInterface } from "../../../interfaces/TechnicianUI";
import { ORDERInterface } from "../../../interfaces/ORDERUI";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

import {
  blueGrey,
  green,
  grey,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Swal from "sweetalert2";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  AddShoppingCart,
  ShoppingBasket,
  ShoppingCart,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultProps = {
  options: [],
  getOptionLabel: (option: any) => option,
};

const PayTechCreate = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [PayTech, setPayTech] = React.useState<Partial<PayTechInterface>>({});
  const [OrderTech1, setOrderTech1] = React.useState<
    Partial<OrderTechInterface>
  >({});
  const [Amount, setAmount] = React.useState<String>("");
  const [OrderTech, setOrderTech] = React.useState<OrderTechInterface[]>([]);
  const [OrderTechDetail, setOrderTechDetail] =
    React.useState<OrderTechInterface>();
  const [Order1, setOrder1] = React.useState<Partial<ORDERInterface>>({});
  const [limits, setLimits] = React.useState<ORDERInterface>();

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  //   const [TimeOut, setTimeOut] = React.useState<Dayjs | null>(dayjs);

  const [t_name, setT_name] = React.useState<string | undefined>(undefined);

  const [Hardware, setHardware] = React.useState<HardwareInterface[]>([]);
  const getHardware = async () => {
    const apiUrl = "http://localhost:8080/hardwares";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setHardware(res.data);
          console.log(res.data);
        }
      });
  };

  const getOrderTech = async () => {
    const apiUrl = "http://localhost:8080/order-tech/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrderTech(res.data);
          setOrderTech1(res.data);
          setOrderTechDetail(res.data);
          setOrder1(res.data);
          console.log(res.data);
        }
      });
  };
  // const getLimits = async () => {
  //   const apiUrl = "http://localhost:8080/list-test-limits/";
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(`${apiUrl}${params.id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setLimits(res.data);
  //         // setOrderTechDetail(res.data);
  //       }
  //     });
  // };
  // console.log(limits);

  const getOrder = async () => {
    // const apiUrl = "http://localhost:8080/GetListOrder/";
    const apiUrl = "http://localhost:8080/GetOrder/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrder1(res.data);
          console.log(res.data);
        }
      });
  };

  const [Technician, setTechnician] = React.useState<TechnicianInterface[]>([]);
  const getTechnician = async () => {
    const apiUrl = "http://localhost:8080/GetTechnician/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTechnician(res.data);
          setT_name(res.data.Name);
          console.log(res.data);
        }
      });
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const name = event.target.name as keyof typeof PayTech;
    setPayTech({
      ...PayTech,
      [name]: event.target.value,
    });
    if (event.target.name === "OrderTechID") {
      setOrderTechDetail(OrderTech.find((r) => r.ID === event.target.value));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PayTechCreate;

    const { value } = event.target;

    setPayTech({ ...PayTech, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const [message, setAlertMessage] = React.useState("");

  const successAlert = () => {
    Swal.fire({
      title: "บันทึกข้อมูลสำเร็จ",
      text: "Click OK to exit.",
      icon: "success",
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  };

  const errorAlert = () => {
    Swal.fire({
      title: "บันทึกข้อมูลไม่สำเร็จ",
      text: "Click OK to exit.",
      icon: "error",
    });
  };

  // post orderTech
  function submit() {
    let data = {
      ID: PayTech.ID,
      Note: PayTech.Note,
      Amount: convertType(PayTech.Amount),
      CostHardware: convertType(PayTech.CostHardware),
      HardwareID: convertType(PayTech.HardwareID),
      TechnicianID: Number(localStorage.getItem("uid")),
      OrderTechID: OrderTech1.ID,
      Limits: limits,
    };

    const apiUrl = "http://localhost:8080/pay-tech";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          successAlert();
          console.log("Success");
        } else {
          Swal.fire({
            title: "บันทึกไม่สำเร็จ",
            text: res.error.split(";")[0],
            icon: "error",
          });
        }
      });
  }

  //useEffect
  useEffect(() => {
    getOrderTech();
    getHardware();
    getTechnician();
    getOrder();
    // getLimits();
  }, []);

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      {/* </Paper> */}

      <Paper variant="elevation">
        <Box
          display="flex"
          maxWidth="lg"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
              mt={2}
              align="center"
            >
              <h2>บันทึกค่าใช้จ่าย</h2>
            </Typography>
          </Box>
        </Box>
        <Divider />

        {/* customerrrrrrrrrr!!!!!!!!!!!!!!!!!!!!!!! */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ textAlign: "left" }}>
                <h3>รายละเอียดลูกค้า</h3>
              </p>
            </FormControl>
          </Grid>

          {/* box order  tech*/}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Order Tech</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 490,
                  },
                }}
                value={OrderTech1?.ID}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {/* box limit */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>limit</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 490,
                  },
                }}
                value={OrderTechDetail?.ORDER.Limits}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>

          {/* time in box  */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Time Out</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{}}
                value={OrderTechDetail?.TimeOut}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>

          {/* box reason Solving */}

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Solving</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                // size="medium"
                inputProps={{
                  style: {
                    height: 70,
                    width: 300,
                  },
                }}
                value={OrderTechDetail?.Solving}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* hardware */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ textAlign: "left" }}>
                <h3>ส่วนของช่าง</h3>
              </p>
            </FormControl>
          </Grid>

          {/* box hardware */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>hardware or software</p>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={PayTech?.HardwareID}
                onChange={handleChange}
                inputProps={{
                  name: "HardwareID",
                }}
              >
                <option aria-label="None" value="">
                  select-hardware-software
                </option>
                {Hardware.map((item: HardwareInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.HardwareName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* จำนวน */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>จำนวน</p>
              <TextField
                style={{ float: "left" }}
                id="Amount"
                value={PayTech.Amount}
                label="amount"
                type="number"
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {/* box cost */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <p style={{ textAlign: "right" }}>ราคา</p>
              <TextField
                style={{ backgroundColor: "white" }}
                id="CostHardware"
                // multiline
                value={PayTech.CostHardware}
                label="cost"
                type="number"
                onChange={handleInputChange}
              />
              <p />
            </FormControl>
          </Grid>

          {/* box note */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>หมายเหตุ*</p>

              <TextField
                style={{ backgroundColor: "white" }}
                id="Note"
                multiline
                rows={4}
                value={PayTech.Note}
                label="note*"
                onChange={handleInputChange}
              />
              <p />
            </FormControl>
          </Grid>

          {/* botton ADD */}
          <Grid item xs={1}>
            <br />
            <br />
            <br />
            <IconButton
              id="ADD_PAY"
              size="large"
              aria-label="Edit"
              onClick={submit}
              sx={{ color: green[600] }}
            >
              <AddShoppingCart fontSize="large" />
            </IconButton>
          </Grid>

          {/* box name tech */}
          <Grid item xs={5}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>Technician</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 490,
                  },
                }}
                value={t_name}
                defaultValue={"Name"}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>

          <TableinPayTech2 />

          <Grid item xs={12}>
            <Button
              id="Back_PAY"
              component={RouterLink}
              to="/PayTech"
              variant="contained"
              color="secondary"
              sx={{ border: 2, color: grey[200] }}
              size="large"
              // color="error"
              endIcon={<CancelIcon />}
            >
              Back
            </Button>

            <Button
              id="Confirm_PAY"
              style={{ float: "right" }}
              variant="outlined"
              sx={{ border: 2.7, color: purple[500] }}
              endIcon={<FileDownloadDoneIcon />}
              size="large"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Done!!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    update_status_when_confirm(OrderTech1?.ID); //สำหรับการอัพเดตเมื่อกดปุ่ม
                    update_state_when_confirm(OrderTech1?.OrderID); //สำหรับการอัพเดตเมื่อกดปุ่ม
                    navigate({ pathname: `/PayTech/` });
                  }
                });
              }}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default PayTechCreate;

function update_status_when_confirm(id: any) {
  const apiUrl = `http://localhost:8080/Update_odertech_status_for_Just/${id}`;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(""),
  };
  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
      } else {
      }
      // window.location.reload();
    });
}
function update_state_when_confirm(id: any) {
  const apiUrl = `http://localhost:8080/Update_odertech_status_for_Few/${id}`;
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(""),
  };
  fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
      } else {
      }
      // window.location.reload();
    });
}
