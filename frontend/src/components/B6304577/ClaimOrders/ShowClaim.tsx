import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink} from "react-router-dom";
import Button from '@mui/material/Button';
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import "./claim.css"


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

function ShowClaim() {
    const [reviews, setReviews] = React.useState<any[]>([]);
    const [Claims, setClaims] = useState<any[]>([]);
    const userID = parseInt(localStorage.getItem("uid") + "");

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
    const getListClaimOrders = async () => {
        const apiUrl = `http://localhost:8080/ListClaims_filter_by_customer/${userID}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setClaims(res.data);
                    // console.log("getListClaimOrders: ", res.data);

                    // setReviews(res.data)
                }
            });
    };
    const UpdateCheckBtReport = async (dataCheckBtReport: any) => {
        const apiUrlCheckSucceed = "http://localhost:8080/UpdateReviewINClaimOrder";
        const requestOptionsCheckSucceed = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataCheckBtReport),
        };
        fetch(apiUrlCheckSucceed, requestOptionsCheckSucceed)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    getReview();
                    // console.log("Success");
                } else {
                    // console.log("Error");
                }
            });
    };
    const UpdateCheckBtEditAndDelInReview = async (dataCheckBtEditAndDelInReview: any) => {
        const apiUrl = "http://localhost:8080/UpdateCheckBtEditAndDelInReview";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataCheckBtEditAndDelInReview),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // console.log(res.data);
                }
            });
    };

    const UpdateOrderStateForClaimOrder = async (dataUpdateOrderStateForClaimOrder: any) => {
        const apiUrl = "http://localhost:8080/UpdateOrderStateForClaimOrder";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataUpdateOrderStateForClaimOrder),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // console.log(res.data);
                }
            });
    };

    useEffect(() => {
        getReview();
        getListClaimOrders();

    }, []);


    const columnClaim: GridColDef[] = [
        {
            field: 'action1',
            headerName: 'แก้ไข',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    localStorage.setItem("claimID", params.row.ID);
                };
                return <Button id='textBtInTableShow' disabled={params.row.StatusClaim.ID !== 1} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222', borderRadius: '25px' }} component={RouterLink} to="/EditContentClaimOrder">{<Edit />}แก้ไข</Button>;
            }
        },
        {
            field: 'action2',
            headerName: 'ลบ',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'delete');
                    let data = {
                        ID: params.id
                    };
                    let dataCheckBtReport = {
                        ID: params.id,
                        CheckSucceed: false,
                    };

                    let dataCheckBtEditAndDelInReview = {
                        ID: params.id,
                        CheckDisableBtEditAndDel: false,
                    };

                    let dataUpdateOrderStateForClaimOrder = {
                        ID: parseInt(params.row.Review.Checked_payment.Payment.OrderTech.ORDER.ID),
                        StateID: 4,
                    };
                    // console.log("dataCheckBtReport : ", dataCheckBtReport);
                    // console.log("dataCheckBtEditAndDelInReview : ", dataCheckBtEditAndDelInReview);

                    const apiUrl = "http://localhost:8080/DeleteClaimOrder";
                    const requestOptions = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    };
                    fetch(apiUrl, requestOptions)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                UpdateCheckBtReport(dataCheckBtReport);
                                UpdateCheckBtEditAndDelInReview(dataCheckBtEditAndDelInReview);
                                UpdateOrderStateForClaimOrder(dataUpdateOrderStateForClaimOrder);
                                setTimeout(() => {
                                    getListClaimOrders();
                                    getReview();
                                    window.location.href = "/RankingForm";
                                }, 1500)

                                successAlert();
                                getListClaimOrders();
                                // console.log("Success");
                            } else {
                                errorAlert();
                                // console.log("Error");
                            }
                        });

                    // console.log(params.row.Statetus);

                };
                return <Button id='textBtInTableShow' disabled={params.row.StatusClaim.ID !== 1} variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer', borderRadius: '25px' }} >{<Delete />} ลบ </Button>;
                // return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />}ลบ</Button>;
            }
        },
        {
            field: 'Checked_payment',
            headerName: 'รายการซ่อม',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 150,
            renderCell: params => {
                return <div>{params.row.Review.Checked_payment.Payment.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'OrderProblem',
            headerName: 'สาเหตุการเคลม',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 220,

        },
        {
            field: 'Urgency_ID',
            headerName: 'ระดับความเร่งด่วน',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 200,
            renderCell: params => {
                return <div>{params.row.Urgency.Urgency_Type}</div>
            }
        },
        {
            field: 'Timestamp',
            headerName: 'วันที่',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 200,
            valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
        },
        {
            field: 'StatusReview',
            headerName: 'สถานะ',
            headerClassName: 'textClaimshowfieldTable',
            cellClassName: 'textClaimshowfieldTable',
            width: 200,
            renderCell: params => {

                return <div>{params.row.StatusClaim.StatusClaim_Type}</div>

            }
        },
    ];

    useEffect(() => {
        getReview();
    }, []);

    return (
        <Box id="claimShowFrame">
            <Typography id="textClaimShowTopic">
                <h1>
                    ระบบแสดงรายละเอียดการเคลม
                </h1>
            </Typography>
            <div style={{ height: 400, width: '100%' }} >
                <DataGrid
                    sx={{ marGinTop: 10, background: '#ffffff', color: 'ff0000', borderRadius: '25px' }}
                    rows={Claims}
                    columns={columnClaim}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row: ReviewInterface) => row.ID}

                />
            </div>
        </Box>


    );

} export default ShowClaim