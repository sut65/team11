import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
import Table_Payment_show from './Table_Payment_show';
import Table_Paytech_show from './Table_Ordertech_show';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import React from 'react';
//import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';


function Paytech_Show() {
    const [tabIndex, setTabIndex] = React.useState(0);
    //===================================================================================================================================
    
    const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;
  
    &:hover { background-color: rgba(255, 255, 255, 0.6) ; color: #6F1AB6}
    &:focus {color: #F55050; outline: 3px solid ${'#80BFFF'};  }
    &.${tabUnstyledClasses.selected} { background-color: rgba(255, 255, 255, 0.9);  color: #6F1AB6;  }
    &.${buttonUnstyledClasses.disabled} {opacity: 0.5; cursor: not-allowed;  } `;

    const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
  `;

    const TabsList = styled(TabsListUnstyled)(
        ({ theme }) => `
    min-width: 400px;
    background: linear-gradient(90deg, #db36a4 0%, #f7ff00 160%);
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    `,
    );
    //====================================================================================================================================

    return (
        // <Paper style={{ backgroundColor: "#182E3E" }}>
        <Paper style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
                <Box sx={{ maginX: 0, maginY: 0 }}>
                    <center>
                        <Typography
                            component="h2"
                            variant="h4"
                            //color="#182E3E"
                            gutterBottom
                            //align="center"
                            fontFamily="Arial"
                        >
                            <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} >
                                <br />
                                ระบบชำระเงิน
                            </b>
                            <br /><br />

                        </Typography>
                    </center>
                </Box>
            </div>


            <Container>
                <TabsUnstyled defaultValue={0}>
                    <TabsList className="TabsList">
                        <Tab>รายการที่ยังไม่ชำระเงิน</Tab>
                        <Tab>ตรวจสอบรายการชำระเงินทั้งหมด</Tab>
                    </TabsList>
                    <TabPanel value={0}>{Show_not_pay()}</TabPanel>
                    <TabPanel value={1}>{Show_pay()}</TabPanel>
                </TabsUnstyled>
            </Container>

            <br /><br /><br /><br />
        </Paper>
    )

    function Show_not_pay() {
        return (
            <div>
                <Grid item xs={12} style={{ backgroundColor: '#091926' }}>
                    <center>
                        <Typography component="h3" variant="h6" gutterBottom fontFamily="Arial" >
                            <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} > ------------ รายการที่ยังไม่ชำระเงิน ------------ </b>
                        </Typography>
                    </center>
                </Grid>
                <Box sx={{ width: '100%', height: '500px', '& .super-app-theme--header': { backgroundColor: '#d4e3a9' } }}
                    style={{ backgroundColor: "#fbfcf6", borderRadius: '25px' }}  >
                    {Table_Paytech_show()}
                </Box>
            </div>

        )
    }
    function Show_pay() {
        return (
            <div>
                <Grid item xs={12} style={{ backgroundColor: '#091926' }}>
                    <center>
                        <Typography component="h3" variant="h6" gutterBottom fontFamily="Arial" >
                            <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} > ------------ รายการชำระเงิน ------------ </b>
                        </Typography>
                    </center>
                </Grid>
                <Box sx={{ width: '100%', height: '500px', '& .super-app-theme--header': { backgroundColor: '#d4e3a9' } }}
                    style={{ backgroundColor: "#fbfcf6", borderRadius: '25px' }}  >
                    {Table_Payment_show()}
                </Box>

            </div>

        )
    }


}
export default Paytech_Show