import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Margin } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  GenderInterface,
  CareerInterface,
  PrefixInterface,
  CustomerInterface,
} from "../../../interfaces/CustomerUI";
import TextField from "@mui/material/TextField";
import ResponsiveAppBar_01 from "../../Bar_01";
import PersonIcon from '@mui/icons-material/Person';



//Grid
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CustomerShow({formCreate, setFormCreate, activeStep, setActiveStep }: any) {

    const {ID} = formCreate

const handleStart = () => {
    setActiveStep(activeStep + 1);
};

  //ระบุว่าใคร login เข้ามา
  // const customerID = parseInt(localStorage.getItem("uid") + "");
  const customerID = useState(1);

  const [Name, setName] = useState("");
  const [ID_card, setID_card] = useState("");
  const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
  const [Phone, setPhone] = useState("");

  const [GENDER_NAME, setGENDER_NAME] = useState("");
  const [CAREER_NAME, setCAREER_NAME] = useState("");
  const [PREFIX_NAME, setPREFIX_NAME] = useState("");

  const [Email, setEmail] = useState("");

  const convertType = (data: string | number | undefined | Float32Array) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  function Delete() {
    let data = {
        ID: Customer.ID,
    }

    const apiUrl = "http://localhost:8080/DeleteCustomer";
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                // successAlert();
                setTimeout(() => {
                    console.log(data);
                }, 1500)
                console.log("Delete Account Success");
            } else {
                // errorAlert();
                console.log("Delete Account Error");
            }
        });
}

  //API Get Customer/id
  const [Customer, setCustomer] = React.useState<Partial<CustomerInterface>>(
    {}
  );

  const getUser = async () => {
    const apiUrl = `http://localhost:8080/GetCustomer/1`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setCustomer(res.data)
            setPREFIX_NAME(res.data.PREFIX.PrefixName)
            setCAREER_NAME(res.data.CAREER.CareerName)
            setGENDER_NAME(res.data.GENDER.GenderName)
            setDOB(res.data.DOB)
            console.log(Customer)
        }
     else {
        console.log("else");
      }
      });
  };

  useEffect(() => {
    getUser();
    // setFormCreate(({...formCreate,ID:1}));

  }, []);

  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
        <ResponsiveAppBar_01/>
        <br />


      <Box sx={{ bgcolor: "#182E3E", height: "104vh" }}>
        <Container maxWidth="lg">
          <br />
          <br />

          <Box sx={{ bgcolor: "#f1f8e9", height: "87vh", paddingY: 0 }}>

          <Grid container spacing={2} paddingX={7} marginRight={1}>
            <Grid item xs={6} md={4}>
                
            </Grid>

            <Divider orientation="vertical" sx={{padding: 2, marginTop:2, marginBottom:2}}  flexItem />
            <Grid item xs={6} md={2}>
                    <br />  
                    <b style={{ font: "Arial", color: "#000000", fontSize: 15 }}>My Profile</b>
                    <br />
                    <br />

            </Grid>
          </Grid>
          

            <Grid container spacing={1} paddingX={5}>
                {/* 1 */}
              <Grid item xs={6} md={4}>
                {/* <center>
                    <img src="https://sv1.picz.in.th/images/2023/01/27/L4CDWe.png" alt="L4CDWe.png" width="128" height="128" />
                </center> */}
                
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />
              

              <Grid item xs={6} md={2} marginLeft={3} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Prefix</b>
              
              </Grid>
              

              <Grid item xs={6} md={5} marginLeft={2} marginTop={2}>
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Name</b>
              </Grid>
              
              
              {/* 2 */}
              <Grid item xs={6} md={4}>
                {/* <Item>2</Item>     */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={2} marginLeft={3} >
                    <TextField
                        disabled
                        id="filled-disabled"
                        label={PREFIX_NAME}
                        // defaultValue={PREFIX_NAME}
                        variant="filled"
                        size="small"
                        />
              </Grid>

              <Grid item xs={6} md={5} marginLeft={2}>
              <TextField
                        disabled
                        id="filled-disabled"
                        label={Customer.Name}      
                        // defaultValue={Customer.Name}
                        variant="filled"
                        size='small'
                        />
              </Grid>
              {/* 3 */}
              <Grid item xs={6} md={4}>
                {/* <Item>3</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3}  marginTop={2}  paddingRight={35}  >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Personal ID</b>
              </Grid>

              {/* 4 */}
              <Grid item xs={6} md={4}>
                {/* <Item>4</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
              <TextField
                        disabled
                        id="filled-disabled"
                        label={Customer.ID_card}      
                        // defaultValue={Customer.Name}
                        variant="filled"
                        size='small'
                        />
              </Grid>
              {/* 5 */}
              <Grid item xs={6} md={4}>
                {/* <Item>5</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} marginTop={2} paddingRight={35}>
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Date of Birth</b>
              </Grid>
              {/* 6 */}
              <Grid item xs={6} md={4}>
                <center>
                <Button variant="contained" color="warning" onClick={handleStart} >
                    Edit Profile
                </Button>
              </center>
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
                        <TextField
                            disabled
                            id="filled-disabled"
                            label=""     
                            // defaultValue={Customer.Name}
                            variant="filled"
                            size='small'
                        />
              </Grid>
              {/* 7 */}
              <Grid item xs={6} md={4}>
                <center>
                <Button variant="contained" color="error" onClick={Delete}>
                    Deleate Account
                </Button>
                </center>
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={2} marginLeft={3} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Gender</b>
              </Grid>

              <Grid item xs={6} md={5} marginLeft={2} marginTop={2}>
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Career</b>
              </Grid>
              {/* 8 */}
              <Grid item xs={6} md={4}>
                {/* <Item>8</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={2} marginLeft={3} >
              <TextField
                            disabled
                            id="filled-disabled"
                            label={GENDER_NAME}
                            // defaultValue={Customer.GENDER.GenderName}
                            variant="filled"
                            size='small'
                        />
              </Grid>

              <Grid item xs={6} md={5} marginLeft={2}>
              <TextField
                            disabled
                            id="filled-disabled"
                            label={CAREER_NAME}
                            // defaultValue={Customer.GENDER.GenderName}
                            variant="filled"
                            size='small'
                        />
              </Grid>
              {/* 9 */}
              <Grid item xs={6} md={4}>
                {/* <Item>9</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} marginTop={2} >
              <b style={{ font: "Arial", color: "#000000", fontSize: 10 }}>Telephone Number</b>
              </Grid>
              {/* 10 */}
              <Grid item xs={6} md={4}>
                {/* <Item>10</Item> */}
              </Grid>
              
              <Divider orientation="vertical" sx={{padding: 2, }}  flexItem />

              <Grid item xs={6} md={7} marginLeft={3} paddingRight={35} >
              <TextField
                            disabled
                            id="filled-disabled"
                            label={Customer.Phone}
                            // defaultValue={Customer.Phone} 
                            variant="filled"
                            size='small'
                        />
              </Grid>


            </Grid>
            

          </Box>

        </Container>

      </Box>

    </Paper>
  );
}
export default CustomerShow;
