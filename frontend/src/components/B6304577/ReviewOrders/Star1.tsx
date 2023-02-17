import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import style from "./style.module.css";





function Star1({ customerName, formDataRating, setFormDataRating, activeStep, setActiveStep, steps, checkedPaymentsAll }: any) {
    const [hover, setHover] = React.useState(-1);
    // console.log(checkedPaymentsAll);


    const { data1, commentRating1 } = formDataRating
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleSubmit = () => {
        console.log("Submit");

    };

    let [date, updateDate] = useState(new Date());

    // เราใช้ useEffect เพื่อจัดการบางอย่างเมื่อ component เราถูก insert หรือ remove ออกจาก UI tree
    useEffect(() => {
        // เราสร้าง setInterval เพื่อ udpate date state ค่าใหม่ทุกๆ 1 วินาที
        let timerID = setInterval(() => updateDate(new Date()), 1000);

        // เราต้อง return function สำหรับ clear interval ด้วยเมื่อ component ถูกเอาออกจาก UI tree
        return () => clearInterval(timerID);
    });

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
                            วันที่แจ้งซ่อม : {dayjs(checkedPaymentsAll.Payment.OrderTech.ORDER.Date_time).format('DD/MM/YYYY HH:mm:ss')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ marginTop: 4, color: "#ffffff" }}>
                            ผู้ดำเนินการ : {customerName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{ marginTop: 4, color: "#ffffff" }}>
                            วันที่รีวิว : {date.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                className={style.boxshadow}
                sx={{ marginTop: 10 }}

            >
                <Typography  className={style.mainToptic}>
                    <h2>
                        เนื้อหาบนเว็บไซต์มีความเหมาะสม และถูกต้อง
                    </h2>
                </Typography >
                <Typography  className={style.subToptic}>

                    <h6>
                        รวมแบ่งปันประสบการณ์ การบริการ
                        โดยให้คะแนนความพึงพอใจ
                    </h6>
                </Typography>

                <Rating
                    className={style.star}
                    size="large"
                    value={formDataRating.data1}
                    sx={{
                        fontSize: "6rem",
                        alignItems: 'center',

                    }}
                    onChange={(event, newValue) => {
                        setFormDataRating({ ...formDataRating, data1: newValue });
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                <br />
                <Container maxWidth="lg" >
                    <Typography sx={{ color: "#ffffff", textAlign: "left" }}>
                        <h4>
                            ช่วยบอกความพึงพอใจกับเรา
                        </h4>
                    </Typography>
                    <TextField
                        id="commentRating1"
                        multiline
                        rows={3}
                        fullWidth
                        variant="filled"
                        helperText="เช่น การให้บริการยอดเยี่ยม"
                        sx={{ marginBottom: 5, input: { color: 'red' } }}
                        inputProps={{ style: { color: "#ffffff" } }}
                        defaultValue=""
                        value={commentRating1}
                        onChange={(event) =>
                            setFormDataRating(({ ...formDataRating, commentRating1: event.target.value }))}

                    />
                </Container>
            </Box>
            <Container
                maxWidth="md"
                sx={{ marginTop: 5 }}
            >
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
                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                color="inherit"
                            >
                                {activeStep === steps.length - 1 ? 'บันทึก' : 'ถัดไป'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{ width: '100%', marginTop: 5, marginBottom: 5 }}>
                <Stepper activeStep={activeStep - 1} alternativeLabel className={style.MuiStepLabel_label}>
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
                            }}>
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <br />
        </Container>
    );

} export default Star1