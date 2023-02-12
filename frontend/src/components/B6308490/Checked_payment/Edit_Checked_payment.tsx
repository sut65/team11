//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Snackbar, Grid, Box, TextField, AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import { PaymentInterface, BankInterface, } from "../../../interfaces/PaymentUI";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "../CSS/payment.css";
import { Checked_paymentInterface, Status_checkInterface } from "../../../interfaces/Checked_paymentUI";
import Table_Payment_show from "../Payment/Table_Payment_show";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import Stack from '@mui/material/Stack';

////////////////////////////////////////////_convert_////////////////////////////////////////////////////
const convertType = (data: string | number | undefined | Float32Array | any) => {
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

//ฟังค์ชัน สำหรับสร้างตารางหลัก
function Edit_Checked_payment() {
  const [Status_check_ID, setStatus_check_ID] = useState('');
  const [Payment_ID, setPayment_ID] = useState(''); // ตัวแปล ID สำหรับการ Update และ Delete
  const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
  const [Checked_payment, setChecked_payment] = React.useState<Partial<Checked_paymentInterface>>({});
  // const [Check_payment_ID, setCheck_payment_ID] = useState('')



  let Check_payment_ID = localStorage.getItem('Checked_Payment_ID');
  // const [success, setSuccess] = React.useState(false);
  // const [error, setError] = React.useState(false);

  const userID = parseInt(localStorage.getItem("uid") + "");
  const [userName, setUserName] = useState('');

  const [Other, setOther] = useState('');
  const [Message, setMessage] = useState('');

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // setSuccess(false);
    // setError(false);
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

  async function Update() {
    let data = {

      ID: convertType(Check_payment_ID),
      Payment_ID: convertType(Check_payment_ID), // TODO
      Other: Other ?? "",
      Message: Message ?? "",
      Date_time: Date_time,
      Status_ID: convertType(Status_check_ID),
      CustomerID: userID,

    };
    //console.log(data);
    const apiUrl = "http://localhost:8080/UpdateChecked_payment";
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {

        if (res.data) {
          // Alert การบันทึกสำเส็จ
          Swal.fire({
            title: 'บันทึกการแก้ไขสำเร็จ',
            //text: '',
            icon: 'success'
          });

          localStorage.removeItem('Checked_Payment_ID');
          setTimeout(() => { window.location.href = "/Checked_paymentShow";  }, 3000);

        } else {
          Swal.fire({
            // Display Back-end text response 
            title: 'บันทึกการแก้ไขไม่สำเร็จ',
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
  const [Data_Checked, setData_Checked] = React.useState<Checked_paymentInterface[]>([]);
  const getData_Checked = async () => {
    // const apiUrl = `http://localhost:8080/ListCheckPayment_UPdate`;
    const apiUrl = `http://localhost:8080/ListChecked_payment`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          // console.log('listpaytech----->',res.data);
          setData_Checked(res.data);

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

  const getdata_before_edit_CheckedPaymennt = async () => {
    const apiUrl = `http://localhost:8080/GetChecked_payment/${Check_payment_ID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOther(res.data.Other);
          setMessage(res.data.Message);
        } else {
          console.log("else");
        }
      });
  };

  //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา
  useEffect(() => {
    getStatus_check();
    // getChecked_payment();
    // getsetCheck_payment_Combo();
    getData_Checked();
    getdata_before_edit_CheckedPaymennt();

  }, []);

  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
      <Container maxWidth="xl">
        <Box sx={{ maginX: 0, maginY: 0 }}>
          <center>
            <Typography component="h2" variant="h4"
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
          <hr color="#99b9a0" /><br />
          {select_Order()}<br />
          <hr color="#99b9a0" /><br />
          {/* {show_data()}<br />
          <hr color="#99b9a0" /><br /> */}
        </Container>

        <Container>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} ></Grid>
              <Grid item xs={3}> <Item > <h3>กำหนดสถานะ</h3> </Item></Grid>
              <Grid item xs={9}> <Item>{Combo_Status_check()}</Item> </Grid>
              <Grid item xs={3}> <Item > <h3>วันเวลาที่ทำการ</h3> </Item> </Grid>
              <Grid item xs={9}> <Item>{Datetime()}</Item> </Grid>
              <Grid item xs={3}> <Item > <h3>หมายเหตุ(admin)</h3> </Item> </Grid>
              <Grid item xs={9}> <Item>{taxtfield_Other()}</Item> </Grid>
              <Grid item xs={3}> <Item > <h3>ข้อความถึงลูกค้า</h3> </Item> </Grid>
              <Grid item xs={9}> <Item>{taxtfield_Message()}</Item> </Grid>
            </Grid>
          </Container>
          <br /><br />
          <hr style={{ height: '20px', backgroundColor: '#132430', border: 0 }} />
          {button_submit_back()}
          <br /><br /><br /><br /><br /><br /><br />
        </Container>

      </Container>
    </Paper>
  );

  //สำหรับ combobox หมายเลขรายการ
  function Combo_Checked_Payment() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          disabled
          native
          value={Check_payment_ID}
          // onChange={onChangePayment}
          inputProps={{
            name: "Combo_Checked_Payment",
          }}
        >
          <option aria-label="None" value="">
            คุณยังไม่ได้เลือกรายการ โปรดเรือกรายการอีกครั้ง</option>
          {Data_Checked.map((item: Checked_paymentInterface) => (
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
          value={Other || ""}
          onChange={handleInputChange}
        //inputProps={{ MaxLength: 200 }}
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
          value={Message || ""}
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
      <Grid container>
        <Grid item xs={9.5}>
          <Button size="large" sx={{ backgroundColor: "#434242"}} component={RouterLink} to="/Checked_paymentShow" variant="contained" style={{ fontSize: 17 }} >
            <b> ย้อนกลับ </b>
          </Button>
        </Grid>
        <Grid item xs={2.5}>
          <Button
            style={{ float: "right", fontSize: 17 }}
            onClick={Update}
            variant="contained"
            color="success"
            size="large"
            sx={{ backgroundColor: '#F99417' }}
            //component={RouterLink} to="/Checked_paymentShow"
          >
            <b>แก้ไขการตรวจสอบ</b>
          </Button>
        </Grid>
      </Grid>
    )
  }
  function select_Order() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Item style={{ background: "#f1f8e9" }}>
            {Combo_Checked_Payment()}<br />
          </Item>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    )
  }
}
export default Edit_Checked_payment;
