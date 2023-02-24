import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TechnicianShow from './TechnicianShow';
import TechnicianEdit from './TechnicianEdit';


const steps = [
    'Profile Information',
    'Create Account',
    'Sign - up Complete',
];

const defaultCreate = {
    ID: 0,
    Name: "",
    Phone: "",
    Location: "",
};

function CreateTechnician2 (){

    const [formCreate, setFormCreate] = useState(defaultCreate);
    const [activeStep, setActiveStep] = React.useState(0);


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <TechnicianShow activeStep={activeStep} setActiveStep={setActiveStep} formCreate={formCreate} setFormCreate={setFormCreate}  />

        } else if (activeStep === 1) {
            return <TechnicianEdit formCreate={formCreate} setFormCreate={setFormCreate} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

        } 
    }


    return (
        <Paper
            sx={{
                backgroundColor: "rgba(0,0,0,0)",
                boxShadow: 0,
            }}>
            <form className='form-container'>
                <div className='text-start'>{PageDisplay()}</div>
            </form >
        </Paper>
    );
}
export default CreateTechnician2
