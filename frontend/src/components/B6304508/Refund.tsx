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
import Swal from 'sweetalert2'
import { CauseInterface, ContactInterface, RefundInterface } from "../../interfaces/Refund";

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
function RefundCreate() {

    //ประกาศเพื่อ รับค่าที่ได้จากการเลือก combobox ทั้งหมดเป็นตารางที่ ดึงไปใส่ตารางหลัก

    const [Order_ID, setOrder_ID] = useState('');
    const [Cause_ID, setCause_ID] = useState('');
    const [Contact_ID, setContact_ID] = useState('');
    const [Refund_Cause, setRefundCause] = useState('');
    const [Refund_Contact, setRefundContact] = useState('');
    const [Refund, setRefund] = React.useState<Partial<RefundInterface>>({});

     const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
    // const [Order, setOrder] = React.useState<Partial<ORDERInterface>>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const userID = parseInt(localStorage.getItem("uid") + "");
    const OrderIDLocal = (localStorage.getItem("localOrderID") + "");
    const [userName, setUserName] = useState('');
    console.log("OrderIDLocal::::::",OrderIDLocal);
    
  
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
        const name = event.target.name as keyof typeof Refund;
        setRefund({
          ...Refund,
          [name]: event.target.value,
        });
      };

    //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof RefundCreate;
        const { value } = event.target;
        setRefund({ ...Refund, [id]: value });
    };

    //สร้างฟังก์ชัน เมื่อเลือก ผู้ป่าย แล้วให้ setSymtomp_ID(สร้างไว้แล้วข้างบน) 
    const onChangeCause = (event: SelectChangeEvent) => {
        setCause_ID(event.target.value as string);
    };
    const onChangeContact = (event: SelectChangeEvent) => {
        setContact_ID(event.target.value as string);
    };
    // const onChangeOrder = (event: SelectChangeEvent) => {
    //     setOrder_ID(event.target.value as string);
    //     GetOrderID();
    // };

    ///////////////////////////////////////////////////////////////

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend
    function submit() {
        let data1 = {

        CauseID: convertType(Cause_ID),
        ContactID: convertType(Contact_ID),
        OrderID: convertType(OrderIDLocal),
        CustomerID: convertType(userID),
        Date_time: Date_time,
        Refund_Cause: Refund_Cause,
        Refund_Contact: Refund_Contact,
        StateID: 8,

    };


        let data2 = {

        ID: convertType(OrderIDLocal),
        StateID: 8,

    };

    console.log(data2);

    //check data

    const apiUrl1 = "http://localhost:8080/CreateRefund";
    const requestOptions1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data1),
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        console.log('this is les ---->',res);
        if (res.data) {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            //text: '',
            icon: 'success'
          });
          console.log(res.data)
          setRefund({});
          setDate(null);
          setCause_ID("");
          setContact_ID("");
          setOrder_ID("");

          setRefundCause("");
          setRefundContact("");

        } else {
          console.log(res.data)
          Swal.fire({
            // Display Back-end text response 
            title: 'บันทึกไม่สำเร็จ',
            text: res.error.split(";")[0],
            icon: 'error'
          });
          
        }
      });

      const apiUrl2 = "http://localhost:8080/UpdateOrderCR";
            const requestOptions2 = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data2),
            };
            fetch(apiUrl2, requestOptions2)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                console.log('t',res.data2);
              } else {
                console.log(data2)
                
        }
    });

    // reset All after Submit
    // setRefund({});
    // setDate(null);
    // setCause_ID("");
    // setContact_ID("");
    // setOrder_ID("");

    // setRefundCause("");
    // setRefundContact("");

 }

//  const [Order, setOrder] = React.useState<any[]>([]); //useStateเรียกทุกตัวมาใช้

//  const getOrder = async () => {
//    const apiUrl1 = `http://localhost:8080/GetListOrder`;
//    const requestOptions1 = {
//      method: "GET",
//      headers: { "Content-Type": "application/json" },
//    };
//    fetch(apiUrl1, requestOptions1)
//      .then((response) => response.json())
//      .then((res) => {
//        if (res.data) {

//         //  setOrder(res.data);
//          // console.log(res.data);
//          GetOrderID();


