import "./css/show-style.css";
import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { AddressInterface } from "../../../interfaces/AddressUI";
import dayjs from 'dayjs';
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridToolbar, GridColDef , GridRenderCellParams} from '@mui/x-data-grid';
import { getsetAddressID } from './AddressEdit';

function AddressShow() {

  const userID = parseInt(localStorage.getItem("uid") + "");
   
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success' ,
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

const navigate = useNavigate();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const [AddressShow, setAddressShow] = React.useState<AddressInterface[]>([]);
const getAddressShow = async () => {
    const apiUrl = `http://localhost:8080/GetAddressBYcustomerID/${userID}`;
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
        if (res.data) {
            setAddressShow(res.data);
        } else {
            console.log("address show error");
        }
    });
};

const columns: GridColDef[] = [
    {
        field: 'action1',
        headerName: '',
        width: 100,
        editable: false,
        headerClassName: 'super-app-theme--header',
        renderCell: (params: GridRenderCellParams) => {
  
          const handleClick = () => {
            params.api.setRowMode(params.id, 'edit');
            getsetAddressID(params.id.toString());
          };
          return (
              <Button variant="contained" onClick={handleClick} component={RouterLink} to="/AddressEditPage"
                sx={{ cursor: 'pointer', backgroundColor: 'success' }} >
                {<Edit />}แก้ไข
              </Button>
          );
        }
    },
    {
        field: 'action2',
        headerName: '',
        width: 100,
        editable: false,
        headerClassName: 'super-app-theme--header',      
        renderCell: (params: GridRenderCellParams) => {
  
          const handleClick = () => {
            swalWithBootstrapButtons.fire({
              title: 'คุณกำลังลบรายการที่อยู่',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'ฉันต้องการลบ',
              cancelButtonText: 'ยกเลิกการลบ',
              reverseButtons: true,
              
            }).then((result) => {
              if (result.isConfirmed) {
                params.api.setRowMode(params.id, 'edit');
                const apiUrl = `http://localhost:8080/DeleteAddress/${params.id}`;
                const requestOptions = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(''),
                };
                fetch(apiUrl, requestOptions)
                  .then((response) => response.json())
                  .then((res) => {
                    if (res.data) {
                      swalWithBootstrapButtons.fire(
                        'ลบสำเร็จ',
                        'ลบรายการที่อยู่ สำเร็จ',
                        'success'
                      ).then(() => {
                        window.location.reload();
                      });
                    } else {
                      swalWithBootstrapButtons.fire(
                        'การลบล้มเหลว',
                        res.error.split(";")[0],
                        'error'
                      );
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
            });
          };
          return (
            <Button variant="contained" onClick={handleClick}
              sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#ff3222' }} >
              {<Delete />}ลบ
            </Button>
          );
        }
      },
    { field: "ID", headerName: "ID", width: 70 },
    { field: "Customer_Name", headerName: "ชื่อลูกค้า", width: 150 , renderCell:params =>{        
        return <div>{params.row.Customer.Name}</div>
    }},
    { field: "Type_Name", headerName: "ประเภทที่อยู่", width: 100 , renderCell:params =>{        
        return <div>{params.row.AddressType.Type_Name}</div>
    }},
    { field: "Province_Name", headerName: "จังหวัด", width: 125 , renderCell:params =>{        
        return <div>{params.row.Tambon.District.Province.Province_Name}</div>
    }},
    { field: "District_Name", headerName: "อำเภอ", width: 125 , renderCell:params =>{        
        return <div>{params.row.Tambon.District.District_Name}</div>
    }},
    { field: "Tambon_Name", headerName: "ตำบล", width: 125 , renderCell:params =>{        
        return <div>{params.row.Tambon.Tambon_Name}</div>
    }},
    { field: "Post_Code", headerName: "รหัสไปรษณีย์", width: 100 },
    { field: "Detail", headerName: "รายละเอียดที่อยู่", width: 200 },
    {
      field: "Record_Time", headerName: "Record_Time", width: 200
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
    },
];

useEffect(() => {
    getAddressShow();
}, []);

    return(
        <div className="body">
            <div className="topic">
              <h1 className="header">ข้อมูลที่อยู่</h1>
              <hr className="line"/>
            </div>
            <div className="table">
              <div className="showTable">
                  {datashow()}
              </div>
            </div>
            <div className="bttn">
              <div className="back-bttn">
                <Button sx={{ backgroundColor: "#C70039" }} onClick={() => navigate(-1)} variant="contained">
                    ย้อนกลับ
                </Button>
              </div>
              <div className="add-bttn">
                <Button color="success"  component={RouterLink} to="/AddressCreatePage" variant="contained">
                    เพิ่มข้อมูล
                </Button>
              </div>
            </div>
        </div>
      )
      function datashow() {
        return (
          <DataGrid
            rows={AddressShow}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            components={{ Toolbar: GridToolbar }}
            style={{ borderRadius: '10px' }}/>
        )
      }
    }
    export default AddressShow;