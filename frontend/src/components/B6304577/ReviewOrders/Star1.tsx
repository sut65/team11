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
import { OutlinedInputProps } from '@mui/material';





function Star1({ customerName, formDataRating, setFormDataRating, activeStep, setActiveStep, steps, checkedPaymentsAll }: any) {
    const [hover, setHover] = React.useState(-1);
    const { data1, commentRating1 } = formDataRating
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleSubmit = () => {
        // console.log("Submit");

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

        <Box
            id='boxstarFrame'
        >
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

            <Box
                id='reviewStarFrame'
                sx={{ marginTop: 10 }}

            >
                <Typography id='textStarTopic'>
                    เนื้อหาบนเว็บไซต์มีความเหมาะสม และถูกต้อง
                </Typography >
                <Typography id='textStarSubTopic'>
                    รวมแบ่งปันประสบการณ์ การบริการ
                    โดยให้คะแนนความพึงพอใจ
                </Typography>

                <Rating
                    id='rating'
                    value={formDataRating.data1}
                    onChange={(event, newValue) => {
                        setFormDataRating({ ...formDataRating, data1: newValue });
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                <br />
                <Container maxWidth="lg" >
                    <Typography id='textStarComment'>
                        ช่วยบอกความพึงพอใจกับเรา
                    </Typography>
                    <TextField
                        id="textfieldComment"
                        multiline
                        rows={3}
                        fullWidth
                        variant="standard"
                        InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                        defaultValue=""
                        value={commentRating1}
                        onChange={(event) =>
                            setFormDataRating(({ ...formDataRating, commentRating1: event.target.value }))}

                    />
                    <Typography id='textStarCommentHelp'>
                        เช่น การให้บริการยอดเยี่ยม
                    </Typography>
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
                                id='textInBt'
                                variant="contained"
                                fullWidth
                                onClick={handleBack}
                                color="error"
                                sx={{ mr: 1 ,backgroundColor:"#E96479"}}
                            >
                                กลับ
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                id='textInBt'
                                variant="contained"
                                fullWidth
                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                                color="primary"
                                sx={{backgroundColor:"#3795BD"}}
                            >
                                {activeStep === steps.length - 1 ? 'บันทึก' : 'ถัดไป'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box sx={{ width: '100%', marginTop: 5, marginBottom: 5 }}>
                <Stepper activeStep={activeStep - 1} alternativeLabel >
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
        </Box>
    );

} export default Star1