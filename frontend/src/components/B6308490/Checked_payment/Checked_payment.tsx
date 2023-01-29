//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Snackbar, Grid, Box, TextField, AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PaymentInterface, BankInterface, PAYTECHInterface, } from "../../../interfaces/PaymentUI";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResponsiveAppBar from '../../Bar_01';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "../CSS/payment.css";
import { Checked_paymentInterface, Status_checkInterface } from "../../../interfaces/Checked_paymentUI";
import Table_Payment_show from "../Payment/Table_Payment_show";

////////////////////////////////////////////_convert_////////////////////////////////////////////////////
const convertType = (data: string | number | undefined | Float32Array) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};
///////////////////////////////////////// Css Internal//////////////////////////////////////////////////////////////
//ตกแต่ง Grid 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item_2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f7e6d5',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontSize: 20,
  height: 50,
  color: theme.palette.text.secondary,
}));

const P2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
  ...theme.typography.body2,
  //padding: theme.spacing(1),
  textAlign: 'center',
  fill: '#FFFFFF',
  fontSize: 20,
  height: 50,
  color: theme.palette.text.secondary,
}));
///////////////////////////////////////// Css Internal//////////////////////////////////////////////////////////////

//ฟังค์ชันสำหรับ alert
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


//ฟังค์ชัน สำหรับสร้างตารางหลัก
function Checked_payment() {
  const [Status_check_ID, setStatus_check_ID] = useState('');
  const [Payment_ID, setPayment_ID] = useState(''); // ตัวแปล ID สำหรับการ Update และ Delete
  const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
  const [Checked_payment, setChecked_payment] = React.useState<Partial<Checked_paymentInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

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
    setSuccess(false);
    setError(false);
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
  const onChangePayment = (event: SelectChangeEvent) => {
    setPayment_ID(event.target.value as string);

  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //ฟังก์ชันนี้ สำหรับการกดปุ่ม submit จะทำการสร้างข้อมูลต่าง ๆ เพื่อส่งไปทำการบันทึกที่ backend

  async function submit() {
    let data = {

      Payment_ID: convertType(Payment_ID),
      Other: Checked_payment.Other ?? "",
      Date_time: Date_time,
      Status_ID: convertType(Status_check_ID),
      CustomerID: 1

    };
    //console.log(data);
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
          setSuccess(true);

        } else {
          console.log("summit error")
          setError(true);

        }
      });
    setPayment_ID_show('')
    setOrder_ID_show('')
    setSender_name_show('')
    setBank_show('')
    setAmount_show('')
    setAmount_check_show('')
    setTime_show('')
    setUser_show('')
  };

  function DeleteChecked_payment() {
    const apiUrl = `http://localhost:8080/DeleteChecked_payment/${Payment_ID}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(''),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          console.log("DELETE error occurred")
          console.log(error)
          setError(true);
        }
      });
  }
  

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
          console.log(' DATA_ID ----->', res.data);

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

  // const getUser = async () => {
  //   const apiUrl = `http://localhost:8080/user/${userID}`;
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

  //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา
  useEffect(() => {
    getStatus_check();
    getPayment();

  }, []);

  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
      <Container maxWidth="xl">
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
        <Snackbar open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>


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
              <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} ><br />
                ระบบตรวจสอบการชำระเงิน
              </b><br /><br />

            </Typography>
          </center>
        </Box>




        <Container>
          <hr color="#99b9a0" />
          <Box style={{ backgroundColor: "#f6f5f4" }}>
            {Table_Payment_show()}
          </Box><br />
          <hr color="#99b9a0" /><br />
          {select_Order()}<br />
          <hr color="#99b9a0" /><br />
          {show_data()}<br />
          <hr color="#99b9a0" /><br />

        </Container>

        <Container>
          <Grid container spacing={3}>
            {/*แบ่งกลางให้กับข้อความ*/}
            <Grid item xs={2} ></Grid>
            <Grid item xs={2} >
              <Item > <h3>กำหนดสถานะ</h3> </Item><br />
              <Item > <h3>วันเวลาที่ทำการ</h3> </Item><br />
              <Item > <h3>หมายเหตุ</h3> </Item><br />
            </Grid>
            {/*แบ่งขวาให้กับข้อมูล*/}
            <Grid item xs={6}>
              <Item>{Combo_Status_check()}</Item><br />
              <Item>{Datetime()}</Item><br />
              <Item>{taxtfield_Other()}</Item><br />
            </Grid>
          </Grid>
          <br /><br />
          <hr color="#99b9a0" />
          {button_submit_back()}
          <br /><br /><br /><br /><br /><br /><br />
        </Container>





      </Container>
    </Paper>
  );
  //สำหรับ combobox หมายเลขรายการ
  function Combo_Payment() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          native
          value={Payment_ID}
          onChange={onChangePayment}
          inputProps={{
            name: "PAYTECH_ID",
          }}
        >
          <option aria-label="None" value="">
            กรุณาเลือก ลำดับรายการการชำระเงิน</option>
          {Payment.map((item: PaymentInterface) => (
            <option value={item.ID} key={item.ID}>
              {'รายการชำระเงินลำดับที่   ' + item.ID}  {/* ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }


  //สำหรับ combobox Status_check
  function Combo_Status_check() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          native
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
              {item.Status_name}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }
  function taxtfield_Other() {
    return (
      <FormControl fullWidth variant="outlined">
        <TextField
          id="Other"
          variant="outlined"
          type="string"
          size="medium"
          multiline={true}
          rows={4}
          value={Checked_payment.Other || ""}
          onChange={handleInputChange}
        //inputProps={{ MaxLength: 200 }}
        />
      </FormControl>
    )
  }
  function Datetime() {
    return (
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
    )
  }
  function button_submit_back() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Button size="large" sx={{ backgroundColor: "#434242", fontSize: 20 }} component={RouterLink} to="/Checked_paymentShow" variant="contained"  >
            ย้อนกลับ
          </Button>
        </Grid>
{/* 
        <Grid item xs={4}>
          <Button
            style={{ fontSize: 20, float: "right", backgroundColor: "#C70039" }}
            onClick={DeleteChecked_payment}
            variant="contained"
            size="large"
          >ลบผลการตรวจสอบ</Button>
        </Grid> */}

        <Grid item xs={4}>
          <Button
            style={{ float: "right", fontSize: 20 }}
            onClick={submit}
            variant="contained"
            color="success"
            size="large"
          >
            <b>บันทึกการตรวจสอบ</b>
          </Button>
        </Grid>

      </Grid>
    )
  }

  function select_Order() {
    return (<Container>
      <Grid container spacing={3}>
        <Grid item xs={2}> </Grid>
        <Grid item xs={6}>
          <Item style={{ background: "#f1f8e9" }}>
            {Combo_Payment()}<br />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ backgroundColor: "#182e3e" }}>
            {button_pay()}
          </Item>
        </Grid>
      </Grid>
    </Container>)
  }
  function show_data() {
    return (
      // <Grid container spacing={2} sx={{ backgroundColor: "#646655" }}>
      <Grid container spacing={1} sx={{ backgroundColor: "#646655" }}>

        <Grid item xs={12}> <br /> </Grid>

        <Grid item xs={2} >
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>Paymment ID: </h3> </center><br />
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>ชื่อผู้โอนเงิน: </h3> </center><br />
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>วันที่โอนเงินเข้าระบบ: </h3> </center><br />
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>จำนวนเงินที่โอนเข้า: </h3> </center><br />
        </Grid>

        <Grid item xs={3.6}>
          <Item_2>   <P2>{Payment_ID_show}</P2>   </Item_2><br />
          <Item_2>   <P2>{Sender_name_show}</P2>  </Item_2><br />
          <Item_2>   <P2>{Time_show}</P2>         </Item_2><br />
          <Item_2>   <P2>{Amount_show}</P2>       </Item_2><br />
        </Grid>

        <Grid item xs={2} >
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>หมายเลข Order: </h3> </center><br />
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>ธนาคาร: </h3> </center><br />
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>ชื่อของลูกค้า: </h3> </center><br />
          <center style={{ color: "#FFFFFF", textAlign: "right" }}> <h3>จำนวนที่ต้องโอน: </h3> </center><br />
        </Grid>

        <Grid item xs={3.4}>
          <Item_2>  <P2>{Order_ID_show}</P2>     </Item_2><br />
          <Item_2>  <P2>{Bank_show}</P2>         </Item_2><br />
          <Item_2>  <P2>{User_show}</P2>         </Item_2><br />
          <Item_2>  <P2>{Amount_check_show}</P2> </Item_2><br />
        </Grid>

      </Grid>
    )
  }
  function button_pay() {

    return (
      <Button style={{ backgroundColor: "#8bc34a", fontSize: 20, height: "60px" }}
        onClick={get_Payment_for_show}
        variant="contained"
      //size="large"
      >
        <b>ตรวจสอบรายการนี้</b>
      </Button>
    )
  }


}
export default Checked_payment;
