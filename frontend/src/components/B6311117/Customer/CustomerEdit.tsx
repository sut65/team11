import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  styled,
} from "@mui/material";

import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import {
  CareerInterface,
  CustomerInterface,
} from "../../../interfaces/CustomerUI";
import TextField from "@mui/material/TextField";

import { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { alpha } from "@mui/material/styles";

import "../Customer/Customer.css";

//TODO จัด Format เลขที่รับเข้ามา
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


function CustomerEdit({
  formCreate,
  setFormCreate,
  activeStep,
  setActiveStep,
}: any) {
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const customerID = parseInt(localStorage.getItem("uid") + "");

  const [ID_card, setID_card] = useState("");
  const [DOB, setDOB] = useState<Dayjs | null>(dayjs());

  const [GENDER_NAME, setGENDER_NAME] = useState("");
  const [CAREER_NAME, setCAREER_NAME] = useState("");

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
    var pphonee = phone.split("-");
    var pphonee2 = pphonee[0] + pphonee[1] + pphonee[2];

    let data = {
      ID: customerID,
      Name: NAMEa,
      CAREER_ID: convertType(Careera),
      Phone: pphonee2,
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
          setTimeout(() => {
            setActiveStep(0);
          }, 1500);
          console.log("Success");
        } else {
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
          setCustomer(res.data);
          setPREFIX_NAME(res.data.PREFIX.PrefixName);
          setCAREER_NAME(res.data.CAREER.CareerName);
          setGENDER_NAME(res.data.GENDER.GenderName);

          setPhone(res.data.Phone);

          setNAMEa(res.data.Name);

          setCareera(res.data.CAREER_ID);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUser();
    getCareer();
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

                    {/* Button: Done */}
                    <Grid item xs={8} md={8}>
                      <center>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={submit}
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
                          Done
                        </Button>
                      </center>
                    </Grid>

                    <br />

                    {/* Button: Back */}
                    <Grid item xs={8} md={8}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleBack}
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
                        Back
                      </Button>
                    </Grid>
                  </center>
                </Box>
              </Grid>

              {/* //TODO สิ้นสุด Column:1 */}

              <Divider
                orientation="vertical"
                sx={{ padding: 2, marginTop: -2, marginBottom: 2, height: 600 }}
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
                      />
                    </Grid>

                    <Grid item xs={8} md={7} marginLeft={5}>
                      <TextField
                        id="redditTextFields"
                        required
                        value={NAMEa}
                        variant="standard"
                        onChange={(event) => {
                          setNAMEa(event.target.value);
                          console.log(event.target.value);
                        }}
                        sx={{ width: 300, border: -10 }}
                        InputProps={
                          {
                            disableUnderline: true,
                          } as Partial<OutlinedInputProps>
                        }
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
                          disableUnderline
                          type="string"
                          value={Customer.ID_card}
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
                        value={dayjs(Customer.DOB).format("DD/MM/YYYY")}
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
                      <Select
                        id="redditTextFields"
                        native
                        value={Careera}
                        onChange={(event) => setCareera(event.target.value)}
                        sx={{ width: 300, borderRadius: 40 }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {Career.map((item: CareerInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.CareerName}{" "}
                            {/*ส่วนนี้คือการดึงไปจนถึง Order ID ของ ฟิว */}
                          </option>
                        ))}
                      </Select>
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
                          id="redditTextFieldsCreateNumber"
                          disableUnderline
                          type="string"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          name="textmask"
                          inputComponent={TextMaskCustomPhone as any}
                          placeholder="0XX-XXX-XXXX"
                        />
                      </FormControl>
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
