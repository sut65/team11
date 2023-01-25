import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import {  } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';

function PAYTECHSHOW() {
const [PAYTECHSHOW,setPAYTECHSHOW] = React.useState<PaymentInterface[]>([]);
  const getPaymentShow = async () => {
    const apiUrl = `http://localhost:8080/ListPAYTECH/:`; // add ID for search
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setPAYTECHSHOW(res.data);
        } else {
          console.log("paymentshow error");
        }
      });
  };

    //ฟังก์ชัน สำหรับ Datagrid
    const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 100 },
    { field: "PAYTECH_ID", headerName: "OrderID", width: 100 },
    { field: "COSTT", headerName: "ชื่อผู้โอนเงิน", width: 300 },
    
    
  ];

    useEffect(() => {

        getPaymentShow();

    }, []);

    return (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={PAYTECHSHOW}  //มาแก้ไขตรงนี้ด้วย
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          </div>
    )
}

export default PAYTECHSHOW

