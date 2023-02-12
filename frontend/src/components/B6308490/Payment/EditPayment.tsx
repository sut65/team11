//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Snackbar, Grid, Box, TextField, AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PaymentInterface, BankInterface, } from "../../../interfaces/PaymentUI";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../CSS/payment.css";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import Stack from '@mui/material/Stack';

////////////////////////////////////////////_convert_////////////////////////////////////////////////////
const convertType = (data: string | number | undefined | Float32Array | any) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};
const convertFloat = (data: string | number | undefined | Float32Array) => {
  let val = typeof data === "string" ? parseFloat(data) : data;
  return val;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
//ตกแต่ง Grid 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: '#93BFCF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  //color: theme.palette.text.secondary,
  elevation: 0,
}));
const P2 = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 55,
  fill: '#FFFFFF',
  fontSize: 15,
  color: theme.palette.text.secondary,
}));

//ฟังค์ชัน สำหรับสร้างตารางหลัก
function Payment() {
  const [Bank_ID, setBank_ID] = useState('');
  // const [Payment_ID, setPaymentH_ID] = useState('') || 0;// ตัวแปล ID สำหรับการ Update และ Delete
  // const [PAYTECH_ID, setPAYTECH_ID] = useState('') || 0;// ตัวแปล ID สำหรับการ Update และ Delete
  let Payment_ID = localStorage.getItem('Payment_ID');
  const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
  const [Payment, setPayment] = React.useState<Partial<PaymentInterface>>({});

  const [Sender_name, setSender_name] = useState("");
  const [Amount, setAmount] = useState(0.0);

  const userID = parseInt(localStorage.getItem("uid") + "");
  const [userName, setUserName] = useState('');
  //console.log('-------> ',P_ID);
  //console.log(PAYTECH_ID);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSuccess(false);
  //   setError(false);
  // };
  const handleInputChange_Amount = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Payment;
    const { value } = event.target;
    setAmount(value);
  };
  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Payment;
    const { value } = event.target;
    setPayment({ ...Payment, [id]: value });
    setSender_name(value);
  };
  //สร้างฟังก์ชัน เมื่อเลือก Bank  แล้วให้ setBank(สร้างไว้แล้วข้างบน) 
  const onChangeBank = (event: SelectChangeEvent) => {
    setBank_ID(event.target.value as string);
  };
  // const onChangePAYTHECH = (event: SelectChangeEvent) => {
  //   setPAYTECH_ID(event.target.value as string);
  // };


  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend
  function UpdatePayment() {
    let data = {

      ID: convertType(Payment_ID),
      Sender_name: Sender_name ?? "",
      Bank_ID: convertType(Bank_ID),
      Amount: convertFloat(Amount),
      // Amount_Check: convertFloat(Sent_Amout_Check),
      // Status_ID: 0,
      Date_time: Date_time,
      User_ID: userID,               //ดึงมาจากระบบlogin
      // User_ID: 1,
    };

    const apiUrl = "http://localhost:8080/UpdatePayment";
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // Alert การบันทึกสำเส็จ
          Swal.fire({
            title: 'บันทึกการแก้ไขสำเร็จ',
            icon: 'success'
          });

          localStorage.removeItem('Payment_ID');
          setTimeout(() => { window.location.href = "/PaymentShow";  }, 3000);



        } else {
          Swal.fire({
            // Display Back-end text response 
            title: 'การแก้ไขบันทึกไม่สำเร็จ',
            text: res.error.split(";")[0],
            icon: 'error'
          });
        }
        console.log(data);
      });
    // reset All after Submit
    setBank_ID("");
    setDate(null);
    setPayment({});



  }
  /////////////////////////-_ ส่วนของการโหลดและดึงค่ามาใช้(ใช้กับ Combobox) _-/////////////////////////////////

  //////////////////////////////-_เรียกยอดเงินรวมออกมาแสดงให้ลูกค้า_-////////////////////////////////////////////

  // const [amountCheck, setAmountCheck] = useState('ไม่มีข้อมูล');
  // console.log(amountCheck);

  // async function submitPayment() {

  //   // console.log(data);
  //   const apiUrl = `http://localhost:8080/SendmoneyToFrontend/${PAYTECH_ID}`;
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res) {
  //         // setMoney(res.data);
  //         setAmountCheck(res.sent + (parseFloat(res.sent) * 0.25));
  //         console.log(res.sum);
  //         console.log(res.moneyMan);
  //         console.log(res.sent);

  //       } else {
  //         console.log("else");
  //         setAmountCheck('ไม่มีข้อมูล');
  //       }
  //     });
  //     // console.log(amountCheck);
  // };

  //////////////////////////////-_เรียกยอดเงินรวมออกมาแดงให้ลูกค้า_-////////////////////////////////////////////

  const [Bank, setBank] = React.useState<BankInterface[]>([]);
  const getBank = async () => {
    const apiUrl = `http://localhost:8080/ListBank`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBank(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const [PAYTECH, setPAYTECH] = React.useState<PaymentInterface[]>([]);
  const getPAYTECH = async () => {
    const apiUrl = `http://localhost:8080/ListPayment`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPAYTECH(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getUser = async () => {
    const apiUrl = `http://localhost:8080/user/${userID}`;
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



  const getdata_before_edit = async () => {
    const apiUrl = `http://localhost:8080/GetPayment/${Payment_ID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSender_name(res.data.Sender_Name);
          setAmount(res.data.Amount);
        } else {
          console.log("else");
        }
      });
  };


  //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา
  useEffect(() => {
    getBank();
    getPAYTECH();
    getdata_before_edit();
  }, []);



  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
      <Container maxWidth="xl">
        <Box sx={{ maginX: 0, maginY: 0 }}>
          <center>
            <Typography
              component="h2"
              variant="h4"
              //color="#182E3E"
              gutterBottom
              //align="center"
              fontFamily="Arial"
            >
              <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} ><br />
                ระบบชำระเงิน
              </b><br /><br />

            </Typography>
          </center>
        </Box>        
        {select_Order()}
        {/* <Box style={{ backgroundColor: "#e0f2f1" }}>
          {PAYTECHSHOW()}<br />
        </Box> */}
        <br /><br />
        {/* {show_Amout_check()}
        <br/><br/> */}

        <Container>
          <Grid container spacing={3}>
            {/*แบ่งกลางให้กับข้อความ*/}
            <Grid item xs={2} ></Grid>
            <Grid item xs={2} >
              <Item2 > <P2 >ชื่อผู้โอนเงิน</P2> </Item2><br />
              <Item2 > <P2>ธนาคารที่โอนเงินเข้า</P2> </Item2><br />
              <Item2 > <P2>จำนวนเงินที่โอนเข้า</P2> </Item2><br />
              <Item2 > <P2>วันเวลาที่ทำการ</P2> </Item2><br />
            </Grid>
            {/*แบ่งขวาให้กับข้อมูล*/}
            <Grid item xs={6}>
              <Item>{taxtfield_namesender()}</Item><br />
              <Item>{Combo_Bank()}</Item><br />
              <Item>{taxtfield_Amount()}</Item><br />
              <Item>{Datetime()}</Item><br />
            </Grid>
          </Grid>
          
          <hr style={{ height: '20px', backgroundColor: '#132430' ,border:0}}/>
          {button_submit_back()}
          <br /><br /><br /><br /><br /><br /><br />
        </Container>
      </Container>
    </Paper>
  );
  //สำหรับ combobox หมายเลขรายการ
  function Combo_Oder() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          native
          disabled
          value={Payment_ID}
          // onChange={onChangePAYTHECH}
          inputProps={{
            name: "PAYTECH_ID",
          }}
        >
          <option aria-label="None" value="">
            กรุณาเลือก ลำดับรายการการชำระเงิน</option>
          {PAYTECH.map((item: PaymentInterface) => (
            <option value={item.ID} key={item.ID}>
              {'รายการชำระเงินลำดับที่   ' + item.ID}  {/* ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }
  //สำหรับ combobox ธนาคาร
  function Combo_Bank() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          native
          value={Bank_ID}
          onChange={onChangeBank}
          inputProps={{
            name: "Bank_ID",
          }}
        >
          <option aria-label="None" value="">
            กรุณาเลือกธนาคาร
          </option>
          {Bank.map((item: BankInterface) => (
            <option value={item.ID} key={item.ID}>
              {item.Bank_name}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }
  function taxtfield_namesender() {
    return (
      <FormControl fullWidth variant="outlined">
        <TextField
          id="Sender_name"
          variant="outlined"
          type="string"
          size="medium"
          value={Sender_name || ""}
          onChange={handleInputChange}
        //inputProps={{ MaxLength: 200 }}
        />
      </FormControl>
    )
  }
  function taxtfield_Amount() {
    return (
      <FormControl fullWidth variant="outlined">
        <TextField
          id="Amount"
          variant="outlined"
          type="number"
          size="medium"
          value={Amount || ""}
          onChange={handleInputChange_Amount}
        //inputProps={{ MaxLength: 200 }}
        />
      </FormControl>
    )
  }
  // function show_Amout_check() {
  //   return (
  //     <Grid container spacing={3}>
  //       <Grid item xs={5}>
  //         <h2 style={{ color: "#FFFFFF", textAlign: "right" }}>ยอดเงินที่ต้องชำระ</h2>
  //       </Grid>

  //       <Grid item xs={2}>
  //         <Item sx={{ backgroundColor: "#436F77", fontSize: 30 ,color: "#FFFFFF"}}>
  //           {amountCheck}
  //         </Item>
  //       </Grid>

  //       <Grid item xs={5}>
  //         <h2 style={{ color: "#FFFFFF"}}>บาท</h2>
  //       </Grid>
  //     </Grid>
  //   )
  //}
  function Datetime() {
    return (
      <FormControl fullWidth variant="outlined">
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="datetime-local"
            type="datetime-local"
            value={Date_time ? dayjs(Date_time).format('YYYY-MM-DDTHH:mm') : ''}
            onChange={(e) => {
              setDate(dayjs(e.target.value));
            }}
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
      </FormControl>
    );
  }
  function button_submit_back() {
    return (
      <Grid container >
        <Grid item xs={10}>
          <Button size="large" sx={{ backgroundColor: "#434242"}} component={RouterLink} to="/PaymentShow" variant="contained" style={{fontSize: 17 }} >
            <b> ย้อนกลับ </b>
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            style={{ float: "right", fontSize: 17 }}
            onClick={UpdatePayment}
            variant="contained"
            color="success"
            size="large"
            sx={{backgroundColor: '#F99417'}}
            // component={RouterLink} to="/PaymentShow"
          >
            <b>แก้ไข</b>
          </Button>
        </Grid>

      </Grid>
    )
  }
  function select_Order() {
    return (<Container>
      <Grid container spacing={3}>
        <Grid item xs={2}> </Grid>
        <Grid item xs={8}>
          <Item style={{ background: "#f1f8e9" }}>
            {Combo_Oder()}<br />
          </Item>
        </Grid>
      </Grid>
    </Container>)
  }
}
export default Payment;
