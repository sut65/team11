//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PaymentInterface, BankInterface, PAYTECHInterface, } from "../../../interfaces/PaymentUI";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResponsiveAppBar from '../../Bar_01';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../CSS/payment.css";
import PAYTECHSHOW from "./PAYTECHSHOW";
import { PayTechInterface } from "../../../interfaces/IPayTech";
import { OrderTechInterface } from "../../../interfaces/IOrderTech";
import { log } from "console";

////////////////////////////////////////////_convert_////////////////////////////////////////////////////
const convertType = (data: string | number | undefined | Float32Array) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};
const convertFloat = (data: string | number | undefined | Float32Array) => {
  let val = typeof data === "string" ? parseFloat(data) : data;
  return val;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////

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
function Payment() {
  //const [Amount_Check, setAmount_Check] = useState(0); //คอยรับค่าที่ทำการคิดเงินแล้วเอามาเก็บไว้รอบันทึกลง ฐานข้อมูล

  //ประกาศเพื่อ รับค่าที่ได้จากการเลือก combobox ทั้งหมดเป็นตารางที่ ดึงไปใส่ตารางหลัก
  const [Bank_ID, setBank_ID] = useState('');
  const [PAYTECH_ID, setPAYTECH_ID] = useState('') || 0;//>>>>>>>>>> แก้ตรงนี้ด้วยใช้จริงต้องไม่เกิด กรณี 0
  const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
  const [Payment, setPayment] = React.useState<Partial<PaymentInterface>>({});
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

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
    setSuccess(false);
    setError(false);
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
  const onChangePAYTHECH = (event: SelectChangeEvent) => {
    setPAYTECH_ID(event.target.value as string);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  function submit() {
    let data = {

      PAYTECH_ID: convertType(PAYTECH_ID),  //จะเก็บค่า Ordertech_ID
      Sender_name: Payment.Sender_name ?? "",
      Bank_ID: convertType(Bank_ID),
      Amount: convertFloat(Payment.Amount),
      //Amount_Check: convertFloat(), //ส่ง Order tecth id ไปให้ backend คำนวณเงิน
      Status_ID: 3,
      Date_time: Date_time,
      CustomerID: 1,
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
          setSuccess(true);
        } else {
          console.log("this error occurred")
          console.log(error)
          setError(true);
        }
        console.log(data);
      });
    // reset All after Submit
    setBank_ID("");
    setDate(null);
    setPAYTECH_ID("");
    setPayment({});
    setAmountCheck("ไม่มีข้อมูล");
  }
  //////////////////////////////-_เรียกยอดเงินรวมออกมาแสดงให้ลูกค้า_-////////////////////////////////////////////

  const [amountCheck, setAmountCheck] = useState('ไม่มีข้อมูล');
  console.log(amountCheck);

  async function submitPayment() {

    // console.log(data);
    const apiUrl = `http://localhost:8080/SendmoneyToFrontend/${PAYTECH_ID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          setAmountCheck(res.sent + (parseFloat(res.sent) * 0.25)); //สำหรับแส้งที่ fron เท่านั้น ไม่ได้บันทึก
          console.log(res.data);
          // console.log(res.sum);
          // console.log(res.moneyMan);
          // console.log(res.sent);

        } else {
          console.log("else");
          setAmountCheck('ไม่มีข้อมูล');
        }
      });

    // console.log('Ordertech_id = ',);
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

  const [PAYTECH, setPAYTECH] = React.useState<OrderTechInterface[]>([]);
  const getPAYTECH = async () => {
    const apiUrl = `http://localhost:8080/order-teches`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPAYTECH(res.data);
          PAYTECH.map((i: any) => {
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
  console.log('235_PAYTECH_ID -->', PAYTECH_ID)

  //useEffect เป็นการเรียกใช้งานฟังก์ชัน useEffect เมื่อ component นั้นเกิดการเปลี่ยนแปลงค่าของ state ที่เราเล็งเอาไว้ หรือหากไม่กำหนดค่า state ที่เล็งเอาไว้ การทำงานของ useEffect จะทำงานเพียงครั้งเดียวคือก่อน component นั้นจะถูกแสดงขึ้นมา
  useEffect(() => {
    getBank();
    getPAYTECH();
    //getMoney();
  }, []);


  //ฟังก์ชัน สำหรับ Datagrid
  // const columns: GridColDef[] = [
  //   { field: "Payment_ID", headerName: "ลำดับ", width: 100 },
  //   { field: "PAYTECH_ID", headerName: "PAYMENT_ID", width: 300 },
  //   { field: "Sender_Name", headerName: "ชื่อผู้โอนเงิน", width: 400 },
  //   { field: "Bank_ID", headerName: "ธนาคาร", width: 400 },
  //   { field: "Amount", headerName: "ยอดเงินที่โอน", width: 400 },
  //   { field: "Amount_Check", headerName: "ยอดที่ต้องโอนเงิน", width: 400 },
  //   { field: "Date_time", headerName: "วันที่โอนเงิน", width: 400 },
  //   { field: "Status_ID", headerName: "สถานะ", width: 400 },
  //   { field: "USER_ID", headerName: "ผู้ส่งเรื่อง", width: 400 },
  // ];
  //////////////////////////////////////////////////////////////////////////////-_ ส่วนนี้คือส่วนที่กำหนด UI _-////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
      <ResponsiveAppBar />
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
                ระบบชำระเงิน
              </b><br /><br />

            </Typography>
          </center>
        </Box>




        {select_Order()}
        <Box style={{ backgroundColor: "#e0f2f1" }}>
          {/* {PAYTECHSHOW(PAYTECH_ID)}<br /> */}
        </Box>
        <br /><br />
        {show_Amout_check()}
        <br /><br />


        <Grid container spacing={3}>
          {/*แบ่งซ้ายมือให้กับรูปภาพ*/}
          <Grid item xs={4}>
            <Item>
              <img src="https://www.srikrungbroker.com/register_files/bank-srikrung.jpg" width="100%" height="100%" />
            </Item>
          </Grid>
          {/*แบ่งกลางให้กับข้อความ*/}
          <Grid item xs={2} >
            <Item ><center> <h3>หมายเลข Order</h3> </center></Item><br />
            <Item ><center> <h3>ชื่อผู้โอนเงิน</h3> </center></Item><br />
            <Item ><center> <h3>ธนาคารที่โอนเงินเข้า</h3> </center></Item><br />
            <Item ><center> <h3>จำนวนเงินที่โอนเข้า</h3> </center></Item><br />
            <Item ><center> <h3>วันเวลาที่ทำการ</h3> </center></Item><br />
          </Grid>
          {/*แบ่งขวาให้กับข้อมูล*/}
          <Grid item xs={6}>

            <Item>{taxtfield_Order()}</Item><br />
            <Item>{taxtfield_namesender()}</Item><br />
            <Item>{Combo_Bank()}</Item><br />
            <Item>{taxtfield_Amount()}</Item><br />
            <Item>{Datetime()}</Item><br />
          </Grid>
        </Grid>
        <br /><br />
        <hr color="#FFFFFF"/>
        {button_submit_back()}
        <br /><br /><br /><br /><br /><br /><br />





      </Container>
    </Paper>
  );
  //สำหรับ combobox หมายเลขรายการ
  function Combo_Oder() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          native
          value={PAYTECH_ID}
          onChange={onChangePAYTHECH}
          inputProps={{
            name: "PAYTECH_ID",
          }}
        >
          <option aria-label="None" value="">
            กรุณาเลือก หมายเลข Oder                 </option>
          {PAYTECH.map((item: any) => (
            <option value={item.ID} key={item.ID}>
              {item.ORDER.ID}  {/* ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  }
  function taxtfield_Order() {
    return (
      <FormControl fullWidth variant="outlined">
        <Select
          disabled
          native
          value={PAYTECH_ID}
          onChange={onChangePAYTHECH}
          inputProps={{ name: "PAYTECH_ID", }}
        >
          <option aria-label="None" value="">  ท่านยังไม่เลือกรายการ   </option>
          {PAYTECH.map((item: any) => (<option value={item.ID} key={item.ID}>{item.ORDER.ID}
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
          type="float"
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
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <h2 style={{ color: "#FFFFFF", textAlign: "right" }}>ยอดเงินที่ต้องชำระ</h2>
        </Grid>

        <Grid item xs={2}>
          <Item sx={{ backgroundColor: "#436F77", fontSize: 30, color: "#FFFFFF" }}>
            {amountCheck}
          </Item>
        </Grid>

        <Grid item xs={5}>
          <h2 style={{ color: "#FFFFFF" }}>บาท</h2>
        </Grid>
      </Grid>
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
      <Grid item xs={12}>
        <Button size="large" sx={{ backgroundColor: "#C70039", fontSize: 20 }} component={RouterLink} to="/PaymentShow" variant="contained"  >
          ย้อนกลับ
        </Button>
        <Button
          style={{ float: "right", fontSize: 20 }}
          onClick={submit}
          variant="contained"
          color="success"
          size="large"
        >
          <b>บันทึก</b>
        </Button>
      </Grid>
    )
  }

  function button_pay() {

    return (
      <Button style={{ backgroundColor: "#8bc34a", fontSize: 26, }}
        onClick={submitPayment}
        //onClick={() => { setAC(Cal_Amount_Check(show_Money)) }}
        variant="contained"
      //size="large"
      >
        <b>ชำระรายการนี้</b>
      </Button>
    )
  }
  function select_Order() {
    return (<Container>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Item style={{ background: "#f1f8e9" }}>
            {Combo_Oder()}<br />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item style={{ backgroundColor: "#182e3e" }}>
            {button_pay()}

          </Item>
        </Grid>
      </Grid>
    </Container>)
  }

}
export default Payment;
