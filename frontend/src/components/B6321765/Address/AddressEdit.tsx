import React, { useEffect } from "react";
import ResponsiveAppBar from '../../Bar_01';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AddressInterface, DistrictInterface, ProvinceInterface, TambonInterface } from "../../../interfaces/AddressUI";
import { AddressTypeInterface } from "../../../interfaces/AddressUI";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useNavigate } from 'react-router-dom';

function AddressEdit() {

    const userID = parseInt(localStorage.getItem("uid") + "");
    const navigate = useNavigate();
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

    const [postCode, setPostCode] = React.useState<String>("");
    const [detail, setDetail] = React.useState<String>("");
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());

    const [addressTypeID, setAddressTypeID] = React.useState('');
    const onChangeAddressType = (event: SelectChangeEvent) => {
        setAddressTypeID(event.target.value as string);
    };

    const [addressID, setAddressID] = React.useState('');
    const onChangeAddress = (event: SelectChangeEvent) => {
        setAddressID(event.target.value as string);
    };

    const [provinceID, setProvinceID] = React.useState('');
    const onChangeProvince = (event: SelectChangeEvent) => {
        setProvinceID(event.target.value as string);
    };

    const [districtID, setDistrictID] = React.useState('');
    const onChangeDistrict = (event: SelectChangeEvent) => {
        setDistrictID(event.target.value as string);
    };

    const [tambonID, setTambonID] = React.useState('');
    const onChangeTambon = (event: SelectChangeEvent) => {
        setTambonID(event.target.value as string);
    };

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const update_f = () => {
        let data = {
            ID: convertType(addressID),
            CustomerID: 1,
            AddressTypeID: convertType(addressTypeID),
            TambonID: convertType(tambonID),
            Post_Code: typeof postCode == "string" ? parseInt(postCode) : 0,
            Detail: detail,
            Record_Time: date,
        }
        console.log(data);
    
        fetch("http://localhost:8080/UpdateAddress", {
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
        setAddressID("");
        setAddressTypeID("");
        setTambonID("");
        setPostCode("");
        setDetail("");
        setDate(null);
      }

    const delete_f = () => {
        let data = {
            ID: convertType(addressID),
            CustomerID: 1,
            AddressTypeID: convertType(addressTypeID),
            TambonID: convertType(tambonID),
            Post_Code: typeof postCode == "string" ? parseInt(postCode) : 0,
            Detail: detail,
            Record_Time: date,
        }
        console.log(data);
    
        fetch("http://localhost:8080/DeleteAddress", {
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
        // reset All after delete
        setAddressTypeID("");
        setTambonID("");
        setPostCode("");
        setDetail("");
        setDate(null);
      }

        const [address, setAddress] = React.useState<AddressInterface[]>([]);
        const getAddress = async () => {
            const apiUrl = "http://localhost:8080/GetListAddress";
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setAddress(res.data);
                }
            });
        };

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
        getAddressType();
        getTambon();
        getProvince();
        getDistrict();
        getAddress();
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            {/* <ResponsiveAppBar/> */}
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
                <b>แก้ไขข้อมูลที่อยู่</b>
            </Typography>
            </Box>
            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
                        <Typography align="right" fontSize={25} color="white">หมายเลขที่อยู่</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    style={{backgroundColor:"white"}}
                                    native
                                    value={addressID}
                                    onChange={onChangeAddress}
                                    sx={{ width: 300 }}
                                    inputProps={{
                                    name: "addressID",
                                    }}
                                >
                                <option aria-label="None" value="">
                                    กรุณาเลือกหมายเลขที่อยู่
                                </option>
                                {address.map((item: AddressInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.ID}
                                </option>
                                ))}
                                </Select>
                            </FormControl><p />
                        </Typography>
                    </Grid>
                    <p/>
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
                        <Typography align="right" fontSize={25} color="white">ชื่อลูกค้า</Typography>
                    </Grid>
                    <Grid item xs={7}>
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
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
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
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
                        <Typography align="right" fontSize={25} color="white">จังหวัด</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <FormControl fullWidth variant="outlined">
                            <Select
                                style={{backgroundColor:"white"}}
                                native
                                value={provinceID}
                                onChange={onChangeProvince}
                                sx={{ width: 300 }}
                                inputProps={{
                                name: "provinceID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกจังหวัด
                                </option>
                                {province.map((item: ProvinceInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.Province_Name}
                                </option>
                                ))}
                            </Select>
                        </FormControl><p/>
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
                        <Typography align="right" fontSize={25} color="white">อำเภอ</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <FormControl fullWidth variant="outlined" >
                            <Select
                                native
                                style={{backgroundColor:"white"}}
                                value={districtID}
                                onChange={onChangeDistrict}
                                sx={{ width: 300 }}
                                inputProps={{
                                name: "districtID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกอำเภอ
                                </option>
                                {district.map((item: DistrictInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.District_Name}
                                </option>
                                ))}
                            </Select>
                        </FormControl><p />
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
                        <Typography align="right" fontSize={25} color="white">ตำบล</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <FormControl fullWidth variant="outlined">
                            <Select
                                style={{backgroundColor:"white"}}
                                native
                                value={tambonID}
                                onChange={onChangeTambon}
                                sx={{ width: 300 }}
                                inputProps={{
                                name: "tambonID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกตำบล
                                </option>
                                {tambon.map((item: TambonInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.Tambon_Name}
                                </option>
                                ))}
                            </Select>
                        </FormControl><p />
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
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
                    <Grid item xs={3.8}/>
                    <Grid item xs={1.2}>
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
                    <Grid item xs={5} paddingLeft={79}>
                        <Typography align="right" fontSize={25} color="white">วันที่และเวลา</Typography>
                    </Grid>
                    <Grid item xs={1.8} bgcolor="white">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={date}
                            onChange={(newValue) => {
                            setDate(newValue);
                            }}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={5}/>
                    <p/>
                    <Grid item xs={3.8}/>
                    <Grid item xs={1}>
                        <Button sx={{ backgroundColor: "success" }} onClick={() => navigate(-1)} variant="contained">
                            ย้อนกลับ
                        </Button>
                    </Grid>
                    <Grid item xs={1.55}/>
                    <Grid item xs={0.7}>
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
            <br/><br/><br/><br/>
        </Paper>
    )
}

export default AddressEdit;