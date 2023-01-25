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
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from "react-router-dom";
import { bgcolor } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DistrictInterface, ProvinceInterface, TambonInterface } from "../../../interfaces/AddressUI";
import { AddressTypeInterface } from "../../../interfaces/AddressUI";

import dayjs, { Dayjs } from 'dayjs';

function AddressCreate() {

    const userID = parseInt(localStorage.getItem("uid") + "");

    const [postCode, setPostCode] = React.useState<String>("");
    const [detail, setDetail] = React.useState<String>("");
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [addressTypeID, setAddressTypeID] = React.useState('');
    const onChangeAddressType = (event: SelectChangeEvent) => {
        setAddressTypeID(event.target.value as string);
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

    const submit = () => {
        let data = {
            CustomerID: 1,
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
              setSuccess(true);
            } else {
              console.log(data)
              setError(true);
            }
          });
        // reset All after Submit
        setAddressTypeID("");
        setTambonID("");
        setPostCode("");
        setDetail("");
        setDate(null);
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
    }, []);

    return(
        <Paper style={{backgroundColor:"#182e3e"}}>
            <ResponsiveAppBar />
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
                    <Grid item xs={4}/>
                    <Grid item xs={1}>
                        <Typography align="right" fontSize={25}>ชื่อลูกค้า</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
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
                        <Typography align="right" fontSize={25}>ประเภทที่อยู่</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography align="center" fontSize={50}>
                            <FormControl fullWidth variant="outlined">
                                <Select
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
                        <Typography align="right" fontSize={25}>จังหวัด</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <FormControl fullWidth variant="outlined">
                            <Select
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
                        <Typography align="right" fontSize={25}>อำเภอ</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <FormControl fullWidth variant="outlined">
                            <Select
                                native
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
                        <Typography align="right" fontSize={25}>ตำบล</Typography>
                    </Grid>
                    <Grid item xs={7} >
                        <FormControl fullWidth variant="outlined">
                            <Select
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
                        <Typography align="right" fontSize={25}>รหัสไปรษณีย์</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
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
                        <Typography align="right" fontSize={25}>รายละเอียดที่อยู่</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                        id="details"
                        sx={{ width: 300 }}
                        multiline
                        rows={4}
                        value={detail}
                        label="หมายเหตุ"
                        onChange={(event) => setDetail(event.target.value)}
                        /><p />
                    </Grid>
                    <Grid item xs={4}>
                        <Button sx={{ backgroundColor: "#C70039" }} component={RouterLink} to="/HomePage2" variant="contained">
                            ย้อนกลับ
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button sx={{ backgroundColor: "success" }} component={RouterLink} to="/HomePage2" variant="contained">
                            แสดงข้อมูล
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                        variant="contained"
                        color="success"
                        onClick={submit}>
                            บันทึก
                        </Button><p />
                    </Grid>
                </Grid>
            </Box>
        </Paper> 
    )
}

export default AddressCreate;