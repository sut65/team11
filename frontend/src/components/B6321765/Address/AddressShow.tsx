import React, { useEffect } from "react";
import ResponsiveAppBar from '../../Bar_01';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { AddressInterface } from "../../../interfaces/AddressUI";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';

function AddressShow() {

    const navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

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
        { field: "Customer_Name", headerName: "ชื่อลูกค้า", width: 150 , renderCell:params =>{        
            return <div>{params.row.Customer.Name}</div>
        }},
        { field: "Type_Name", headerName: "ประเภทที่อยู่", width: 150 , renderCell:params =>{        
            return <div>{params.row.AddressType.Type_Name}</div>
        }},
        { field: "Tambon_Name", headerName: "ตำบล", width: 150 , renderCell:params =>{        
            return <div>{params.row.Tambon.Tambon_Name}</div>
        }},
        { field: "Post_Code", headerName: "รหัสไปรษณีย์", width: 100 },
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
                    <b>ข้อมูลที่อยู่</b>
                </Typography>
            </Box>
            <center>
                <Box sx={{ width: '50%', height: '50vh' }} style={{backgroundColor: "#e0f2f1" }}  >
                    {datashow()}
                </Box>
            </center>
            
            <p/>
            <Grid container spacing={2}>
                <Grid item xs={0.1}/>
                <Grid item xs={1.9}>
                    <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                        ย้อนกลับ
                    </Button>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={4}/>
                <Grid item xs={3.2} style={{textAlign: 'right'}}>
                    <Button sx={{ backgroundColor: "success"}}  component={RouterLink} to="/AddressEditPage" variant="contained">
                        แก้ไขข้อมูล
                    </Button>
                </Grid>
                <Grid item xs={0.8} style={{textAlign: 'left'}}>
                    <Button color="success"  component={RouterLink} to="/AddressCreatePage" variant="contained">
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