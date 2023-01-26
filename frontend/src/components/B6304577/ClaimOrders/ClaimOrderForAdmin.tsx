import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Clear, Done } from '@mui/icons-material';


import dayjs from 'dayjs';
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { FormControl, Rating, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import { UrgencyInterface } from '../../../interfaces/ClaimUI';

const yesAlert = () => {
    Swal.fire({
        title: 'อนุมัติสำเร็จ.',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'ผิดพลาด.',
        text: 'You clicked the button.',
        icon: 'error'
    });
}
const noAlert = () => {
    Swal.fire({
        title: 'ไม่อนุมัติสำเร็จ.',
        text: 'You clicked the button.',
        icon: 'success'
    });
}


function refreshPage() {
    window.location.reload();
}

function ClaimOrderForAdmin() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);

        };

    const [reviewID, setReviewID] = useState('');
    const [urgencyID, setUrgencyID] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [orderProblem, setOrderProblem] = useState('');
    const [claimComment, setClaimComment] = useState('');
    // const [statusClaimID, setStatusClaimID] = React.useState<any[]>([]);

    const [dataOrderID, setdataOrderID] = useState('');
    const [dataDateOrder, setdataDateOrder] = useState('');
    const [dataReason, setDataReason] = useState('');
    const [dataSolving, setDataSolving] = useState('');
    const [dataTechnician, setDataTechnician] = useState('');
    const [Claims, setClaims] = useState<any[]>([]);
    console.log(dataDateOrder);

    // console.log(reviews);


    const handleClear = () => {
        setReviewID('');
        setUrgencyID('');
        setDate(null);
        setOrderProblem('');
        setClaimComment('');

        setdataOrderID('');
        setDataReason('');
        setdataDateOrder('');
        setDataSolving('');
        setDataTechnician('');

    };


    const getListClaimOrders = async () => {
        const apiUrl = "http://localhost:8080/GetListClaimOrders";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClaims(res.data);
                    console.log(res.data);

                    // setReviews(res.data)
                }
            });
    };
    useEffect(() => {
        getListClaimOrders();

    }, []);

    const column: GridColDef[] = [

        {
            field: 'Checked_payment',
            headerName: 'รายการซ่อม',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Review.Checked_payment.Payment.PayTech.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'OrderProblem',
            headerName: 'สาเหตุการเคลม',
            width: 300,

        },
        {
            field: 'Urgency_ID',
            headerName: 'ระดับความเร่งด่วน',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Urgency.Urgency_Type}</div>
            }
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
            width: 200,
            renderCell: params => {

                return <div>{params.row.StatusClaim.StatusClaim_Type}</div>

            }
        },
        {
            field: 'action1',
            headerName: 'อนุมัติการเคลม',
            width: 120,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    // console.log(params.id);
                    let dataCheckSucceed = {
                        ID: params.id,
                        StatusClaim_ID: 2,
                    };
                    console.log(dataCheckSucceed);
            
                    const apiUrlCheckSucceed = "http://localhost:8080/UpdateClaimOrderStatus";
                    const requestOptionsCheckSucceed = {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dataCheckSucceed),
                    };
                    fetch(apiUrlCheckSucceed, requestOptionsCheckSucceed)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                yesAlert();
                                console.log("Success");
                            } else {
                                errorAlert();
                                console.log("Error");
                            }
                        });
                };
                return <Button disabled={params.row.StatusClaim.ID !== 1} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222' }} >{<Done />}อนุมัติ</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'ไม่อนุมัติการเคลม',
            width: 120,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    let dataCheckSucceed = {
                        ID: params.id,
                        StatusClaim_ID: 3,
                    };
                    console.log(dataCheckSucceed);
            
                    const apiUrlCheckSucceed = "http://localhost:8080/UpdateClaimOrderStatus";
                    const requestOptionsCheckSucceed = {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dataCheckSucceed),
                    };
                    fetch(apiUrlCheckSucceed, requestOptionsCheckSucceed)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                noAlert();
                                console.log("Success");
                            } else {
                                errorAlert();
                                console.log("Error");
                            }
                        });
                

                    // console.log(params.row.Statetus);

                };
                return <Button disabled={params.row.StatusClaim.ID !== 1} variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Clear />} ไม่อนุมัติ </Button>;
                // return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />}ลบ</Button>;
            }
        },
    ];

    return (
        <Paper
            sx={{
                backgroundColor: "#182e3e",
                height: '2000px',
                paddingTop: 20
            }} >
            <div style={{ height: 400, width: '100%' }} >

                <div style={{ height: 400, width: '100%' }} >
                    <DataGrid
                        sx={{ marGinTop: 10, marginLeft: 5, marginRight: 5, background: '#ffffff', color: 'ff0000' }}
                        rows={Claims}
                        columns={column}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row: UrgencyInterface) => row.ID}
                    />
                </div>

            </div>
        </Paper>
    );
}

export default ClaimOrderForAdmin;