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
import { Link as RouterLink, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit, Report } from '@mui/icons-material';
import { Box, Rating } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import "./review.css"


function refreshPage() {
    window.location.reload();
}

const successAlert = async () => {
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


function Content({ userID, setActiveStep, activeStep, setReviewsID, formDataRating, setFormDataRating, setCheckedPaymentsAll }: any) {
    const [reviews, setReviews] = useState<any[]>([]);
    const [checkedPayments, setCheckedPayments] = useState<any[]>([]);
    const [checkReviewButton, setCheckReviewButton] = useState<any[]>([]);

    console.log(userID);





    const { checkedPaymentID, customerID } = formDataRating

    reviews.map((i) => checkReviewButton.push(i.CheckedPayment_ID))


    const handleStart = () => {
        setActiveStep(activeStep + 1);
    };

    //function fethch data จาก backend

    const getReview = async () => {
        const apiUrl = `http://localhost:8080/ListReviews_filter_by_customer/${userID}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setReviews(res.data)
                }
            });
    };
    const getCheckedPayment = async () => {
        const apiUrl = `http://localhost:8080/ListCheckedPayment_filter_by_customer/${userID}`;
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

    const UpdateCheckForShowReviewBT = async (dataCheckForShowReviewBT: any) => {
        const apiUrl = "http://localhost:8080/UpdateCheckForShowReviewBT";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataCheckForShowReviewBT),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
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
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    console.log(params.row);
                    setActiveStep(activeStep + 1);
                    setCheckedPaymentsAll(params.row)
                    setFormDataRating({ ...formDataRating, checkedPaymentID: params.id, customerID: params.row.CustomerID }) //รอระบบล็อคอินจะสามารถเรียก CustomerID จากหน้าlogin

                };

                console.log(params.row.CheckForShowReviewBT);



                return <Button id='textBtInTableReview_checkedPayment' disabled={params.row.CheckForShowReviewBT === true} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} >{<Edit />}รีวิว</Button>;
            }
        },
        {
            field: 'Product_ID',
            headerName: 'รายการซ่อม',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Payment.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'OrderTech',
            headerName: 'วิธีซ่อม',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Payment.OrderTech.Solving}</div>
            }
        },
        {
            field: 'Technician',
            headerName: 'ช่างผู้รับผิดชอบงาน',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: params => {


                return <div>{params.row.Payment.OrderTech.Technician.Name}</div>
            }
        },
        {
            field: 'CustomerID',
            headerName: 'ลูกค้า',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Payment.Customer.Name}</div>
            }
        },
        {
            field: 'Status_ID',
            headerName: 'สถานะ',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 180,
            renderCell: params => {
                return <div>{params.row.Status_check.Status_name}</div>
            }

        },
    ];

    const columnReviews: GridColDef[] = [
        {
            field: 'action_Edit',
            headerName: 'แก้ไข',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    setActiveStep(4);
                    setReviewsID(params.id);
                    console.log(params.row);
                };
                return <Button id='textBtInTableReview_checkedPayment' disabled={params.row.CheckDisableBtEditAndDel === true} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} >{<Edit />}แก้ไข</Button>;
            }
        },
        {
            field: 'action_delete',
            headerName: 'ลบ',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'delete');

                    let data = {
                        ID: params.id
                    };

                    let dataCheckForShowReviewBT = {
                        ID: params.row.CheckedPayment_ID,
                        CheckForShowReviewBT: false,
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
                                UpdateCheckForShowReviewBT(dataCheckForShowReviewBT);
                                setTimeout(() => {
                                    getCheckedPayment();
                                    getReview();
                                }, 1500)

                                successAlert();

                                console.log("Success");
                            } else {
                                errorAlert();
                                console.log("Error");
                            }
                        });
                };
                return <Button id='textBtInTableReview_checkedPayment' disabled={params.row.CheckDisableBtEditAndDel === true} variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer', borderRadius: '25px' }} >{<Delete />} ลบ </Button>;

            }
        },
        {
            field: 'action_Claim',
            headerName: 'Claim',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 180,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                console.log(params.row.Checked_payment.Payment.OrderTech.ORDER.StateID)
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');

                };
                if (params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 5 ||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 6||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 7) {
                    return <Button id='textBtInTableReview_checkedPayment' variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/ShowClaim" >{<Report />}Show Claim</Button>;
                } else if (params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 8 ||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 9||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 10) {
                    return <Button id='textBtInTableReview_checkedPayment' disabled={true} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/ShowClaim" >{<Report />}Claim</Button>;
                }else {
                    return <Button id='textBtInTableReview_checkedPayment' variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/ContentClaimOrder" >{<Report />}Claim</Button>;
                }

            }
        },
        {
            field: 'action_Refund',
            headerName: 'Refund',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 180,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    console.log(params.row)
                    localStorage.setItem("localOrderID", params.row.Checked_payment.Payment.OrderTech.ORDER.ID);
                };
                
                if (params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 8 ||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 9||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 10) {
                    return <Button id='textBtInTableReview_checkedPayment' variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/RefundCreate" >{<Report />}Show Refund</Button>;
                } else if (params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 5 ||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 6||params.row.Checked_payment.Payment.OrderTech.ORDER.StateID === 7) {
                    return <Button id='textBtInTableReview_checkedPayment' disabled={true} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/RefundCreate" >{<Report />}Refund</Button>;
                }else {
                    return <Button id='textBtInTableReview_checkedPayment' variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/RefundCreate" >{<Report />}Refund</Button>;
                }
            }
        },
        {
            field: 'Checked_payment',
            headerName: 'รายการซ่อม',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 150,
            renderCell: params => {
                return <div>{params.row.Checked_payment.Payment.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'Satisfaction_System_ID',
            headerName: 'ระดับความพึงพอใจต่อระบบ',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: renderRating,

        },
        {
            field: 'Review_Comment_System',
            headerName: 'ความคิดเห็นต่อระบบซ่อมคอมพิวเตอร์',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200
        },
        {
            field: 'Satisfaction_Technician_ID',
            headerName: 'ระดับความพึงพอใจต่อช่างที่ซ่อม',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: renderRating,
        },
        {
            field: 'Review_Comment_Technician',
            headerName: 'ความคิดเห็นต่อช่างซ่อม',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200
        },
        {
            field: 'Timestamp',
            headerName: 'วันที่',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
        {
            field: 'StatusReview',
            headerName: 'สถานะ',
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
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
            headerClassName: 'textReviewfieldTable',
            cellClassName: 'textReviewfieldTable',
            width: 200,
            renderCell: params => {

                return <div>{params.row.Customer.Name}</div>
            }
        },


    ];


    return (
        <Box>
            <Box id='reviewShowFrame'>
                <Typography id='textReviewTopic'>
                    ระบบประเมินความพึงพอใจ
                </Typography>
                <Typography id='textReviewSubTopic'>
                    กรุณากรอกแบบประเมินความพึงพอใจ
                </Typography>
                <div style={{ height: 400, width: '100%' }} >
                    <DataGrid
                        sx={{ background: '#ffffff', color: 'ff0000', borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}
                        rows={checkedPayments}
                        columns={columnCheckPayments}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row: ReviewInterface) => row.ID}
                    />
                </div>
                <Typography id='textReviewTopic'>
                    การรีวิวสำเร็จ
                </Typography>
                <Typography id='textReviewSubTopic'>
                    ขอบคุณสำหรับการรีวิวครั้งนี้
                </Typography>

                <div style={{ height: 400, width: '100%' }} >
                    <DataGrid
                        sx={{ background: '#ffffff', color: 'ff0000', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px' }}
                        rows={reviews}
                        columns={columnReviews}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        getRowId={(row: ReviewInterface) => row.ID}

                    // checkboxSelection
                    />
                </div>

            </Box>
        </Box>





    );

} export default Content