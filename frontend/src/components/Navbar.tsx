import Box from "@mui/material/Box";
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from "@mui/icons-material/Menu";


function Navbar() {
 return (
   <Box sx={{ flexGrow: 1 }}>
     <AppBar position="static">
       <Toolbar>
         <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
         >
           <MenuIcon />
         </IconButton>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
           ระบบย่อย ระบบติดตามอาการผู้ป่วย
         </Typography>
         <p text-align="right">ออกจากระบบ</p>
       </Toolbar>
     </AppBar>
   </Box>
 );
}

export default Navbar;