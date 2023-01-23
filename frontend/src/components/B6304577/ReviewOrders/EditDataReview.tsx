import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { DataGrid, GridEditRowsModel, GridValueGetterParams } from '@mui/x-data-grid'; //npm i @mui/x-data-grid
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'; //npm i @mui/x-data-grid
import { Delete, Edit } from '@mui/icons-material'; //npm i @mui/icons-material
import { Rating } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs'; //npm i dayjs

import Typography from '@mui/material/Typography';
import style from "./style.module.css";
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import { ReviewInterface } from '../../../interfaces/ReviewUI';




const successAlert = () => {
    Swal.fire({
        title: 'อัพเดตข้อมูลสำเร็จ',
        text: 'You clicked the button.',
        icon: 'success'
    });
}
const errorAlert = () => {
    Swal.fire({
        title: 'อัพเดตข้อมูลสำเร็จ',
        text: 'You clicked the button.',
        icon: 'error'
    });
}

function EditDataReview({ reviewsID, setActiveStep }: any) {
    const [reviews, setReviews] = useState<Partial<ReviewInterface>>({});
    const [editDataReview_Rating_System, seteditDataReview_Rating_System] = useState<number | null>(0);
    const [editDataReview_Comment_System, seteditDataReview_Comment_System] = useState('');
    const [editDataReview_Rating_Technician, seteditDataReview_Rating_Technician] = useState<number | null>(0);
    const [editDataReview_Comment_Technician, seteditDataReview_Comment_Technician] = useState('');

    // console.log(editDataReview_Rating_System);
    // console.log(editDataReview_Comment_System);
    // console.log(editDataReview_Rating_Technician);
    // console.log(editDataReview_Comment_Technician);

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

    async function submitEdit() {
        // Data ที่จะนำไปอัพเดทข้อมูลลงในตาราง REVIEW
        let data = {
            ID: reviewsID,
            // Order_ID: Order_ID ,
            Satisfaction_System_ID: editDataReview_Rating_System,
            Review_Comment_System: editDataReview_Comment_System,
            Satisfaction_Technician_ID: editDataReview_Rating_Technician,
            Review_Comment_Technician: editDataReview_Comment_Technician,
            Timestamp: date.toISOString().split("T")[0].concat("T", date.toLocaleString().split(" ")[1], "+07:00"),
            Statetus: true,
            // Customer_ID : 1,
        };
        console.log(data);
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
                    console.log(res.data);
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
        <Container maxWidth="md">
            <h1>
                Edit page
            </h1>
            <Box
                className={style.boxshadow}
            >
                <Typography className={style.mainToptic} >
                    <h2>
                        เนื้อหาบนเว็บไซต์มีความเหมาะสม และถูกต้อง1
                    </h2>
                    <h6>
                        รวมแบ่งปันประสบการณ์ การบริการ
                        โดยให้คะแนนความพึงพอใจ
                    </h6>

                </Typography>

                <Rating
                    className={style.star}
                    size="large"
                    value={editDataReview_Rating_System}
                    onChange={(event, newValue) => {
                        seteditDataReview_Rating_System(newValue);
                    }}
                    sx={{
                        fontSize: "6rem",
                        alignItems: 'center',

                    }}

                />
                <br />
                <Container maxWidth="lg" >
                    <Typography className={style.subToptic}>
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
                        value={editDataReview_Comment_System}
                        onChange={handleInputChangeCommentSystem}

                    />
                </Container>
            </Box>
            <Box
                className={style.boxshadow}
            >
                <Typography className={style.mainToptic} >
                    <h2>
                        เนื้อหาบนเว็บไซต์มีความเหมาะสม และถูกต้อง2
                    </h2>
                    <h6>
                        รวมแบ่งปันประสบการณ์ การบริการ
                        โดยให้คะแนนความพึงพอใจ
                    </h6>

                </Typography>

                <Rating
                    className={style.star}
                    size="large"
                    value={editDataReview_Rating_Technician}
                    onChange={(event, newValue) => {
                        seteditDataReview_Rating_Technician(newValue);
                    }}
                    sx={{
                        fontSize: "6rem",
                        alignItems: 'center',
                    }}

                />
                <br />
                <Container maxWidth="lg" >
                    <Typography className={style.subToptic}>
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
                        value={editDataReview_Comment_Technician}
                        onChange={handleInputChangeCommentTechnician}

                    />
                </Container>
            </Box>
            <Container
                maxWidth="md"
                sx={{ marginTop: 2 }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ marginTop: 4, marginBottom: 10 }}>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                className={style.btBack}
                                fullWidth
                                color="error"
                                // disabled={activeStep === 0}
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
                <br/>
            </Container>
        </Container>





    );

} export default EditDataReview