//        } else {
//          console.log("else");
//        }
//      });
//  };

 const [Cause, setCause] = React.useState<CauseInterface[]>([]);
 const getCause = async () => {
    const apiUrl1 = `http://localhost:8080/ListCause`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCause(res.data);


        } else {
          console.log("else");
        }
      });
  };

  const [Contact, setContact] = React.useState<ContactInterface[]>([]);
 const getContact = async () => {
    const apiUrl1 = `http://localhost:8080/ListContact`;
    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl1, requestOptions1)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setContact(res.data);


        } else {
          console.log("else");
        }
      });
  };

  // const GetOrderID = async () => {
  //   const apiUrl1 = `http://localhost:8080/GetOrder/${userID}`;
  //   const requestOptions1 = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(apiUrl1, requestOptions1)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.data) {
  //           setOrder(res.data);
  //           console.log(res.data);

  //       }
  //     });
  //     console.log('-------------------------------------',Order_ID)
  // };

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
    getUser();
    getCause();
    getContact();
  //   getOrder();
  //  GetOrderID();

  }, [Order_ID]);

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
                ORDER
            </div>
            <div className="bottom">
            <Paper style={{ backgroundColor: "#FFFFF" }}>
              <Typography align="center" fontSize={50}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    native
                    disabled
                    value={OrderIDLocal}
                    sx={{ width: 300 }}
                    // onChange={onChangeOrder}
                    inputProps={{
                      name: "OrderIDLocal",
                    }}
                  >
                    <option value = {OrderIDLocal}
                            key={OrderIDLocal}>
                              Order-ID : {OrderIDLocal}
                            </option>
                    {/* {OrderIDLocal => (
                      <option value={item.ID} key={item.ID}>
                        Order-ID : {item.ID}
                      </option>
                    ))} */}
                  </Select>
                </FormControl>
                </Typography>
              </Paper>
            </div>
        </div>
        <div className="district">
            <div className="top">
                เวลาที่ REFUND
            </div>
            <div className="bottom">
            <Paper style={{ backgroundColor: "#FFFFF" , width: 380}}>
              <FormControl fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    disabled
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
    </div>

    <div className="block2">
        <div className="province">
            <div className="top">
                เหตุผล
            </div>
            <div className="bottom">
            <Paper style={{ background: "#FFFFFF", width: 380}}>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={Cause_ID}
                  onChange={onChangeCause}
                  inputProps={{
                    name: "Cause_ID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกเหตุผล
                  </option>
                  {Cause.map((item: CauseInterface) => (
                    <option value={item.ID} key={item.ID}>
                       อาการ {item.Cause_text}
                    </option>
                  ))}
                </Select>
              </FormControl>
              </Paper>
            </div>
        </div>
        <div className="district">
            <div className="top">
                เหตุผลเพิ่มเติม
            </div>
            <div className="bottom">
            <Paper style={{ background: "#FFFFFF", width: 380}}>
            <FormControl fullWidth variant="outlined">
                <TextField
                   id="Reason"
                   variant="outlined"
                   type="string"
                   size="medium"
                   value={Refund_Cause}
                   onChange={(event) => setRefundCause(event.target.value)}
                />
              </FormControl>
              </Paper>
            </div>
        </div>
    </div>

    <div className="block2">
        <div className="province">
            <div className="top">
                ช่องทางคืนเงิน
            </div>
            <div className="bottom">
            <Paper style={{ background: "#FFFFFF", width: 380}}>
            <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={Contact_ID}
                  onChange={onChangeContact}
                  inputProps={{
                    name: "Contact_ID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกช่องทางการคืนเงิน
                  </option>
                  {Contact.map((item: ContactInterface) => (
                    <option value={item.ID} key={item.ID}>
                       {item.Contact} - ระยะเวลาคืนโดยประมาณ {item.Times}
                    </option>
                  ))}
                </Select>
              </FormControl>
              </Paper>
            </div>
        </div>
        <div className="district">
            <div className="top">
                Contact
            </div>
            <div className="bottom">
            <Paper style={{ background: "#FFFFFF" , width: 380}}>
            <FormControl fullWidth variant="outlined">
                <TextField
                   id="Reason"
                   variant="outlined"
                   type="string"
                   size="medium"
                   value={Refund_Contact}
                   onChange={(event) => setRefundContact(event.target.value)}
                />
              </FormControl>
              </Paper>
            </div>
        </div>
    </div>

    <div className="button">
      <div className="back-button">
        <Button size="large" sx={{ backgroundColor: "#C70039", fontSize: 20 }} component={RouterLink} to="/" variant="contained"  >
            ย้อนกลับ
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

export default RefundCreate;