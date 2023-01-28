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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DeviceInterface, TypeInterface, WindowsInterface } from "../../../interfaces/IDevice";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useNavigate } from 'react-router-dom';

function DeviceEdit() {
    const navigate = useNavigate();
    const userID = parseInt(localStorage.getItem("uid") + "");

    const update_successAlert = () => {
        Swal.fire({
            title: 'อัพเดทข้อมูลสำเร็จ',
            text: 'Click OK to exit.',
            icon: 'success'
        });
    }
    const update_errorAlert = () => {
        Swal.fire({
            title: 'อัพเดทข้อมูลไม่สำเร็จ',
            text: 'Click OK to exit.',
            icon: 'error'
        });
    }
    const delete_successAlert = () => {
        Swal.fire({
            title: 'ลบข้อมูลสำเร็จ',
            text: 'Click OK to exit.',
            icon: 'success'
        });
    }
    const delete_errorAlert = () => {
        Swal.fire({
            title: 'ลบข้อมูลไม่สำเร็จ',
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
       
    const [deviceID, setDeviceID] = React.useState('');
    const onChangeDevice = (event: SelectChangeEvent) => {
        setDeviceID(event.target.value as string);
    };

    const [device, setDevice] = React.useState<DeviceInterface[]>([]);
        const getDevice = async () => {
            const apiUrl = "http://localhost:8080/GetListDevice";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setDevice(res.data);
                }
            });
    };

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

    const update_f = () => {
        let data = {
            ID: convertType(deviceID),
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
    
        fetch("http://localhost:8080/UpdateDevice", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                update_successAlert();
                console.log("Success");
            } else {
                update_errorAlert();
                console.log("Error");
            }
          });
        // reset All after update
        setDeviceID("");
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

      const delete_f = () => {
        let data = {
            ID: convertType(deviceID),
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
    
        fetch("http://localhost:8080/DeleteDevice", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                delete_successAlert();
                console.log("Success");
            } else {
                delete_errorAlert();
                console.log("Error");
            }
          });
        // reset All after update
        setDeviceID("");
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
        getDevice();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            {/* <ResponsiveAppBar /> */}
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

                <Grid item xs={5} paddingLeft={76}>
                    <Typography align="right" fontSize={25} color="white">หมายเลขอุปกรณ์</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <Typography align="center" fontSize={25}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    style={{backgroundColor:"white"}}
                                    native
                                    value={deviceID}
                                    onChange={onChangeDevice}
                                    sx={{ width: 300 }}
                                    inputProps={{
                                    name: "deviceID",
                                    }}
                                >
                                <option aria-label="None" value="">
                                    กรุณาเลือกหมายเลขอุปกรณ์
                                </option>
                                {device.map((item: DeviceInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.ID}
                                </option>
                                ))}
                                </Select>
                            </FormControl><p />
                        </Typography>
                    </Grid>
                    <p/>

                    <Grid item xs={5} paddingLeft={83}>
                        <Typography align="right" fontSize={25} color="white">ชื่อสมาชิก</Typography>
                    </Grid>
                    <Grid item xs={7} >
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
    
                    <Grid item xs={5} paddingLeft={76}>
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
                    <Grid item xs={5} paddingLeft={76.3}>
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
                    <Grid item xs={5.5} paddingLeft={56.5}>  
                        <Typography align="right" fontSize={25} color="white">
                            ซีพียู&nbsp;&nbsp;&nbsp;
                            <TextField
                                style={{backgroundColor:"white"}}
                                id="cpu"
                                label="กรอกชื่อซีพียู"
                                value={cpu}
                                sx={{ width: 300 }}
                                variant="outlined"
                                onChange={(event) => setCPU(event.target.value)}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs={6.5} paddingLeft={16.8}>
                        <Typography align="right" fontSize={25} color="white">
                            จอ&nbsp;&nbsp;&nbsp;
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
                    <Grid item xs={5.5} paddingLeft={53}>  
                        <Typography align="right" fontSize={25} color="white">
                            การ์ดจอ&nbsp;&nbsp;
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
                    <Grid item xs={6.5} paddingLeft={16}>
                        <Typography align="right" fontSize={25} color="white">
                            แรม&nbsp;&nbsp;
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
                    <Grid item xs={5.5} paddingLeft={50}>  
                        <Typography align="right" fontSize={25} color="white">
                            ฮาร์ดดิสก์&nbsp;&nbsp;&nbsp; 
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
                    <Grid item xs={6.5} >
                        <Typography fontSize={25} color="white">
                            ปัญหาที่เคยเกิด&nbsp;&nbsp;&nbsp;
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
                    <Grid item xs={12} paddingLeft={110}>
                        <Typography align="right" fontSize={25} color="white">วันที่และเวลา</Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={4.5}/>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            onChange={(newValue) => setSaveTime(newValue)}
                            value={savetime}
                            renderInput={(params) => <TextField {...params} />}
                            componentsProps={{
                            actionBar: {
                                actions: ['today'],
                            },
                            }}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4.5}/>
                    <Grid item xs={3.8}/>
                    <Grid item xs={1}>
                        <Button sx={{ backgroundColor: "success" }} onClick={() => navigate(-1)} variant="contained">
                            ย้อนกลับ
                        </Button>
                    </Grid>
                    <Grid item xs={1.45}/>
                    <Grid item xs={0.8}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#C70039" }}
                            onClick={delete_f}>
                            ลบข้อมูล
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                        variant="contained"
                        color="success"
                        onClick={update_f}>
                            อัพเดทข้อมูล
                        </Button><p />
                    </Grid>
                </Grid>
            </Box>
            <br/><br/><br/>
        </Paper>
    )
}

export default DeviceEdit;