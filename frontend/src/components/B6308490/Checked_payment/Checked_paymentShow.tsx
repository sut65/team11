import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
//import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridToolbar, GridColDef, } from '@mui/x-data-grid';

import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import React from 'react';
import { ClassNames } from '@emotion/react';
import ResponsiveAppBar from '../../Bar_01';
import dayjs from 'dayjs';
import { Checked_paymentInterface } from '../../../interfaces/Checked_paymentUI';


//ตกแต่ง Grid 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Checked_paymentShow() {
  const [Checked_paymentShow, setChecked_paymentShow] = React.useState<Checked_paymentInterface[]>([]);
  const getChecked_paymentShow = async () => {
    const apiUrl = `http://localhost:8080/ListChecked_payment`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setChecked_paymentShow(res.data);
        } else {
          console.log("check_paymentshow error");
        }
      });
  };

  //ฟังก์ชัน สำหรับ Datagrid

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 70 },
    { field: "Payment_ID", headerName: "Payment ID", width: 200 },
    {
      field: "Status_ID", headerName: "สถานะ", width: 300
      , renderCell: params => {

        if (params.row.Status_ID === 1) {
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
    { field: "Other", headerName: "Comment", width: 300 },
    {
      field: "Date_time", headerName: "วันที่โอนเงิน", width: 200
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
    }
    //{ field: "CustomerID", headerName: "ผู้ส่งเรื่อง", width: 300 },


  ];

  useEffect(() => {
    getChecked_paymentShow();

  }, []);

  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
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
                <br/>
                ระบบตรวจสอบการชำระเงิน
              </b>
              <br /><br />

            </Typography>
          </center>
        </Box>
      </div>




      <Container  >
        <Box sx={{ width: '100%', height: '50vh' }} style={{ backgroundColor: "#e0f2f1" }}  >
          {datashow()}
        </Box><br/>
        {btn_edit()}
        <br /><br />
        <center>
          <Button style={{ backgroundColor: "#F94A29", fontSize: 26,}}
            component={RouterLink} to="/Checked_payment" variant="contained">
            เข้าสู่หน้าตรวจสอบการชำระเงิน
          </Button>
          <br /><br /><br /><br />
        </center>
        <br /><br />


      </Container>

      <br /><br /><br /><br /><br /><br /><br /><br />
    </Paper>
  )
  function datashow() {
    return (
      <DataGrid
        rows={Checked_paymentShow}
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
            sx={{ backgroundColor: "#6D67E4", fontSize: 15, float: "right" }}
            component={RouterLink} to="/EditChecked_payment" variant="contained"  >
            แก้ไขรายการตรวจสอบ
          </Button>
        </Grid>
      </Grid>
      // </Container>
    )
  }


}
export default Checked_paymentShow

