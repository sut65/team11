//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import { AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../Bar_01";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { RefundInterface } from "../../interfaces/Refund";

function RefundShow() {
    const [RefundShow, setRefundShow] = React.useState<RefundInterface[]>([]);
    const getRefundShow = async () => {
        const apiUrl = `http://localhost:8080/GetListRefund`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setRefundShow(res.data);
            } else {
                console.log("order show error");
            }
        });
    };

    const columns: GridColDef[] = [
        { field: "ID", headerName: "RefundID", width: 100 },
        { field: "OrderID", headerName: "OrderID", width: 100 },
        { field: "CustomerName", headerName: "ลูกค้า", width: 200, renderCell:params =>{        
            return <div>{params.row.ORDER.Customer.Name}</div>
        }},
        { field: "CauseHead", headerName: "หัวข้อ", width: 300, renderCell:params =>{        
            return <div>{params.row.Cause.Cause_text}</div>
        }},
        { field: "Refund_Cause", headerName: "เหตุผล", width: 250 },
        { field: "ContactHead", headerName: "Contact", width: 100, renderCell:params =>{        
            return <div>{params.row.Contact.Contact}</div>
        }},
        { field: "Refund_Contact", headerName: "หมายเลข", width: 250 },
        { field: "Refund_time", headerName: "เวลา Refund", width: 200 },
    ];

    useEffect(() => {
        getRefundShow();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            {/* <ResponsiveAppBar/> */}
            <Box sx={{ width: '100%', height: '50vh' }} style={{ backgroundColor: "#FFFFFF" }}  >
                {datashow()}
            </Box>
            <Grid sx = {{padding : 2}}></Grid>
            <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/" variant="contained">
                ย้อนกลับ
            </Button>
            <Grid sx = {{padding : 20}}></Grid>
        </Paper>
    )
    function datashow() {
        return (
          <DataGrid
            rows={RefundShow}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            components={{
              Toolbar:GridToolbar,
            }}/>
        )
      }
}

export default RefundShow;