import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
// import Payment, { Payment_get_Ordertech_ID } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import dayjs from 'dayjs';
import { OrderTechInterface } from '../../../interfaces/IOrderTech';
import { Edit } from '@mui/icons-material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { CheckedPayment_get_Payment_ID } from './Checked_payment';

function Table_Paytech_all_Checked() {
    const [Checked_Paytech_all, setChecked_Paytech_all] = React.useState<PaymentInterface[]>([]);
    const get_All_Paytech = async () => {
        const apiUrl = `http://localhost:8080/ListPayment`; // add ID for search
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setChecked_Paytech_all(res.data);
                    console.log('checked_payment_Id --->', res.data);
                } else {
                    console.log("Table_Paytech_error");
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
                    console.log(params.id);
                    CheckedPayment_get_Payment_ID(params.id.toString());
                };
                return (
                    <RouterLink to={`/Checked_payment`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" onClick={handleClick}
                        sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#009a00' }} >
                        {<PlagiarismIcon />}ตรวจสอบ
                    </Button>
                    </RouterLink>
                );
            }
        },
        { field: "ID", headerName: "ID", width: 70 },
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
        // {
        //     field: "Status_ID", headerName: "สถานะ", width: 200
        //     , renderCell: params => {

        //         if (params.row.Status_ID === 1) {
        //             return <div>ยังไม่ชำระเงิน</div>;
        //         } else if (params.row.Status_ID === 2) {
        //             return <div>ชำระเงินเรียบร้อย</div>;
        //         } else if (params.row.Status_ID === 3) {
        //             return <div>รอตรวจสอบการชำระเงิน</div>;
        //         } else if (params.row.Status_ID === 4) {
        //             return <div>การชำระเงินไม่ถูกต้อง</div>;
        //         }
        //     }
        // },
        //{ field: "CustomerID", headerName: "ผู้ส่งเรื่อง", width: 300 },

    ];

    useEffect(() => {

        get_All_Paytech();

    }, []);

    return (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
                rows={Checked_Paytech_all}
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

export default Table_Paytech_all_Checked
