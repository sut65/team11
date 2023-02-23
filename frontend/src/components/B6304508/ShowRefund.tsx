//ดึงส่วนต่าง ๆ ที่จะต้องใช้งาน
import React, { useEffect, useState } from "react";
import { Link as RouterLink, Route, useNavigate } from "react-router-dom";
import { AppBar, Button, FormControl, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../Bar_01";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { RefundInterface } from "../../interfaces/Refund";
import { Edit } from "@mui/icons-material";
import { ORDERInterface } from "../../interfaces/ORDERUI";
import dayjs, { Dayjs } from "dayjs";

function RefundShow() {
    const navigate = useNavigate();
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

    // const [userName, setUserName] = useState('');
    // const userID = parseInt(localStorage.getItem("uid") + "");
    const [Date_time, setDate] = useState<Dayjs | null>(dayjs());
    const AdminName = (localStorage.getItem("name") + "");

  //   const getUser = async () => {
  //     const apiUrl = `http://localhost:8080/Get/${userID}`;
  //     const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     };
  //     fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //         if (res.data) {
  //         setUserName(res.data.Name);
  //         }
  //     });
  // };


    const columns: GridColDef[] = [
        {
            field: 'action1',
            headerName: '',
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams) => {
      
              const handleClick = () => {
                update_Refund_state_Fin(params.row.ORDER.ID); //สำหรับการอัพเดตเมื่อกดปุ่ม
              };
              return (
                <Button variant="contained" onClick={handleClick} 
                  // disabled={params.row.Status_ID != 3 && params.row.Status_ID != 1}
                  sx={{ cursor: 'pointer', backgroundColor: 'success' }} >
                  SUBMIT
                </Button>
              );
            }
          },
          {
            field: 'action2',
            headerName: '',
            width: 100,
            editable: false,
            headerClassName: 'super-app-theme--header',
            renderCell: (params: GridRenderCellParams) => {
      
              const handleClick = () => {
                update_Refund_state_Rej(params.row.ORDER.ID); //สำหรับการอัพเดตเมื่อกดปุ่ม
              };
              return (
                <Button variant="contained" onClick={handleClick} 
                  sx={{ cursor: 'pointer', backgroundColor: 'red' }} >
                  REJECT
                </Button>
              );
            }
          },
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
        { field: "state", headerName: "สถานะ", width: 200 , renderCell:params =>{        
            return <div>{params.row.ORDER.State.State}</div>
        }},
    ];

    useEffect(() => {
        getRefundShow();
        
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>

          <div className="body">
            <div className="topic">
              <h1 className="header">ข้อมูลออเดอร์</h1>
              <div className="info">
                <ul>
                    <li>Admin : {AdminName}</li>
                    <li>Datetime : {Date_time ? Date_time.format("DD/MM/YYYY HH:mm:ss") : ''}</li>
                </ul>
              </div>
              <hr className="line"/>
                <div className="table">
                  <div className="showTable">
                      {datashow()}
                  </div>
                </div>
                <Grid container spacing={2} >
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                <Button sx={{ fontSize: 18 ,backgroundColor: "#C70039" }} component={RouterLink} to="/" variant="contained">
                ย้อนกลับ
              </Button>
                </Grid>
                </Grid>
            </div>
          </div>


        </Paper>
    )

    function update_Refund_state_Fin(id: any) {
        const apiUrl = `http://localhost:8080/Update_state_Refund_Fin/${id}`;
        const requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(""),
        };
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
            } else {
            }
            // window.location.reload();
          });
      }

      function update_Refund_state_Rej(id: any) {
        const apiUrl = `http://localhost:8080/Update_state_Refund_Rej/${id}`;
        const requestOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(""),
        };
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
            } else {
            }
            // window.location.reload();
          });
      }

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