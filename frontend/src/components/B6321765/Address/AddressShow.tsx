import React, { useEffect } from "react";
import ResponsiveAppBar from '../../Bar_01';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from "react-router-dom";
import { bgcolor } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from 'sweetalert2';

import { AddressInterface, DistrictInterface, ProvinceInterface, TambonInterface } from "../../../interfaces/AddressUI";
import { AddressTypeInterface } from "../../../interfaces/AddressUI";

import dayjs from 'dayjs';

import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';

function AddressShow() {
    const [AddressShow, setAddressShow] = React.useState<AddressInterface[]>([]);
    const getAddressShow = async () => {
        const apiUrl = `http://localhost:8080/GetListAddress`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
            if (res.data) {
                setAddressShow(res.data);
            } else {
                console.log("address show error");
            }
        });
    };

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 70 },
        { field: "CustomerID", headerName: "CustomerID", width: 70 },
        { field: "AddressTypeID", headerName: "AddressTypeID", width: 200 },
        { field: "TambonID", headerName: "TambonID", width: 140},
        { field: "Post_Code", headerName: "Post_Code", width: 100 },
        { field: "Detail", headerName: "Detail", width: 100 },
        {
          field: "Record_Time", headerName: "Record_Time", width: 200
          , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
    ];

    useEffect(() => {
        getAddressShow();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            <ResponsiveAppBar/>
            <Box sx={{ width: '100%', height: '50vh' }} style={{ backgroundColor: "#e0f2f1" }}  >
                {datashow()}
            </Box>
            <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/AddressCreatePage" variant="contained">
                ย้อนกลับ
            </Button>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </Paper>
    )
    function datashow() {
        return (
          <DataGrid
            rows={AddressShow}
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

export default AddressShow;