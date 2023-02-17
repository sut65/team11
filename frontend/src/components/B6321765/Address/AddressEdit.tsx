import "./css/edit-style.css";
import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Autocomplete, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from 'sweetalert2';
import { AddressInterface, DistrictInterface, ProvinceInterface, TambonInterface } from "../../../interfaces/AddressUI";
import { AddressTypeInterface } from "../../../interfaces/AddressUI";
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';

let Address_ID: string;
function getsetAddressID(id: string) {
  Address_ID = id;
} export { getsetAddressID }

function AddressEdit() {

    let add_id = Address_ID;
    const userID = parseInt(localStorage.getItem("uid") + "");
    const navigate = useNavigate();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success' ,
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })

    const update_successAlert = () => {
        Swal.fire({
            title: 'อัพเดทข้อมูลสำเร็จ',
            text: 'Click OK to exit.',
            icon: 'success'
        }).then(() => {
            navigate({
                pathname: `/AddressShowPage/`
            })
        });;
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
        }).then(() => {
            navigate({
                pathname: `/AddressShowPage/`
            })
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

    const update_f = () => {
        let data = {
            ID: convertType(add_id),
            CustomerID: convertType(userID),
            AddressTypeID: convertType(addressTypeID),
            TambonID: convertType(tambonID),
            Post_Code: typeof postCode == "string" ? parseInt(postCode) : postCode,
            Detail: detail,
            Record_Time: date,
        }
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
      }

    const delete_f = () => {
        swalWithBootstrapButtons.fire({
            title: 'คุณกำลังลบรายการที่อยู่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ฉันต้องการลบ',
            cancelButtonText: 'ยกเลิกการลบ',
            reverseButtons: true,
            
          }).then((result) =>{
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/DeleteAddress/${add_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(''),
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
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'ยกเลิก',
                  'การลบรายการที่อยู่',
                  'error'
                )
              }
          })
      }

        const getAddress_data = async () => {
            const apiUrl = `http://localhost:8080/GetAddress/${add_id}`;
            const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            };
            fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setAddressTypeID(res.data.AddressTypeID);
                    setProvinceID(res.data.Tambon.District.ProvinceID);
                    setDistrictID(res.data.Tambon.DistrictID);
                    setTambonID(res.data.TambonID);
                    setPostCode(res.data.Post_Code);
                    setDetail(res.data.Detail);
                }
            });
        };

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
        getAddress();
        getAddress_data();

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
        <div className="boxes">
            <div className="topic">
            <h1 className="header">ระบบที่อยู่ผู้แจ้ง</h1>
            <div className="info">
            <ul>
                <li>Customer : {userName}</li>
                <li>Datetime : {date ? date.format("DD/MM/YYYY HH:mm:ss") : ''}</li>
            </ul>
            </div>
            </div>
            <hr className="line"/>

            <div className="box1">
                <div className="address-id">
                    <div className="top">
                        หมายเลขที่อยู่
                    </div>
                    <div className="bottom">
                        {addressIDlocked()}
                    </div>
                </div>
                <div className="address-type">
                    <div className="top">
                        ประเภทที่อยู่
                    </div>
                    <div className="bottom">
                        {addressTypeCombobox()}
                    </div>
                </div>
            </div>
            <div className="box2">
                <div className="province">
                    <div className="top">
                        จังหวัด
                    </div>
                    <div className="bottom">
                        {provinceCombobox()}
                    </div>
                </div>
                <div className="district">
                    <div className="top">
                        อำเภอ
                    </div>
                    <div className="bottom">
                        {districtCombobox()}
                    </div>
                </div>
            </div>
            <div className="box3">
                <div className="tambon">
                    <div className="top">
                        ตำบล
                    </div>
                    <div className="bottom">
                        {tambonCombobox()}
                    </div>
                </div>
                <div className="postcode">
                    <div className="top">
                        รหัสไปรษณีย์
                    </div>
                    <div className="bottom">
                        {postcodeTextfield()}
                    </div>
                </div>
            </div>
            <div className="box4">
                <div className="detail">
                    <div className="top">
                        รายละเอียดที่อยู่
                    </div>
                    <div className="bottom">
                        {detailTextfield()}
                    </div>
                </div>
            </div>

            <div className="button">
                <div className="back-button">
                    <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                        ย้อนกลับ
                    </Button>
                </div>
                <div className="show-button">
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#C70039" }}
                        onClick={delete_f}>
                        ลบข้อมูล
                    </Button>
                </div>
                <div className="save-button">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={update_f}>
                        อัพเดทข้อมูล
                    </Button>
                </div>
            </div>
        </div>
    )

    function provinceCombobox() {
        return (
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
            />
        )
    }

    function districtCombobox() {
        return (
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
            />
        )
    }

    function tambonCombobox() {
        return (
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
            />
        )
    }

    function postcodeTextfield() {
        return (
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
            />
        )
    }

    function detailTextfield() {
        return (
            <TextField
                style={{backgroundColor:"white"}}
                id="details"
                sx={{ width: 300 }}
                multiline
                rows={4}
                value={detail}
                label="หมายเหตุ"
                onChange={(event) => setDetail(event.target.value)}
            />
        )
    }

    function addressIDlocked() {
        return (
            <Typography  align="center" fontSize={50}>
            <FormControl fullWidth variant="outlined">
                <Select
                    style={{backgroundColor:"white"}}
                    native
                    disabled
                    value={add_id}
                    sx={{ width: 300 }}
                    inputProps={{
                        name: "addressID",
                        }}
                >
                {address.map((item: AddressInterface) => (
                <option value={item.ID} key={item.ID}>
                    {'หมายเลขที่อยู่ที่   ' + item.ID}
                </option>
                ))}
                </Select>
            </FormControl>
            </Typography>
        )
    }

    function addressTypeCombobox() {
        return (
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
            </FormControl>
            </Typography>
        )
    }
}

export default AddressEdit;