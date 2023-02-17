import "./css/devicestyle.css";
import React, { useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import { Link as RouterLink } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from 'sweetalert2';
import dayjs, { Dayjs } from 'dayjs';
import { TypeInterface, WindowsInterface } from "../../../interfaces/IDevice";
import { useNavigate } from 'react-router-dom';

function DeviceCreate() {

    const navigate = useNavigate();
    const userID = parseInt(localStorage.getItem("uid") + "");

    const successAlert = () => {
        Swal.fire({
            title: 'บันทึกข้อมูลสำเร็จ',
            text: 'Click OK to exit.',
            icon: 'success'
        }).then(() =>{
            navigate({
                pathname: `/DeviceShowPage/`
            })
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
            CustomerID: convertType(userID),
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
            const apiUrl = `http://localhost:8080/GetCustomer/${userID}`;
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

        const dateTime= setInterval(() => {
            setSaveTime(dayjs());
          }, 1000);
        
          return () => {
            clearInterval(dateTime);
          };

    }, []);

    return (
        <div className="container">
            <div className="topic">

            <h1 className="header">ระบบอุปกรณ์ผู้แจ้ง</h1>
            <div className="info">
            <ul>
                <li>Customer : {userName}</li>
                <li>Datetime : {savetime ? savetime.format("DD/MM/YYYY HH:mm:ss") : ''}</li>
            </ul>
            </div>
            </div>
            <hr className="line"/>

            <div className="text-container">
                <div className="text-block">
                    <div className="blocks">
                        <div className="above">
                            ประเภทอุปกรณ์
                        </div>
                        <div className="under">
                            {deviceTypeCombobox()}
                        </div>
                    </div>
                    <div className="blocks">
                        <div className="above">
                            ระบบปฎิบัติการ
                        </div>
                        <div className="under">
                            {osCombobox()}
                        </div>
                    </div>
                </div>

                <div className="text-block">
                    <div className="blocks">
                        <div className="above">
                            ซีพียู
                        </div>
                        <div className="under">
                            {cpuTextfield()}
                        </div>
                    </div>
                    <div className="blocks">
                        <div className="above">
                            หน้าจอ
                        </div>
                        <div className="under">
                            {monitorTextfield()}
                        </div>
                    </div>
                </div>

                <div className="text-block">
                    <div className="blocks">
                        <div className="above">
                            การ์ดจอ
                        </div>
                        <div className="under">
                            {gpuTextfield()}
                        </div>
                    </div>
                    <div className="blocks">
                        <div className="above">
                            แรม
                        </div>
                        <div className="under">
                            {ramTextfield()}
                        </div>
                    </div>
                </div>

                <div className="text-block">
                    <div className="blocks">
                        <div className="above">
                            ฮาร์ดดิสก์
                        </div>
                        <div className="under">
                            {harddiskTextfield()}
                        </div>
                    </div>
                    <div className="blocks">
                        <div className="above">
                            ปัญหาที่เคยเกิด
                        </div>
                        <div className="under">
                            {problemTextfield()}
                        </div>
                    </div>
                </div>

            </div>

            <div className="button-create-device">
                <div className="back-button-create-device">
                    <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                        ย้อนกลับ
                    </Button>
                </div>
                <div className="show-button-create-device">
                    <Button sx={{ backgroundColor: "success" }} component={RouterLink} to="/DeviceShowPage" variant="contained">
                        แสดงข้อมูล
                    </Button>
                </div>
                <div className="save-button-create-device">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={submit}> บันทึกข้อมูล
                    </Button>
                </div>
            </div>
        </div>
    )
    function deviceTypeCombobox() {
        return (
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
                </FormControl>
        )
    }
    function osCombobox() {
        return (
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
                </FormControl>
        )
    }
    function cpuTextfield() {
        return (
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
                </FormControl>
        )
    }
    function monitorTextfield() {
        return (
                <TextField
                    style={{backgroundColor:"white"}}
                    id="monitor"
                    label="กรอกชื่อจอ"
                    value={monitor}
                    sx={{ width: 300 }}
                    variant="outlined"
                    onChange={(event) => setMonitor(event.target.value)}
                />
        )
    }
    function gpuTextfield() {
        return (
                <TextField
                        style={{backgroundColor:"white"}}
                        id="monitor"
                        label="กรอกชื่อการ์ดจอ"
                        value={gpu}
                        sx={{ width: 300 }}
                        variant="outlined"
                        onChange={(event) => setGPU(event.target.value)}
                    />
        )
    }
    function ramTextfield() {
        return (
                <TextField
                        style={{backgroundColor:"white"}}
                        id="ram"
                        label="กรอกชื่อแรม"
                        value={ram}
                        sx={{ width: 300 }}
                        variant="outlined"
                        onChange={(event) => setRAM(event.target.value)}
                    />
        )
    }
    function harddiskTextfield() {
        return (
                <TextField
                    style={{backgroundColor:"white"}}
                    id="harddisk"
                    label="กรอกชื่อฮาร์ดดิสก์"
                    value={harddisk}
                    sx={{ width: 300 }}
                    variant="outlined"
                    onChange={(event) => setHarddisk(event.target.value)}
                />
        )
    }
    function problemTextfield() {
        return (
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
        )
    }

}

export default DeviceCreate;