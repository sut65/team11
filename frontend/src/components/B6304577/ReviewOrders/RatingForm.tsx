import React, { useState, useEffect } from 'react';
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
    checkedPaymentID: null,
    data1: null,
    commentRating1: "",
    data2: null,
    commentRating2: "",
};

function RankingForm() {

    const [formDataRating, setFormDataRating] = useState(defaultDataRating)
    const [reviewsID, setReviewsID] = useState<Partial<ReviewInterface>>({});
    const [checkedPaymentsAll, setCheckedPaymentsAll] = useState<any[]>([]);
    const [activeStep, setActiveStep] = React.useState(0);

    const [customerName, setCustomerName] = React.useState("");

    const userID = parseInt(localStorage.getItem("uid") + "");


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <Content userID={userID} activeStep={activeStep} setActiveStep={setActiveStep} setReviewsID={setReviewsID} formDataRating={formDataRating} setFormDataRating={setFormDataRating} setCheckedPaymentsAll={setCheckedPaymentsAll} />

        } else if (activeStep === 1) {
            return <Star1 customerName={customerName} formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} checkedPaymentsAll={checkedPaymentsAll} />

        } else if (activeStep === 2) {
            return <Star2 customerName={customerName} formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} checkedPaymentsAll={checkedPaymentsAll} />

        } else if (activeStep === 3) {
            return <Submit userID={userID} customerName={customerName} formDataRating={formDataRating} setFormDataRating={setFormDataRating} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} checkedPaymentsAll={checkedPaymentsAll} />
        } else if (activeStep === 4) {
            return <EditDataReview reviewsID={reviewsID} setActiveStep={setActiveStep} userID={userID}/>
        }
    }


    const getCustomerName = async () => {
        const apiUrl = `http://localhost:8080/GetCustomer/${userID}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // setReviews(res.data)
                    setCustomerName(res.data.Name);
                }
            });
    };


    useEffect(() => {
        getCustomerName();

    }, []);

    return (

        <form className='form-container'>
            <div className='text-start'>{PageDisplay()}</div>
        </form >
    );

} export default RankingForm