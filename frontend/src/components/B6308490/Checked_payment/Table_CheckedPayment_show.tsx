import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
// import Payment, { Payment_get_Ordertech_ID } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import dayjs from 'dayjs';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Check, Edit } from '@mui/icons-material';
// import { EditPayment_get_Ordertech_ID } from './EditPayment';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { CheckedPayment_get_Payment_ID } from './Checked_payment';
import { EditCheck_get_Payment_ID } from './Edit_Checked_payment';

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
      field: 'action1',
      headerName: '',
      width: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams) => {

        // const [OrderTech_ID, setOrderTech_ID] = useState(9999);
        const handleClick = () => {
          params.api.setRowMode(params.id, 'edit');
          // const Test_ID = params.id.toString();
          // console.log(params.id);

          EditCheck_get_Payment_ID(params.id.toString());
        };
        return (
          <RouterLink to={`/EditChecked_payment`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" onClick={handleClick}
              sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#F99417' }} >
              {<Edit />}แก้ไข
            </Button>
          </RouterLink>
        );
      }
    },

    { field: "ID", headerName: "ลำดับ", width: 70 },
    { field: "Payment_ID", headerName: "Payment ID", width: 200 },
    {
      field: "Status_ID", headerName: "สถานะ", width: 300
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
    { field: "Other", headerName: "Comment", width: 300 },
    {
      field: "Date_time", headerName: "วันที่โอนเงิน", width: 200
      , valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY HH:mm:ss '),
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
        components={{ Toolbar: GridToolbar, }}
        style={{ height: '500px' }}
      />
    </div>
  )
}

export default Check_Table_Payment_show

