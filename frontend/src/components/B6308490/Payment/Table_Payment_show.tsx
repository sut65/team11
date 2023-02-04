import { Box, Button, colors, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Payment, { Payment_get_Ordertech_ID } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import dayjs from 'dayjs';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Delete, Edit } from '@mui/icons-material';
import { EditPayment_get_Ordertech_ID } from './EditPayment';
import Swal from 'sweetalert2' // Alert text --> npm install sweetalert2
import "../CSS/payment.css";

//====================สำหรับปุ่มลบ============================
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success' ,
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
})
//====================สำหรับปุ่มลบ============================

function Table_Payment_show() {
  //===============list payment details =================
  const [Payment, set_All_Payment] = React.useState<PaymentInterface[]>([]);
  const get_All_Payment = async () => {
    const apiUrl = `http://localhost:8080/ListPayment`;
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
//====================================================

  //ฟังก์ชัน สำหรับ Datagrid
  const columns: GridColDef[] = [
    {
      field: 'action1',
      headerName: '',
      width: 100,
      editable: false,
      renderCell: (params: GridRenderCellParams) => {

        const handleClick = () => {
          params.api.setRowMode(params.id, 'edit');
          EditPayment_get_Ordertech_ID(params.id.toString());
        };
        return (
          <RouterLink to={`/EditPayment`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" onClick={handleClick}
              sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#F99417' }} >
              {<Edit />}แก้ไข
            </Button>
          </RouterLink>
        );
      }
    },

    {
      field: 'action2',
      headerName: '',
      width: 100,
      editable: false,
      
      renderCell: (params: GridRenderCellParams) => {

        const handleClick = () => {
          swalWithBootstrapButtons.fire({
            title: 'คุณกำลังลบรายการชำระเงิน',
            text: "การลบรายการชำระเงินนี้ คุณจะต้องบันทึกรายการชำระเงินใหม่เท่านั้น",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ฉันต้องการลบ',
            cancelButtonText: 'ยกเลิกการลบ',
            reverseButtons: true,
            
          }).then((result) => {
            if (result.isConfirmed) {
              params.api.setRowMode(params.id, 'edit');
              const apiUrl = `http://localhost:8080/DeletePayment/${params.id}`;
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
                      'ลบรายการชำระเงิน สำเร็จ',
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
                'การลบรายการชำระเงิน',
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


    { field: "ID", headerName: "ลำดับ", width: 70 },
    {
      field: "PayTech_ID", headerName: "OrderID", width: 70, renderCell: params => {
        return <div>{params.row.OrderTech.ID}</div>
      }
    },
    { field: "Sender_Name", headerName: "ชื่อผู้โอนเงิน", width: 200 },
    {
      field: "Bank_ID", headerName: "ธนาคาร", width: 140
      , renderCell: params => {

        if (params.row.Bank_ID === 1) {
          return <div>ธนาคารไทยพาณิชย์</div>;
        } else if (params.row.Bank_ID === 2) {
          return <div>ธนาคารกสิกรไทย</div>;
        } else if (params.row.Bank_ID === 3) {
          return <div>ธนาคารกรุงไทย</div>;
        } else if (params.row.Bank_ID === 4) {
          return <div>ธนาคารกรุงเทพ</div>;
        } else if (params.row.Bank_ID === 5) {
          return <div>ธนาคารกรุงศรีอยุธยา</div>;
        }
      }
    },
    { field: "Amount", headerName: "ยอดเงินที่โอน", width: 100 },
    { field: "Amount_Check", headerName: "ยอดที่ต้องโอนเงิน", width: 100 },
    {
      field: "Date_time", headerName: "วันที่โอนเงิน", width: 200
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
    },
    {
      field: "Status_ID", headerName: "สถานะ", width: 200
      , renderCell: params => {

        if (params.row.Status_ID === 1) {
          return <div>ยังไม่ชำระเงิน</div>;
        } else if (params.row.Status_ID === 2) {
          return <div>ชำระเงินเรียบร้อย</div>;
        } else if (params.row.Status_ID === 3) {
          return <div>รอตรวจสอบการชำระเงิน</div>;
        } else if (params.row.Status_ID === 4) {
          return <div>การชำระเงินไม่ถูกต้อง</div>;
        }
      }
    },
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
        components={{ Toolbar: GridToolbar, }}
        style={{ height: '500px' }}
      />
    </div>
  )
}

export default Table_Payment_show

