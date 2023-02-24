//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Params, Route, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { PaymentInterface, BankInterface, /*PAYTECHInterface,*/ } from "../../../interfaces/PaymentUI";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import dayjs, { Dayjs } from "dayjs";
import "../CSS/PAY_and_CHECKED.css";
import { OrderTechInterface } from "../../../interfaces/IOrderTech";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import Stack from '@mui/material/Stack';
import PictureBank from "..//Photo/PictureBank.png"




import {DateTimePicker, DateTimePickerTabs,DateTimePickerTabsProps,} from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const CustomTabs = (props: DateTimePickerTabsProps) => (
  <React.Fragment >
    <DateTimePickerTabs {...props} />
    <Box sx={{ backgroundColor: 'blueviolet', height: 5 }} />
  </React.Fragment>
);





////////////////////////////////////////////_convert_////////////////////////////////////////////////////
const convertType = (data: string | number | undefined | Float32Array | any) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};
const convertFloat = (data: string | number | undefined | Float32Array) => {
  let val = typeof data === "string" ? parseFloat(data) : data;
  return val;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////

//============================ Css Internal ============================================================
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.3)",
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
  fontSize: 17,
  color: theme.palette.text.secondary,
}));
//========================================================================================

//ฟังค์ชัน สำหรับสร้างตารางหลัก
function Payment() {
  const [Bank_ID, setBank_ID] = useState('');
  let OrderTech_ID = localStorage.getItem('Ordertech_ID');
  const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
  const [Payment, setPayment] = React.useState<Partial<PaymentInterface>>({});

  const userID = parseInt(localStorage.getItem("uid") + "");
  const [userName, setUserName] = useState('');


  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Payment;
    setPayment({
      ...Payment,
      [name]: event.target.value,
    });
  };
  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Payment;
    const { value } = event.target;
    setPayment({ ...Payment, [id]: value });
  };
  //สร้างฟังก์ชัน เมื่อเลือก Bank  แล้วให้ setBank(สร้างไว้แล้วข้างบน) 
  const onChangeBank = (event: SelectChangeEvent) => {
    setBank_ID(event.target.value as string);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  function submit() {
    let data = {

      OrderTech_ID: convertType(OrderTech_ID),  //จะเก็บค่า Ordertech_ID
      Sender_name: Payment.Sender_name ?? "",
      Bank_ID: convertType(Bank_ID),
      Amount: convertFloat(Payment.Amount),
      Status_ID: 3,
      Date_time: Date_time,
      CustomerID: userID,
    };

    const apiUrl = "http://localhost:8080/CreatePayment";
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
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem('Ordertech_ID');
              window.location.href = "/PaymentShow";
            }
          });

        } else {
          Swal.fire({
            title: 'บันทึกไม่สำเร็จ',
            text: res.error.split(";")[0],
            icon: 'error'
          });
        }
      });
  }
  //////////////////////////////-_เรียกยอดเงินรวมออกมาแสดงให้ลูกค้า_-////////////////////////////////////////////

  const [amountCheck, setAmountCheck] = useState('ไม่มีข้อมูล');
  async function submitPayment() {
    const apiUrl = `http://localhost:8080/SendmoneyToFrontend/${OrderTech_ID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          setAmountCheck(res.sent); //สำหรับแส้งที่ fron เท่านั้น ไม่ได้บันทึก
        } else {
          console.log("else");
          setAmountCheck('ไม่มีข้อมูล');
        }
      });
  };
  //////////////////////////////-_เรียกยอดเงินรวมออกมาแดงให้ลูกค้า_-////////////////////////////////////////////
  /////////////////////////-_ ส่วนของการโหลดและดึงค่ามาใช้(ใช้กับ Combobox) _-/////////////////////////////////

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

  const [OrderTech, setOrderTech] = React.useState<OrderTechInterface[]>([]);
  const getOrderTech = async () => {
    const apiUrl = `http://localhost:8080/order-teches`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOrderTech(res.data);
          OrderTech.map((i: any) => {
            console.log(i.OrderTech.ORDER.ID);
          })

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

  //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา
  useEffect(() => {
    getBank();
    getOrderTech();
    submitPayment();

    //getMoney();
  }, []);

  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Paper style={{ backgroundColor: "rgb(0,0,0,0.4)", borderRadius: '35px' }} >
      <Container maxWidth="xl">

        {/* เริ่มส่วนของหน้าเว็ป */}

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
              <b id='Topic_font'><br />
                ระบบชำระเงิน
              </b><br />

            </Typography>
          </center>
        </Box>


        <Container style={{ backgroundColor: "rgb(255,255,255,0.2)", borderRadius: '35px' }}>
          <br /><br />
          {show_Amout_check()}
          <br /><br />
          <Grid container spacing={3}>
            {/*แบ่งซ้ายมือให้กับรูปภาพ*/}
            <Grid item xs={4}>
              <Item style={{ backgroundColor: "rgb(255,255,255,0.6)", borderRadius: '20px' }}>
                <img src={PictureBank} alt="PictureBank" width="100%" height="100%" />
              </Item>
            </Grid>
            {/*แบ่งกลางให้กับข้อความ*/}
            <Grid item xs={2} >
              <Item2 ><center> <P2 id='black_font'>หมายเลข Order</P2> </center></Item2><br />
              <Item2 ><center> <P2 id='black_font'>ชื่อผู้โอนเงิน</P2> </center></Item2><br />
              <Item2 ><center> <P2 id='black_font'>ธนาคาร</P2> </center></Item2><br />
              <Item2 ><center> <P2 id='black_font'>ยอดเงินที่โอนเข้า</P2> </center></Item2><br />
              <Item2 ><center> <P2 id='black_font'>วันเวลาที่ทำการ</P2> </center></Item2><br />
            </Grid>
            {/*แบ่งขวาให้กับข้อมูล*/}
            <Grid item xs={6}>

              <Item>{taxtfield_Order()}</Item><br />
              <Item>{taxtfield_namesender()}</Item><br />
              <Item>{Combo_Bank()}</Item><br />
              <Item>{taxtfield_Amount()}</Item><br />
              <Item>{Datetime()}</Item><br /><br />
            </Grid>
          </Grid>
        </Container>
        <br /><br />
        {button_submit_back()}
        <br /><br />





      </Container>
    </Paper>
  );
  function taxtfield_Order() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          disabled
          native
          value={OrderTech_ID}
          // onChange={onChangePAYTHECH}
          inputProps={{ name: "OrderTech_ID", }}
        >
          <option aria-label="None" value="">  ท่านยังไม่เลือกรายการ   </option>
          {OrderTech.map((item: any) => (<option value={item.ID} key={item.ID}>{item.ORDER.ID}
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
          id='combo_bank'
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
          value={Payment.Sender_name || ""}
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
          value={Payment.Amount || ""}
          onChange={handleInputChange}
        //inputProps={{ MaxLength: 200 }}
        />
      </FormControl>
    )
  }
  function show_Amout_check() {
    return (
      <Grid container spacing={1} style={{ backgroundColor: "rgb(0,0,0,0.4)", borderRadius: '25px' }}>
        <Grid item xs={12}></Grid>
        <Grid item xs={5}>
          <h2 id='Topic_font' style={{ textAlign: "right" }}>ยอดเงินที่ต้องชำระ</h2>
        </Grid>

        <Grid item xs={2}>
          {/* <Item sx={{ backgroundColor: "#436F77", fontSize: 30, color: "#FFFFFF" }}> */}
          <Item id='Topic_font' sx={{ backgroundColor: "rgba(255,255,255,0.2)", fontSize: 30 }}>
            {amountCheck}
          </Item>
        </Grid>

        <Grid item xs={5}>
          <h2 id='Topic_font'>บาท</h2>
        </Grid>
      </Grid>
    )
  }
  function Datetime() {
    return (
      <FormControl fullWidth variant="outlined">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(params) => <TextField {...params} />}
            value={Date_time ? dayjs(Date_time).format('YYYY-MM-DDTHH:mm') : ''}
            onChange={(newValue) => {
              setDate(dayjs(newValue));
            }}
            hideTabs={false}
            components={{ Tabs: CustomTabs }}
            componentsProps={{
              tabs: {
                dateRangeIcon: <CalendarMonthOutlinedIcon />,
                timeIcon: <QueryBuilderOutlinedIcon />,
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    );
  }
  function button_submit_back() {
    return (
      <Grid item xs={12}>
        <Button id='btn_back' size="large" component={RouterLink} to="/PaymentShow" variant="contained"  >
          <b> ย้อนกลับ </b>
        </Button>
        <Button
          id='btn_green'
          style={{ float: "right", width: '150px', height: '50px' }}
          onClick={submit}
          variant="contained"
          size="large"
        >
          <b>บันทึก</b>
        </Button>
      </Grid>
    )
  }

}
export default Payment;