//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route, useNavigate } from "react-router-dom";
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
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { CASEInterface, ORDERInterface } from "../../interfaces/ORDERUI";
import Swal from 'sweetalert2'
import { Delete, Edit } from "@mui/icons-material";
import TextsmsIcon from '@mui/icons-material/Textsms';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import { getsetOrderID } from "./UpdateOrder";

function OrderShow() {

    // const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //       confirmButton: 'btn btn-success' ,
    //       cancelButton: 'btn btn-danger'
    //     },
    //     buttonsStyling: true
    //   })

    const [userName, setUserName] = useState('');
    const userID = parseInt(localStorage.getItem("uid") + "");
    const [Date_time, setDate] = useState<Dayjs | null>(dayjs());

    const getUser = async () => {
      const apiUrl = `http://localhost:8080/GetCustomer/${userID}`;
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
    
    const customerID = parseInt(localStorage.getItem("uid") + "");
    const [OrderShow, setOrderShow] = React.useState<ORDERInterface[]>([]);
    const getOrderShow = async () => {
        const apiUrl = `http://localhost:8080/GetOrder/${customerID}`;
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
        {
            field: 'action1',
            headerName: '',
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams) => {
      
              const handleClick = () => {
                // params.api.setRowMode(params.id, 'edit');
                // getsetOrderID(params.id.toString());
                localStorage.setItem('OrderIDLocalForOrder', params.id.toString());
      
              };
              return (
                <Button variant="contained" onClick={handleClick} component={RouterLink} to="/OrderUpdate"
                  // disabled={params.row.Status_ID != 3 && params.row.Status_ID != 1}
                  sx={{ cursor: 'pointer', backgroundColor: 'success' }} >
                  {<Edit />}แก้ไข
                </Button>
              );
            }
          },
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
        { field: "state", headerName: "สถานะ", width: 200 , renderCell:params =>{        
            return <div>{params.row.State.State}</div>
        }},
    ];

    useEffect(() => {
        getOrderShow();
        getUser();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>

            <div className="body">
            <div className="topic">
              <h1 className="header">ข้อมูลออเดอร์</h1>
              <div className="info">
                <ul>
                    <li>Customer : {userName}</li>
                    <li>Datetime : {Date_time ? Date_time.format("DD/MM/YYYY HH:mm:ss") : ''}</li>
                </ul>
              </div>
            </div>
            
            <hr className="line"/>

            <div className="table">
              <div className="showTable">
                  {datashow()}
              </div>
            </div>
            <Grid container spacing={2} sx = {{padding : 2}}>
              <Grid item xs={10}>
                <Button sx={{ fontSize: 20, backgroundColor: "#C70039" }} component={RouterLink} to="/" variant="contained">
                    ย้อนกลับ
                </Button>
                </Grid>
                <Grid item xs={2}>
                <Button color="success" sx={{fontSize: 20 }} component={RouterLink} to="/OrderCreate" variant="contained">
                    เพิ่มข้อมูล
                </Button>
              </Grid>
            </Grid>
        </div>
        
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
            }}
            style={{ borderRadius: '10px' }}/>
        )
      }
}

export default OrderShow;