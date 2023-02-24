import React, { useState } from "react";

import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import {TechnicianInterface} from "../../../interfaces/TechnicianUI"
import TextField from "@mui/material/TextField";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2

import { LinearProgressProps } from "@mui/material/LinearProgress";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";


import "../Technician/Technician.css" 
import { Padding } from "@mui/icons-material";

//TODOprocess ข้างบน
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{ height: 9, borderRadius: "30px" }}
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}



function TechnicianCreate2({ statusProgress, setstatusProgress, formCreate, setFormCreate, activeStep, setActiveStep, steps }: any) {

    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    const [Technician, setTechnician] = React.useState<Partial<TechnicianInterface>>({});
    const [genderID, setGenderID] = useState<number>(0);

      //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
      const { Password, RePassword} = formCreate //!!!!!!

      const {ID_card, Username }=formCreate;


      const convertType = (data: string | number | undefined | Float32Array) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

    function submit() {
      var pphonee = formCreate.Phone.split("-");
      var pphonee2 = pphonee[0] + pphonee[1] + pphonee[2];

      var personalID = formCreate.ID_card.split("-");
      var personalID2 =
        personalID[0] +
        personalID[1] +
        personalID[2] +
        personalID[3] +
        personalID[4];
      let data = {
        Name: formCreate.Name,          
        ID_card: personalID2,      
        DOB: formCreate.DOB,
        Phone: pphonee2,

        GENDER_ID: convertType(formCreate.GENDER_ID as number),
        EDUCATE_ID: convertType(formCreate.EDUCATE_ID as number),
        PREFIX_ID: convertType(formCreate.PREFIX_ID as number),
        Location: formCreate.Location,
        Username: formCreate.Username,
        Password: formCreate.Password,
      };

      console.log(data);
        const apiUrl = "http://localhost:8080/CreateTechnician";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    Swal.fire({
                      title: 'บันทึกสำเร็จ',
                      text: 'สร้าง Account Technician สำเร็จ',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 4000,
                  });
                  console.log(res.data)
                  setTimeout(() => {
                      window.location.href = "/";
                  }, 3000)

                  console.log("Success");
                } else {
                    Swal.fire({
                      // Display Back-end text response 
                      title: 'บันทึกไม่สำเร็จ',
                      text: res.error.split(";")[0],
                      icon: 'error',
                      showConfirmButton: true,
                      // timer: 3500 
                  });
                    console.log("Error");
                }
            });
    }

    //TODO ตัวนับ Progress ด้านบน

  const {num} = statusProgress;

  const [input2, setInput2] = React.useState("");
  const [input3, setInput3] = React.useState("");
  const [input4, setInput4] = React.useState("");


    return(
      <Paper style={{ backgroundColor: "rgba(24,46,62,0.5)", borderRadius: 40 }}>
      {/* <Bar /> */}
      <Box sx={{
          backgroundColor: "rgba(24,46,62,0.4)",
          height: "auto",
          borderRadius: 10,
          paddingY: 1,
        }}
        >

      <div style={{
            height: "auto",
            width: "100%",
            marginTop: "0px",
            paddingTop: "30px",
          }}>
        <Box sx={{ maginX: 0, maginY: 6, height: "40px" }}>
          <center>
            <Typography
              component="h2"
              variant="h4"
              gutterBottom
              fontFamily="Arial"
            >
              <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} id="redditTextFieldsTopic" >
                Create Technician
              </b>
              <br />

            </Typography>
          </center>
        </Box>
      </div>
      <br /><br />

      <Container maxWidth="md">

        <Box sx={{
              backgroundColor: "rgba(255,255,255,1)",
              height: "auto",
              marginY: 4,
              borderRadius: 7,
              }} 
              >

            <Grid container spacing={2} paddingX={1} paddingY={0}>

                <Grid item xs={6}>
                    <center>
                    <b style={{ font: "Arial", color: "#000000", fontSize: 15 }} >
                        Profile Information
                    </b>
                    </center>
                </Grid>

                <Grid item xs={6}>
                <center>
                    <b style={{ font: "Arial", color: "#000000", fontSize: 15 }} >
                        Generate Account Technician
                    </b>
                    </center>
                </Grid>

            </Grid>
        
            <Grid container spacing={1} paddingX={1} paddingY={1}>
                <Grid item xs={12}>
                <LinearProgressWithLabel value={num} />
                </Grid>
            </Grid>
            <br />

            <Divider variant="middle" />

            <Grid container spacing={1} paddingX={22} paddingY={1}>
                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 14 }} >
                            ID_Employee
                        </b>
                </Grid>
                <Grid item xs={10} md={12}  >
                        <TextField
                            id="redditTextFieldsCreate"
                            variant="standard"
                            type="string"
                            required
                            value={Username}
                            InputProps={
                              { disableUnderline: true } as Partial<OutlinedInputProps>
                              }
                              onChange={(event) => {
                                setFormCreate({ ...formCreate, Username: event.target.value });
                              }}
                        />
                </Grid>

                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 14 }} >
                            Password
                        </b>
                </Grid>
                <Grid item xs={10} md={12}  >
                        <TextField
                            // disabled
                            id="redditTextFieldsCreate"
                            variant="standard"
                            type="string"
                            value={ID_card}
                            InputProps={
                              { disableUnderline: true } as Partial<OutlinedInputProps>
                            }
                            // onChange={(event) => setFormCreate(({...formCreate,Password:event.target.value}))}
                        />
                </Grid>

            </Grid>




            <Grid container spacing={1} paddingX={33} paddingY={5}>
              <Grid item xs={7} padding={0} sx={{borderRadius:1/2}}>
                <Button
                sx={{PaddingX:40}}
                  id="buttonNext"
                  style={{ padding:5, fontSize: 20,width: 300, height:70 }}
                  onClick={submit} 
                  variant="contained"
                  color="success"
                  size="large"
                >
                  <b>Generate Technician</b>
                </Button>
              </Grid>
              <br />
              <br />
              <Grid container spacing={3} paddingX={10} marginY={3}>
                <Button
                  size="large"
                  style={{
                    // float: "",
                    fontSize: 20,
                    width: 400,
                    color: "#f27070",
                    marginTop: 0,
                  }}
                  onClick={handleBack}
                  variant="contained"
                  id="buttonBack"
                >
                  <b>Back</b>
                </Button>
              </Grid>
            </Grid>         
            </Box>
            </Container>
        </Box>
      </Paper>
    )
  }
  export default TechnicianCreate2;
