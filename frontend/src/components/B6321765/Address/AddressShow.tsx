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
import Swal from 'sweetalert2';

import { DistrictInterface, ProvinceInterface, TambonInterface } from "../../../interfaces/AddressUI";
import { AddressTypeInterface } from "../../../interfaces/AddressUI";

import dayjs, { Dayjs } from 'dayjs';

function AddressShow() {

    useEffect(() => {
        
    }, []);

    return(
        <div></div>
    )
}

export default AddressShow;