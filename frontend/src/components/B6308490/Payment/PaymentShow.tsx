import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
import Table_Payment_show from './Table_Payment_show';
import Table_Paytech_show from './Table_Ordertech_show';



function Paytech_Show({ ID, set_ID, setActiveStep }: any) {
    return (
        <Paper style={{ backgroundColor: "#182E3E" }}>
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


            <Container  >

                <hr />
                <center>
                    <Typography component="h3" variant="h6" gutterBottom fontFamily="Arial" >
                        <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} > ------------ รายการที่ยังไม่ชำระเงิน ------------ </b>
                    </Typography>
                </center>
                <hr />

                <Box sx={{ width: '100%', height: '500px' }} style={{ backgroundColor: "#e0f2f1" }}  >
                    {Table_Paytech_show()}
                </Box>

                <hr />
                <center>
                    <Typography component="h3" variant="h6" gutterBottom fontFamily="Arial" >
                        <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} > ------------ รายการชำระเงิน ------------ </b>
                    </Typography>
                </center>
                <hr />
                <Box sx={{ width: '100%', height: '500px' }} style={{ backgroundColor: "#e0f2f1" }}  >
                    {Table_Payment_show()}
                </Box>


                <br /><br />
            </Container>

            <br /><br /><br /><br /><br /><br /><br /><br />
        </Paper>
    )




}
export default Paytech_Show

