import React, { useEffect } from "react";
import ResponsiveAppBar from '../../Bar_01';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import { Link as RouterLink } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from 'sweetalert2';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TypeInterface, WindowsInterface } from "../../../interfaces/IDevice";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useNavigate } from 'react-router-dom';


function DeviceCreate() {
    const navigate = useNavigate();
    const userID = parseInt(localStorage.getItem("uid") + "");

    const successAlert = () => {
        Swal.fire({
            title: 'บันทึกข้อมูลสำเร็จ',
            text: 'Click OK to exit.',
            icon: 'success'
        });
    }
    const errorAlert = () => {
        Swal.fire({
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'Click OK to exit.',
            icon: 'error'
        });
    }

    const [cpu, setCPU] = React.useState<String>("");
    const [monitor, setMonitor] = React.useState<String>("");
    const [gpu, setGPU] = React.useState<String>("");
    const [ram, setRAM] = React.useState<String>("");
    const [harddisk, setHarddisk] = React.useState<String>("");
    const [problem, setProblem] = React.useState<String>("");
    const [savetime, setSaveTime] = React.useState<Dayjs | null>(dayjs());
       
    const [typeID, setTypeID] = React.useState('');
    const onChangeType = (event: SelectChangeEvent) => {
        setTypeID(event.target.value as string);
    };

    const [windowsID, setWindowsID] = React.useState('');
    const onChangeWindows = (event: SelectChangeEvent) => {
        setWindowsID(event.target.value as string);
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const submit = () => {
        let data = {
            CPU: cpu,
            Monitor: monitor,
            GPU: gpu,
            RAM: ram,
            Harddisk: harddisk,
            Problem: problem,
            CustomerID: 1,
            TypeID: convertType(typeID),
            WindowsID: convertType(windowsID),
            Save_Time: savetime,
        }
        console.log(data);
    
        fetch("http://localhost:8080/CreateDevice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                successAlert();
                console.log("Success");
            } else {
                Swal.fire({
                    title: 'บันทึกไม่สำเร็จ',
                    text: res.error.split(";")[0],
                    icon: 'error'
                });
                console.log("Error");
            }
          });
        // reset All after Submit
        setCPU("");
        setMonitor("");
        setGPU("");
        setRAM("");
        setHarddisk("");
        setProblem("");
        setTypeID("");
        setWindowsID("");
        setSaveTime(null);
      }

        const [type, setType] = React.useState<TypeInterface[]>([]);
        const getType = async () => {
            const apiUrl = "http://localhost:8080/GetListType";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setType(res.data);
                }
            });
        };

        const [window, setWindow] = React.useState<WindowsInterface[]>([]);
        const getWindow = async () => {
            const apiUrl = "http://localhost:8080/GetListWindows";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setWindow(res.data);
                }
            });
        };

        const [userName, setUserName] = React.useState('');
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
                setUserName(res.data.Name);
                }
            });
        };


    useEffect(() => {
        getUser();
        getWindow();
        getType();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            <Box>
            <Typography
                component="h2"
                variant="h4"
                color="#558b2f"
                gutterBottom
                fontFamily="Arial"
                align="center"
                mt={3}
                mb={3}
                bgcolor="#182e3e"
            >
                <b>ระบบอุปกรณ์ผู้แจ้ง</b>
            </Typography>
            </Box>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >
                        <Typography align="right" fontSize={25} color="white">ชื่อสมาชิก</Typography>
                    </Grid>
                    <Grid item xs={3.5} >
                        <TextField
                        style={{backgroundColor:"white"}}
                        sx={{ width: 300 }}
                        id="outlined-read-only-input"
                        value={userName}
                        InputProps={{
                            readOnly: true,
                        }}
                        /><p/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button sx={{ backgroundColor: "#A75D5D" }} component={RouterLink} to="/DeviceEditPage" variant="contained">
                            แก้ไข/ลบข้อมูล
                        </Button>
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >
                    <Typography align="right" fontSize={25} color="white">ประเภทอุปกรณ์</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <Typography align="center" fontSize={25}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    style={{backgroundColor:"white"}}
                                    native
                                    value={typeID}
                                    onChange={onChangeType}
                                    sx={{ width: 300 }}
                                    inputProps={{
                                    name: "typeID",
                                    }}
                                >
                                <option aria-label="None" value="">
                                    กรุณาเลือกประเภทอุปกรณ์
                                </option>
                                {type.map((item: TypeInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.Type_Name}
                                </option>
                                ))}
                                </Select>
                            </FormControl><p />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">ระบบปฎิบัติการ</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    style={{backgroundColor:"white"}}
                                    native
                                    value={windowsID}
                                    onChange={onChangeWindows}
                                    sx={{ width: 300 }}
                                    inputProps={{
                                    name: "windowsID",
                                    }}
                                >
                                <option aria-label="None" value="">
                                    กรุณาเลือกระบบปฎิบัติการ
                                </option>
                                {window.map((item: WindowsInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.Windows_Name}
                                </option>
                                ))}
                                </Select>
                            </FormControl><p />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>  
                        <Typography align="right" fontSize={25} color="white">
                            ซีพียู
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                            <FormControl fullWidth variant="outlined">
                            <TextField
                                style={{backgroundColor:"white"}}
                                id="cpu"
                                label="กรอกชื่อซีพียู"
                                value={cpu}
                                sx={{ width: 300 }}
                                variant="outlined"
                                onChange={(event) => setCPU(event.target.value)}
                            />
                            </FormControl><p />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >
                        <Typography align="right" fontSize={25} color="white">
                            จอ
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                            <TextField
                                style={{backgroundColor:"white"}}
                                id="monitor"
                                label="กรอกชื่อจอ"
                                value={monitor}
                                sx={{ width: 300 }}
                                variant="outlined"
                                onChange={(event) => setMonitor(event.target.value)}
                            />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >  
                        <Typography align="right" fontSize={25} color="white">
                            การ์ดจอ
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                        <TextField
                                style={{backgroundColor:"white"}}
                                id="monitor"
                                label="กรอกชื่อการ์ดจอ"
                                value={gpu}
                                sx={{ width: 300 }}
                                variant="outlined"
                                onChange={(event) => setGPU(event.target.value)}
                            />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >
                        <Typography align="right" fontSize={25} color="white">
                            แรม
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                        <TextField
                                style={{backgroundColor:"white"}}
                                id="ram"
                                label="กรอกชื่อแรม"
                                value={ram}
                                sx={{ width: 300 }}
                                variant="outlined"
                                onChange={(event) => setRAM(event.target.value)}
                            />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >  
                        <Typography align="right" fontSize={25} color="white">
                            ฮาร์ดดิสก์
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                        <TextField
                                style={{backgroundColor:"white"}}
                                id="harddisk"
                                label="กรอกชื่อฮาร์ดดิสก์"
                                value={harddisk}
                                sx={{ width: 300 }}
                                variant="outlined"
                                onChange={(event) => setHarddisk(event.target.value)}
                            />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >
                        <Typography fontSize={25} color="white">
                            ปัญหาที่เคยเกิด
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                        <TextField
                                style={{backgroundColor:"white"}}
                                id="problem"
                                sx={{ width: 300 }}
                                multiline
                                rows={4}
                                value={problem}
                                label="หมายเหตุ"
                                onChange={(event) => setProblem(event.target.value)}
                            />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={2} >
                        <Typography align="right" fontSize={25} color="white">วันที่และเวลา</Typography>
                    </Grid>
                    <Grid item xs={2.5} bgcolor="white">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={savetime}
                            onChange={(newValue) => {
                            setSaveTime(newValue);
                            }}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={1}>
                        <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                            ย้อนกลับ
                        </Button>
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={1.2}>
                        <Button sx={{ backgroundColor: "success" }} component={RouterLink} to="/DeviceShowPage" variant="contained">
                            แสดงข้อมูล
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                        variant="contained"
                        color="success"
                        onClick={submit}>
                            บันทึกข้อมูล
                        </Button><p />
                    </Grid>
                </Grid>
            </Box>
            <br/><br/><br/>
        </Paper> 
    )
}

export default DeviceCreate;