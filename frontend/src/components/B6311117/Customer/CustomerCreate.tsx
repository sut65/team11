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


//Grid
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

//process ข้างบน
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  function FacebookCircularProgress(props: CircularProgressProps) {
    return (
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}
          size={40}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={40}
          thickness={4}
          {...props}
        />
      </Box>
    );
  }


function CustomerCreate({ formCreate, setFormCreate, activeStep, setActiveStep , steps }: any) {

const handleStart = () => {
    setActiveStep(activeStep + 1);
};

const Back = () => {
  localStorage.clear();
  window.location.href = "/";
};

// ประกาศเพื่อ รับค่าที่ได้จากการเลือก combobox และ กรอก Text-Field

// const [Name, setName] = useState('');
// const [ID_card, setID_card] = useState('');
// const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
// const [Phone, setPhone] = useState('');

// const [GENDER_ID, setGENDER_ID] = useState('');
// const [CAREER_ID, setCAREER_ID] = useState('');
// const [PREFIX_ID, setPREFIX_ID] = useState('');

// const [Email, setEmail] = useState(''); 
// const [Password, setPassword] = useState(''); 

const [Customer, setCustomer] = React.useState<Partial<CustomerInterface>>({});


  //สร้างตัวแปรเอาไปใช้ ในการพิมพ์ Text Field
  const {Name, ID_card, Phone, DOB} = formCreate
  const {PREFIX_ID, GENDER_ID, CAREER_ID} = formCreate
  // const {DOB} = setFormCreate

  //สร้างฟังก์ชันสำหรับ คอยรับการกระทำ เมื่อคลิ๊ก หรือ เลือก


//Get Gender
const [Gender, setGender] = React.useState<GenderInterface[]>([]);
    const getGender = async () => {
    const apiUrl = `http://localhost:8080/GetGender`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setGender(res.data);
        } else {
          console.log("else");
        }
      });
  };

//Get Career
const [Career, setCareer] = React.useState<CareerInterface[]>([]);
    const getCareer = async () => {
    const apiUrl = `http://localhost:8080/GetCareer`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCareer(res.data);
        } else {
          console.log("else");
        }
      });
  };

//Get Prefix
const [Prefix, setPrefix] = React.useState<PrefixInterface[]>([]);
    const getPrefix = async () => {
    const apiUrl = `http://localhost:8080/GetPrefix`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrefix(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getGender();
    getCareer();
    getPrefix();
  }, []);


  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
      {/* <Bar /> */}
      <Box sx={{ bgcolor: "#182E3E", height: "111vh" }} >

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

        <Box sx={{ bgcolor: '#f1f8e9', height: '92vh', marginY: 4 }} >

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
        
            <Grid container spacing={1} paddingX={1} paddingY={1}>
                <Grid item xs={12}>
                    <BorderLinearProgress variant="determinate" value={0} />
                </Grid>
            </Grid>
            <br />

            <Divider />

            <Grid container spacing={1} paddingX={0} paddingY={1}>
                <Grid item xs={2} marginLeft={9} >
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Prefix
                    </b>
                </Grid>
                <Grid item xs={8} marginLeft={8}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Name
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={9}  >
                    <FormControl fullWidth variant="outlined">
                        <Select
                        native
                        value={PREFIX_ID}
                        onChange={(event) => setFormCreate(({...formCreate,PREFIX_ID:event.target.value}))}
                        inputProps={{
                            name: "PREFIX_ID",
                        }}
                        >
                          <option aria-label="None" value="">
                            คำนำหน้า                 
                          </option>
                        {Prefix.map((item: PrefixInterface) => (
                            <option value={item.ID} key={item.ID}>
                             {item.PrefixName}  {/*ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
                            </option>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item xs={7} marginLeft={8}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Name"
                    variant="outlined"
                    type="string"
                    size="medium"
                    value={Name}
                    onChange={(event) => setFormCreate(({...formCreate,Name:event.target.value}))}
                  />
                </FormControl>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={8} marginLeft={8}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Personal ID
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={7} marginLeft={8}>
                    <FormControl fullWidth variant="outlined">
                    <TextField
                        id="ID_card"
                        variant="outlined"
                        type="string"
                        size="medium"
                        value={ID_card}
                        onChange={(event) => setFormCreate(({...formCreate,ID_card:event.target.value}))}
                    />
                    </FormControl>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={8} marginLeft={8}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Date of Birth
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={7} marginLeft={8}>
                    <FormControl fullWidth variant="outlined">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDateTimePicker
                          renderInput={(params) => <TextField {...params} />}
                          value={DOB}
                          onChange={(newValue) => setFormCreate(({...formCreate,DOB:newValue}))}
                        />
                      </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={2} marginLeft={35} >
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Gender
                    </b>
                </Grid>
                <Grid item xs={4} marginLeft={9}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Career
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={35  } >
                  <FormControl fullWidth variant="outlined">
                          <Select
                          native
                          value={GENDER_ID}
                          onChange={(event) => setFormCreate(({...formCreate,GENDER_ID:event.target.value}))}
                          inputProps={{
                              name: "GENDER_ID",
                          }}
                          >
                            <option aria-label="None" value="">
                              เพศ                 
                            </option>
                          {Gender.map((item: GenderInterface) => (
                              <option value={item.ID} key={item.ID}>
                              {item.GenderName}  {/*ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
                              </option>
                          ))}
                          </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} marginLeft={9}>
                  <FormControl fullWidth variant="outlined">
                        <Select
                        native
                        value={CAREER_ID}
                        onChange={(event) => setFormCreate(({...formCreate,CAREER_ID:event.target.value}))}
                        inputProps={{
                            name: "CAREER_ID",
                        }}
                        >
                          <option aria-label="None" value="">
                            อาชีพ                 
                          </option>
                        {Career.map((item: CareerInterface) => (
                            <option value={item.ID} key={item.ID}>
                             {item.CareerName}  {/*ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
                            </option>
                        ))}
                        </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={8} marginLeft={8}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Telephone Number
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={7} marginLeft={8}>
                    <FormControl fullWidth variant="outlined">
                    <TextField
                        id="Phone"
                        variant="outlined"
                        type="string"
                        size="medium"
                        value={Phone}
                        onChange={(event) => setFormCreate(({...formCreate,Phone:event.target.value}))}
                    />
                    </FormControl>
                </Grid>

            </Grid>
            
            <Grid container spacing={5} paddingX={2} paddingY={1} >
                <Grid item xs={12} padding={2}>
                  {/* <Button size="large" sx={{ backgroundColor: "#C70039", fontSize: 20 }} component={RouterLink} to="/" variant="contained"  >
                    ย้อนกลับ
                  </Button> */}
                  <Button
                    style={{ float: "right", fontSize: 20 }}
                    onClick={handleStart}
                    // component={RouterLink} to="/CustomerCreate2" 
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    <b>Next</b>
                  </Button>


                  <Button
                    style={{ float: "left", fontSize: 20 }}
                    // onClick={handleStart}
                    onClick={Back}
                    variant="contained"
                    color="error"
                    size="large"
                  >
                    <b>Back</b>
                  </Button>
                </Grid>
            </Grid>

        </Box>
    </Container>



      </Box>

    </Paper>
  );
}
export default CustomerCreate;
