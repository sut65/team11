import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker, PickersDay } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  CostDetailInterface,
  DamageInterface,
  OrderTechInterface,
  StatusInterface,
} from "../../../interfaces/IOrderTech";
import { ORDERInterface } from "../../../interfaces/ORDERUI";
import { TechnicianInterface } from "../../../interfaces/TechnicianUI";
import { CustomerInterface } from "../../../interfaces/CustomerUI";
import SaveIcon from "@mui/icons-material/Save";
import { grey, purple } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OrderTechUpdate = () => {
  const params = useParams();
  const [OrderTech, setOrderTech] = React.useState<Partial<OrderTechInterface>>(
    {}
  );
  const [Order1, setOrder1] = React.useState<Partial<ORDERInterface>>({});
  const [Order, setOrder] = React.useState<ORDERInterface[]>([]);
  // const [customer, setCustomer] = React.useState<Partial<ORDERInterface>>(
  //   {}
  // );
  const [OrderDetail, setOrderDetail] = React.useState<ORDERInterface>();
  // const [OrderType, setOrderType] = React.useState<TypeInterface>();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [TimeOut, setTimeOut] = React.useState<Dayjs | null>(dayjs);

  const [t_name, setT_name] = React.useState<string | undefined>(undefined);

  const [Damage, setDamage] = React.useState<DamageInterface[]>([]);
  const getDamage = async () => {
    const apiUrl = "http://localhost:8080/damages";
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
          setDamage(res.data);
          console.log(res.data);
        }
      });
  };

  const [CostDetail, setCostDetail] = React.useState<CostDetailInterface[]>([]);
  const getCostDetail = async () => {
    const apiUrl = "http://localhost:8080/cost-details";
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
          setCostDetail(res.data);
          console.log(res.data);
        }
      });
  };

  const [Status, setStatus] = React.useState<StatusInterface[]>([]);
  const getStatus = async () => {
    const apiUrl = "http://localhost:8080/statuses";
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
          setStatus(res.data);
          console.log(res.data);
        }
      });
  };

  // const getOrder = async () => {
  //   // const apiUrl = "http://localhost:8080/GetListOrder/";
  //   const apiUrl = "http://localhost:8080/GetOrder_for_Ordertech/";
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   // fetch(`${apiUrl}${params.id}`, requestOptions)
  //   fetch(`${apiUrl}${params.id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setOrder(res.data);
  //         setOrder1(res.data);
  //         setOrderDetail(res.data);
  //         console.log(res.data);
  //         console.log(Order1)
  //       }
  //     });
  // };

  // var newID = 4;
  var newID = localStorage.getItem("Ordertech_ID");
  const getOrder = async () => {
    console.log('*******************************',newID)
    // const apiUrl = "http://localhost:8080/GetListOrder/";
    const apiUrl = "http://localhost:8080/GetOrder_for_Ordertech/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    // fetch(`${apiUrl}${params.id}`, requestOptions)
    fetch(`${apiUrl}${newID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log('*******************************',newID)
          // console.log('-------------------------------->',res.data);
          setOrder(res.data);
          setOrder1(res.data);
          setOrderDetail(res.data);
          console.log(res.data);
          // setOrder_ID_show(res.data.ORDER.OrderID)
          // localStorage.setItem('Order',Order2)
          
          // localStorage.removeItem('Ordertech_ID');

        }
        //console.log('-------------------------------->************',);
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
          //console.log(res.data);
        }
      });
  };

  // const [userName, setUserName] = React.useState("");
  // const getUser = async () => {
  //   const apiUrl = "http://localhost:8080/GetCustomer/";
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //         setUserName(res.data.Name);
  //       }
  //     });
  // };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof OrderTech;
    setOrderTech({
      ...OrderTech,
      [name]: event.target.value,
    });
    if (event.target.name === "OrderID") {
      setOrderDetail(Order.find((r) => r.ID === event.target.value));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof OrderTechUpdate;
    const { value } = event.target;
    setOrderTech({ ...OrderTech, [id]: value });
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

  const getCurrentOrderTech = async () => {
    const apiUrl = `http://localhost:8080/order-tech`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(`${apiUrl}/${params.id}`, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
      .then((res) => {
        console.log(res.data); //show ข้อมูล
        if (res.data) {
          setOrderTech(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [message, setAlertMessage] = React.useState("");

  const successAlert = () => {
    Swal.fire({
      title: "บันทึกข้อมูลสำเร็จ",
      text: "Click OK to exit.",
      icon: "success",
    }).then((result) => {
      if (result.value) {
        window.location.href = "/OrderTech";
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
  function update() {
    let data = {
      ID: OrderTech.ID,
      Solving: OrderTech.Solving ?? "",
      TimeOut: TimeOut,
      StatusID: convertType(OrderTech.StatusID),
      DamageID: convertType(OrderTech.DamageID),
      CostDetailID: convertType(OrderTech.CostDetailID),
      TechnicianID: Number(localStorage.getItem("uid")),
      OrderID: Order1.ID,
    };

    const apiUrl = "http://localhost:8080/update-order-tech";
    const requestOptions = {
      method: "PATCH",
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
    getDamage();
    // getOrder();
    getStatus();
    getDamage();
    getCostDetail();
    getTechnician();
    getCurrentOrderTech();
    getOrder();
    // getUser();
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
              <h2>ระบบรับออเดอร์ช่าง</h2>
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

          {/* box name */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ-นามสกุล</p>
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
                value={Order1.Name}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>

          {/* box order */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Order</p>
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
                value={Order1?.ID}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {/* box reason Reason */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Reason</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    height: 70,
                    width: 300,
                  },
                }}
                value={OrderDetail?.Reason}
                // onChange={()=> setSumprice(total)}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>

          {/* time in box  */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Time in</p>
              <TextField
                disabled
                variant="outlined"
                type="string"
                size="medium"
                inputProps={{
                  style: {
                    width: 400,
                  },
                }}
                value={OrderDetail?.Date_time}
                sx={{ fontFamily: "Mitr-Regular" }}
                multiline
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* techniciannnnnnnnnnnnnnnnnn */}
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p style={{ textAlign: "left" }}>
                <h3>ส่วนของช่าง</h3>
              </p>
            </FormControl>
          </Grid>

          {/* box damage Damage */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>Damage</p>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={OrderTech.DamageID}
                onChange={handleChange}
                inputProps={{
                  name: "DamageID",
                }}
              >
                <option aria-label="None" value="">
                  select-damage
                </option>
                {Damage.map((item: DamageInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DamageName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* box name tech */}
          <Grid item xs={6}>
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

          {/* box costt */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>ค่าแรง</p>

              <Select
                style={{ backgroundColor: "white" }}
                native
                value={OrderTech.CostDetailID}
                onChange={handleChange}
                inputProps={{
                  name: "CostDetailID",
                }}
              >
                <option aria-label="None" value="">
                  select-cost
                </option>
                {CostDetail.map((item: CostDetailInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Cost}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* box time out */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Time Out</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="DateTimePicker"
                  renderInput={(params) => <TextField {...params} />}
                  value={TimeOut}
                  onChange={(newValue: Dayjs | null) => {
                    setTimeOut(newValue);
                    console.log(newValue);
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          {/* box status */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>Status</p>

              <Select
                style={{ backgroundColor: "white" }}
                native
                value={OrderTech.StatusID}
                onChange={handleChange}
                inputProps={{
                  name: "StatusID",
                }}
              >
                
                {Status.map((item: StatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.StatusName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* box solving */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <p style={{ textAlign: "left" }}>Solving</p>

              <TextField
                style={{ backgroundColor: "white" }}
                id="Solving"
                multiline
                rows={4}
                value={OrderTech.Solving}
                label=""
                onChange={handleInputChange}
              />
              <p />
            </FormControl>
          </Grid>

          {/* button */}
          <Grid item xs={12}>
            <Button
              id="Back_ORDER"
              component={RouterLink}
              to="/OrderTech"
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
              id="Update_ORDER"
              style={{ float: "right" }}
              onClick={update}
              variant="outlined"
              sx={{ border: 2.7, color: purple[500] }}
              endIcon={<SaveIcon />}
              size="large"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default OrderTechUpdate;
