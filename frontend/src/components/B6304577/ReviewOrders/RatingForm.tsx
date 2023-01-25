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
    checkedPaymentID:null,
    data1: null,
    commentRating1: "",
    data2: null,
    commentRating2: "",
    customerID:null,
};

function RankingForm() {

    const [formDataRating, setFormDataRating] = useState(defaultDataRating)
    const [reviewsID, setReviewsID] = useState<Partial<ReviewInterface>>({});
    const [checkedPaymentsAll, setCheckedPaymentsAll] = useState<any[]>([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const PageDisplay = () => {
        if (activeStep === 0) {
            return <Content activeStep={activeStep} setActiveStep={setActiveStep} setReviewsID={setReviewsID} formDataRating={formDataRating} setFormDataRating={setFormDataRating} setCheckedPaymentsAll={setCheckedPaymentsAll}/>

        } else if (activeStep === 1) {
            return <Star1 formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} checkedPaymentsAll={checkedPaymentsAll}/>

        } else if (activeStep === 2) {
            return <Star2 formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} checkedPaymentsAll={checkedPaymentsAll}/>

        } else if (activeStep === 3) {
            return <Submit formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} checkedPaymentsAll={checkedPaymentsAll}/>
        } else if (activeStep === 4) {
            return <EditDataReview reviewsID={reviewsID} setActiveStep={setActiveStep} />
        }
    }

    return (
        <Paper
            sx={{
                backgroundColor: "#182e3e",
                height: '1500px'
            }}>
            <form className='form-container'>
                <div className='text-start'>{PageDisplay()}</div>
            </form >
        </Paper>
    );

} export default RankingForm