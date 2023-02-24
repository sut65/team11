import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TechnicianCreate from './TechnicianCreate';
import TechnicianCreate2 from './TechnicianCreate2';
import { TechnicianInterface } from '../../../interfaces/TechnicianUI';



const detailStatus = {
    num: 0,
  };

const defaultCreate = {
    PREFIX_ID:0,
    Name: "",
    ID_card: "",
    DOB: null,
    GENDER_ID: 0,
    EDUCATE_ID: 0,
    Phone: "",
    Location: "",
    Username: "",
    Password: "",
};

function CreateFormTech (){

    const [formCreate, setFormCreate] = useState(defaultCreate);
    const [Technician, setTechnician] = useState<Partial<TechnicianInterface>>({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [statusProgress, setstatusProgress] = useState(detailStatus);


    const PageDisplay = () => {
        if (activeStep === 0) {
            return <TechnicianCreate  statusProgress={statusProgress} setstatusProgress={setstatusProgress} activeStep={activeStep} setActiveStep={setActiveStep} Technician={Technician} setTechnician={setTechnician} formCreate={formCreate} setFormCreate={setFormCreate} />

        } else if (activeStep === 1) {
            return <TechnicianCreate2  statusProgress={statusProgress} setstatusProgress={setstatusProgress} formCreate={formCreate} setFormCreate={setFormCreate} activeStep={activeStep} setActiveStep={setActiveStep}  />

        } 
        //   else if (activeStep === 2) {
        //     return <EditDataReview Cusomer={Cusomer} setActiveStep={setActiveStep} />
        // }
    }


    return (
        <Paper
            sx={{
                backgroundColor: "rgba(0,0,0,0)",
                boxShadow: 0,
                margin: 10,
            }}>
            <form className='form-container'>
                <div className='text-start'>{PageDisplay()}</div>
            </form >
        </Paper>
    );
}
export default CreateFormTech
