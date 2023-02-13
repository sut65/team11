import React, { useEffect } from "react";
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
import { DistrictInterface, ProvinceInterface, TambonInterface } from "../../../interfaces/AddressUI";
import { AddressTypeInterface } from "../../../interfaces/AddressUI";
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';

function AddressCreate() {

    const userID = parseInt(localStorage.getItem("uid") + "");
    const navigate = useNavigate();
    const successAlert = () => {
        Swal.fire({
            title: 'บันทึกข้อมูลสำเร็จ',
            text: 'Click OK to exit.',
            icon: 'success'
        });
    }

    const [postCode, setPostCode] = React.useState<String>("");
    const [detail, setDetail] = React.useState<String>("");
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    

    const [addressTypeID, setAddressTypeID] = React.useState('');
    const onChangeAddressType = (event: SelectChangeEvent) => {
        setAddressTypeID(event.target.value as string);
    };

    const [provinceID, setProvinceID] = React.useState('');
    const onChangeProvince = (event: any, value: ProvinceInterface | null) => {
        setProvinceID(value ? value.ID.toString() : '');
      };

    const [districtID, setDistrictID] = React.useState('');
    const onChangeDistrict = (event: any, value: DistrictInterface | null) => {
        setDistrictID(value ? value.ID.toString() : '');
      };

    const [tambonID, setTambonID] = React.useState('');
    const onChangeTambon = (event: any, value: TambonInterface | null) => {
        setTambonID(value ? value.ID.toString() : '');
      };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const submit = () => {
        let data = {
            CustomerID: convertType(userID),
            AddressTypeID: convertType(addressTypeID),
            TambonID: convertType(tambonID),
            Post_Code: typeof postCode == "string" ? parseInt(postCode) : 0,
            Detail: detail,
            Record_Time: date,
        }
        console.log(data);
    
        fetch("http://localhost:8080/CreateAddress", {
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
                setAddressTypeID("");
                setProvinceID("");
                setDistrictID("");
                setTambonID("");
                setPostCode("");
                setDetail("");
                setDate(dayjs());
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

        const [addressType, setAddressType] = React.useState<AddressTypeInterface[]>([]);
        const getAddressType = async () => {
            const apiUrl = "http://localhost:8080/GetListAddressType";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setAddressType(res.data);
                }
            });
        };

        const [province, setProvince] = React.useState<ProvinceInterface[]>([]);
        const getProvince = async () => {
            const apiUrl = "http://localhost:8080/GetListProvince";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                setProvince(res.data);
                }
            });
        };
        const selectedProvince = province.filter(p => p.ID === parseInt(provinceID, 10))[0] || null;

        const [district, setDistrict] = React.useState<DistrictInterface[]>([]);
        const getDistrict = async () => {
            const apiUrl = "http://localhost:8080/GetListDistrict";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                setDistrict(res.data);
                }
            });
        };
        const getDistrictByID = async () => {
            const apiUrl = `http://localhost:8080/GetDistrict/${provinceID}`;
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                setDistrict(res.data);
                }
            });
        };
        const selectedDistrict = district.filter(d => d.ID === parseInt(districtID, 10))[0] || null;

        const [tambon, setTambon] = React.useState<TambonInterface[]>([]);
        const getTambon = async () => {
            const apiUrl = "http://localhost:8080/GetListTambon";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                setTambon(res.data);
                }
            });
        };
        const getTambonByID = async () => {
            const apiUrl = `http://localhost:8080/GetTambon/${districtID}`;
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                setTambon(res.data);
                }
            });
        };
        const selectedTambon = tambon.filter(t => t.ID === parseInt(tambonID, 10))[0] || null;

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
        getAddressType();
        getTambon();
        getProvince();
        getDistrict();

        const dateTime= setInterval(() => {
            setDate(dayjs());
          }, 1000);
        
          return () => {
            clearInterval(dateTime);
          };

    }, []);
    useEffect(() => {
        getDistrictByID();
    }, [provinceID]);
    useEffect(() => {
        getTambonByID();
    }, [districtID]);

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
                <b>ระบบที่อยู่ผู้แจ้ง</b>
            </Typography>
            </Box>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">ชื่อลูกค้า</Typography>
                    </Grid>
                    <Grid item xs={3.5}>
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
                        <Button sx={{ backgroundColor: "#A75D5D" }} component={RouterLink} to="/AddressEditPage" variant="contained">
                            แก้ไข/ลบข้อมูล
                        </Button>
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">ประเภทที่อยู่</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    style={{backgroundColor:"white"}}
                                    native
                                    value={addressTypeID}
                                    onChange={onChangeAddressType}
                                    sx={{ width: 300 }}
                                    inputProps={{
                                    name: "addressTypeID",
                                    }}
                                >
                                <option aria-label="None" value="">
                                    กรุณาเลือกประเภทที่อยู่
                                </option>
                                {addressType.map((item: AddressTypeInterface) => (
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
                        <Typography align="right" fontSize={25} color="white">จังหวัด</Typography>
                    </Grid>
                    <Grid item xs={7} >
                    <Autocomplete
                            style={{ backgroundColor: "white", width: 300 }}
                            value={selectedProvince}
                            onChange={onChangeProvince}
                            options={province}
                            getOptionLabel={(option: ProvinceInterface) => option.Province_Name}
                            renderInput={params => (
                                <TextField
                                {...params}
                                label="กรุณาเลือกจังหวัด"
                                variant="outlined"
                                fullWidth
                                />
                            )}
                            /><p/>
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">อำเภอ</Typography>
                    </Grid>
                    <Grid item xs={7} >
                    <Autocomplete
                            style={{ backgroundColor: "white", width: 300 }}
                            value={selectedDistrict}
                            onChange={onChangeDistrict}
                            options={district}
                            getOptionLabel={(option: DistrictInterface) => option.District_Name}
                            renderInput={params => (
                                <TextField
                                {...params}
                                label="กรุณาเลือกอำเภอ"
                                variant="outlined"
                                fullWidth
                                />
                            )}
                            /><p />
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">ตำบล</Typography>
                    </Grid>
                    <Grid item xs={7} >
                    <Autocomplete
                            style={{ backgroundColor: "white", width: 300 }}
                            value={selectedTambon}
                            onChange={onChangeTambon}
                            options={tambon}
                            getOptionLabel={(option: TambonInterface) => option.Tambon_Name}
                            renderInput={params => (
                                <TextField
                                {...params}
                                label="กรุณาเลือกตำบล"
                                variant="outlined"
                                fullWidth
                                />
                            )}
                            /><p />
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">รหัสไปรษณีย์</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                        style={{backgroundColor:"white"}}
                        id="postCode"
                        label="กรอกเลขไปรษณีย์"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={postCode}
                        sx={{ width: 300 }}
                        variant="outlined"
                        onChange={(event) => setPostCode(event.target.value)}
                        /><p />
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={2}>
                        <Typography align="right" fontSize={25} color="white">รายละเอียดที่อยู่</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                        style={{backgroundColor:"white"}}
                        id="details"
                        sx={{ width: 300 }}
                        multiline
                        rows={4}
                        value={detail}
                        label="หมายเหตุ"
                        onChange={(event) => setDetail(event.target.value)}
                        /><p />
                    </Grid>
                    <Grid item xs={5} paddingLeft={36}>
                        <Typography align="right" fontSize={25} color="white">วันที่และเวลา</Typography>
                    </Grid>
                    <Grid item xs={2.5} bgcolor="white" >
                        <p>{date ? date.format("DD/MM/YYYY HH:mm:ss") : ''}</p>
                    </Grid>
                    <Grid item xs={5}/>
                    <p/>
                    <Grid item xs={3}/>
                    <Grid item xs={1}>
                        <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                            ย้อนกลับ
                        </Button>
                    </Grid> 
                    <Grid item xs={3}/>
                    <Grid item xs={1.2}>
                        <Button sx={{ backgroundColor: "success" }} component={RouterLink} to="/AddressShowPage" variant="contained">
                            แสดงข้อมูล
                        </Button>
                    </Grid>
                    <Grid item xs={2} paddingRight={1}>
                        <Button
                        variant="contained"
                        color="success"
                        onClick={submit}>
                            บันทึกข้อมูล
                        </Button><p />
                    </Grid>
                </Grid>
            </Box>
            <br/><br/><br/><br/>
        </Paper> 
    )
}

export default AddressCreate;