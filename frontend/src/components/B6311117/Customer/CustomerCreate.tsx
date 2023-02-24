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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {GenderInterface,
  CareerInterface,
  PrefixInterface,
  CustomerInterface} from "../../../interfaces/CustomerUI"
import TextField from "@mui/material/TextField";

import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha } from '@mui/material/styles';

import OutlinedInput from '@mui/material/OutlinedInput';

import "../Customer/Customer.css"

//TODO จัด Format เลขที่รับเข้ามา
import { IMaskInput } from 'react-imask';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import { LinearProgressProps } from '@mui/material/LinearProgress';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustomPhone = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000-000-0000"
        definitions={{
          '0': /[0-9] || [a-z]/,
        }}
        inputRef={ref as React.RefObject<HTMLInputElement>} 
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const TextMaskCustomID_Card = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0-0000-00000-00-0"
        definitions={{
          '0': /[0-9] || [a-z]/,
        }}
        inputRef={ref as React.RefObject<HTMLInputElement>} 
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);





// //TODOGrid
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// //TODOprocess ข้างบน
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
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//       backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//       borderRadius: 5,
//       backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
//     },
//   }));

//   function FacebookCircularProgress(props: CircularProgressProps) {
//     return (
//       <Box sx={{ position: 'relative' }}>
//         <CircularProgress
//           variant="determinate"
//           sx={{
//             color: (theme) =>
//               theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
//           }}
//           size={40}
//           thickness={4}
//           {...props}
//           value={100}
//         />
//         <CircularProgress
//           variant="indeterminate"
//           disableShrink
//           sx={{
//             color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
//             animationDuration: '550ms',
//             position: 'absolute',
//             left: 0,
//             [`& .${circularProgressClasses.circle}`]: {
//               strokeLinecap: 'round',
//             },
//           }}
//           size={40}
//           thickness={4}
//           {...props}
//         />
//       </Box>
//     );
//   }


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

    //TODO ตัวนับ Progress ด้านบน
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    // }, 800);
    // return () => {
    //   clearInterval(timer);
    // };


  }, []);

  //TODO ตัวนับ Progress ด้านบน
  const [progress, setProgress] = React.useState(0);
  
  const [input2, setInput2] = React.useState('');
  const [input3, setInput3] = React.useState('');
  const [input4, setInput4] = React.useState('');
  const [input5, setInput5] = React.useState('');
  const [input6, setInput6] = React.useState('');
  const [input7, setInput7] = React.useState('');
  const [input8, setInput8] = React.useState('');
  
  // const [input, setinput] = React.useState('');

  
  
  return (
    <Paper style={{ backgroundColor: "rgba(24,46,62,0.5)", borderRadius: 40}} >
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
      
      {/* <div> */}

        <Box sx={{ backgroundColor: "rgba(255,255,255,1)", height: 'auto', marginY: 4 ,borderRadius: 7 }} >

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
                  {/* <br/> */}
                  <LinearProgressWithLabel value={progress} />
                </Grid>
            </Grid>

            <Divider variant="middle" />
            <br />

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

                <Grid container item xs={2} marginLeft={9}  >
                    {/* <FormControl fullWidth variant="standard"> */}
                        <Select
                        id="redditTextFieldsCreateCombo"
                        native
                        value={PREFIX_ID}
                        onChange={(event) => setFormCreate(({...formCreate,PREFIX_ID:event.target.value}))}
                        variant="standard"
                        disableUnderline
                        onBlur={(PREFIX_ID) => {
                          console.log("format: "+formCreate.PREFIX_ID.length)
                          console.log("input: "+input2.length)
                          console.log("")
                          //TODO ได้ละ
                          if ((formCreate.PREFIX_ID.length)/30 > input2.length){
                            setProgress((num) => num + 7.14);
                            setInput2(formCreate.PREFIX_ID)
                          }
                          //TODO สลาย
                          else if ((formCreate.PREFIX_ID.length - input2.length)+1 ===  (-input2.length) || (formCreate.PREFIX_ID.length== 0 && input2.length != 0 )){
                            setProgress((num) => num - 7.14);
                            setInput2(formCreate.PREFIX_ID)
                          }
                          //TODO คงเดิม
                          else if (((formCreate.PREFIX_ID.length) - input2.length) < (input2.length)){
                            setProgress((num) => num );
                            setInput2(formCreate.PREFIX_ID)
                          }
                          console.log(formCreate.PREFIX_ID.length - input2.length);
                          
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
                    {/* </FormControl> */}
                </Grid>
                
                <Grid container item xs={7} marginLeft={8} >
                  <TextField
                    id="redditTextFieldsCreate"
                    variant="standard"
                    type="string"
                    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                    // size="small"
                    // fullWidth
                    // sx={{width: 482, height: 20}}
                    value={Name}
                    placeholder="Enter your Name" 
                    onChange={(event) => setFormCreate(({...formCreate,Name:event.target.value}))}
                    onBlur={(Name) => {
                      console.log("format: "+formCreate.Name.length)
                      console.log("input: "+input3.length)
                      console.log("")
                      //TODO ได้ละ
                      if ((formCreate.Name.length)/30 > input3.length){
                        setProgress((num) => num + 7.14);
                        setInput3(formCreate.Name)
                      }
                      //TODO สลาย
                      else if ((formCreate.Name.length - input3.length)+1 ===  (-input3.length) || (formCreate.Name.length== 0 && input3.length != 0 )){
                        setProgress((num) => num - 7.14);
                        setInput3(formCreate.Name)
                      }
                      //TODO คงเดิม
                      else if (((formCreate.Name.length) - input3.length) < (input3.length)){
                        setProgress((num) => num );
                        setInput3(formCreate.Name)
                      }
                      console.log(formCreate.Name.length - input3.length);
                      
                    }}
                    />
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid  item xs={8} marginLeft={8}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Personal ID
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid container item xs={7} marginLeft={8} >
                    {/* <TextField
                        id="redditTextFieldsCreate"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        type="string"
                        // size="medium"    
                        value={ID_card}
                        placeholder="X-XXXX-XXXXX-XX-X" 
                        onChange={(event) => setFormCreate(({...formCreate,ID_card:event.target.value}))}
                    /> */}
                    <FormControl variant="standard">
                    <Input
                        id="redditTextFieldsCreate"
                        disableUnderline
                        type="string"
                        // value={inPhone1}
                        value={ID_card}
                        // value={values.textmask}
                        onChange={(event) => setFormCreate(({...formCreate,ID_card:event.target.value}))}
                        // onChange={(event) => setPPhone(({...PPhone,inPhone1:event.target.value}), console.log(event.target.value))}
                        // onChange={handleChangePhone}
                        name="textmask"
                        inputComponent={TextMaskCustomID_Card as any}
                        placeholder="X-XXXX-XXXXX-XX-X" 
                        onBlur={(ID_card) => {
                          console.log("format: "+formCreate.ID_card.length)
                          console.log("input: "+input4.length)
                          console.log("")
                          //TODO ได้ละ
                          if ((formCreate.ID_card.length)/30 > input4.length){
                            setProgress((num) => num + 7.14);
                            setInput4(formCreate.ID_card)
                          }
                          //TODO สลาย
                          else if ((formCreate.ID_card.length - input4.length)+1 ===  (-input4.length) || (formCreate.ID_card.length== 0 && input4.length != 0 )){
                            setProgress((num) => num - 7.14);
                            setInput4(formCreate.ID_card)
                          }
                          //TODO คงเดิม
                          else if (((formCreate.ID_card.length) - input4.length) < (input4.length)){
                            setProgress((num) => num );
                            setInput4(formCreate.ID_card)
                          }
                          console.log(formCreate.ID_card.length - input4.length);
                          
                        }}
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
                <Grid container item xs={7} marginLeft={8}>
                    <FormControl variant="outlined" sx={{width:400}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DesktopDatePicker
                          // className="DeskTopDate" 
                          // InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                          // componentsProps={{}}
                          // className="MuiPaper-root" 
                          // disableMaskedInput                   
                          inputFormat="DD/MM/YYYY"
                          renderInput={(params) => <TextField {...params} />}
                          value={DOB}
                          onChange={(newValue) => setFormCreate(({...formCreate,DOB:newValue}), setProgress((num) => num))}
                          
                          />
                      </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={2} marginLeft={35} >
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Gender
                    </b>
                </Grid>
                <Grid item xs={4} marginLeft={5}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Career
                    </b>
                </Grid>

                <Grid container item xs={2} marginLeft={35  } >
                  {/* <FormControl fullWidth variant="outlined"> */}
                          <Select
                          id="redditTextFieldsCreateCombo"
                          native
                          value={GENDER_ID}
                          onChange={(event) => setFormCreate(({...formCreate,GENDER_ID:event.target.value}), setProgress((prevProgress) => (prevProgress >= 50 ? 10 : 35)))}
                          inputProps={{
                              name: "GENDER_ID",
                          }}
                          variant="standard"
                          disableUnderline
                          onBlur={(GENDER_ID) => {
                            console.log("format: "+formCreate.GENDER_ID.length)
                            console.log("input: "+input6.length)
                            console.log("")
                            //TODO ได้ละ
                            if ((formCreate.GENDER_ID.length)/40 > input6.length){
                              setProgress((num) => num + 7.14);
                              setInput6(formCreate.GENDER_ID)
                            }
                            //TODO สลาย
                            else if ((formCreate.GENDER_ID.length - input6.length)+1 ===  (-input6.length) || (formCreate.GENDER_ID.length== 0 && input6.length != 0 )){
                              setProgress((num) => num - 7.14);
                              setInput6(formCreate.GENDER_ID)
                            }
                            //TODO คงเดิม
                            else if (((formCreate.GENDER_ID.length) - input6.length) < (input6.length)){
                              setProgress((num) => num );
                              setInput6(formCreate.GENDER_ID)
                            }
                            console.log(formCreate.GENDER_ID.length - input6.length);
                            
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
                    {/* </FormControl> */}
                </Grid>
                <Grid container item xs={4} marginLeft={5}>
                  {/* <FormControl fullWidth variant="outlined"> */}
                        <Select
                        id ="redditTextFieldsCreateComboCareer"
                        native
                        value={CAREER_ID}
                        onChange={(event) => setFormCreate(({...formCreate,CAREER_ID:event.target.value}), setProgress((prevProgress) => (prevProgress >= 50 ? 10 : 42)) )}
                        inputProps={{
                            name: "CAREER_ID",
                        }}
                        variant="standard"
                        disableUnderline
                        onBlur={(CAREER_ID) => {
                          console.log("format: "+formCreate.CAREER_ID.length)
                          console.log("input: "+input7.length)
                          console.log("")
                          //TODO ได้ละ
                          if ((formCreate.CAREER_ID.length)/30 > input7.length){
                            setProgress((num) => num + 7.14);
                            setInput7(formCreate.CAREER_ID)
                          }
                          //TODO สลาย
                          else if ((formCreate.CAREER_ID.length - input7.length)+1 ===  (-input7.length) || (formCreate.CAREER_ID.length== 0 && input7.length != 0 )){
                            setProgress((num) => num - 7.14);
                            setInput7(formCreate.CAREER_ID)
                          }
                          //TODO คงเดิม
                          else if (((formCreate.CAREER_ID.length) - input7.length) < (input7.length)){
                            setProgress((num) => num );
                            setInput7(formCreate.CAREER_ID)
                          }
                          console.log(formCreate.CAREER_ID.length - input7.length);
                          
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
                  {/* </FormControl> */}
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid item xs={8} marginLeft={8}>
                <b style={{ font: "Arial", color: "#000000", fontSize: 13 }} >
                        Telephone Number
                    </b>
                </Grid>

                <Grid item xs={2} marginLeft={9} ></Grid>
                <Grid container item xs={7} marginLeft={8} >
                    {/* <TextField
                        id="redditTextFieldsCreate"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        type="string"
                        // size="medium"
                        value={Phone}
                        placeholder="0XX-XXX-XXXX" 
                        onChange={(event) => setFormCreate(({...formCreate,Phone:event.target.value}))}
                    /> */}
                  <FormControl variant="standard">
                    <Input
                        id="redditTextFieldsCreate"
                        disableUnderline
                        type="string"
                        // value={inPhone1}
                        value={Phone}
                        // value={values.textmask}
                        onChange={(event) => setFormCreate(({...formCreate,Phone:event.target.value}) , setProgress((prevProgress) => (prevProgress > 50 ? 10 : 50)))}
                        // onChange={(event) => setPPhone(({...PPhone,inPhone1:event.target.value}), console.log(event.target.value))}
                        // onChange={handleChangePhone}
                        name="textmask"
                        inputComponent={TextMaskCustomPhone as any}
                        placeholder="0XX-XXX-XXXX" 
                        onBlur={(Phone) => {
                          console.log("format: "+formCreate.Phone.length)
                          console.log("input: "+input8.length)
                          console.log("")
                          //TODO ได้ละ
                          if ((formCreate.Phone.length)/30 > input8.length){
                            setProgress((num) => num =50);
                            setInput8(formCreate.Phone)
                          }
                          //TODO สลาย
                          else if ((formCreate.Phone.length - input8.length)+1 ===  (-input8.length) || (formCreate.Phone.length== 0 && input8.length != 0 )){
                            setProgress((num) => num =50);
                            setInput8(formCreate.Phone)
                          }
                          //TODO คงเดิม
                          else if (((formCreate.Phone.length) - input8.length) < (input8.length)){
                            setProgress((num) => num =50 );
                            setInput8(formCreate.Phone)
                          }
                          console.log(formCreate.Phone.length - input8.length);
                          
                        }}
                    />
                  </FormControl>




                    
                </Grid>

            </Grid>
            
            <br/>
            <Grid container spacing={5} paddingX={7} paddingY={3} >
                <Grid item xs={12} padding={2}>
                  {/* <Button size="large" sx={{ backgroundColor: "#C70039", fontSize: 20 }} component={RouterLink} to="/" variant="contained"  >
                    ย้อนกลับ
                  </Button> */}
                  <Button
                    style={{ float: "right", fontSize: 20, width:150, marginRight:-15 }}
                    id="buttonNext"
                    onClick={handleStart}
                    // component={RouterLink} to="/CustomerCreate2" 
                    variant="contained"
                    // color="success"
                    size="large"
                  >
                    <b>Next</b>
                  </Button>


                  <Button
                    style={{ float: "left", fontSize: 20, width:150, color:"#f27070"  }}
                    id="buttonBack"
                    // onClick={handleStart}
                    onClick={Back}
                    variant="contained"
                    // color="error"
                    size="large"
                  >
                    <b>Back</b>
                  </Button>
                </Grid>
            </Grid>

        </Box>
      {/* </div> */}
    </Container>



      </Box>

    </Paper>
  );
}
export default CustomerCreate;
