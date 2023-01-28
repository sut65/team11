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
import dayjs from 'dayjs';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import style from "./style.module.css";



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


function Submit({ formDataRating, setFormDataRating, activeStep, setActiveStep, steps ,checkedPaymentsAll}: any) {


    const [hover, setHover] = React.useState(-1);
    const { checkedPaymentID, data1, commentRating1, data2, commentRating2, customerID } = formDataRating
    const [checked, setChecked] = useState(false);
    // console.log(checkedPaymentID);

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

        console.log('The checkbox was toggled');

    };

    async function submit() {
        // Data ที่จะนำไปบันทึกลงในตาราง REVIEW
        let data = {
            CheckedPayment_ID: formDataRating.checkedPaymentID,
            Satisfaction_System_ID: formDataRating.data1,
            Review_Comment_System: formDataRating.commentRating1,
            Satisfaction_Technician_ID: formDataRating.data2,
            Review_Comment_Technician: formDataRating.commentRating2,
            TimestampReview: date.toISOString().split("T")[0].concat("T", date.toLocaleString().split(" ")[1], "+07:00"),
            StatusReview: checked,
            Customer_ID: formDataRating.customerID,
        };
        console.log(data);
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


    return (
        <Container
            maxWidth="md"
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography sx={{ marginTop: 10, color: "#ffffff" }}>
                            รายการที่แจ้งซ่อม : {checkedPaymentsAll.Payment.OrderTech.ORDER.Reason}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ marginTop: 10, color: "#ffffff" }}>
                            วันที่แจ้งซ่อม : {dayjs(checkedPaymentsAll.Payment.OrderTech.ORDER.Date_time).format('DD/MM/YYYY HH:mm:ss ')}
                        </Typography> 
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ marginTop: 4, color: "#ffffff" }}>
                            ผู้ดำเนินการ :
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ marginTop: 4, color: "#ffffff" }}>
                            วันที่รีวิว : {date.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Accordion sx={{ marginTop: 12, background: "#00556c" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={style.textReview}>
                        การประเมินความพึงพอใจเกี่ยวกับระบบ
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={style.textReview}>
                        หัวข้อที่ 1
                    </Typography>
                    <AccordionDetails>
                        <Rating name="read-only" value={data1} readOnly size="large" sx={{alignItems:"center"}}/>
                    </AccordionDetails>

                    <Typography className={style.textReview} sx={{ marginTop: 2}}>
                        ช่วยบอกความพึงพอใจกับเรา
                    </Typography>
                    <AccordionDetails>
                        <Typography className={style.textReview}>
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
            <Accordion sx={{ marginBottom: 5, background: "#00556c" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={style.textReview}>
                        การประเมินความพึงพอใจช่างที่ซ่อม
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className={style.textReview}>
                        หัวข้อที่ 2
                    </Typography>
                    <AccordionDetails>
                        <Rating name="read-only" value={data2} readOnly size="large" />
                    </AccordionDetails>
                    <Typography className={style.textReview} sx={{ marginTop: 2 }}>
                        ช่วยบอกความพึงพอใจกับเรา
                    </Typography>
                    <AccordionDetails>
                        <Typography className={style.textReview}>
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
            <Box>
                <FormGroup>
                    <FormControlLabel
                        sx = {{color:"#ffffff",paddingBottom:5}}
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
            <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            color="inherit"
                            disabled={activeStep === 1}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            กลับ
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={activeStep === steps.length ? submit : handleNext}
                            color={activeStep === steps.length ? "success" : "inherit"}
                        >
                            {activeStep === steps.length ? 'บันทึก' : 'ถัดไป'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

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
        </Container>
    );

} export default Submit