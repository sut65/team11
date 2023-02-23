import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import ContentClaimOrder from './ContentClaim';
import { Link as RouterLink} from "react-router-dom";


function CreateClaim() {
    const [reviews, setReviews] = React.useState<any[]>([]);
    const userID = parseInt(localStorage.getItem("uid") + "");

    const [orderID, setOrderID] = useState('');
    const [reviewID, setReviewID] = useState('');
    const [urgencyID, setUrgencyID] = useState('');
    const [date, setDate] = useState<Dayjs | null>(dayjs);
    const [orderProblem, setOrderProblem] = useState('');
    const [claimComment, setClaimComment] = useState('');

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
        setUrgencyID('');
        setOrderProblem('');
        setClaimComment('');
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
                        // console.log("itemitemitemitemitem", item)
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

        // console.log(dataUpdateOrderStateForClaimOrder);
        const apiUrl = "http://localhost:8080/CreateClaimOrder";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                // console.log(res);
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

        <Box id='claimCreatFrame'>
            <Box
                sx={{ flexGrow: 1, padding: 5, marginBottom: 10 }}
            >
                <Typography id='textClaimCreateTopic1'>
                    ระบบบันทึกรายละเอียดการเคลม
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography id='textClaimCreateTopic2'>
                            รายละเอียดการซ่อม
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography id='textClaimCreateTopic3'>
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
                        <Typography id='textClaimCreateTopic3'>
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
                        <Typography id='textClaimCreateTopic3'>
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
                        <Typography id='textClaimCreateTopic3'>
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
                        <Typography id='textClaimCreateTopic2'>
                            กรุณากรอกรายละเอียดในการเคลม
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id='textClaimCreateTopic3'>
                            ปัญหาที่พบ
                        </Typography>
                        <TextField
                            id='textfieldClaimCreate1'
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
                        <Typography id='textClaimCreateTopic3'>
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
                        <Typography id='textClaimCreateTopic3'>
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
                        <Typography id='textClaimCreateTopic3'>
                            หมายเหตุเพิ่มเติม
                        </Typography>
                        <TextField
                            id='textfieldClaimCreate2'
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
                            id='BtInClaimCreate'
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
                            id='BtInClaimCreate'
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
                            id='BtInClaimCreate'
                            variant="contained"
                            color="error"
                            onClick={handleClear}>
                            เคลียร์
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </Box>


    );

} export default CreateClaim