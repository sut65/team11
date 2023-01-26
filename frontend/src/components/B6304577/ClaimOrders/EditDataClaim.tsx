import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit} from '@mui/icons-material';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2


const successAlert = () => {
    Swal.fire({
        title: 'บันทึกสำเร็จ',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'บันทึกไม่สำเร็จ',
        text: 'You clicked the button.',
        icon: 'error'
    });
}



function EditContentClaimOrder({ activeStep, setActiveStep, claimID, setClaimID }: any) {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const [reviews, setReviews] = React.useState<any[]>([]);

    const [reviewID, setReviewID] = useState('');
    const [urgencyID, setUrgencyID] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [orderProblem, setOrderProblem] = useState('');
    const [claimComment, setClaimComment] = useState('');
    // const [statusClaimID, setStatusClaimID] = React.useState<any[]>([]);

    const [dataOrderID, setdataOrderID] = useState('');
    const [dataReason, setDataReason] = useState('');
    const [dataDateOrder, setdataDateOrder] = useState('');
    const [dataSolving, setDataSolving] = useState('');
    const [dataTechnician, setDataTechnician] = useState('');
    const [Claims, setClaims] = useState<any[]>([]);
    const [urgencys, setUrgencys] = useState<any[]>([]);
    // console.log(Claims);

    // console.log(reviews);

    const handleInputChangeclaimComment = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EditContentClaimOrder;
        const { value } = event.target;
        setClaims({ ...Claims, [id]: value });
        setClaimComment(value);
    };
    const handleInputChangeorderProblem = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EditContentClaimOrder;
        const { value } = event.target;
        setClaims({ ...Claims, [id]: value });
        setOrderProblem(value);
    };
    const onChangeUrgencys = (event: SelectChangeEvent) => {
        setUrgencyID(event.target.value as string);
    };
    const handleBack = () => {
        setActiveStep(0);
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
                }
            });
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
                }
            });
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

                }
            });
    };
    //function Search Edit
    const getEditDataClaim = async () => {
        const apiUrl1 = `http://localhost:8080/GetClaimOrder/${claimID}`;
        const requestOptions1 = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl1, requestOptions1)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    setReviewID(res.data.Review_ID);
                    setDataReason(res.data.Review.Checked_payment.Payment.PayTech.OrderTech.ORDER.Reason);
                    setdataDateOrder(res.data.Review.Checked_payment.Payment.PayTech.OrderTech.ORDER.Date_time)
                    setdataOrderID(res.data.Review.Checked_payment.Payment.PayTech.OrderTech.ORDER.ID)
                    setDataSolving(res.data.Review.Checked_payment.Payment.PayTech.OrderTech.Solving)
                    setDataTechnician(res.data.Review.Checked_payment.Payment.PayTech.OrderTech.Technician.Name)

                    setOrderProblem(res.data.OrderProblem);
                    setClaimComment(res.data.Claim_Comment);
                }
            });
    }

    useEffect(() => {
        getReview();
        getUrgencyID();
        getListClaimOrders();

        getEditDataClaim();
    }, []);

    async function submitEdit() {
        // Data ที่จะนำไปอัพเดทข้อมูลลงในตาราง REVIEW
        let data = {
            ID: claimID,
            Review_ID: reviewID,
            Urgency_ID: urgencyID,
            ClaimTime: date,
            OrderProblem: orderProblem,
            Claim_Comment: claimComment,
            StatusClaim_ID: 1,
        };
        console.log(data);
        const apiUrl = "http://localhost:8080/UpdateClaimOrder";
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    successAlert();
                    setTimeout(() => {
                        setActiveStep(0)
                    }, 1500)
                    console.log("Success");
                } else {
                    errorAlert();
                    console.log("Error");
                }
            });
    };


    async function submit() {
        // Data ที่จะนำไปบันทึกลงในตาราง REVIEW
        let data = {
            Review_ID: reviewID,
            Urgency_ID: urgencyID,
            ClaimTime: date,
            OrderProblem: orderProblem,
            Claim_Comment: claimComment,
            StatusClaim_ID: 1,
        };
        // console.log(data);
        const apiUrl = "http://localhost:8080/CreateClaimOrder";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    successAlert();
                    getListClaimOrders();
                    console.log("Success");
                } else {
                    errorAlert();
                    console.log("Error");
                }
            });
        let dataCheckSucceed = {
            ID: reviewID,
            CheckSucceed: true,
        };
        console.log(dataCheckSucceed);

        const apiUrlCheckSucceed = "http://localhost:8080/UpdateReviewINClaimOrder";
        const requestOptionsCheckSucceed = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataCheckSucceed),
        };
        fetch(apiUrlCheckSucceed, requestOptionsCheckSucceed)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Success");
                } else {
                    console.log("Error");
                }
            });
    };

    const column: GridColDef[] = [
        {
            field: 'action1',
            headerName: 'แก้ไข',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    // console.log(params.id);
                };
                return <Button disabled={params.row.StatusClaim.ID !== 1} variant="contained" onClick={handleClick} sx={{ cursor: 'pointer', color: 'ff3222' }} >{<Edit />}แก้ไข</Button>;
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
                                successAlert();
                                getListClaimOrders();
                                console.log("Success");
                            } else {
                                errorAlert();
                                console.log("Error");
                            }
                        });

                    // console.log(params.row.Statetus);

                };
                return <Button disabled={params.row.StatusClaim.ID !== 1} variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />} ลบ </Button>;
                // return <Button variant="contained" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Delete />}ลบ</Button>;
            }
        },
        {
            field: 'Checked_payment',
            headerName: 'รายการซ่อม',
            width: 150,
            renderCell: params => {
                return <div>ll</div>
            }
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
            field: 'Customer_ID',
            headerName: 'ลูกค้า',
            width: 200,
            renderCell: params => {
                // console.log(params.row.Checked_payment.Customer.Name);

                return <div>ll</div>
            }
        },


    ];

    return (
        <Paper
            sx={{
                backgroundColor: "#182e3e",
                height: '1500px',
                paddingTop: 20
            }} >
            <Container sx={{ background: "#ffffff" }}>



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
                                value={dataReason}
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
                                    id="demo-select-small"
                                    value={urgencyID}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    onChange={onChangeUrgencys}
                                >
                                    <MenuItem value="">
                                        กรุณาเลือกโซน
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
                                onClick={handleBack}>
                                กลับ
                            </Button>

                        </Grid>
                        <Grid item xs={4} sx={{ marginTop: 10 }}>
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={submitEdit}
                            >
                                อัพเดตข้อมูล
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



        </Paper>
    );
}

export default EditContentClaimOrder;