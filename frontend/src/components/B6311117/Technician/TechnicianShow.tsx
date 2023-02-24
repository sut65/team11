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
import {GenderTInterface,
    EducateInterface,
    PrefixTInterface,
    TechnicianInterface} from "../../../interfaces/TechnicianUI"
import TextField from "@mui/material/TextField"
import PersonIcon from '@mui/icons-material/Person';


import { CustomerInterface } from "../../../interfaces/CustomerUI";

import { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { alpha } from "@mui/material/styles";
import Swal from "sweetalert2"; // Alert text --> npm install sweetalert2





//TODO จัด Format เบอร์
import { IMaskInput } from "react-imask";
import Input from "@mui/material/Input";

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
          "0": /[0-9] || [a-z]/,
        }}
        inputRef={ref as React.RefObject<HTMLInputElement>}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const TextMaskCustomID_Card = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0-0000-00000-00-0"
        definitions={{
          "0": /[0-9] || [a-z]/,
        }}
        inputRef={ref as React.RefObject<HTMLInputElement>}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

function TechnicianShow({formCreate, setFormCreate, activeStep, setActiveStep }: any) {


const handleStart = () => {
    setActiveStep(activeStep + 1);
};

  //ระบุว่าใคร login เข้ามา
  const TechnicianID = parseInt(localStorage.getItem("uid") + "");



  const [DOB, setDOB] = useState<Dayjs | null>(dayjs());


  const [GENDER_NAME, setGENDER_NAME] = useState("");
  const [EDUCATE_NAME, setEDUCATE_NAME] = useState("");
  const [PREFIX_NAME, setPREFIX_NAME] = useState("");



  const convertType = (data: string | number | undefined | Float32Array) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  function Delete() {
    let data = {
        ID: TechnicianID,
    }

    const apiUrl = "http://localhost:8080/DeleteTechnician";
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

const [Location, setLocation] = useState("");
  //API Get Customer/id
  const [Technician, setTechnician] = React.useState<Partial<TechnicianInterface>>(
    {}
  );

  const getUser = async () => {
    const apiUrl = `http://localhost:8080/GetTechnician/${TechnicianID}`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setTechnician(res.data)
            setPREFIX_NAME(res.data.PREFIX.PrefixName)
            setEDUCATE_NAME(res.data.EDUCATE.EducateName)
            setGENDER_NAME(res.data.GENDER.GenderName)
            setLocation(res.data.Location)
            setDOB(res.data.DOB)
            console.log(Technician)
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
    "& .MuiOutlinedInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 30,

      alignContent: "center",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  return (

    <Paper style={{ backgroundColor: "#182E3E", borderRadius: 40 }}>
      <br />

      <Box sx={{ bgcolor: "#182E3E", height: "94vh", borderRadius: 40 }}>
        <Container maxWidth="lg">
          <br />
          <br />

          <Box
            sx={{
              bgcolor: "#FFFFFF",
              height: "87vh",
              paddingY: 0,
              borderRadius: 7,
            }}
          >
            <Grid container spacing={2} paddingX={7} marginRight={1}>
              <Grid item xs={6} md={4}></Grid>

              <Divider
                orientation="vertical"
                sx={{ padding: 2.35, marginTop: 2, marginBottom: 2 }}
                flexItem
              />
              <Grid item xs={6} md={2}>
                <br />
                <b style={{ font: "Arial", color: "#000000", fontSize: 30 }}>
                  My Profile
                </b>
                <br />
                <br />
              </Grid>
            </Grid>

            {/* //TODO Grid ใหญ่สุด  */}
            <Grid container maxWidth="lg" spacing={0} paddingX={5}>
              <br />

              {/*  //TODO Column1 */}
              <Grid item xs={6} md={4}>
                <Box
                  sx={{
                    width: 350,
                  }}
                >
                  <br />
                  <center>
                    <img
                      src="https://sv1.picz.in.th/images/2023/01/27/L4CDWe.png"
                      alt="L4CDWe.png"
                      width="220"
                      height="220"
                    />
                    <br />
                    <br />

                    {/* Button: Edit */}
                    <Grid item xs={8} md={8}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleStart}
                        sx={{
                          width: 300,
                          height: 46,
                          marginX: -10,
                          borderRadius: 6,
                          boxShadow: 7,
                          fontWeight: "bold",
                          fontSize: 15,
                        }}
                      >
                        Edit Profile
                      </Button>
                    </Grid>

                    <br />

                    {/* Button: Delete */}
                    {/* <Grid item xs={8} md={8}>
                      <center>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={PreDelete}
                          sx={{
                            width: 300,
                            height: 46,
                            marginX: -10,
                            borderRadius: 6,
                            boxShadow: 7,
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          Delete Account
                        </Button>
                      </center>
                    </Grid> */}
                  </center>
                </Box>
              </Grid>

              {/*  //TODO Line:vertical */}
              <Divider
                orientation="vertical"
                sx={{ padding: 2, marginTop: -2, marginBottom: 2, height: 550 }}
                flexItem
              />

              {/*  //TODO Column2 */}
              <Grid item xs={6} md={5} paddingX={5}>
                <Box
                  sx={{
                    width: 620,

                    marginY: -2,
                  }}
                >
                  <Grid container spacing={1} paddingX={0}>
                    {/* Row: 1 */}

                    <Grid item xs={6} md={3} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Prefix
                      </b>
                    </Grid>

                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Name
                      </b>
                    </Grid>

                    {/* Row: 2 */}

                    <Grid item xs={6} md={3} marginLeft={5}>
                      <RedditTextField
                        disabled
                        id="redditTextFields2"
                        value={PREFIX_NAME}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                      <RedditTextField
                        disabled
                        id="redditTextFields2"
                        value={Technician.Name}
                        sx={{ width: 300 }}
                      />
                    </Grid>

                    {/* Row: 3 */}
                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Personal ID
                      </b>
                    </Grid>

                    {/* Row: 4 */}
                    <Grid item xs={8} md={7} marginLeft={5}>
                      <FormControl variant="standard">
                        <Input
                          disabled
                          id="redditTextFieldsCreateNumber"
                          type="string"
                          value={Technician.ID_card}
                          disableUnderline
                          inputComponent={TextMaskCustomID_Card as any}
                        />
                      </FormControl>
                    </Grid>

                    {/* Row: 5 */}
                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Date of Birth
                      </b>
                    </Grid>

                    {/* Row: 6 */}
                    <Grid item xs={6} md={8} marginLeft={5}>
                      <RedditTextField
                        disabled
                        id="redditTextFields2"
                        value={dayjs(Technician.DOB).format("DD/MM/YYYY")}
                      />
                    </Grid>

                    {/* Row: 7 */}
                    <Grid item xs={6} md={3} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Gender
                      </b>
                    </Grid>

                    <Grid item xs={6} md={7} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Career
                      </b>
                    </Grid>

                    {/* Row: 8 */}
                    <Grid item xs={6} md={3} marginLeft={5}>
                      <RedditTextField
                        disabled
                        id="redditTextFields2"
                        value={GENDER_NAME}
                      />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                      <RedditTextField
                        disabled
                        id="redditTextFields2"
                        value={EDUCATE_NAME}
                        sx={{ width: 300 }}
                      />
                    </Grid>

                    {/* Row: 9 */}
                    <Grid item xs={6} md={8} marginLeft={5} marginTop={2}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Telephone Number
                      </b>
                    </Grid>

                    {/* Row: 10 */}
                    <Grid item xs={6} md={7} marginLeft={5}>
                      <FormControl variant="standard">
                        <Input
                          disabled
                          id="redditTextFieldsCreateNumber"
                          type="string"
                          value={Technician.Phone}
                          disableUnderline
                          inputComponent={TextMaskCustomPhone as any}
                        />
                      </FormControl>
                    </Grid>

                    {/* Row: 11 */}
                    <Grid item xs={6} md={8} marginLeft={5} marginTop={3}>
                      <b
                        style={{
                          font: "Arial",
                          color: "#000000",
                          fontSize: 14,
                        }}
                      >
                        Technician Address
                      </b>
                    </Grid>
                    {/* Row: 12 */}
                    <Grid item xs={6} md={7} marginLeft={5}>
                      <FormControl variant="standard">
                        <Input
                          id="redditTextFieldsCreateNumber"
                          disableUnderline
                          disabled
                          type="string"
                          value={Location}
                        />
                      </FormControl>
                    </Grid>
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
export default TechnicianShow;