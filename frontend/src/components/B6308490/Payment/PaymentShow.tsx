import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
//import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  DataGrid,
  GridToolbar,
  GridColDef,
} from '@mui/x-data-grid';

import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import { ClassNames } from '@emotion/react';
import ResponsiveAppBar from '../../Bar_01';
import dayjs from 'dayjs';


//ตกแต่ง Grid 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function PaymentShow() {
  const [PaymentShow, setPaymentShow] = React.useState<PaymentInterface[]>([]);
  const getPaymentShow = async () => {
    const apiUrl = `http://localhost:8080/ListPayment`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPaymentShow(res.data);
        } else {
          console.log("paymentshow error");
        }
      });
  };

  //ฟังก์ชัน สำหรับ Datagrid

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 70 },
    { field: "PayTech_ID", headerName: "OrderID", width: 70 },
    { field: "Sender_Name", headerName: "ชื่อผู้โอนเงิน", width: 200 },
    { field: "Bank_ID", headerName: "ธนาคาร", width: 140
      , renderCell: params => {

        if (params.row.Bank_ID === 1) {
          return <div>ธนาคารไทยพาณิชย์</div>;
        } else if (params.row.Bank_ID === 2) {
          return <div>ธนาคารกสิกรไทย</div>;
        } else if (params.row.Bank_ID === 3) {
          return <div>ธนาคารกรุงไทย</div>;
        } else if (params.row.Bank_ID === 4) {
          return <div>ธนาคารกรุงเทพ</div>;
        } else if (params.row.Bank_ID === 5) {
          return <div>ธนาคารกรุงศรีอยุธยา</div>;
        } 
      }
    },
    { field: "Amount", headerName: "ยอดเงินที่โอน", width: 100 },
    { field: "Amount_Check", headerName: "ยอดที่ต้องโอนเงิน", width: 100 },
    {
      field: "Date_time", headerName: "วันที่โอนเงิน", width: 200
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
    },
    {
      field: "Status_ID", headerName: "สถานะ", width: 300
      , renderCell: params => {

        if (params.row.Status_ID === 1){
          return <div>ยังไม่ชำระเงิน</div>;
        } else if (params.row.Status_ID === 2) {
          return <div>ชำระเงินเรียบร้อย</div>;
        } else if (params.row.Status_ID === 3) {
          return <div>รอตรวจสอบการชำระเงิน</div>;
        } else if (params.row.Status_ID === 4) {
          return <div>การชำระเงินไม่ถูกต้อง</div>;
        } 
      }
    },
    //{ field: "CustomerID", headerName: "ผู้ส่งเรื่อง", width: 300 },

  ];

  useEffect(() => {

    getPaymentShow();

  }, []);

  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
      {/* <ResponsiveAppBar /> */}
      <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
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
              <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} >
                ระบบชำระเงิน
              </b>
              <br /><br />

            </Typography>
          </center>
        </Box>
      </div>




      <Container  >
        <Box sx={{ width: '100%', height: '50vh' }} style={{ backgroundColor: "#e0f2f1" }}  >
          {datashow()}
        </Box>
        {btn_edit()}


        <br /><br />


        <Grid>
          <Button style={{ backgroundColor: "#8bc34a", fontSize: 26, position: "absolute", left: "50%", transform: "translateX(-50%)" }}
            component={RouterLink} to="/Payment" variant="contained">
            เข้าสู่หน้าชำระเงิน
          </Button>
          <br /><br /><br /><br />
        </Grid>
        <br /><br />


      </Container>

      <br /><br /><br /><br /><br /><br /><br /><br />
    </Paper>
  )
  function datashow() {
    return (
      <DataGrid
        rows={PaymentShow}
        getRowId={(row) => row.ID}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        components={{
          Toolbar: GridToolbar,
        }}

      //style={{ width: "60%", height: "100%" }}
      />
    )
  }
  function btn_edit() {
    return (
      // <Container >
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Button
            size="small"
            sx={{ backgroundColor: "#FB6E52", fontSize: 15, float: "right" }}
            component={RouterLink} to="/EditPayment" variant="contained"  >
            แก้ไขรายการการชำระเงิน
          </Button>
        </Grid>
      </Grid>
      // </Container>
    )
  }


}
export default PaymentShow

