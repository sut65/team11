import React, { useEffect, useState } from "react";

import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Margin } from "@mui/icons-material";
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {GenderInterface,
  CareerInterface,
  PrefixInterface,
  CustomerInterface} from "../../../interfaces/CustomerUI"
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import { Link as RouterLink, Route } from "react-router-dom";
import CreateForm from "./CreateForm";
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2

import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha } from '@mui/material/styles';

import Input from '@mui/material/Input';

import "../Customer/Customer.css"

import { LinearProgressProps } from '@mui/material/LinearProgress';

//TODOprocess ข้างบน
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" sx={{height:9, borderRadius:'30px'}} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


function CustomerCreate2({  statusProgress, formCreate, setFormCreate, activeStep, setActiveStep, steps }: any) {

    // const [Name, setName] = useState('');
    // const [ID_card, setID_card] = useState('');
    // const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
    // const [Phone, setPhone] = useState('');

    // const [GENDER_ID, setGENDER_ID] = useState('');
    // const [CAREER_ID, setCAREER_ID] = useState('');
    // const [PREFIX_ID, setPREFIX_ID] = useState('');

    // const [Email, setEmail] = useState(''); 
    // const [Password, setPassword] = useState(''); 
    // const [RePassword, setRePassword] = useState(''); 

    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

    const [Customer, setCustomer] = React.useState<Partial<CustomerInterface>>({});
    const [genderID, setGenderID] = useState<number>(0);

      //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก
      const {Email, Password, RePassword} = formCreate
      const {Number} = statusProgress


      const convertType = (data: string | number | undefined | Float32Array) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

    function submit() {
      var pphonee = formCreate.Phone.split("-");
      var pphonee2 = pphonee[0]+pphonee[1]+pphonee[2];

      var personalID = formCreate.ID_card.split("-");
      var personalID2 = personalID[0]+personalID[1]+personalID[2]+personalID[3]+personalID[4];
      let data = {
        Name: formCreate.Name,          
        // ID_card: formCreate.ID_card,      
        ID_card: personalID2,      
        DOB: formCreate.DOB,
        // Phone: formCreate.Phone,
        Phone: pphonee2,

        GENDER_ID: convertType(formCreate.GENDER_ID as number),
        // genderID: formCreate.GENDER_ID,
        CAREER_ID: convertType(formCreate.CAREER_ID as number),
        PREFIX_ID: convertType(formCreate.PREFIX_ID as number),

        Email: formCreate.Email,
        Password: formCreate.Password,
      };

      console.log(data);
      // POST Customer

        const apiUrl = "http://localhost:8080/CreateCustomer";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // successAlert();
                    Swal.fire({
                      title: 'บันทึกสำเร็จ',
                      text: 'สร้าง Account สำเร็จ',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 4000
                  });
                    console.log(res.data)
                    setTimeout(() => {
                        // setActiveStep(0)
                        localStorage.clear();
                        window.location.href = "/";
                    }, 2000)

                    console.log("Success");
                    
                } else {
                    // errorAlert();
                    console.log("Error");

                    Swal.fire({
                      // Display Back-end text response 
                      title: 'บันทึกไม่สำเร็จ',
                      text: res.error.split(";")[0],
                      icon: 'error',
                      showConfirmButton: true,
                      // timer: 3500 
                  });
                }
            });


  
    }

  //TODO ตัวนับ Progress ด้านบน


  const [progress, setProgress] = statusProgress
  // const progress = statusProgress.Number

  const [input2, setInput2] = React.useState('');
  const [input3, setInput3] = React.useState('');
  const [input4, setInput4] = React.useState('');

  const [em, setem] = React.useState('');
  
  


  // console.log(formCreate.Email)
  // const [value, setValue] = useState('');

  // console.log(formCreate.Email.length)




    return(
        <Paper style={{backgroundColor: "rgba(24,46,62,0.5)", borderRadius: 40}}>
      {/* <Bar /> */}
      <Box sx={{ backgroundColor: "rgba(24,46,62,0.4)", height: 'auto', borderRadius: 10, paddingY:1 }} >

      <div style={{ height: "auto", width: "100%", marginTop: "0px", paddingTop: "30px" }}>
        <Box sx={{ maginX: 0, maginY: 0, height: "10px" }}>
          <center>
            <Typography
              component="h2"
              variant="h4"
              //color="#182E3E"
              gutterBottom
              //align="center"
              fontFamily="Arial"
            >
              <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} >
                Sign - Up
              </b>
              <br />

            </Typography>
          </center>
        </Box>
      </div>
      <br /><br />

      <Container maxWidth="md">

        <Box sx={{ backgroundColor: "rgba(255,255,255,1)", height: 'auto', marginY: 4 ,borderRadius: 7  }} >

            <Grid container spacing={2} paddingX={1} paddingY={0}>

                <Grid item xs={6}>
                    <center>
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Profile Information
                    </b>
                    </center>
                </Grid>

                <Grid item xs={6}>
                <center>
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Create Account
                    </b>
                    </center>
                </Grid>

            </Grid>
        
            <Grid container spacing={1} paddingX={3} paddingY={0}>
                <Grid item xs={12}>
                  <LinearProgressWithLabel value={progress} />
                </Grid>
            </Grid>
            <br />

            <Divider variant="middle"  />

            <Grid container spacing={1} paddingX={30} paddingY={1}>
                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                            E-mail
                        </b>
                </Grid>
                <Grid container item xs={10} md={12}  >
                    {/* <FormControl fullWidth variant="outlined"> */}
                        <TextField
                            id="redditTextFieldsCreate2"
                            variant="standard"
                            type="string"
                            InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                            // size="medium"
                            value={Email}
                            onChange={(event) => {
                              setFormCreate({...formCreate, Email: event.target.value});
                            }}
                            onBlur={(Email) => {
                              console.log("format: "+formCreate.Email.length)
                              console.log("input: "+input2.length)
                              console.log("")
                              //TODO ได้ละ
                              if ((formCreate.Email.length)/20 > input2.length){
                                setProgress(({...statusProgress,num:statusProgress.num + 16.67}));
                                setInput2(formCreate.Email)
                              }
                              //TODO สลาย
                              else if ((formCreate.Email.length - input2.length)+1 ===  (-input2.length) || (formCreate.Email.length== 0 && input2.length != 0 )){
                                setProgress(({...statusProgress,num:statusProgress.num - 16.67}));
                                setInput2(formCreate.Email)
                              }
                              //TODO คงเดิม
                              else if (((formCreate.Email.length) - input2.length) < (input2.length)){
                                setProgress(({...statusProgress,num:statusProgress.num }));
                                setInput2(formCreate.Email)
                              }
                              console.log(formCreate.Email.length - input2.length);
                              
                            }}
                            
                            placeholder="Enter Username" 
                        />
                    {/* </FormControl> */}
                </Grid>

                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                            Password
                        </b>
                </Grid>
                <Grid container item xs={10} md={12}  >
                    {/* <FormControl fullWidth variant="outlined"> */}
                    <FormControl variant="standard">
                        <Input
                            id="redditTextFieldsCreate2"
                            // variant="standard"
                            disableUnderline
                            type="password"
                            placeholder="•••••••"
                            name="password"
                            // InputProps={{ disableUnderline: true }}
                            // size="medium"
                            value={Password}
                            // onChange={(event) => setFormCreate(({...formCreate,Password:event.target.value}), setProgress((prevProgress) => (prevProgress > 100 ? 10 : 83)))}


                            onChange={(event) => {
                              setFormCreate({...formCreate,Password:event.target.value});
                            }}
                            onBlur={(Password) => {
                              console.log("format: "+formCreate.Password.length)
                              console.log("input: "+input3.length)
                              console.log("")
                              //TODO ได้ละ
                              if ((formCreate.Password.length)/20 > input3.length){
                                setProgress(({...statusProgress,num:statusProgress.num + 16.67}));
                                setInput3(formCreate.Password)
                              }
                              //TODO สลาย
                              else if ((formCreate.Password.length - input3.length)+1 ===  (-input3.length) || (formCreate.Password.length== 0 && input3.length != 0 )){
                                setProgress(({...statusProgress,num:statusProgress.num - 16.67}));
                                setInput3(formCreate.Password)
                              }
                              //TODO คงเดิม
                              else if (((formCreate.Password.length) - input3.length) < (input3.length)){
                                setProgress(({...statusProgress,num:statusProgress.num }));
                                setInput3(formCreate.Password)
                              }
                              console.log(formCreate.Password.length - input3.length);
                              
                            }}
                        />
                    </FormControl>
                        {/* <Input placeholder="•••••••" type="password" name="password" /> */}
                    {/* </FormControl> */}
                </Grid>

                <Grid item xs={10} md={12}  >
                    <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                            Type - Password again
                        </b>
                </Grid>
                <Grid container item xs={10} md={12}  >
                    {/* <FormControl fullWidth variant="outlined"> */}
                        {/* <TextField
                            id="redditTextFieldsCreate2" //!อย่าลืมกลับมาดู Type Password again ว่่าจะทำไหม
                            variant="standard"
                            type="string"
                            InputProps={{ disableUnderline: true }}
                            // size="medium"
                            value={RePassword}
                            onChange={(event) => setFormCreate(({...formCreate,RePassword:event.target.value}))}
                        /> */}
                    {/* </FormControl> */}

                    <FormControl variant="standard">
                        <Input
                            id="redditTextFieldsCreate2"
                            // variant="standard"
                            disableUnderline
                            type="password"
                            placeholder="•••••••"
                            name="password"
                            // InputProps={{ disableUnderline: true }}
                            // size="medium"
                            value={RePassword}
                            // onChange={(event) => setFormCreate(({...formCreate,RePassword:event.target.value}), setProgress((prevProgress) => (prevProgress > 100 ? 10 : 100)))}

                            onChange={(event) => {
                              setFormCreate({...formCreate,RePassword:event.target.value});
                            }}
                            onBlur={(RePassword) => {
                              console.log("format: "+formCreate.RePassword.length)
                              console.log("input: "+input4.length)
                              console.log("")
                              //TODO ได้ละ
                              if ((formCreate.RePassword.length)/20 > input4.length){
                                setProgress(({...statusProgress,num:statusProgress.num + 16.67}));
                                setInput4(formCreate.RePassword)
                              }
                              //TODO สลาย
                              else if ((formCreate.RePassword.length - input4.length)+1 ===  (-input4.length) || (formCreate.RePassword.length== 0 && input4.length != 0 )){
                                setProgress(({...statusProgress,num:statusProgress.num - 16.67}));
                                setInput4(formCreate.RePassword)
                              }
                              //TODO คงเดิม
                              else if (((formCreate.RePassword.length) - input4.length) < (input4.length)){
                                setProgress(({...statusProgress,num:statusProgress.num - 16.67}));
                                setInput4(formCreate.RePassword)
                              }
                              console.log(formCreate.RePassword.length - input4.length);
                              
                            }}
                        />
                    </FormControl>

                </Grid>
            </Grid>
            <br/>
            <br/>
            <Grid container spacing={1} paddingX={10} paddingY={0} >
                <Grid item xs={7} padding={0}>
                  <Button
                    id="buttonNext"
                    style={{ float: "right", fontSize: 20 }}
                    onClick={submit}
                    // component={RouterLink} to="/CustomerCreate1" 
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    <b>Sign - Up</b>
                  </Button>
                </Grid>
                <br/>
                <br/>
                <Grid container spacing={5} paddingX={3} marginY={3} >
                <Button 
                    size="large" 
                    style={{ float: "left", fontSize: 20, width:150, color:"#f27070", marginTop:10 }}
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
  export default CustomerCreate2;
