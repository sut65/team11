import React, { useEffect } from "react";
import ResponsiveAppBar from '../../Bar_01';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { DeviceInterface } from "../../../interfaces/IDevice";
import dayjs from 'dayjs';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';


function DeviceShow() {

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
        { field: "ID", headerName: "ID", width: 70 },
        { field: "CPU", headerName: "CPU", width: 70 },
        { field: "Monitor", headerName: "Monitor", width: 200 },
        { field: "GPU", headerName: "GPU", width: 140},
        { field: "RAM", headerName: "RAM", width: 100 },
        { field: "Harddisk", headerName: "Harddisk", width: 100 },
        { field: "Problem", headerName: "Problem", width: 100 },
        { field: "CustomerID", headerName: "CustomerID", width: 100 },
        { field: "TypeID", headerName: "TypeID", width: 100 },
        { field: "WindowsID", headerName: "WindowsID", width: 100 },
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
            <ResponsiveAppBar/>
            <Box sx={{ width: '100%', height: '50vh' }} style={{ backgroundColor: "#e0f2f1" }}  >
                {datashow()}
            </Box>
            <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/DeviceCreatePage" variant="contained">
                ย้อนกลับ
            </Button>
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