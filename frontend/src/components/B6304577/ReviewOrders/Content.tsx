import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import { DataGrid, GridEditRowsModel, GridValueGetterParams } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { Rating } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import style from "./style.module.css";

const successAlert = () => {
    Swal.fire({
        title: 'ลบข้อมูลสำเร็จ',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'ลบข้อมูลไม่สำเร็จ',
        text: 'You clicked the button.',
        icon: 'error'
    });
}

function renderRating(params: GridRenderCellParams<number>) {
    return <Rating readOnly value={params.value} />;
}


function Content({ setActiveStep, activeStep, setReviewsID , formDataRating, setFormDataRating, setCheckedPaymentsAll}: any) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [checkedPayments, setCheckedPayments] = useState<any[]>([]);
    const {checkedPaymentID,customerID} = formDataRating
    // console.log(checkedPayments);
    

    
 

//  checkedPayments.map((item:any)=>{item.Customer.ID})

    const handleStart = () => {
        setActiveStep(activeStep + 1);
    };

    //function fethch data จาก backend

    const getReview = async () => {
        const apiUrl = "http://localhost:8080/GetListReviews";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setReviews(res.data)
                    console.log(res.data);
                    
                }
            });
    };
    const getCheckedPayment = async () => {
        const apiUrl = "http://localhost:8080/ListChecked_payment";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setCheckedPayments(res.data)
                }
            });
    };

    useEffect(() => {
        getReview();
        getCheckedPayment();

    }, []);

    const columnCheckPayments: GridColDef[] = [
        {
            field: 'action',
            headerName: '',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    
                    setActiveStep(activeStep + 1);
                    setCheckedPaymentsAll(params.row)
                    setFormDataRating({ ...formDataRating, checkedPaymentID: params.id, customerID: params.row.CustomerID  }) //รอระบบล็อคอินจะสามารถเรียก CustomerID จากหน้าlogin
                    console.log(params.row.CustomerID);
                };
                return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222' }} >{<Edit />}รีวิว</Button>;
            }
        },
        {
            field: 'Product_ID',
            headerName: 'รายการซ่อม',
            width: 200,
            renderCell:params =>{        
                return <div>{params.row.Payment.PayTech.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'OrderTech',
            headerName: 'วิธีซ่อม',
            width: 200,
            renderCell:params =>{                
                return <div>{params.row.Payment.PayTech.OrderTech.Solving}</div>
            }
        },
        {
            field: 'Technician',
            headerName: 'ช่างผู้รับผิดชอบงาน',
            width: 200,
            renderCell:params =>{
                console.log(params.row.Payment.PayTech.OrderTech.Technician.Name);
                
                return <div>{params.row.Payment.PayTech.OrderTech.Technician.Name}</div>
            }
        },
        {
            field: 'CustomerID',
            headerName: 'ลูกค้า',
            width: 200,
            renderCell: params => { 
                return<div>{params.row.Customer.Name}</div>
            }
        },
        {
            field: 'Status_ID',
            headerName: 'สถานะ',
            width: 180,
            renderCell: params => { 
                return<div>{params.row.Status_check.Status_name}</div>
            }
            
        },
    ];

    const columnReviews: GridColDef[] = [
        {
            field: 'action1',
            headerName: 'แก้ไข',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    setActiveStep(4);
                    setReviewsID(params.id);
                    // console.log(params.id);
                };
                return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222' }} >{<Edit />}แก้ไข</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'ลบ',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'delete');
                    let data = {
                        ID: params.id
                    };
                    console.log(data);
                    const apiUrl = "http://localhost:8080/DeleteReview";
                    const requestOptions = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    };
                    fetch(apiUrl, requestOptions)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                successAlert();
                                getReview();
                                console.log("Success");
                            } else {
                                errorAlert();
                                console.log("Error");
                            }
                        });

                    // console.log(params.row.Statetus);

                };
                return <Button variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />} ลบ </Button>;
                // return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />}ลบ</Button>;
            }
        },
        {
            field: 'Checked_payment',
            headerName: 'รายการซ่อม',
            width: 150,
            renderCell:params =>{
                return <div>{params.row.Checked_payment.Payment.PayTech.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'Satisfaction_System_ID',
            headerName: 'ระดับความพึงพอใจต่อระบบ',
            width: 200,
            renderCell: renderRating,

        },
        {
            field: 'Review_Comment_System',
            headerName: 'ความคิดเห็นต่อระบบซ่อมคอมพิวเตอร์',
            width: 200
        },
        {
            field: 'Satisfaction_Technician_ID',
            headerName: 'ระดับความพึงพอใจต่อช่างที่ซ่อม',
            width: 200,
            renderCell: renderRating,
        },
        {
            field: 'Review_Comment_Technician',
            headerName: 'ความคิดเห็นต่อช่างซ่อม',
            width: 200
        },
        {
            field: 'Timestamp',
            headerName: 'วันที่',
            width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
        {
            field: 'StatusReview',
            headerName: 'สถานะ',
            width: 70,
            renderCell: params => {

                if (params.row.StatusReview === true) {
                    return <div>รีวิวสำเร็จ</div>;
                }
                return <div>รอการรีวิว</div>;
            }
        },
        {
            field: 'Customer_ID',
            headerName: 'ลูกค้า',
            width: 200,
            renderCell: params => { 
                console.log(params.row.Checked_payment.Customer.Name);
                
                return<div>{params.row.Checked_payment.Customer.Name}</div>
            }
        },


    ];


    return (
        <Container maxWidth="lg" >
            <br />
            <br />
            <br />
            <div style={{ height: 400, width: '100%' }} >
                <DataGrid
                    sx={{ marGinTop: 10, background: '#ffffff', color: 'ff0000' }}
                    rows={checkedPayments}
                    columns={columnCheckPayments}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row: ReviewInterface) => row.ID}

                // checkboxSelection
                />
            </div>
            <Typography className={style.text}>
                <h2>
                    รีวิวสำเร็จ
                </h2>
            </Typography>

            <div style={{ height: 400, width: '100%' }} >
                <DataGrid
                    sx={{ marGinTop: 10, background: '#ffffff', color: 'ff0000' }}
                    rows={reviews}
                    columns={columnReviews}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row: ReviewInterface) => row.ID}

                // checkboxSelection
                />
            </div>

        </Container>



    );

} export default Content