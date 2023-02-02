import { Box, Button, Container, FormControl, Grid, Paper, styled, Typography } from '@mui/material';
import Check_Table_Payment_show from './Table_CheckedPayment_show';
import Table_Paytech_all_Checked from './Table_Paytech_all_Checked';




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
                ระบบตรวจสอบการชำระเงิน
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
            <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} > ------------ รายการที่ยังไม่ตรวจสอบ ------------ </b>
          </Typography>
        </center>
        <hr />

        <Box sx={{ width: '100%', height: '500px' }} style={{ backgroundColor: "#e0f2f1" }}  >
          {Table_Paytech_all_Checked()}
        </Box>

        <hr />
        <center>
          <Typography component="h3" variant="h6" gutterBottom fontFamily="Arial" >
            <b style={{ font: "#FFFFFF", color: "#FFFFFF" }} > ------------ รายการตรวจสอบทั้งหมด ------------ </b>
          </Typography>
        </center>
        <hr />
        <Box sx={{ width: '100%', height: '500px' }} style={{ backgroundColor: "#e0f2f1" }}  >
          {Check_Table_Payment_show()}
        </Box>


        <br /><br />
      </Container>

      <br /><br /><br /><br /><br /><br /><br /><br />
    </Paper>
  )




}
export default Paytech_Show

