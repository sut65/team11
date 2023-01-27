import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
// import { CalendarPicker, StaticDatePicker } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import {
  CostDetailInterface,
  DamageInterface,
  OrderTechInterface,
  StatusInterface,
} from "../../interfaces/IOrderTech";
import { ORDERInterface } from "../../interfaces/ORDERUI";
import { getStaticWrapperUtilityClass } from "@mui/x-date-pickers/internals/components/PickerStaticWrapper";
import { getLeadingCommentRanges } from "typescript";
import { TechnicianInterface } from "../../interfaces/TechnicianUI";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OrderTechCreate() {
  const [Solving, setSolving] = React.useState<String>("");
  const [TimeOut, setTimeOut] = React.useState<Dayjs | null>(dayjs());

  const [StatusID, setStatusID] = React.useState("");
  const onChangeStatus = (event: SelectChangeEvent) => {
    setStatusID(event.target.value as string);
  };

  const [DamageID, setDamageID] = React.useState("");
  const onChangeDamage = (event: SelectChangeEvent) => {
    setDamageID(event.target.value as string);
  };

  const [CostDetailID, setCostDetailID] = React.useState("");
  const onChangeCostDetail = (event: SelectChangeEvent) => {
    setCostDetailID(event.target.value as string);
  };

  const [TechnicianID, setTechnicianID] = React.useState("");
  const onChangeTechnician = (event: SelectChangeEvent) => {
    setTechnicianID(event.target.value as string);
  };

  const [OrderID, setOrderID] = React.useState("");
  const onChangeOrder = (event: SelectChangeEvent) => {
    setOrderID(event.target.value as string);
  };

  const [TypeID, setTypeID] = React.useState("");
  const onChangeType = (event: SelectChangeEvent) => {
    setTypeID(event.target.value as string);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const [OrderTechID, setOrderTechID] = React.useState("");
  const onChangeOrderTech = (event: SelectChangeEvent) => {
    setOrderTechID(event.target.value as string);
  };


  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Solving;
    const { value } = event.target;
    setSolving({ ...Solving, [id]: value });
  };


  // post orderTech
  function submit() {
    let data = {
      Solving: "กลับมาแก้การใส่ค่าด้วยนะ",
      TimeOut: TimeOut,
      StatusID: convertType(StatusID),
      DamageID: convertType(DamageID),
      CostDetailID: convertType(CostDetailID),
      TechnicianID: convertType(TechnicianID),
      OrderID: convertType(OrderID),
    };

    const apiUrl = "http://localhost:8080/order-tech";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // successAlert();
          console.log("Success");
          console.log(res.data);
        } else {
          // errorAlert();
          console.log("Error");
          console.log(res.data);
        }
      });
    setSolving("");
    setTimeOut(null);
    setStatusID("");
    setDamageID("");
    setCostDetailID("");
    setOrderID("");
  }

  // Update post orderTech
  function Update() {
    let data = {
      // ID: OrderTechID,
      ID: 1,
      Solving: Solving,
      TimeOut: TimeOut,
      StatusID: convertType(StatusID),
      DamageID: convertType(DamageID),
      CostDetailID: convertType(CostDetailID),
      TechnicianID: convertType(TechnicianID),
      OrderID: convertType(OrderID),
    };

    const apiUrl = "http://localhost:8080/update-order-tech/1";
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // successAlert();
          console.log("Success");
          
          console.log(res.data);
        } else {
          // errorAlert();
          console.log("Error");
          console.log(res.data);
        }
      });
    setSolving("");
    setTypeID("");
    setTechnicianID("");
    setTimeOut(null);
    setStatusID("");
    setDamageID("");
    setCostDetailID("");
    setOrderID("");
  }

  // lockdisable Customer
  const [userName, setUserName] = React.useState("");
  const getUser = async () => {
    const apiUrl = "http://localhost:8080/GetCustomer/1";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUserName(res.data.Name);
        }
      });
  };

  const [OrderTech, setOrderTech] = React.useState<OrderTechInterface[]>([]);
  const getOrderTech = async () => {
    const apiUrl = "http://localhost:8080/order-teches";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrderTech(res.data);
          console.log(res.data);
        }
      });
  };

  // Row of OrderTech
  const columns: GridColDef[] = [
    { field: "ID", headerName: "OrderTechID", width: 100 },
    { field: "OrderID", headerName: "OrderID", width: 70 },
    { field: "Solving", headerName: "Solving", width: 120 },
    { field: "TimeOut", headerName: "Time out", width: 100 },
    { field: "StatusID", headerName: "Status", width: 120 },
    { field: "DamageID", headerName: "Damage", width: 100 },
    { field: "CostDetailID", headerName: "CostDetail", width: 100 },
    { field: "TechnicianID", headerName: "Technician", width: 200 },
    // sum of number table is 815
  ];

  const [Order, setOrder] = React.useState<ORDERInterface[]>([]);
  const getOrder = async () => {
    const apiUrl = "http://localhost:8080/GetListOrder";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrder(res.data);
          console.log(res.data);
        }
      });
  };
  const [Damage, setDamage] = React.useState<DamageInterface[]>([]);
  const getDamage = async () => {
    const apiUrl = "http://localhost:8080/damages";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
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

  const [Technician, setTechnician] = React.useState<TechnicianInterface[]>([]);
  const getTechnician = async () => {
    const apiUrl = "http://localhost:8080/GetTechnicians";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setTechnician(res.data);
          console.log(res.data);
        }
      });
  };

  //useEffect
  useEffect(() => {
    // getHardware();
    getOrderTech();
    getUser();
    getOrder();
    getStatus();
    getDamage();
    getCostDetail();
    getTechnician();
    getOrderTech();
  }, []);

  // UIIIIIIIIIIUIIIIIIIIIIIUUUUUUUUUUIIIIIIIIIII
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 2 }}>
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
              color="primary"
              gutterBottom
              mt={2}
            >
              รับorder
            </Typography>
          </Box>
        </Box>

        <Divider />
        {/* customerrrrrrrrrr!!!!!!!!!!!!!!!!!!!!!!! */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p style={{ textAlign: "left" }}>
              <h3>รายละเอียดลูกค้า</h3>
            </p>
          </Grid>

          {/* text customer */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>ชื่อ-นามสกุล</p>
            {/* box customer */}
            <TextField
              style={{ backgroundColor: "white", float: "left" }}
              sx={{ width: 300 }}
              id="outlined-read-only-input"
              value={userName}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* text and box Order */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>Order Customer</p>
            <Select
              style={{ backgroundColor: "white", float: "left" }}
              native
              value={OrderID}
              onChange={onChangeOrder}
              sx={{ width: 300 }}
              inputProps={{
                name: "OrderID",
              }}
            >
              <option aria-label="None" value="">
                select-your-order-customer
              </option>
              {Order.map((item: ORDERInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.ID}
                </option>
              ))}
            </Select>
          </Grid>

          {/* box order
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Order</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={[]}
                label="ประเภท"
                sx={{ width: 300 }}
                // onChange={handleChange}
              ></Select>
            </FormControl>
          </Grid> */}

          {/* text technician */}
          {/* <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>Order Customer</p>
          </Grid> */}

          {/* box serial order */}
          {/* <Grid>
          <p style={{ textAlign: "left" }}>Order Tech</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Serial Order of Technicain
              </InputLabel>
              <Select
                style={{ float: "left" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={[]}
                label="ประเภท"
                sx={{ width: 300 }}
                // onChange={handleChange}
              ></Select>
            </FormControl>
          </Grid> */}
          {/* text and box type */}

          {/* text type */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>ประเภท</p>
            {/* box type */}
            <FormControl fullWidth>
              <Select
                // disabled
                style={{ backgroundColor: "white" }}
                native
                value={TypeID}
                onChange={onChangeType}
                sx={{ width: 300 }}
                inputProps={{
                  name: "Type_Name",
                }}
              >
                <option aria-label="None" value="">
                  Type
                </option>
                {OrderTech.map((item: any) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ORDER.Device.Type.Type_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>รายละเอียดแจ้งซ่อม</p>
            {/* box reason */}
            <TextField
              style={{ backgroundColor: "white", float: "left" }}
              // disabled
              sx={{ width: 300 }}
              id="outlined-read-only-input"
              value={Order}
              size="medium"
              variant="outlined"
              type="string"
              inputProps={{
                style: {
                  height: 70,
                  width: 275,
                },
              }}
            />
          </Grid>
          {/* text calendar */}
          <Grid item xs={2}>
            <p style={{ textAlign: "left" }}>วันที่รับแจ้ง</p>
          </Grid>
          <Grid item xs={10}></Grid>
          <TextField
            style={{ backgroundColor: "white", float: "left" }}
            sx={{ width: 300 }}
            id="outlined-read-only-input"
            // value={}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        {/* text reason */}
        {/* Technician!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p style={{ textAlign: "left" }}>
              <h2>ส่วนของช่าง</h2>
            </p>
          </Grid>
          {/* text damage */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>ประเมินความเสียหาย</p>
          </Grid>
          {/* text calendar */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>Order Technicain</p>
          </Grid>
          {/* box Damage */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={DamageID}
                onChange={onChangeDamage}
                sx={{ width: 300 }}
                inputProps={{
                  name: "DamageName",
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
          {/* box OrderTech */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={OrderTechID}
                onChange={onChangeOrderTech}
                sx={{ width: 300 }}
                inputProps={{
                  name: "ID",
                }}
              >
                <option aria-label="None" value="">
                  select-order-tech
                </option>
                {OrderTech.map((item: OrderTechInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* text costt */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>ค่าแรง</p>
          </Grid>
          {/* text technician */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>ช่าง Technician</p>
          </Grid>

          {/* box costt */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={CostDetailID}
                onChange={onChangeCostDetail}
                sx={{ width: 300 }}
                inputProps={{
                  name: "Cost",
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
          {/* box technicain */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={TechnicianID}
                onChange={onChangeTechnician}
                sx={{ width: 300 }}
                inputProps={{
                  name: "Name",
                }}
              >
                <option aria-label="None" value="">
                  lock name of technicain
                </option>
                {Technician.map((item: TechnicianInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>status</p>
          </Grid>
          {/* text solving */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>รายละเอียดการซ่อมแซม</p>
          </Grid>

          {/* box status */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white" }}
                native
                value={StatusID}
                onChange={onChangeStatus}
                sx={{ width: 300 }}
                inputProps={{
                  name: "StatusName",
                }}
              >
                <option aria-label="None" value="">
                  select-status
                </option>
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
            <TextField
              style={{ backgroundColor: "white",float: "left" }}
              id="Solving"
              label="solving"
              type="string"
              value={Solving  || ""}
              // onChange=(handleInputChange)
              sx={{ width: 300 }}
              variant="outlined"
              inputProps={{
                style: {
                  height: 70,
                  width: 275,
                },
              }}
            />



          </Grid>
          {/* text calendar */}
          <Grid item xs={2}>
            <p style={{ textAlign: "left" }}>วันที่ซ่อมเสร็จ</p>
          </Grid>
          <Grid item xs={10}></Grid>

          {/* box calendar */}
          <Grid item xs={4}>
            <p style={{ textAlign: "left" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  onChange={(newValue) => setTimeOut(newValue)}
                  value={TimeOut}
                  renderInput={(params) => <TextField {...params} />}
                  componentsProps={{
                    actionBar: {
                      actions: ["today"],
                    },
                  }}
                />
              </LocalizationProvider>
            </p>
          </Grid>
        </Grid>
        {/* botton edit */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <br />

            {/* <Button
              component={RouterLink}
              to="/"
              variant="contained"
              style={{ float: "left" }}
              onClick={submit}
              color="primary"
            >
              Edit
            </Button> */}
            {/* botton Update */}
            <Button
              style={{ float: "right" }}
              onClick={Update}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Grid>
        </Grid>
        {/* Table of PayTech */}
        <Grid item xs={3}>
          <p style={{ textAlign: "left" }}>
            <h3>รายการอุปกรณ์</h3>
          </p>
        </Grid>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          {datashow()}
        </div>

        {/* botton Back */}
        <Grid item xs={12}>
          <br />
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            style={{ float: "left" }}
            // onClick={submit}
            color="primary"
          >
            Back
          </Button>

          {/* botton Submit */}
          <Button
            style={{ float: "right" }}
            onClick={submit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
  function datashow() {
    return (
      <DataGrid
        rows={OrderTech}
        getRowId={(row) => row.ID}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    );
  }
}

export default OrderTechCreate;
