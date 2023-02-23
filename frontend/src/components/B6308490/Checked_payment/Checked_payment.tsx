//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Snackbar, Grid, Box, TextField, AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PaymentInterface, BankInterface,} from "../../../interfaces/PaymentUI";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResponsiveAppBar from '../../Bar_01';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "../CSS/PAY_and_CHECKED.css";
import { Checked_paymentInterface, Status_checkInterface } from "../../../interfaces/Checked_paymentUI";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import Stack from '@mui/material/Stack';
import { color } from "@mui/system";



var Edge1 = '15px';
var Edge2 = '30px';

////////////////////////////////////////////_convert_////////////////////////////////////////////////////
const convertType = (data: string | number | undefined | Float32Array | any) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};
///////////////////////////////////////// Css Internal//////////////////////////////////////////////////////////////
//ตกแต่ง Grid 
const Item0 = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255,0)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  elevation: 0,
  height: 50,
  borderRadius: Edge1
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  //color: theme.palette.text.secondary,
}));
const Item_2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'rgba(255, 255, 255, 0.3)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: 20,
  height: 50,
  borderRadius: Edge1
}));
const Item3 = styled(Paper)(({ theme }) => ({
  backgroundColor:'rgb(170, 203, 115, 0.6)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: 20,
  height: 50,
  borderRadius: Edge1
}));
const P2 = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgb(0,0,0,.0.5)",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  fill: '#FFFFFF',
  fontSize: 17,
  // color: theme.palette.text.secondary,
  color:'#000000',
  borderRadius: Edge2
}));
const P3 = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  backgroundColor:'#FFFFFF',
  fontSize: 17,
  color: theme.palette.text.secondary,
  borderRadius: Edge2,  
}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ฟังค์ชัน สำหรับสร้างตารางหลัก
function Checked_payment() {
  const [Status_check_ID, setStatus_check_ID] = useState('');
  // const [Payment_ID, setPayment_ID] = useState(''); // ตัวแปล ID สำหรับการ Update และ Delete
  const Payment_ID =  localStorage.getItem('Checked_Payment_ID');
  const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
  const [Checked_payment, setChecked_payment] = React.useState<Partial<Checked_paymentInterface>>({});
  const userID = parseInt(localStorage.getItem("uid") + "");
  const [userName, setUserName] = useState('');
  const [Payment_ID_show, setPayment_ID_show] = useState('');
  const [Order_ID_show, setOrder_ID_show] = useState('');
  const [Sender_name_show, setSender_name_show] = useState('');
  const [Bank_show, setBank_show] = useState('');
  const [Amount_show, setAmount_show] = useState('');
  const [Amount_check_show, setAmount_check_show] = useState('');
  const [Time_show, setTime_show] = useState('');
  const [User_show, setUser_show] = useState('');

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    //setSuccess(false);
    //setError(false);
  };
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof Checked_payment;
    setChecked_payment({
      ...Checked_payment,
      [name]: event.target.value,
    });
  };
  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Checked_payment;
    const { value } = event.target;
    setChecked_payment({ ...Checked_payment, [id]: value });
  };
  //สร้างฟังก์ชัน เมื่อเลือก Bank  แล้วให้ setBank(สร้างไว้แล้วข้างบน) 
  const onChangeStatus_check = (event: SelectChangeEvent) => {
    setStatus_check_ID(event.target.value as string);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend

  async function submit() {
    let data = {

      Payment_ID: convertType(Payment_ID),
      Other: Checked_payment.Other ?? "",
      Message: Checked_payment.Message ?? "",
      Date_time: Date_time,
      Status_ID: convertType(Status_check_ID),
      Admin_ID: convertType(userID),

    };
    // console.log(data);
    const apiUrl = "http://localhost:8080/CreateChecked_payment";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {

        if (res.data) {
          // Alert การบันทึกสำเส็จ
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            //text: '',
            icon: 'success'

          });
          localStorage.removeItem('Checked_Payment_ID');
          setTimeout(() => { window.location.href = "/Checked_paymentShow";  }, 3000);

        } else {
          //setAlertMessage(res.error)
          Swal.fire({
            // Display Back-end text response 
            title: 'บันทึกไม่สำเร็จ',
            text: res.error.split(";")[0],
            icon: 'error'
          });
          

        }
      });
  };

  /////////////////////////-_ ส่วนของการโหลดและดึงค่ามาใช้(ใช้กับ Combobox) _-/////////////////////////////////
  const [Status_check, setStatus_check] = React.useState<Status_checkInterface[]>([]);
  const getStatus_check = async () => {
    const apiUrl = `http://localhost:8080/ListStatus_check`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStatus_check(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //ดึงค่าทั้งหมด จากตาราง Payment
  const [Payment, setPayment] = React.useState<PaymentInterface[]>([]);
  const getPayment = async () => {
    const apiUrl = `http://localhost:8080/ListPayment`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // console.log('listpaytech----->',res.data);
          setPayment(res.data);

        } else {
          console.log("else");
        }
      });
  };

  const get_Payment_for_show = async () => {
    const apiUrl = `http://localhost:8080/GetPayment/${Payment_ID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPayment_ID_show(res.data.ID)
          setOrder_ID_show(res.data.OrderTech.OrderID)
          setSender_name_show(res.data.Sender_Name)
          setBank_show(res.data.Bank.Bank_name)
          setAmount_show(res.data.Amount)
          setAmount_check_show(res.data.Amount_Check)
          setTime_show(res.data.Date_time)
          setUser_show(res.data.Customer.Name)
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
    getStatus_check();
    getPayment();
    get_Payment_for_show()

  }, []);

  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    // <Paper style={{ backgroundColor: "rgb(24,46,62,0.8)" }}>
    <Paper style={{ backgroundColor: "rgb(0,0,0,0.4)" ,borderRadius: '35px'}} >
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
              <b id="Topic_font"  ><br />
                ระบบตรวจสอบการชำระเงิน
              </b><br /><br />

            </Typography>
          </center>
        </Box>

        <Container>
          {show_data()}<br />
        </Container>
        <br/>
        <Container>
        <Container sx={{ backgroundColor: "rgb(0,0,0,0.1)" }} style={{ borderRadius: '35px' }}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} ></Grid>
              <Grid item xs={3}> <Item3> <P3 id='black_font'>กำหนดสถานะ</P3> </Item3> </Grid>
              <Grid item xs={9}> <Item>{Combo_Status_check()}</Item> </Grid>
              <Grid item xs={3}> <Item3> <P3 id='black_font'>วันเวลาที่ทำการ</P3> </Item3> </Grid>
              <Grid item xs={9}> <Item >{Datetime()}</Item> </Grid>
              <Grid item xs={3}> <Item3> <P3 id='black_font'>หมายเหตุ(admin)</P3> </Item3> </Grid>
              <Grid item xs={9}> <Item>{taxtfield_Other()}</Item> </Grid>
              <Grid item xs={3}> <Item3> <P3 id='black_font'>ข้อความถึงลูกค้า</P3> </Item3> </Grid>
              <Grid item xs={9}> <Item>{taxtfield_Message()}</Item> </Grid>
            </Grid>
          </Container><br/><br/>
          </Container>

          <br /><br />
          {button_submit_back()}
          <br /><br />
        </Container>
        <br /><br />

      </Container>
    </Paper>
  );
  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////

  //สำหรับ combobox Status_check
  function Combo_Status_check() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          native
          id='editcheck_combo'
          className="black_font"
          value={Status_check_ID}
          onChange={onChangeStatus_check}
          inputProps={{
            name: "Status_check_ID",
          }}
        >
          <option aria-label="None" value="">
            กรุณากำหนด สถานะ
          </option>
          {Status_check.map((item: Status_checkInterface) => (
            <option value={item.ID} key={item.ID}>
              {item.ID === 3 ? '⚠️'+item.Status_name + " (รายการจะยังไม่ถูกตรวจสอบตรวจสอบ)" :item.ID === 2 ? '✅'+item.Status_name :'❌'+item.Status_name}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }
  function taxtfield_Other() {
    return (
      <FormControl fullWidth variant="outlined" >
        <TextField
          id="Other"
          variant="outlined"
          type="string"
          size="medium"
          multiline={true}
          rows={4}
          value={Checked_payment.Other || ""}
          onChange={handleInputChange}
        />
      </FormControl>
    )
  }
  function taxtfield_Message() {
    return (
      <FormControl fullWidth variant="outlined">
        <TextField
          id="Message"
          variant="outlined"
          type="string"
          size="medium"
          multiline={true}
          rows={4}
          value={Checked_payment.Message || ""}
          onChange={handleInputChange}
        //inputProps={{ MaxLength: 200 }}
        />
      </FormControl>
    )
  }
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
      <Grid container spacing={3}>
        <Grid item xs={9.5}>
          <Button size="large" id='btn_back' component={RouterLink} to="/Checked_paymentShow" variant="contained"  >
            <b> ย้อนกลับ </b>
          </Button>
        </Grid>
        <Grid item xs={2.5}>
          <Button id= "btn_green"  onClick={submit}    variant="contained"   sx={{fontSize:16 }}  style={{width: '200px',height:'50px'}} >
            <b>บันทึกการตรวจสอบ</b>
          </Button>
        </Grid>

      </Grid>
    )
  }

  // function select_Order() {
  //   return (<Container>
  //     <Grid container spacing={3}>
  //       <Grid item xs={2}> </Grid>
  //       <Grid item xs={6}>
  //         <Item style={{ background: "#f1f8e9" }}>
  //           {Combo_Payment()}<br />
  //         </Item>
  //       </Grid>
  //       <Grid item xs={4}>
  //         <Item style={{ backgroundColor: "#182e3e" }}>
  //           {button_pay()}
  //         </Item>
  //       </Grid>
  //     </Grid>
  //   </Container>)
  // }
  function show_data() {
    return (
      <Grid container spacing={1} sx={{ backgroundColor: "rgb(0,0,0,0.4)" }} style={{ borderRadius: '35px' }} >
        <Grid item xs={12}><center> <h2 id='black_font' style={{color:'#C0DEFF'}}>ข้อมูลสำหรับตรวจสอบ</h2> </center> </Grid>

        <Grid item xs={12}>  </Grid>
        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>Paymment ID: </h4></Item0></Grid>
        <Grid item xs={3.6}><Item_2>   <P2 id='black_font'>{Payment_ID_show}</P2>   </Item_2></Grid>
        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>Order ID: </h4></Item0></Grid>
        <Grid item xs={3.4}><Item_2>   <P2 id='black_font'>{Order_ID_show}</P2>   </Item_2></Grid>

        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>ชื่อผู้โอนเงิน: </h4></Item0></Grid>
        <Grid item xs={3.6}><Item_2>   <P2 id='black_font'>{Sender_name_show}</P2>   </Item_2></Grid>
        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>ชื่อของลูกค้า: </h4></Item0></Grid>
        <Grid item xs={3.4}><Item_2>   <P2 id='black_font'>{User_show}</P2>   </Item_2></Grid>

        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>วันที่โอนเงินเข้าระบบ: </h4></Item0></Grid>
        <Grid item xs={3.6}><Item_2>   <P2 id='black_font'>{dayjs(Time_show).format('DD/MM/YYYY HH:mm ')}</P2>   </Item_2></Grid>
        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>ธนาคาร: </h4></Item0></Grid>
        <Grid item xs={3.4}><Item_2>   <P2 id='black_font'>{Bank_show}</P2>   </Item_2></Grid>

        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>ยอดเงินที่โอนเข้า(บาท): </h4></Item0></Grid>
        <Grid item xs={3.6}><Item_2>   <P2 id='black_font'>{Amount_show}</P2>   </Item_2></Grid>
        <Grid item xs={2}><Item0><h4 id='font_for_show_details'>ยอดที่ต้องโอน(บาท): </h4></Item0></Grid>
        <Grid item xs={3.4}><Item_2>   <P2 id='black_font'>{Amount_check_show}</P2>   </Item_2></Grid>
        <Grid item xs={12}> <br /> </Grid>

      </Grid>
    )
  }
}
export default Checked_payment;

