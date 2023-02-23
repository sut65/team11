import * as React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Checkbox, FormControlLabel, FormGroup, OutlinedInputProps, Rating } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs'; //npm i dayjs
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import { ReviewInterface } from '../../../interfaces/ReviewUI';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const successAlert = () => {
    Swal.fire({
        title: 'อัพเดตข้อมูลสำเร็จ',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'อัพเดตข้อมูลไม่สำเร็จ',
        text: 'You clicked the button.',
        icon: 'error'
    });
}

function EditDataReview({ reviewsID, setActiveStep, userID }: any) {
    const [reviews, setReviews] = useState<Partial<ReviewInterface>>({});
    const [editDataReview_Rating_System, seteditDataReview_Rating_System] = useState<number | null>(0);
    const [editDataReview_Comment_System, seteditDataReview_Comment_System] = useState('');
    const [editDataReview_Rating_Technician, seteditDataReview_Rating_Technician] = useState<number | null>(0);
    const [editDataReview_Comment_Technician, seteditDataReview_Comment_Technician] = useState('');
    const [checkedID, setCheckedID] = useState('');

    const [value, setValue] = useState<Dayjs | null>(dayjs);
    const [checked, setChecked] = useState(false);


    let [date, updateDate] = useState(new Date());

    // เราใช้ useEffect เพื่อจัดการบางอย่างเมื่อ component เราถูก insert หรือ remove ออกจาก UI tree
    useEffect(() => {
        // เราสร้าง setInterval เพื่อ udpate date state ค่าใหม่ทุกๆ 1 วินาที
        let timerID = setInterval(() => updateDate(new Date()), 1000);

        // เราต้อง return function สำหรับ clear interval ด้วยเมื่อ component ถูกเอาออกจาก UI tree
        return () => clearInterval(timerID);
    });


    const handleInputChangeCommentSystem = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EditDataReview;
        const { value } = event.target;
        setReviews({ ...reviews, [id]: value });
        seteditDataReview_Comment_System(value);
    };

    const handleInputChangeCommentTechnician = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof EditDataReview;
        const { value } = event.target;
        setReviews({ ...reviews, [id]: value });
        seteditDataReview_Comment_Technician(value);
    };

    const handleBack = () => {
        setActiveStep(0)
    };

    const handleChange = (e: any) => {
        setChecked(e.target.checked);

    };
    const handleClear = () => {
        setCheckedID('');
        seteditDataReview_Rating_System(null);
        seteditDataReview_Comment_System('');
        seteditDataReview_Rating_Technician(null);
        seteditDataReview_Comment_Technician('');
    };

    async function submitEdit() {
        // Data ที่จะนำไปอัพเดทข้อมูลลงในตาราง REVIEW
        let data = {
            ID: reviewsID,
            CheckedPayment_ID: parseInt(checkedID),
            Satisfaction_System_ID: editDataReview_Rating_System,
            Review_Comment_System: editDataReview_Comment_System,
            Satisfaction_Technician_ID: editDataReview_Rating_Technician,
            Review_Comment_Technician: editDataReview_Comment_Technician,
            TimestampReview: value?.format("YYYY-MM-DD").concat("T", date.toLocaleString().split(" ")[1], "+07:00"),
            StatusReview: checked,
            Customer_ID: userID,
        };

        const apiUrl = "http://localhost:8080/UpdateReview";
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
                    handleClear();
                    setTimeout(() => {
                        setActiveStep(0)
                    }, 1500)
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

    //function Search Edit
    const getEditDataReview = async () => {
        const apiUrl1 = `http://localhost:8080/GetReview/${reviewsID}`;
        const requestOptions1 = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl1, requestOptions1)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {

                    setCheckedID(res.data.CheckedPayment_ID)
                    seteditDataReview_Rating_System(res.data.Satisfaction_System_ID);
                    seteditDataReview_Comment_System(res.data.Review_Comment_System);
                    seteditDataReview_Rating_Technician(res.data.Satisfaction_Technician_ID);
                    seteditDataReview_Comment_Technician(res.data.Review_Comment_Technician);
                }
            });
    }
    useEffect(() => {
        getEditDataReview();
    }, []);


    return (
        <Box id='boxstarFrame' >
            <Box id='reviewTextInfoFrame' >
                <Grid container >
                    <Grid item xs={12}>
                        <Typography id='textInfo_05'>
                            ระบบแก้ไขรายละเอียดการรีวิว
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                id='reviewStarFrame'
                sx={{ marginTop: "6rem" }}
            >
                <Typography id='textStarTopic'>
                    เนื้อหาบนเว็บไซต์มีความเหมาะสม และถูกต้อง
                </Typography>
                <Typography id='textStarSubTopic'>
                    รวมแบ่งปันประสบการณ์ การบริการ
                    โดยให้คะแนนความพึงพอใจ
                </Typography>

                <Rating
                    id='rating'
                    value={editDataReview_Rating_System}
                    onChange={(event, newValue) => {
                        seteditDataReview_Rating_System(newValue);
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
                        value={editDataReview_Comment_System}
                        onChange={handleInputChangeCommentSystem}
                    />
                    <Typography id='textStarCommentHelp'>
                        เช่น การให้บริการยอดเยี่ยม
                    </Typography>
                </Container>
            </Box>
            <Box
                id='reviewStarFrame'
                sx={{ marginTop: '6rem' }}
            >
                <Typography id='textStarTopic'>
                    การให้บริการของช่างเป็นอย่างไร
                </Typography>
                <Typography id='textStarSubTopic'>
                    รวมแบ่งปันประสบการณ์ การบริการ
                    โดยให้คะแนนความพึงพอใจ
                </Typography>

                <Rating
                    id='rating'
                    value={editDataReview_Rating_Technician}
                    onChange={(event, newValue) => {
                        seteditDataReview_Rating_Technician(newValue);
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
                        value={editDataReview_Comment_Technician}
                        onChange={handleInputChangeCommentTechnician}

                    />
                    <Typography id='textStarCommentHelp'>
                        เช่น การให้บริการยอดเยี่ยม
                    </Typography>
                </Container>
            </Box>
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
            <Box sx={{ marginTop: '10px' }}>
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
                sx={{ marginTop: 2 }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ marginTop: 4, marginBottom: 10 }}>
                        <Grid item xs={4}>
                            <Button
                                id='BTpageEditReview'
                                variant="contained"
                                fullWidth
                                color="error"
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                กลับ
                            </Button>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                id='BTpageEditReview'
                                variant="contained"
                                fullWidth
                                onClick={submitEdit}
                                color="success"
                            >
                                บันทึกการแก้ไข
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <br />
            </Container>
        </Box>





    );

} export default EditDataReview