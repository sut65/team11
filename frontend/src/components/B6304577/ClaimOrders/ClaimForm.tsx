import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import ContentClaimOrder from './ContentClaim';
import EditContentClaimOrder from './EditDataClaim';

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
    customerID: null,
};

function ClaimForm() {

    const [formDataRating, setFormDataRating] = useState(defaultDataRating)
    const [claimID, setClaimID] = useState('');
    const [checkedPaymentsAll, setCheckedPaymentsAll] = useState<any[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const PageDisplay = () => {
        if (activeStep === 0) {
            return <ContentClaimOrder activeStep={activeStep} setActiveStep={setActiveStep} claimID={claimID} setClaimID={setClaimID} />

        } else if (activeStep === 1) {
            return <EditContentClaimOrder activeStep={activeStep} setActiveStep={setActiveStep} claimID={claimID} setClaimID={setClaimID} />

        }
    }

    return (

        <form className='form-container'>
            <div className='text-start'>{PageDisplay()}</div>
        </form >
    );

} export default ClaimForm