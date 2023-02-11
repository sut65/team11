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
import PersonIcon from '@mui/icons-material/Person';



//Grid
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CustomerEdit({ formCreate, setFormCreate, activeStep, setActiveStep , steps }: any) {

    const handleBack = () => {
        setActiveStep(activeStep - 1);
      };

      // const {CAREER_ID} = formCreate
      // const {Name} = formCreate
      // const {Phone} = formCreate
      // const {ID} = formCreate


//   const { CAREER_ID} = formCreate
//   const {Name, CAREER_ID, Phone} = formCreate
  //ระบุว่าใคร login เข้ามา
  const customerID = parseInt(localStorage.getItem("uid") + "");
  // const customerID = useState(1);
//   setFormCreate(({...formCreate,ID:customerID}))

//   const [Name, setName] = useState("");
  const [ID_card, setID_card] = useState("");
  const [DOB, setDOB] = useState<Dayjs | null>(dayjs());
//   const [Phone, setPhone] = useState("");

  const [GENDER_NAME, setGENDER_NAME] = useState("");
  const [CAREER_NAME, setCAREER_NAME] = useState("");
//   const [CAREER_ID, setCAREER_IDE] = useState("");
  const [PREFIX_NAME, setPREFIX_NAME] = useState("");

  const [Email, setEmail] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof CustomerEdit;
    const { value } = event.target;
    setCustomer({ ...Customer, [id]: value });
    setNAMEa(value);
};


  const convertType = (data: string | number | undefined | Float32Array) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  function submit() {

    let data = {
    //   ID: convertType(formCreate.ID as number),
      ID: customerID,
      Name: NAMEa,          
      CAREER_ID: convertType(Careera),
      Phone: phone,
    };

    

    const apiUrl = "http://localhost:8080/UpdateCustomer";
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                // console.log(data);
                // successAlert();
                setTimeout(() => {
                    setActiveStep(0)
                    // console.log(data);
                }, 1500)
                console.log("Success");
            } else {
                // errorAlert();
                console.log("Error");
            }
        });

}


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





  //API Get Customer/id
  const [NAMEa, setNAMEa] = useState("");
  const [phone, setPhone] = useState("");
  const [Careera, setCareera] = useState("");
  const [Customer, setCustomer] = React.useState<Partial<CustomerInterface>>({});
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
            // console.log(res.data)
            setCustomer(res.data)
            setPREFIX_NAME(res.data.PREFIX.PrefixName)
            setCAREER_NAME(res.data.CAREER.CareerName)
            setGENDER_NAME(res.data.GENDER.GenderName)

            setPhone(res.data.Phone)

            setNAMEa(res.data.Name)

            setCareera(res.data.CAREER_ID)
            
            
            // setDOB(res.data.DOB)
        }
     else {
        console.log("else");
      }
      });
  };

  useEffect(() => {
    getUser();
    getCareer();
    // setFormCreate(({...formCreate,ID:1})) // set CustomerID เอาไว้ระบุว่าจะแก้ไขไอดีไหน
  }, []);

  return (
    <Paper style={{ backgroundColor: "#182E3E" }}>
        <br />

      <Box sx={{ bgcolor: "#182E3E", height: "94vh" }}>
        <Container maxWidth="lg">
          <br />
          <br />

          <Box sx={{ bgcolor: "#f1f8e9", height: "87vh", paddingY: 0 }}>

          <Grid container spacing={2} paddingX={7} marginRight={1}>
            <Grid item xs={6} md={4}>
                
            </Grid>

            <Divider orientation="vertical" sx={{padding: 2.35, marginTop:2, marginBottom:2}}  flexItem />
            <Grid item xs={6} md={2}>
                    <br />  
                    <b style={{ font: "Arial", color: "#000000", fontSize: 20 }}>My Profile</b>
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

                    {/* Button: Done */}
                    <Grid item xs={8} md={8}>
                      <center>
                      <Button variant="contained" color="success" onClick={submit} sx={{ width: 300, height: 46, marginX:-10}}>
                          Done
                      </Button>
                      </center>
                    </Grid>

                    <br/>

                    {/* Button: Back */}
                    <Grid item xs={8} md={8} >
                      <Button variant="contained" color="warning" onClick={handleBack} sx={{ width: 300, height: 46, marginX:-10}}>
                          Back
                      </Button>
                    </Grid>



                  </center>

                  

                  </Box>
                </Grid>

                {/* //TODO สิ้นสุด Column:1 */}

              <Divider orientation="vertical" sx={{padding: 2, marginTop:-2, marginBottom:2}}  flexItem />





              {/*  //TODO Column2 */}
              <Grid item xs={6} md={5} paddingX={6.5}>
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
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Prefix</b>
                    </Grid>
              

                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Name</b>
                    </Grid>


                    {/* Row: 2 */}


                    <Grid item xs={6} md={3} marginLeft={5} >
                      <TextField
                          disabled
                          id="filled-disabled"
                          label={PREFIX_NAME}
                          // defaultValue={PREFIX_NAME}
                          variant="filled"
                          size="small"
                          />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                    <TextField
                              required
                              id="Name"
                              // label={Customer.Phone}
                              value={NAMEa} 
                              variant="filled"
                              size='small'
                              onChange={(event) => setNAMEa(event.target.value)}
                              sx={{width:300}}
                              // inputProps={{
                              //     name: "Name",
                              // }}
                              />
                    </Grid>

                    {/* Row: 3 */}
                    <Grid item xs={6} md={7} marginLeft={5}  marginTop={2}   >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Personal ID</b>
                    </Grid>

                    {/* Row: 4 */}
                    <Grid item xs={8} md={7} marginLeft={5}  >
                      <TextField
                                disabled
                                id="filled-disabled"
                                label={Customer.ID_card}      
                                // defaultValue={Customer.Name}
                                variant="filled"
                                size='small'
                                sx={{width:250}}
                                />
                    </Grid>



                    {/* Row: 5 */}
                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Date of Birth</b>
                    </Grid>


                    {/* Row: 6 */}
                    <Grid item xs={6} md={8} marginLeft={5} >
                        <TextField
                            disabled
                            id="filled-disabled"
                            label={dayjs(Customer.DOB).format('DD/MM/YYYY')}    
                            // label={dayjs(Customer.DOB).format('DD/MM/YYYY HH:mm:ss')}    
                            // defaultValue={Date}
                            variant="filled"
                            size='small'
                        />
                    </Grid>


                    {/* Row: 7 */}
                    <Grid item xs={6} md={3} marginLeft={5} marginTop={2} >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Gender</b>
                    </Grid>

                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Career</b>
                    </Grid>


                    {/* Row: 8 */}
                    <Grid item xs={6} md={3} marginLeft={5} >
                      <TextField
                                    disabled
                                    id="filled-disabled"
                                    label={GENDER_NAME}
                                    // defaultValue={Customer.GENDER.GenderName}
                                    variant="filled"
                                    size='small'
                                    // sx={{width:120}}
                                />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                    <FormControl  variant="outlined">
                        <Select
                        variant="filled"
                        size="small"
                        native
                        value={Careera}
                        onChange={(event) => setCareera(event.target.value)}
                        sx={{width:180}}
                        // inputProps={{
                        //     name: "CAREER_ID",
                        // }}
                        >
                          <option aria-label="None" value="">
                            คำนำหน้า                 
                          </option>
                        {Career.map((item: CareerInterface) => (
                            <option value={item.ID} key={item.ID}>
                             {item.CareerName}  {/*ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
                            </option>
                        ))}
                        </Select>
                    </FormControl>
                    </Grid>


                    {/* Row: 9 */}
                    <Grid item xs={6} md={8} marginLeft={5} marginTop={2} >
                      <b style={{ font: "Arial", color: "#000000", fontSize: 12 }}>Telephone Number</b>
                    </Grid>


                    {/* Row: 10 */}
                    <Grid item xs={6} md={7} marginLeft={5} >
                    <TextField
                            required
                            id="Phone"
                            // label={Customer.Phone}
                            value={phone} 
                            variant="filled"
                            size='small'
                            onChange={(event) => setPhone(event.target.value)}
                            // inputProps={{
                            //     name: "Phone",
                            // }}
                        />
                    </Grid>

                    </Grid>

                </Box>

                </Grid>
                {/* //TODO สิ้นสุด Column:2 */}



            </Grid>
            

          </Box>

        </Container>

      </Box>

    </Paper>
  );
}
export default CustomerEdit;
