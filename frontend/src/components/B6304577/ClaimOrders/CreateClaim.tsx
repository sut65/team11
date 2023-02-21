import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit, Report } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { Container, FormControl, Rating, Select, SelectChangeEvent } from '@mui/material';
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
import ContentClaimOrder from './ContentClaim';
import { Link as RouterLink, Route } from "react-router-dom";


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


function CreateClaim() {
    const [reviews, setReviews] = React.useState<any[]>([]);
    const userID = parseInt(localStorage.getItem("uid") + "");

    const [orderID, setOrderID] = useState('');
    const [reviewID, setReviewID] = useState('');
    const [urgencyID, setUrgencyID] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs);
    const [orderProblem, setOrderProblem] = useState('');
    const [claimComment, setClaimComment] = useState('');
    // const [statusClaimID, setStatusClaimID] = React.useState<any[]>([]);

    const [dataOrderID, setdataOrderID] = useState('');
    const [dataDateOrder, setdataDateOrder] = useState('');
    const [dataReason, setDataReason] = useState('');
    const [dataSolving, setDataSolving] = useState('');
    const [dataTechnician, setDataTechnician] = useState('');
    const [Claims, setClaims] = useState<any[]>([]);
    const [urgencys, setUrgencys] = useState<any[]>([]);
    // console.log(orderProblem);


    const handleInputChangeclaimComment = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof ContentClaimOrder;
        const { value } = event.target;
        setClaims({ ...Claims, [id]: value });
        setClaimComment(value);
    };
    const handleInputChangeorderProblem = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof ContentClaimOrder;
        const { value } = event.target;
        setClaims({ ...Claims, [id]: value });
        setOrderProblem(value);
    };
    const onChangeUrgencys = (event: SelectChangeEvent) => {
        setUrgencyID(event.target.value as string);
    };

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
    const getUrgencyID = async () => {
        const apiUrl = "http://localhost:8080/GetListUrgency";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setUrgencys(res.data);
                    // console.log(res.data);

                    // setReviews(res.data)
                }
            });
    };
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
                    res.data.map((item: any) => {
                        console.log("itemitemitemitemitem",item)
                        setReviewID(item.ID);
                        setDataReason(item.Checked_payment.Payment.OrderTech.ORDER.Reason);
                        setdataOrderID(item.Checked_payment.Payment.OrderTech.ORDER.ID);
                        setdataDateOrder(item.Checked_payment.Payment.OrderTech.TimeOut);
                        setDataSolving(item.Checked_payment.Payment.OrderTech.Solving);
                        setDataTechnician(item.Checked_payment.Payment.OrderTech.Technician.Name);
                        
                    })
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
                    console.log("Success");
                } else {
                    console.log("Error");
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
                    console.log(res.data);
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
                    console.log(res.data);
                }
            });
    };

    async function submit() {
        // Data ที่จะนำไปบันทึกลงในตาราง REVIEW
        let data = {
            Review_ID: parseInt(reviewID),
            Urgency_ID: urgencyID,
            ClaimTime: date,
            OrderProblem: orderProblem,
            Claim_Comment: claimComment,
            StatusClaim_ID: 1,
        };

        let dataCheckBtReport = {
            ID: parseInt(reviewID),
            CheckSucceed: true,
        };

        let dataCheckBtEditAndDelInReview = {
            ID: parseInt(reviewID),
            CheckDisableBtEditAndDel: true,
        };

        let dataUpdateOrderStateForClaimOrder = {
            ID: parseInt(dataOrderID),
            StateID: 5,
        };

        console.log(dataUpdateOrderStateForClaimOrder);
        const apiUrl = "http://localhost:8080/CreateClaimOrder";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    // Alert การบันทึกสำเส็จ
                    UpdateCheckBtReport(dataCheckBtReport);
                    UpdateCheckBtEditAndDelInReview(dataCheckBtEditAndDelInReview);
                    UpdateOrderStateForClaimOrder(dataUpdateOrderStateForClaimOrder);
                    setTimeout(() => {
                        handleClear();
                        window.location.href = "/RankingForm";
                        
                    }, 1500)
                    Swal.fire({
                        title: 'บันทึกสำเร็จ',
                        text: 'เรารับการรายงานของคุณไว้แล้ว',
                        icon: 'success'
                    });

                    handleClear();
                    // setActiveStep(0)

                } else {
                    Swal.fire({
                        // Display Back-end text response 
                        title: 'บันทึกไม่สำเร็จ',
                        text: res.error.split(";")[0],
                        icon: 'error'
                    });
                }
            });
    };
    useEffect(() => {
        getReview();
        getUrgencyID();
        // getListClaimOrders();

    }, []);


    return (

        <Container maxWidth="lg" sx={{ backgroundColor: "#FFFFFF" }}>
            <Box
                sx={{ flexGrow: 1, padding: 5, marginBottom: 10 }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            <h1>
                                รายละเอียดการซ่อม
                            </h1>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >
                            เลขที่แจ้งซ่อม
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={dataOrderID + " : " + dataReason}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography >
                            วันที่แจ้งซ่อม
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={dayjs(dataDateOrder).format('DD/MM/YYYY HH:mm:ss')}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: 5 }}>
                        <Typography >
                            วิธีซ่อม
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={dataSolving}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: 5 }}>
                        <Typography >
                            ช่างผู้ซ่อม
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={dataTechnician}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 10 }}>
                        <Typography>
                            <h1>
                                กรุณากรอกรายละเอียดในการเคลม
                            </h1>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography >
                            ปัญหาที่พบ
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={orderProblem}
                            defaultValue=""
                            onChange={handleInputChangeorderProblem}
                        />
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: 15 }}>
                        <Typography >
                            ระดับความเร่งด่วน
                        </Typography>
                        <FormControl fullWidth>
                            <Select
                                id="Urgencys"
                                value={urgencyID}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={onChangeUrgencys}
                            >
                                <MenuItem value="">
                                    กรุณาเลือกระดับความเร่งด่วน
                                </MenuItem>
                                {urgencys.map((item: any) => (
                                    <MenuItem value={item.ID} key={item.ID}>{item.Urgency_Type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: 15 }}>
                        <Typography >
                            วันที่แจ้งเคลม
                        </Typography>
                        <FormControl fullWidth variant="outlined">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={date}
                                    onChange={(newValue) => { setDate(newValue); }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: 5 }}>
                        <Typography >
                            หมายเหตุเพิ่มเติม
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={claimComment}
                            defaultValue=""
                            onChange={handleInputChangeclaimComment}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 10 }}>
                        <Button 
                        variant="contained" 
                        color="secondary"
                        component={RouterLink} 
                        to="/RankingForm"
                        >
                            กลับ
                        </Button>

                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 10 }}>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={submit}
                        >
                            รายงานปัญหาหลังการซ่อม
                        </Button>
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 10 }} style={{ float: "right" }}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClear}>
                            เคลียร์
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </Container>


    );

} export default CreateClaim