import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResponsiveAppBar from "../Bar_01";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CASEInterface, ORDERInterface } from "../../interfaces/ORDERUI";
import Swal from 'sweetalert2'

// const successAlert = () => {
//   Swal.fire({
//       title: 'บันทึกข้อมูลสำเร็จ',
//       text: 'You success to save Order.',
//       icon: 'success'
//   });
// }
// const errorAlert = () => {
//   Swal.fire({
//       title: 'บันทึกข้อมูลไม่สำเร็จ',
//       text: 'You fail to save Order.',
//       icon: 'error'
//   });
// }

//ตกแต่ง Grid 
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
//ฟังค์ชันสำหรับ alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

//ฟังค์ชัน สำหรับสร้างตารางหลัก
function OrderCreate() {

    //ประกาศเพื่อ รับค่าที่ได้จากการเลือก combobox ทั้งหมดเป็นตารางที่ ดึงไปใส่ตารางหลัก
    const [Device_ID, setDevice_ID] = useState('');
    const [Address_ID, setAddress_ID] = useState('');
    const [Case_ID, setCase_ID] = useState('');
    const [Reason, setReason] = useState('');
    const [Limits, setLimit] = useState('');
    const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
    const [Order, setOrder] = React.useState<Partial<ORDERInterface>>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const userID = parseInt(localStorage.getItem("uid") + "");
    const [userName, setUserName] = useState('');

    const [Cpu, setCpu] = useState('-');
    const [Monitor, setMonitor] = useState('-');
    const [Gpu, setGpu] = useState('-');
    const [Ram, setRam] = useState('-');
    const [Harddisk, setHarddisk] = useState('-');
    const [Problem, setProblem] = useState('-');
  
    ////////////////////////////////////////////////////////////////////////////////////

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
      const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
      ) => {
        const name = event.target.name as keyof typeof Order;
        setOrder({
          ...Order,
          [name]: event.target.value,
        });
      };

    //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof OrderCreate;
        const { value } = event.target;
        setOrder({ ...Order, [id]: value });
    };

    //สร้างฟังก์ชัน เมื่อเลือก ผู้ป่าย แล้วให้ setSymtomp_ID(สร้างไว้แล้วข้างบน) 
    const onChangeDevice = (event: SelectChangeEvent) => {
        setDevice_ID(event.target.value as string);
        GetDeviceID();

    };
    const onChangeAddress = (event: SelectChangeEvent) => {
        setAddress_ID(event.target.value as string);
        GetAddressID();
    };
    const onChangeCase = (event: SelectChangeEvent) => {
        setCase_ID(event.target.value as string);
    };

    ///////////////////////////////////////////////////////////////

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend
    function submit() {
        let data = {

        CASEID: convertType(Case_ID),
        StateID: 1,
        DeviceID: convertType(Device_ID),
        AddressID: convertType(Address_ID),
        CustomerID:  convertType(userID),
        Date_time: Date_time,
        Reason: Reason,
        Limits: typeof Limits == "string" ? parseInt(Limits) : Limits,

    };

    console.log(data);

    //check data

    const apiUrl = "http://localhost:8080/CreateOrder";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            //text: '',
            icon: 'success'
            
          });

          setOrder({});
          setDate(null);
          setDevice_ID("");
          setAddress_ID("");
          setCase_ID("");
      
          setCpu("");
          setMonitor("");
          setGpu("");
          setRam("");
          setHarddisk("");
          setProblem(""); 
      
          setReason("");
          setLimit("");
        } else {
          console.log(data)
          Swal.fire({
            // Display Back-end text response 
            title: 'บันทึกไม่สำเร็จ',
            text: res.error.split(";")[0],
            icon: 'error'
          });
          
        }
      });

    // // reset All after Submit
    // setOrder({});
    // setDate(null);
    // setDevice_ID("");
    // setAddress_ID("");
    // setCase_ID("");

    // setCpu("");
    // setMonitor("");
    // setGpu("");
    // setRam("");
    // setHarddisk("");
    // setProblem(""); 

    // setReason("");
    // setLimit("");

 }

 const [Device, setDevice] = React.useState<any[]>([]); //useStateเรียกทุกตัวมาใช้

 const getDevice = async () => {
  //  GetDevice();
   const apiUrl = "http://localhost:8080/GetListDevice";
   const requestOptions = {
     method: "GET",
     headers: { "Content-Type": "application/json" },
   };
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       if (res.data) {

         setDevice(res.data);
         // console.log(res.data);
         GetDeviceID();


       } else {
         console.log("else");
       }
     });
 };

 const [Address, setAddress] = React.useState<any[]>([]); //useStateเรียกทุกตัวมาใช้

 const getAddress = async () => {
  //  GetAddress();
   const apiUrl = "http://localhost:8080/GetListAddress";
   const requestOptions = {
     method: "GET",
     headers: { "Content-Type": "application/json" },
   };
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       if (res.data) {

         setAddress(res.data);
         // console.log(res.data);
         GetAddressID();


       } else {
         console.log("else");
       }
     });
 };

 const [Case, setCase] = React.useState<CASEInterface[]>([]);
 const getCase = async () => {
    const apiUrl = `http://localhost:8080/ListCase`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCase(res.data);


        } else {
          console.log("else");
        }
      });
  };

  const GetDeviceID = async () => {
    const apiUrl1 = `http://localhost:8080/GetDevice/${Device_ID}`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {

          console.log(res.data);
          setCpu(res.data.CPU)
          setMonitor(res.data.Monitor)
          setGpu(res.data.GPU)
          setRam(res.data.RAM)
          setHarddisk(res.data.Harddisk)
          setProblem(res.data.Problem)
        }
      });
  };

  const GetAddressID = async () => {
    const apiUrl1 = `http://localhost:8080/GetAddress/${Address_ID}`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {

          console.log(res.data);

        }
      });
  };

  const getUser = async () => {
      const apiUrl = `http://localhost:8080/GetCustomer/${userID}`;
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


  useEffect(() => {
    getDevice();
    getAddress();
    getCase();
    GetDeviceID();
    GetAddressID();
    getUser();

  }, [Device_ID,Address_ID]);
  
 //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 return (
  <Paper style={{ backgroundColor: "#182E3E" }}>

  <div className="container">
    <div className="topic">
    <hr className="line"/>

    <h2 className="header">ระบบบันทึกข้อมูลการแจ้งซ่อม</h2>
      <div className="info">
        <ul>
            <li>Customer : {userName}</li>
            <li>Datetime : {Date_time ? Date_time.format("DD/MM/YYYY HH:mm:ss") : ''}</li>
        </ul>
      </div>
    </div>

    <hr className="line"/>

    <div className="block2">
        <div className="province">
            <div className="top">
                อุปกรณ์
            </div>
            <div className="bottom">
            <Paper style={{ backgroundColor: "#FFFFF" }}>
              <Typography align="center" fontSize={50}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    value={Device_ID}
                    onChange={onChangeDevice}
                    inputProps={{
                      name: "Device_ID",
                    }}
                  >
                    <option aria-label="None" value="">
                      กรุณาเลือกอุปกรณ์
                    </option>
                    {Device.map((item) => (
                      <option value={item.ID} key={item.ID}>
                          Device-ID : {item.ID} - Type : {item.Type.Type_Name} - Customer : {item.Customer.Name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                </Typography>
              </Paper>
            </div>
        </div>
        <div className="district">
            <div className="top">
                ที่อยู่
            </div>
            <div className="bottom">
            <Paper style={{ backgroundColor: "#FFFFF" , width: 380 }}>
                <Typography align="center" fontSize={50}>
                <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={Address_ID}
                  onChange={onChangeAddress}
                  inputProps={{
                    name: "Address_ID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกที่อยู่
                  </option>
                  {Address.map((item) => (
                    <option value={item.ID} key={item.ID}>
                       ที่อยู่ {item.ID}   : ประเภท {item.AddressType.Type_Name}   : {item.Tambon.District.District_Name}   : {item.Tambon.Tambon_Name} : {item.Detail}
                    </option>
                  ))}
                </Select>
                </FormControl>
                </Typography>
              </Paper>
            </div>
        </div>
    </div>

    <div className="block2">
        <div className="province">
            <div className="top">
                CPU
            </div>
            <div className="bottom">
            <TextField
              style={{ backgroundColor: "white", width: 300 }}
              id="outlined-read-only-input"
              value={Cpu}
              InputProps={{
                readOnly: true,
              }}
              />
            </div>
        </div>
        <div className="district">
            <div className="top">
                Monitor
            </div>
            <div className="bottom">
              <TextField
                style={{ backgroundColor: "white", width: 300 }}
                fullWidth
                id="outlined-read-only-input"
                value={Monitor}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
        </div>
    </div>

    <div className="block2">
        <div className="province">
            <div className="top">
                GPU
            </div>
            <div className="bottom">
              <TextField
              style={{ backgroundColor: "white", width: 300 }}
              fullWidth
              id="outlined-read-only-input"
              value={Gpu}
              InputProps={{
                readOnly: true,
              }}
              />
            </div>
        </div>
        <div className="district">
            <div className="top">
                Monitor
            </div>
            <div className="bottom">
              <TextField
              style={{ backgroundColor: "white", width: 300 }}
              fullWidth
              id="outlined-read-only-input"
              value={Ram}
              InputProps={{
              readOnly: true,
              }}
              />
            </div>
        </div>
    </div>

      <div className="block2">
          <div className="province">
              <div className="top">
                  Harddisk
              </div>
              <div className="bottom">
                <TextField
                style={{ backgroundColor: "white", width: 300 }}
                fullWidth
                id="outlined-read-only-input"
                value={Harddisk}
                InputProps={{
                  readOnly: true,
                }}
                />
              </div>
          </div>
          <div className="district">
              <div className="top">
                  Problem
              </div>
              <div className="bottom">
                <TextField
                style={{ backgroundColor: "white", width: 300 }}
                fullWidth
                id="outlined-read-only-input"
                value={Problem}
                InputProps={{
                readOnly: true,
                }}
                />
              </div>
          </div>
      </div>

      <div className="block2">
        <div className="province">
            <div className="top">
                อาการ
            </div>
            <div className="bottom">
            <Paper style={{ background: "#FFFFFF" , width: 330}}>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={Case_ID}
                  onChange={onChangeCase}
                  inputProps={{
                    name: "Case_ID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกอาการ
                  </option>
                  {Case.map((item: CASEInterface) => (
                    <option value={item.ID} key={item.ID}>
                       อาการ {item.Case_text}
                    </option>
                  ))}
                </Select>
              </FormControl>
              </Paper>
            </div>
        </div>
        <div className="district">
            <div className="top">
                เพิ่มเติม
            </div>
            <div className="bottom">
              <Paper style={{ background: "#FFFFFF" , width: 330}}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="Reason"
                  variant="outlined"
                  type="string"
                  size="medium"
                  value={Reason}
                  onChange={(event) => setReason(event.target.value)}
                />
              </FormControl>
              </Paper>
            </div>
        </div>
    </div>

    <div className="block3">
        <div className="tambon">
            <div className="top">
                วันที่พร้อมให้มาซ่อม
            </div>
            <div className="bottom">
              <Paper style={{ background: "#FFFFFF" , width: 330}}>
                <FormControl fullWidth variant="outlined">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDateTimePicker
                      renderInput={(params) => <TextField {...params} />}
                      value={Date_time}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Paper>
            </div>
        </div>
        <div className="postcode">
            <div className="top">
                ช่วงราคา
            </div>
            <div className="bottom">
              <Paper style={{ background: "#FFFFFF" , width: 330}}>
              <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Limit"
                    variant="outlined"
                    type="int"
                    size="medium"
                    value={Limits}
                    onChange={(event) => setLimit(event.target.value)}
                  />
                </FormControl>
                </Paper>
            </div>
        </div>
    </div>

    <hr className="line"/>

    <div className="button">
      <div className="back-button">
        <Button size="large" sx={{ backgroundColor: "#C70039", fontSize: 20 }} component={RouterLink} to="/" variant="contained"  >
            ย้อนกลับ
        </Button>
      </div>
      <div className="show-button">
          <Button sx={{ backgroundColor: "success" }} component={RouterLink} to="/ShowOrder" variant="contained">
              แสดงข้อมูล
          </Button>
      </div>
      <div className="save-button">
            <Button
                variant="contained"
                color="success"
                onClick={submit}> บันทึกข้อมูล
            </Button>
      </div>
    </div>

  </div>
  </Paper>
);

}

export default OrderCreate;