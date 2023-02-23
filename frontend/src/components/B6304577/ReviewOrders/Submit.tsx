import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs, { Dayjs } from 'dayjs';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';







function Submit({ userID, customerName, formDataRating, setFormDataRating, activeStep, setActiveStep, steps, checkedPaymentsAll }: any) {


    const [hover, setHover] = useState(-1);
    const { checkedPaymentID, data1, commentRating1, data2, commentRating2, customerID } = formDataRating
    const [checked, setChecked] = useState(false);

    const [message, setAlertMessage] = useState("");
    const [value, setValue] = useState<Dayjs | null>(dayjs);


    let [date, updateDate] = useState(new Date());



    // เราใช้ useEffect เพื่อจัดการบางอย่างเมื่อ component เราถูก insert หรือ remove ออกจาก UI tree
    useEffect(() => {
        // เราสร้าง setInterval เพื่อ udpate date state ค่าใหม่ทุกๆ 1 วินาที
        let timerID = setInterval(() => updateDate(new Date()), 1000);

        // เราต้อง return function สำหรับ clear interval ด้วยเมื่อ component ถูกเอาออกจาก UI tree
        return () => clearInterval(timerID);
    });

    const handleEditPage1 = () => {
        setActiveStep(1);
    };
    const handleEditPage2 = () => {
        setActiveStep(2);
    };
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleChange = (e: any) => {
        setChecked(e.target.checked);
    };

    const handleChangeSetDate = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    async function submit() {
        // Data ที่จะนำไปบันทึกลงในตาราง REVIEW
        let data = {
            CheckedPayment_ID: formDataRating.checkedPaymentID,
            Satisfaction_System_ID: formDataRating.data1,
            Review_Comment_System: formDataRating.commentRating1,
            Satisfaction_Technician_ID: formDataRating.data2,
            Review_Comment_Technician: formDataRating.commentRating2,
            TimestampReview: value?.format("YYYY-MM-DD").concat("T", date.toLocaleString().split(" ")[1], "+07:00"),
            // TimestampReview: date.toISOString().split("T")[0],
            //.concat("T", date.toLocaleString().split(" ")[1], "+07:00"),
            StatusReview: checked,
            Customer_ID: userID,
        };

        let dataCheckForShowReviewBT = {
            ID: checkedPaymentsAll.ID,
            CheckForShowReviewBT: true,
        };

        const apiUrl = "http://localhost:8080/CreateReview";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {

                    // Update Checked Payment

                    UpdateCheckForShowReviewBT(dataCheckForShowReviewBT);
                    formDataRating.checkedPaymentID = null;
                    formDataRating.data1 = null;
                    formDataRating.commentRating1 = ""
                    formDataRating.data2 = null;
                    formDataRating.commentRating2 = ""
                    setChecked(false);

                    // Update Checked Payment

                    // Alert การบันทึกสำเส็จ
                    Swal.fire({
                        title: 'บันทึกสำเร็จ',
                        text: 'ขอบคุณสำหรับการรีวิวครั้งนี้',
                        icon: 'success'
                    });
                    setTimeout(() => {
                        setActiveStep(0)
                    }, 1500)
                } else {
                    setAlertMessage(res.error)
                    // Alert การบันทึกไม่สำเส็จ
                    Swal.fire({
                        // Display Back-end text response 
                        title: 'บันทึกไม่สำเร็จ',
                        text: res.error.split(";")[0],
                        icon: 'error'
                    });
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
                    // console.log(res.data);
                }
            });
    };

    return (
        <Box id='boxstarFrame'>
            <Box id='reviewTextInfoFrame'>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography id='textInfo_01'>
                            รายการที่แจ้งซ่อม : {checkedPaymentsAll.Payment.OrderTech.ORDER.Reason}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography id='textInfo_02'>
                            วันที่แจ้งซ่อม : {dayjs(checkedPaymentsAll.Payment.OrderTech.ORDER.CreatedAt).format('DD/MM/YYYY HH:mm:ss')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography id='textInfo_03'>
                            ผู้ดำเนินการ : {customerName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography id='textInfo_04'>
                            วันที่รีวิว : {date.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Accordion id='accordionConfig'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography id='textAccordion'>
                        การประเมินความพึงพอใจเกี่ยวกับระบบ
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography id='textAccordion'>
                        หัวข้อที่ 1
                    </Typography>
                    <AccordionDetails>
                        <Rating name="read-only" value={data1} readOnly size="large" sx={{ alignItems: "center" }} />
                    </AccordionDetails>

                    <Typography id='textAccordion'>
                        ช่วยบอกความพึงพอใจกับเรา
                    </Typography>
                    <AccordionDetails>
                        <Typography id='textAccordion'>
                            : {commentRating1}
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 2 }}
                            size='small'
                            onClick={handleEditPage1}
                        >
                            แก้ไข
                        </Button>
                    </AccordionDetails>
                </AccordionDetails>
            </Accordion>
            <Accordion id='accordionConfig'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography id='textAccordion'>
                        การประเมินความพึงพอใจช่างที่ซ่อม
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography id='textAccordion'>
                        หัวข้อที่ 2
                    </Typography>
                    <AccordionDetails>
                        <Rating name="read-only" value={data2} readOnly size="large" />
                    </AccordionDetails>
                    <Typography id='textAccordion'>
                        ช่วยบอกความพึงพอใจกับเรา
                    </Typography>
                    <AccordionDetails>
                        <Typography id='textAccordion'>
                            : {commentRating2}
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 2 }}
                            size='small'
                            onClick={handleEditPage2}
                        >
                            แก้ไข
                        </Button>
                    </AccordionDetails>
                </AccordionDetails>
            </Accordion>
            <Box id='reviewTextIndatetimeFrame'>
                <Typography id='textDatetime'>
                    วันที่รีวิว
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        showToolbar={false}
                        onChange={(newValue) => setValue(newValue)}
                        value={value}
                        renderInput={(params) => <TextField {...params} />}
                        componentsProps={{
                            actionBar: {
                                actions: ['today'],
                            },
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <Box sx={{marginTop:'10px'}}>
                <FormGroup>
                    <FormControlLabel
                        className='textCheck'
                        sx={{ color: "#ffffff", paddingBottom: 5 }}
                        label="ตรวจสอบความถูกต้องเรียบร้อยแล้ว"
                        labelPlacement="end"
                        control={<Checkbox defaultChecked
                            checked={checked}
                            onChange={handleChange}
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }} />}
                    />
                </FormGroup>
            </Box>

            <Container
                maxWidth="md"
                sx={{ marginTop: 5 }}
            >
                <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Button
                                id='textInBt'
                                variant="contained"
                                fullWidth
                                onClick={handleBack}
                                color="error"
                                sx={{ mr: 1, backgroundColor: "#E96479" }}
                            >
                                กลับ
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                id='textInBt'
                                variant="contained"
                                fullWidth
                                onClick={activeStep === steps.length ? submit : handleNext}
                                color="secondary"
                                sx={{ backgroundColor: "#3F979B" }}
                            >
                                {activeStep === steps.length ? 'บันทึก' : 'ถัดไป'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{ width: '100%', marginTop: 5, marginBottom: 1 }}>
                <Stepper activeStep={activeStep - 1} alternativeLabel>
                    {steps.map((label: any) => (
                        <Step
                            key={label}
                            sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: 'secondary.dark', // circle color (COMPLETED)
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'grey.500', // Just text label (COMPLETED)
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: 'secondary.main', // circle color (ACTIVE)
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: 'common.white', // Just text label (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: 'common.white', // circle's number (ACTIVE)
                                },
                            }}
                        >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Box>
    );

} export default Submit