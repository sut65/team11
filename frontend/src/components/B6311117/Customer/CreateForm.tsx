import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CustomerCreate from './CustomerCreate';
import CustomerCreate2 from './CustomerCreate2';
import { CustomerInterface } from '../../../interfaces/CustomerUI';


const steps = [
    'Profile Information',
    'Create Account',
    'Sign - up Complete',
];

const defaultCreate = {
    PREFIX_ID:0,
    Name: "",
    ID_card: "",
    DOB: null,
    GENDER_ID: 0,
    CAREER_ID: 0,
    Phone: "",

    Email: "",
    Password: "",
    RePassword: "",
};

function CreateForm (){

    const [formCreate, setFormCreate] = useState(defaultCreate);
    const [Customer, setCustomer] = useState<Partial<CustomerInterface>>({});
    const [activeStep, setActiveStep] = React.useState(0);


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <CustomerCreate activeStep={activeStep} setActiveStep={setActiveStep} Customer={Customer} setCustomer={setCustomer} formCreate={formCreate} setFormCreate={setFormCreate} />

        } else if (activeStep === 1) {
            return <CustomerCreate2 formCreate={formCreate} setFormCreate={setFormCreate} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } 
        //   else if (activeStep === 2) {
        //     return <EditDataReview Cusomer={Cusomer} setActiveStep={setActiveStep} />
        // }
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
}
export default CreateForm
