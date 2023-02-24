import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import CustomerCreate from "./CustomerCreate";
import CustomerCreate2 from "./CustomerCreate2";
import { CustomerInterface } from "../../../interfaces/CustomerUI";

const detailStatus = {
  num: 0,
};
const defaultCreate = {
  PREFIX_ID: 0,
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

function CreateForm() {
  const [formCreate, setFormCreate] = useState(defaultCreate);
  const [Customer, setCustomer] = useState<Partial<CustomerInterface>>({});
  const [activeStep, setActiveStep] = React.useState(0);
  const [statusProgress, setstatusProgress] = useState(detailStatus);

  const PageDisplay = () => {
    if (activeStep === 0) {
      return (
        <CustomerCreate
          statusProgress={statusProgress}
          setstatusProgress={setstatusProgress}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          Customer={Customer}
          setCustomer={setCustomer}
          formCreate={formCreate}
          setFormCreate={setFormCreate}
        />
      );
    } else if (activeStep === 1) {
      return (
        <CustomerCreate2
          statusProgress={statusProgress}
          setstatusProgress={setstatusProgress}
          formCreate={formCreate}
          setFormCreate={setFormCreate}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      );
    }
  };

  return (
    <Paper
      sx={{
        backgroundColor: "rgba(0,0,0,0)",
        boxShadow: 0,
        margin: 10,
      }}
    >
      <form className="form-container">
        <div className="text-start">{PageDisplay()}</div>
      </form>
    </Paper>
  );
}
export default CreateForm;
