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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ResponsiveAppBar from "../Bar_01";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { CASEInterface, ORDERInterface } from "../../interfaces/ORDERUI";
import Swal from 'sweetalert2'

function OrderShow() {
    const [OrderShow, setOrderShow] = React.useState<ORDERInterface[]>([]);
    const getOrderShow = async () => {
        const apiUrl = `http://localhost:8080/GetListOrder`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setOrderShow(res.data);
            } else {
                console.log("order show error");
            }
        });
    };

    const columns: GridColDef[] = [
        { field: "ID", headerName: "OrderID", width: 70 },
        { field: "CustomerName", headerName: "ลูกค้า", width: 200, renderCell:params =>{        
            return <div>{params.row.Customer.Name}</div>
        }},
        { field: "CASEID", headerName: "อาการ", width: 150 , renderCell:params =>{        
            return <div>{params.row.CASE.Case_text}</div>
        }},
        { field: "CASE", headerName: "อาการเพิ่มเติม", width: 150 , renderCell:params =>{        
            return <div>{params.row.Reason}</div>
        }},
        { field: "DeviceID", headerName: "DeviceID", width: 100 },
        { field: "AddressID", headerName: "AddressID", width: 100 },
        {
          field: "Add_time", headerName: "เวลาที่ให้มาซ่อม", width: 200
          , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
        { field: "state", headerName: "สถานะ", width: 100 , renderCell:params =>{        
            return <div>{params.row.State.State}</div>
        }},
    ];

    useEffect(() => {
        getOrderShow();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            <ResponsiveAppBar/>
            <Box sx={{ width: '100%', height: '50vh' }} style={{ backgroundColor: "#FFFFFF" }}  >
                {datashow()}
            </Box>
            <Grid sx = {{padding : 2}}></Grid>
            <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/OrderCreate" variant="contained">
                ย้อนกลับ
            </Button>
            <Grid sx = {{padding : 20}}></Grid>
        </Paper>
    )
    function datashow() {
        return (
          <DataGrid
            rows={OrderShow}
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

export default OrderShow;