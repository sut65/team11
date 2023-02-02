import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import Payment, { Payment_get_Ordertech_ID } from './Payment'
import React from 'react';
import { PaymentInterface } from '../../../interfaces/PaymentUI';
import dayjs from 'dayjs';
import { OrderTechInterface } from '../../../interfaces/IOrderTech';
import { Edit } from '@mui/icons-material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

function Table_Paytech_show() {
    const [Paytech_all, set_All_Payment] = React.useState<OrderTechInterface[]>([]);
    const get_All_Paytech = async () => {
        const apiUrl = `http://localhost:8080/order-teches`; // add ID for search
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    set_All_Payment(res.data);
                    console.log(res.data);
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
                    //console.log(params.id);
                    Payment_get_Ordertech_ID(params.id.toString());
                };
                return (
                    <RouterLink to={`/Payment`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" onClick={handleClick}
                            sx={{ cursor: 'pointer', color: 'ff3222', backgroundColor: '#009a00' }} >
                            {<LocalAtmIcon />}ชำระเงิน
                        </Button>
                    </RouterLink>
                );
            }
        },
        // { field: "ID", headerName: "OrderTechID", width: 100 },
        { field: "OrderID", headerName: "OrderID", width: 70 },
        //{ field: "TimeOut", headerName: "Time out", width: 100 },

        {
            field: "ID", headerName: "ปัญหาที่พบ", width: 200, renderCell: params => {
                return <div>{params.row.ORDER.Reason} </div>
            }
        },
        { field: "Solving", headerName: "Solving", width: 200 },
        {
            field: "StatusID", headerName: "Status", width: 120, renderCell: params => {
                return <div>{params.row.Status.StatusName}</div>
            }
        },
        {
            field: "DamageID", headerName: "ระดับความรุนแรง", width: 120, renderCell: params => {
                return <div>{params.row.Damage.DamageName}</div>
            }
        },
        {
            field: "TechnicianID", headerName: "ช่างผู้ซ่อม", width: 200, renderCell: params => {
                return <div>{params.row.Technician.Name}</div>
            }
        },
        // sum of number table is 815
    ];

    useEffect(() => {

        get_All_Paytech();

    }, []);

    return (
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
                rows={Paytech_all}
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

export default Table_Paytech_show

