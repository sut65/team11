import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { DeviceInterface } from "../../../interfaces/IDevice";
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2'
import { DataGrid, GridToolbar, GridColDef , GridRenderCellParams} from '@mui/x-data-grid';
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { getsetDeviceID } from './DeviceEdit';


function DeviceShow() {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success' ,
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

    const navigate = useNavigate();
    const [DeviceShow, setDeviceShow] = React.useState<DeviceInterface[]>([]);
    const getDeviceShow = async () => {
        const apiUrl = `http://localhost:8080/GetListDevice`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setDeviceShow(res.data);
            } else {
                console.log("device show error");
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
                params.api.setRowMode(params.id, 'edit');
                getsetDeviceID(params.id.toString());
              };
              return (
                  <Button variant="contained" onClick={handleClick} component={RouterLink} to="/DeviceEditPage"
                    sx={{ cursor: 'pointer', backgroundColor: 'success' }} >
                    {<Edit />}แก้ไข
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
                swalWithBootstrapButtons.fire({
                  title: 'คุณกำลังลบรายการอุปกรณ์',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'ฉันต้องการลบ',
                  cancelButtonText: 'ยกเลิกการลบ',
                  reverseButtons: true,
                  
                }).then((result) => {
                  if (result.isConfirmed) {
                    params.api.setRowMode(params.id, 'edit');
                    const apiUrl = `http://localhost:8080/DeleteDevice/${params.id}`;
                    const requestOptions = {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(''),
                    };
                    fetch(apiUrl, requestOptions)
                      .then((response) => response.json())
                      .then((res) => {
                        if (res.data) {
                          swalWithBootstrapButtons.fire(
                            'ลบสำเร็จ',
                            'ลบรายการอุปกรณ์ สำเร็จ',
                            'success'
                          );
                        } else {
                          swalWithBootstrapButtons.fire(
                            'การลบล้มเหลว',
                            res.error.split(";")[0],
                            'error'
                          );
                        }
                        window.location.reload();
                      });
                  } else if (
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    swalWithBootstrapButtons.fire(
                      'ยกเลิก',
                      'การลบรายการอุปกรณ์',
                      'error'
                    )
                  }
                });
              };
              return (
                <Button variant="contained" onClick={handleClick}
                  sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#ff3222' }} >
                  {<Delete />}ลบ
                </Button>
              );
            }
        },
        { field: "ID", headerName: "ID", width: 50 },
        { field: "CustomerName", headerName: "ชื่อเจ้าของ", width: 150 , renderCell:params =>{        
            return <div>{params.row.Customer.Name}</div>
        }},
        { field: "Type_Name", headerName: "ประเภท", width: 90 , renderCell:params =>{        
            return <div>{params.row.Type.Type_Name}</div>
        }},
        { field: "WindowName", headerName: "ระบบปฎิบัติการ", width: 120 , renderCell:params =>{        
            return <div>{params.row.Windows.Windows_Name}</div>
        }},
        { field: "CPU", headerName: "ซีพียู", width: 200 },
        { field: "Monitor", headerName: "หน้าจอ", width: 200 },
        { field: "GPU", headerName: "การ์ดจอ", width: 200},
        { field: "RAM", headerName: "แรม", width: 200 },
        { field: "Harddisk", headerName: "ฮาร์ดดิสก์", width: 200 },
        { field: "Problem", headerName: "ปัญหาที่เคยเกิด", width: 200 },
        {
          field: "Save_Time", headerName: "Save_Time", width: 200
          , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
    ];

    useEffect(() => {
        getDeviceShow();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            {/* <ResponsiveAppBar/> */}
            <Box>
                <Typography
                    component="h2"
                    variant="h4"
                    color="#558b2f"
                    gutterBottom
                    fontFamily="Arial"
                    align="center"
                    mt={3}
                    mb={3}
                    bgcolor="#182e3e"
                >
                    <b>ข้อมูลอุปกรณ์</b>
                </Typography>
            </Box>
            <center>
                <Box sx={{ width: '98%', height: '50vh' }} style={{ backgroundColor: "#e0f2f1" }}  >
                    {datashow()}
                </Box>
            </center>
            <p/>
            <Grid container spacing={2}>
                <Grid item xs={1.2} style={{textAlign: 'right'}}>
                    <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                        ย้อนกลับ
                    </Button>
                </Grid>
                <Grid item xs={10.65} style={{textAlign: 'right'}}>
                    <Button color="success"  component={RouterLink} to="/DeviceCreatePage" variant="contained">
                        เพิ่มข้อมูล
                    </Button>
                </Grid>
            </Grid>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Paper>
    )
    function datashow() {
        return (
          <DataGrid
            rows={DeviceShow}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            components={{
              Toolbar: GridToolbar,
            }}/>
        )
      }
}

export default DeviceShow;