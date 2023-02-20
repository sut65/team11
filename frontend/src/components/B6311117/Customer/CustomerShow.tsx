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
// import ResponsiveAppBar_01 from "../../Bar_01";
import PersonIcon from '@mui/icons-material/Person';
import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha } from '@mui/material/styles';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2

import "../Customer/Customer.css" 





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
  const customerID = parseInt(localStorage.getItem("uid") + "");
  // const customerID = useState(1);

  const [Name, setName] = useState("");
  const [ID_card, setID_card] = useState("");
  const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
  const [Date, setDate] = useState("");
  const [Phone, setPhone] = useState("");

  const [GENDER_NAME, setGENDER_NAME] = useState("");
  const [CAREER_NAME, setCAREER_NAME] = useState("");
  const [PREFIX_NAME, setPREFIX_NAME] = useState("");

  const [Email, setEmail] = useState("");

  const convertType = (data: string | number | undefined | Float32Array) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  
  

  
  // const [Aerror, setAerror] = useState(false);

  function PreDelete(){
    
    
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Typing Your Password for Delete Account',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (Password) => {
              let data ={
                Password: Password
              }
              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              };
              
              // ok
                 let Password2 = fetch(`http://localhost:8080/PreDeleteCustomer/${customerID}`, requestOptions ) //เอาตรงนี้ไปเช็ค PS
                 .then((response) => response.json())
                 .then(Password2 => {
                   // console.log(Password2)
                   console.log(Password2.data)
                if (Password2.data === true) {
                  console.log("Delete Account Success")
                  {Delete()}
                  
                  Swal.fire({
                    icon: 'success',
                    title: `Delete Accout Success`,
                  }, )

                  // setAerror(false)
                  
                  return
                }
                else{
                  // console.log("Aerror")
                  // setAerror(true)
                  // console.log(Aerror)

                  Swal.fire({
                    icon: 'error',
                    title: `Wrong Password`,
                  }, )

                }


                // Swal.fire({
                //   timer:1500
                // }, )

                // if (Aerror != false) {
                //   console.log("เข้ามาแล้ว")
                //   Swal.fire({
                //     icon: 'error',
                //     title: `Wrong Password`,
                //   }, )
                // }

                // else{
                  //   console.log("Cannot Delete Account")
                  //           Swal.fire({
                    //             icon: 'error',
                    //             title: `"Wrong Password `,
                    //           }, )
                    
                    // }
                    

                    // if (!Password.ok) { //err
                    //   throw new Error(Password.statusText)
                    // }
                    // ถ้า Password ตรง
                  })
                  .catch(error => { // ถ้าไม่ตรง
                    Swal.showValidationMessage(
                      `Request failed: ${error}` //ผิดจะ โชว์ข้อความนี้
                      )
                    })
                  },


                


                  
                  // allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => { // ถูกให้ทำอะไร
                  // console.log(Aerror)
                  // if (Aerror != false) {
                  //   Swal.fire({
                  //     icon: 'error',
                  //     title: `Wrong Password`,
                  //   }, )
                  // }
                  
                }) 
                
              

              }
            })
            
          }
          
          
          function Delete() {
            let data = {
              ID: customerID,
            }
            
      
      // const pwd = {
        //   Password: "",
        // };
        // const [password, setPassword] = useState(pwd)
    // async function SignInCus(data: any) {
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   };
    
    //   let res = await fetch(`${apiUrl}/SignInCustomer`, requestOptions)
    //     .then((response) => response.json())
    //     .then((res) => {
    //       console.log('Log:', res);
    
    //       if (res.data) {
    //         localStorage.setItem("token", res.data.token);
    //         localStorage.setItem("uid", res.data.id);
    //         localStorage.setItem("role", res.data.role);
    //         return res.data;
    //       } else {
    //         return false;
    //       }
    //     });
    
    //   return res;
    // }



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
                setTimeout(() => {
                    console.log(data);
                    localStorage.clear();
                    window.location.href = "/";
                }, 3000)
                console.log("Delete Account Success");
            } else {
                console.log("Delete Account Error");
            }
        });
}

  //API Get Customer/id
  const [Customer, setCustomer] = React.useState<Partial<CustomerInterface>>(
    {}
  );

  const getUser = async () => {
    const apiUrl = `http://localhost:8080/GetCustomer/${customerID}`;
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
            setDate(res.data.DOB)
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

  // TODO Functions component styles ต่างๆ

  //* TextField วงกลม
  const RedditTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 30,
      // paddingX: -30 ,
      // fontSize: 20,
      // width: 'auto',
      // position: 'center',
      // textAlign: 'center',
      alignContent: 'center',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));



  //สีไข่ f1f8e9

  return (
    
    <Paper style={{ backgroundColor: "#182E3E", borderRadius: 40 }}>
        <br />


      <Box sx={{ bgcolor: "#182E3E", height: "94vh", borderRadius: 40 }}>
        <Container maxWidth="lg">
          <br />
          <br />

        
          <Box sx={{ bgcolor: "#FFFFFF", height: "87vh", paddingY: 0, borderRadius: 7 }}> 

          <Grid container spacing={2} paddingX={7} marginRight={1}>
            <Grid item xs={6} md={4}>
                
            </Grid>

            <Divider orientation="vertical" sx={{padding: 2.35, marginTop:2, marginBottom:2}}  flexItem />
            <Grid item xs={6} md={2}>
                    <br />  
                    <b style={{ font: "Arial", color: "#000000", fontSize: 30 }}>My Profile</b>
                    <br />
                    <br />

            </Grid>

          </Grid>
          
            {/* //TODO Grid ใหญ่สุด  */}
            <Grid container maxWidth="lg" spacing={0} paddingX={5}>
            <br/>

            {/*  //TODO Column1 */}
                <Grid item xs={6} md={4}>
                <Box sx={{
                    width: 350,
                    // height: 600,
                    // bgcolor: "#DCDCDC",
                    // bgcolor: "#f1f8e9"
                }}>
                  <br/>
                  <center>
                    <img src="https://sv1.picz.in.th/images/2023/01/27/L4CDWe.png" alt="L4CDWe.png" width="220" height="220" />
                    <br/>
                    <br/>

                    {/* Button: Edit */}
                    <Grid item xs={8} md={8} >
                      <Button variant="contained" color="warning" onClick={handleStart} sx={{ width: 300, height: 46, marginX:-10, borderRadius: 6 ,boxShadow: 7, fontWeight: 'bold', fontSize: 15}} >
                          Edit Profile
                      </Button>
                    </Grid>

                    <br/>

                    {/* Button: Delete */}
                    <Grid item xs={8} md={8}>
                      <center>
                      <Button variant="contained" color="error" onClick={PreDelete} sx={{ width: 300, height: 46, marginX:-10, borderRadius: 6 ,boxShadow: 7, fontWeight: 'bold', fontSize: 15 }}>
                          Delete Account
                      </Button>
                      </center>
                    </Grid>

                  </center>

                  

                  </Box>
                </Grid>

              {/*  //TODO Line:vertical */}
              <Divider orientation="vertical" sx={{padding: 2, marginTop:-2, marginBottom:2, height:550}}  flexItem />




                {/*  //TODO Column2 */}
                <Grid item xs={6} md={5} paddingX={5}>
                  <Box sx={{
                      width: 620,
                      // height: 600,
                      // bgcolor: "#f1f8e9",
                      // bgcolor: "#DCDCDC",
                      marginY: -2
                  }}>

                    <Grid container spacing={1} paddingX={0}>

                    {/* Row: 1 */}

                    <Grid item xs={6} md={3} marginLeft={5} marginTop={2} >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Prefix</b>
                    </Grid>
              

                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Name</b>
                    </Grid>


                    {/* Row: 2 */}


                    <Grid item xs={6} md={3} marginLeft={5} >
                        
                        <RedditTextField
                        // sx={{textAlign: 'center'}}
                        disabled
                        id="redditTextFields2"
                        value={PREFIX_NAME}
                        // style={styles.textField}
                        // style={{fontSize:30}}
                        variant="outlined"
                        // defaultValue={PREFIX_NAME}
                        // variant="filled"
                        // size="small"
                        />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                    <RedditTextField
                              disabled
                              id="redditTextFields2"
                              value={Customer.Name}      
                              // defaultValue={Customer.Name}
                              // variant="filled"
                              // size='small'
                              sx={{width:300}}
                              />
                    </Grid>

                    {/* Row: 3 */}
                    <Grid item xs={6} md={7} marginLeft={5}  marginTop={2}   >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Personal ID</b>
                    </Grid>

                    {/* Row: 4 */}
                    <Grid item xs={8} md={7} marginLeft={5}  >
                      <RedditTextField
                                disabled
                                id="redditTextFields2"
                                value={Customer.ID_card}      
                                // defaultValue={Customer.Name}
                                // variant="filled"
                                // size='small'
                                sx={{width:250}}
                                />
                    </Grid>



                    {/* Row: 5 */}
                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Date of Birth</b>
                    </Grid>


                    {/* Row: 6 */}
                    <Grid item xs={6} md={8} marginLeft={5} >
                        <RedditTextField
                            disabled
                            id="redditTextFields2"
                            value={dayjs(Customer.DOB).format('DD/MM/YYYY')}    
                            // label={dayjs(Customer.DOB).format('DD/MM/YYYY HH:mm:ss')}    
                            // defaultValue={Date}
                            // variant="filled"
                            // size='small'
                        />
                    </Grid>


                    {/* Row: 7 */}
                    <Grid item xs={6} md={3} marginLeft={5} marginTop={2} >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Gender</b>
                    </Grid>

                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Career</b>
                    </Grid>


                    {/* Row: 8 */}
                    <Grid item xs={6} md={3} marginLeft={5} >
                      <RedditTextField
                                    disabled
                                    id="redditTextFields2"
                                    value={GENDER_NAME}
                                    // defaultValue={Customer.GENDER.GenderName}
                                    // variant="filled"
                                    // size='small'
                                    // sx={{width:120}}
                                />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                      <RedditTextField
                                    disabled
                                    id="redditTextFields2"
                                    value={CAREER_NAME}
                                    // defaultValue={Customer.GENDER.GenderName}
                                    // variant="filled"
                                    // size='small'
                                    sx={{width:300}}
                                />
                    </Grid>


                    {/* Row: 9 */}
                    <Grid item xs={6} md={8} marginLeft={5} marginTop={2} >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 14 }}>Telephone Number</b>
                    </Grid>


                    {/* Row: 10 */}
                    <Grid item xs={6} md={7} marginLeft={5} >
                      <RedditTextField
                                    disabled
                                    id="redditTextFields2"
                                    value={Customer.Phone}
                                    sx={{width:300}}
                                    // defaultValue={Customer.Phone} 
                                    // variant="filled"
                                    // size='small'
                                />
                    </Grid>


                    {/* Row: 11 */}






                    </Grid>

                </Box>

                </Grid>

            </Grid>

          </Box>

        </Container>

      </Box>

    </Paper>
  );
}
export default CustomerShow;
