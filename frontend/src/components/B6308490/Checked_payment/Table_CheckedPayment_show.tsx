import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, gridPageCountSelector, gridPageSelector, GridRenderCellParams, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
// import Payment, { Payment_get_Ordertech_ID } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import dayjs from 'dayjs';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Check, Delete, Edit } from '@mui/icons-material';
// import { EditPayment_get_Ordertech_ID } from './EditPayment';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
//import { CheckedPayment_get_Payment_ID } from './Checked_payment';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import LensIcon from '@mui/icons-material/Lens';
import "../CSS/PAY_and_CHECKED.css";



//====================สำหรับปุ่มลบ============================
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})

//====================สำหรับ แถบเลื่อนหน้า footer dataGrid==============
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
//====================สำหรับ แถบเลื่อนหน้า footer dataGrid==============

function Check_Table_Payment_show() {
  const [Payment, set_All_Payment] = React.useState<PaymentInterface[]>([]);
  const get_All_Payment = async () => {
    const apiUrl = `http://localhost:8080/List_only_checkedPayment`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          set_All_Payment(res.data);
        } else {
          console.log("Table_Payment_show error");
        }
      });
  };

  //ฟังก์ชัน สำหรับ Datagrid
  const columns: GridColDef[] = [
    {
      field: 'แก้ไข',
      headerName: '',
      width: 100,
      editable: false,
      headerClassName:'title_table',cellClassName:"cell_table",
      renderCell: (params: GridRenderCellParams) => {

        // const [OrderTech_ID, setOrderTech_ID] = useState(9999);
        const handleClick = () => {
          params.api.setRowMode(params.id, 'edit');
          // const Test_ID = params.id.toString();
          // console.log(params.id);

          localStorage.setItem('Checked_Payment_ID',params.id.toString());
        };
        return (
          <RouterLink to={`/EditChecked_payment`} style={{ textDecoration: 'none' }}>
            <Button id="btn_orange_table" variant="contained" onClick={handleClick} >
              {<Edit />}แก้ไข
            </Button>
          </RouterLink>
        );
      }
    },
    {
      field: 'ลบ',
      headerName: '',
      width: 100,
      editable: false,
      headerClassName:'title_table',cellClassName:"cell_table",
      renderCell: (params: GridRenderCellParams) => {
        const handleClick = () => {
          swalWithBootstrapButtons.fire({
            title: 'คุณกำลังลบรายการตรวจสอบ',
            text: "การลบรายการนี้ คุณจะต้องบันทึกรายการตรวจสอบการชำระเงินใหม่เท่านั้น",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ฉันต้องการลบ',
            cancelButtonText: 'ยกเลิกการลบ',
            reverseButtons: true,

          }).then((result) => {
            if (result.isConfirmed) {
              params.api.setRowMode(params.id, 'edit');
              const apiUrl = `http://localhost:8080/DeleteChecked_payment/${params.id}`;
              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(''),
              };
              fetch(apiUrl, requestOptions)
                .then((response) => response.json())
                .then((res) => {
                  if (res.data) {
                    // Alert สำเส็จ
                    swalWithBootstrapButtons.fire(
                      'ลบสำเร็จ',
                      'ลบรายการตรวจสอบ สำเร็จ',
                      'success'
                    );
                  } else {
                    //setAlertMessage(res.error)
                    swalWithBootstrapButtons.fire(
                      // Display Back-end text response 
                      'การลบล้มเหลว',
                      res.error.split(";")[0],
                      'error'
                    );
                  }
                  window.location.reload();
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'ยกเลิก',
                'การลบรายการตวจสอบการชำระเงิน',
                'error'
              )
            }
          });
        };

        return (
          <Button id="btn_red" variant="contained" onClick={handleClick}>
            {<Delete />}ลบ
          </Button>
        );
      }
    },

    { field: "ID", headerName: "ID", width: 70,headerClassName:'title_table',cellClassName:"cell_table", },
    { field: "Payment_ID", headerName: "Payment ID", width: 100,headerClassName:'title_table',cellClassName:"cell_table", },
    {
      field: "Status_ID", headerName: "สถานะ", width: 180,headerClassName:'title_table',cellClassName:"cell_table"
      , renderCell: params => {

        if (params.row.Status_ID === 1) {
          return <div><LensIcon />ยังไม่ชำระเงิน</div>;
        } else if (params.row.Status_ID === 2) {
          return <div><LensIcon sx={{color:"green",fontSize:'10px'}} />ชำระเงินเรียบร้อย</div>;
        } else if (params.row.Status_ID === 3) {
          return <div><LensIcon sx={{color:"orange",fontSize:'10px'}}/>รอตรวจสอบการชำระเงิน</div>;
        } else if (params.row.Status_ID === 4) {
          return <div><LensIcon sx={{color:"red",fontSize:'10px'}}/>การชำระเงินไม่ถูกต้อง</div>;
        }
      }
    },
    { field: "Other", headerName: "Comment", width: 300,headerClassName:'title_table',cellClassName:"cell_table", },
    { field: "Message", headerName: "ข้อความถึงลูกค้า", width: 300,headerClassName:'title_table',cellClassName:"cell_table", },
    {
      field: "Date_time", headerName: "วันที่โอนเงิน", width: 200,headerClassName:'title_table',cellClassName:"cell_table"
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm '),
    }
    //{ field: "CustomerID", headerName: "ผู้ส่งเรื่อง", width: 300 },


  ];

  useEffect(() => {

    get_All_Payment();

  }, []);

  return (
    <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={Payment}
        getRowId={(row) => row.ID}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[50]}
        components={{ Toolbar: GridToolbar, Pagination: CustomPagination,}}
        style={{ height: '500px',outline: '3px solid #db36a4', borderRadius: '25px'  }}
      />
    </div>
  )
}

export default Check_Table_Payment_show

