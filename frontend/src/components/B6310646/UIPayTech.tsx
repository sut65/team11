import { Link as RouterLink } from "react-router-dom";
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
import { ServiceInterface } from "../models/service";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Autocomplete, InputLabel, MenuItem } from "@mui/material";
// import { TypeWashingInterface } from "../models/ITypeWatching";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Swal from "sweetalert2";
import { HardwareInterface, PayTechInterface } from "../models/IPayTech";
import { OrderTechInterface } from "../models/IOrderTech";
import React, { useEffect } from "react";
import { TypeInterface } from "../models/IDevice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PayTechCreate() {
  const [Note, setNote] = React.useState<String>("");
  const [Amount, setAmount] = React.useState<String>("");
  const [CostHardware, setCostHardware] = React.useState<String>("");
  const [HardwareID, setHardwareID] = React.useState("");
  const onChangeHardware = (event: SelectChangeEvent) => {
    setHardwareID(event.target.value as string);
  };
  const [OrderTechID, setOrderTechID] = React.useState("");
  const onChangeOrderTech = (event: SelectChangeEvent) => {
    setOrderTechID(event.target.value as string);
  };
  const [TechnicianID, setTechnicianID] = React.useState("");
  const onChangeTechnician = (event: SelectChangeEvent) => {
    setTechnicianID(event.target.value as string);
  };
  const [TypeID, setTypeID] = React.useState("");
  const onChangeType = (event: SelectChangeEvent) => {
    setTypeID(event.target.value as string);
  };
  const [PayTechID, setPayTechID] = React.useState("");
  const onChangePayTech = (event: SelectChangeEvent) => {
    setPayTechID(event.target.value as string);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // Row of PayTech
  const columns: GridColDef[] = [
    { field: "ID", headerName: "PayTechID", width: 120 },
    { field: "OrderTechID", headerName: "OrderTechID", width: 120 },
    { field: "HardwareID", headerName: "HardwareID", width: 120 },
    { field: "Amount", headerName: "Amount", width: 120 },
    { field: "CostHardware", headerName: "Cost", width: 155 },
    { field: "Note", headerName: "Note", width: 150 },
    // sum of number table is 815
  ];

  function submit() {
    let data = {
      Note: Note,
      Amount: typeof Amount == "string" ? parseInt(Amount) : 0,
      CostHardware:
        typeof CostHardware == "string" ? parseInt(CostHardware) : 0,
      HardwareID: convertType(HardwareID),
      OrderTechID: convertType(OrderTechID),
      TechnicianID: 1,
    };

    const apiUrl = "http://localhost:8080/pay-tech";
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
        } else {
          // errorAlert();
          console.log("Error");
          console.log(res);
        }
      });
    setNote("");
    setHardwareID("");
    setOrderTechID("");
    setAmount("");
    setCostHardware("");
  }

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

  const [Hardware, setHardware] = React.useState<HardwareInterface[]>([]);
  const getHardware = async () => {
    const apiUrl = "http://localhost:8080/hardwares";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setHardware(res.data);
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
  const [PayTech, setPayTech] = React.useState<PayTechInterface[]>([]);
  const getPayTech = async () => {
    const apiUrl = "http://localhost:8080/pay-teches";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPayTech(res.data);
          console.log(res.data);
        }
      });
  };

  // Update post PayTech
  function Update() {
    let data = {
      Note: Note,
      Amount: typeof Amount == "string" ? parseInt(Amount) : 0,
      CostHardware:
        typeof CostHardware == "string" ? parseInt(CostHardware) : 0,
      HardwareID: convertType(HardwareID),
      OrderTechID: convertType(OrderTechID),
      TechnicianID: 1,
    };

    const apiUrl = "http://localhost:8080/update-pay-tech";
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
        } else {
          // errorAlert();
          console.log("Error");
        }
      });
    setNote("");
    setHardwareID("");
    setOrderTechID("");
    setAmount("");
    setCostHardware("");
  }
  // Delete post PayTech
  function Delete() {
    let data = {
      Note: Note,
      Amount: typeof Amount == "string" ? parseInt(Amount) : 0,
      CostHardware:
        typeof CostHardware == "string" ? parseInt(CostHardware) : 0,
      HardwareID: convertType(HardwareID),
      OrderTechID: convertType(OrderTechID),
      TechnicianID: 1,
    };

    const apiUrl = "http://localhost:8080/delete-pay-tech/1";
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // successAlert();
          console.log("Success");
        } else {
          // errorAlert();
          console.log("Error");
        }
      });
    setNote("");
    setHardwareID("");
    setOrderTechID("");
    setAmount("");
    setCostHardware("");
  }

  useEffect(() => {
    getHardware();
    getOrderTech();
    getUser();
    getPayTech();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper>
        <Box
          display="flex"
          maxWidth="lg   "
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
              บันทึกค่าใช้จ่ายของช่าง
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={0} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <p style={{ textAlign: "left" }}>
              <h3>รายละเอียดของลูกค้า</h3>
            </p>
          </Grid>
          {/* combobox hardware */}
          <Grid item xs={12}>
            <p style={{ textAlign: "left" }}>
              <h3>Pay Tech ID</h3>
            </p>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white", float: "left" }}
                native
                value={PayTechID}
                onChange={onChangePayTech}
                sx={{ width: 300 }}
                inputProps={{
                  name: "PayTechID",
                }}
              >
                <option aria-label="None" value="">
                  select-Pay-Tech-ID
                </option>
                {PayTech.map((item: PayTechInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
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
            <p style={{ textAlign: "left" }}>Order Technician</p>
            <Select
              sx={{ width: 300 }}
              style={{ backgroundColor: "white", float: "left" }}
              native
              value={OrderTechID}
              onChange={onChangeOrderTech}
              inputProps={{
                name: "OrderTechID",
              }}
            >
              <option aria-label="None" value="">
                Order Technicain
              </option>
              {OrderTech.map((item: OrderTechInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.ID}
                </option>
              ))}
            </Select>
          </Grid>
          {/* text type */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>ประเภท</p>
            {/* box type */}
            <FormControl fullWidth>
              <Select
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
          {/* text reason */}
          <Grid item xs={6}>
            <p style={{ textAlign: "left" }}>หมายเหตุ</p>
            {/* box reason */}
            <TextField
              style={{ float: "left" }}
              value={Note}
              onChange={(event) => setNote(event.target.value)}
              id="note"
              label="NOTE"
              type="string"
              inputProps={{
                style: {
                  height: 50,
                  width: 270,
                },
              }}
            />
          </Grid>
          {/* combobox hardware */}
          <Grid item xs={5}>
            <p style={{ textAlign: "left" }}>
              <h3>Hardware</h3>
            </p>
            <FormControl fullWidth>
              <Select
                style={{ backgroundColor: "white", float: "left" }}
                native
                value={HardwareID}
                onChange={onChangeHardware}
                sx={{ width: 300 }}
                inputProps={{
                  name: "HardwareID",
                }}
              >
                <option aria-label="None" value="">
                  select-hardwares
                </option>
                {Hardware.map((item: HardwareInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.HardwareName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={5}>
            <p style={{ textAlign: "left" }}>hardware</p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
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
          <Grid item xs={1}>
            <p style={{ textAlign: "left" }}>จำนวน</p>
            <TextField
              style={{ float: "left" }}
              id="amount"
              value={Amount}
              label="จำนวน"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ width: 70 }}
              onChange={(event) => setAmount(event.target.value)}
            />
          </Grid>

          <Grid item xs={2}>
            <p style={{ textAlign: "left", width: 120 }}>ราคา</p>
            <TextField
              style={{ float: "right" }}
              id="CostHardware"
              value={CostHardware}
              label="ราคา"
              InputProps={{ inputProps: { min: 1 } }}
              type="number"
              sx={{ width: 120 }}
              onChange={(event) => setCostHardware(event.target.value)}
            />
          </Grid>

          {/* botton ADD */}
          <Grid item xs={2}>
            <br />
            <br />
            <br />
            <Button variant="contained" style={{ width: 80 }} onClick={submit}>
              ADD
            </Button>
          </Grid>

          {/* botton Update */}
          <Grid item xs={2}>
            <br />
            <br />
            <br />
            <Button
              variant="contained"
              style={{ float: "left", width: 80 }}
              onClick={Delete}
            >
              DELETE
            </Button>
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
              // onClick={BACK}
              color="primary"
            >
              Back
            </Button>

            {/* botton Submit */}
            <Button
              style={{ float: "right" }}
              onClick={Update}
              // onClick={UPDATE}
              variant="contained"
              color="primary"
            >
              UPDATE
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
  function datashow() {
    return (
      <DataGrid
        rows={PayTech}
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

export default PayTechCreate;
