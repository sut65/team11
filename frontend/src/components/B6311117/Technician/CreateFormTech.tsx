import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TechnicianCreate from './TechnicianCreate';
import TechnicianCreate2 from './TechnicianCreate2';
import { TechnicianInterface } from '../../../interfaces/TechnicianUI';


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
    EDUCATE_ID: 0,
    Phone: "",
    Location: "",

    Email: "",
    Password: "",
    // RePassword: "",
};

function CreateFormTech (){

    const [formCreate, setFormCreate] = useState(defaultCreate);
    const [Technician, setTechnician] = useState<Partial<TechnicianInterface>>({});
    const [activeStep, setActiveStep] = React.useState(0);


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <TechnicianCreate activeStep={activeStep} setActiveStep={setActiveStep} Technician={Technician} setTechnician={setTechnician} formCreate={formCreate} setFormCreate={setFormCreate} />

        } else if (activeStep === 1) {
            return <TechnicianCreate2 formCreate={formCreate} setFormCreate={setFormCreate} activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

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
export default CreateFormTech
