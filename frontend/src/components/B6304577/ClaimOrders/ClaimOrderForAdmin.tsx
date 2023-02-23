import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Clear, Done } from '@mui/icons-material';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import { UrgencyInterface } from '../../../interfaces/ClaimUI';
import "./claim.css"
import { Box } from '@mui/system';
import { id } from 'date-fns/locale';
import { Typography } from '@mui/material';

const yesAlert = () => {
    Swal.fire({
        title: 'อนุมัติสำเร็จ',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'ผิดพลาด',
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

    // const [statusClaimID, setStatusClaimID] = React.useState<any[]>([]);
    const [Claims, setClaims] = useState<any[]>([]);
    // console.log(dataDateOrder);

    // console.log(reviews);

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
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
            width: 200,
            renderCell: params => {
                // console.log(params.row.Review.Checked_payment.Payment.OrderTech.ORDER.Reason);
                return <div>{params.row.Review.Checked_payment.Payment.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'OrderProblem',
            headerName: 'สาเหตุการเคลม',
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
            width: 300,

        },
        {
            field: 'Urgency_ID',
            headerName: 'ระดับความเร่งด่วน',
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Urgency.Urgency_Type}</div>
            }
        },
        {
            field: 'Timestamp',
            headerName: 'วันที่',
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
            width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
        {
            field: 'StatusReview',
            headerName: 'สถานะ',
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
            width: 200,
            renderCell: params => {

                return <div>{params.row.StatusClaim.StatusClaim_Type}</div>

            }
        },
        {
            field: 'action1',
            headerName: 'อนุมัติการเคลม',
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
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
                    // console.log(dataCheckSucceed);

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
                                getListClaimOrders();
                                // console.log("Success");
                            } else {
                                errorAlert();
                                // console.log("Error");
                            }
                        });
                };
                return <Button id='BtInTableAdmin' disabled={params.row.StatusClaim.ID === 2} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222' }} >{<Done />}อนุมัติ</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'ไม่อนุมัติการเคลม',
            headerClassName: 'textClaimAdminfieldTable',
            cellClassName: 'textClaimAdminfieldTable',
            width: 120,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    let dataCheckSucceed = {
                        ID: params.id,
                        StatusClaim_ID: 3,
                    };
                    // console.log(dataCheckSucceed);

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
                                getListClaimOrders();
                                // console.log("Success");
                            } else {
                                errorAlert();
                                // console.log("Error");
                            }
                        });


                    // console.log(params.row.Statetus);

                };
                return <Button id='BtInTableAdmin' disabled={params.row.StatusClaim.ID === 3} variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Clear />} ไม่อนุมัติ </Button>;
                // return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />}ลบ</Button>;
            }
        },
    ];

    return (
        <Box
            id='claimAdminFrame'
        >
            <Typography id="textClaimShowTopic" sx={{marginLeft:"5.5rem"}}>
                <h1>
                    ระบบอนุมัติการเคลม
                </h1>

            </Typography>
            <div style={{ height: 400, width: '100%' }} >

                <div style={{ height: 400, width: '100%' }} >
                    <DataGrid
                        sx={{background: '#ffffff', color: 'ff0000' }}
                        rows={Claims}
                        columns={column}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row: UrgencyInterface) => row.ID}
                    />
                </div>

            </div>
        </Box >
    );
}

export default ClaimOrderForAdmin;