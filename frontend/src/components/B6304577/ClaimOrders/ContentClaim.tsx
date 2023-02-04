import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, Edit, Report } from '@mui/icons-material';
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

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    marginLeft: 50,
    marginRight: 50,
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function refreshPage() {
    window.location.reload();
}

function renderRating(params: GridRenderCellParams<number>) {
    return <Rating readOnly value={params.value} />;
}


function ContentClaimOrder({ activeStep, setActiveStep, claimID, setClaimID }: any) {
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
    const [dataDateOrder, setdataDateOrder] = useState('');
    const [dataReason, setDataReason] = useState('');
    const [dataSolving, setDataSolving] = useState('');
    const [dataTechnician, setDataTechnician] = useState('');
    const [Claims, setClaims] = useState<any[]>([]);
    const [urgencys, setUrgencys] = useState<any[]>([]);
    // console.log(dataDateOrder);

    // console.log(reviews);

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
                    // console.log(res.data);

                    // setReviews(res.data)
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
                    // console.log(res.data);

                    // setReviews(res.data)
                }
            });
    };
    useEffect(() => {
        getReview();
        getUrgencyID();
        getListClaimOrders();

    }, []);

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
                console.log(res);
                if (res.data) {
                    // Alert การบันทึกสำเส็จ
                    Swal.fire({
                        title: 'บันทึกสำเร็จ',
                        text: 'เรารับการรายงานของคุณไว้แล้ว',
                        icon: 'success'
                    });
                    setTimeout(() => {
                        setActiveStep(0)
                    }, 1500)
                    let dataCheckSucceed = {
                        ID: reviewID,
                        CheckSucceed: true,
                    };

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
    const columnReviews: GridColDef[] = [
        {
            field: 'report',
            headerName: 'รายงานปัญหา',
            width: 120,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'delete');
                    // console.log(params.row.CheckSucceed);

                    // console.log(data);

                    const apiUrl = `http://localhost:8080/GetReview/${params.id}`;
                    const requestOptions = {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },

                    };
                    fetch(apiUrl, requestOptions)
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.data) {
                                // console.log(res.data);
                                setReviewID(res.data.ID);
                                setDataReason(res.data.Checked_payment.Payment.OrderTech.ORDER.Reason);
                                setdataDateOrder(res.data.Checked_payment.Payment.OrderTech.ORDER.Date_time)
                                setdataOrderID(res.data.Checked_payment.Payment.OrderTech.ORDER.ID)
                                setDataSolving(res.data.Checked_payment.Payment.OrderTech.Solving)
                                setDataTechnician(res.data.Checked_payment.Payment.OrderTech.Technician.Name)
                                console.log("Success");
                            } else {
                                console.log("Error");
                            }
                        });

                };
                return <Button disabled={params.row.CheckSucceed === true} variant="contained" color="error" onClick={handleClick} sx={{ cursor: 'pointer' }} >{<Report />} รายงาน </Button>;
            }
        },
        {
            field: 'Checked_payment',
            headerName: 'รายการซ่อม',
            width: 150,
            renderCell: params => {
                return <div>{params.row.Checked_payment.Payment.OrderTech.ORDER.Reason}</div>
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
                // console.log(params.row.Checked_payment.Customer.Name);

                return <div>{params.row.Checked_payment.Customer.Name}</div>
            }
        },


    ];
    const column: GridColDef[] = [
        {
            field: 'action1',
            headerName: 'แก้ไข',
            width: 100,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                const handleClick = () => {
                    params.api.setRowMode(params.id, 'edit');
                    setActiveStep(1);
                    setClaimID(params.id)
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
                return <div>{params.row.Review.Checked_payment.Payment.OrderTech.ORDER.Reason}</div>
            }
        },
        {
            field: 'OrderProblem',
            headerName: 'สาเหตุการเคลม',
            width: 220,

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
    ];

    return (
        <Paper
            sx={{
                backgroundColor: "#182e3e",
                height: '2000px',
                paddingTop: 20
            }} >



            <div style={{ height: 400, width: '100%' }} >

                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>
                            รายงานปัญหาหลังการซ่อม
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{ height: 400, width: '100%' }} >
                            <DataGrid
                                sx={{ marGinTop: 10, marginLeft: 5, marginRight: 5, background: '#ffffff', color: 'ff0000' }}
                                rows={reviews}
                                columns={columnReviews}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                getRowId={(row: ReviewInterface) => row.ID}
                            />
                        </div>
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
                                            id="demo-select-small"
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
                                    <Button variant="contained" color="secondary">
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
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>
                            ตรวจสอบสถานะการรายงานปัญหาหลังการซ่อม
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                </Accordion>
            </div>
        </Paper>
    );
}

export default ContentClaimOrder;