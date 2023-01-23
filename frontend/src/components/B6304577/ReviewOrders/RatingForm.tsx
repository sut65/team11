import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Content from './Content';
import Star1 from './Star1';
import Star2 from './Star2';
import Submit from './Submit';
import EditDataReview from './EditDataReview';
import { ReviewInterface } from '../../../interfaces/ReviewUI';





const steps = [
    'เกี่ยวกับเว็บไซต์',
    'เกี่ยวกับช่าง',
    'บันทึก',
];

const defaultDataRating = {
    data1: null,
    commentRating1: "",
    data2: null,
    commentRating2: "",
};



function RankingForm() {
    // Check save
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [formDataRating, setFormDataRating] = useState(defaultDataRating)
    const [reviews, setReviews] = useState<Partial<ReviewInterface>>({});
    const [reviewsID, setReviewsID] = useState<Partial<ReviewInterface>>({});
    console.log(formDataRating);



    const [activeStep, setActiveStep] = React.useState(0);



    // console.log(date.toString().split(" ")[5].substring(3));
    // console.log(date.toISOString().split("T")[0].concat("T",date.toLocaleString().split(" ")[1],"+07:00"));
    // console.log(date.toLocaleString().split(" ")[1]);



    const PageDisplay = () => {
        if (activeStep === 0) {
            return <Content activeStep={activeStep} setActiveStep={setActiveStep} setReviewsID={setReviewsID} />

        } else if (activeStep === 1) {
            return <Star1 formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 2) {
            return <Star2 formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } else if (activeStep === 3) {
            return <Submit formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />
        } else if (activeStep === 4) {
            return <EditDataReview reviewsID={reviewsID} setActiveStep={setActiveStep} />
        }
    }



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleSubmit = () => {
        console.log("Submit");
        console.log(formDataRating.data1);

    };



    // เมื่อกดปุ่ม Submit จะเรียก Function submit
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };


    //function fethch data จาก backend

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

    useEffect(() => {
        getReview();

    }, []);
    return (
        <Paper
            sx={{
                backgroundColor: "#182e3e",
                height: '1080px'
            }}>
            <form className='form-container'>
                <div className='text-start'>{PageDisplay()}</div>
            </form >
        </Paper>
    );

} export default RankingForm