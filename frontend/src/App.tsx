import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //npm i react-router-dom
import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";



import RankingForm from './components/B6304577/ReviewOrders/RatingForm';
import Payment from './components/B6308490/Payment/Payment';
import EditPayment from './components/B6308490/Payment/EditPayment';
import PaymentShow from './components/B6308490/Payment/PaymentShow';
import OrderTech from './components/B6310646/UIOrderTech';
import PayTech from './components/B6310646/UIPayTech';
import AddressCreateForm from './components/B6321765/Address/AddressCreate';
import AddressShowForm from './components/B6321765/Address/AddressShow';
import AddressEditForm from './components/B6321765/Address/AddressEdit';
import OrderCreate from './components/B6304508/Order';
import ClaimForm from './components/B6304577/ClaimOrders/ClaimForm';
import ClaimOrderForAdmin from './components/B6304577/ClaimOrders/ClaimOrderForAdmin';
import DeviceCreateForm from './components/B6321765/Device/DeviceCreate';
import DeviceEditForm from './components/B6321765/Device/DeviceEdit';
import DeviceShowForm from './components/B6321765/Device/DeviceShow';
import OrderUpdate from './components/B6304508/UpdateOrder';
import ShowOrder from './components/B6304508/ShowOrder';
import RefundCreate from './components/B6304508/Refund';
import RefundShow from './components/B6304508/ShowRefund';
import CreateForm from './components/B6311117/Customer/CreateForm';
import CreateForm2 from './components/B6311117/Customer/CustomerForm2';
import CreateFormTech from './components/B6311117/Technician/CreateFormTech';
import CreateTechnician2 from './components/B6311117/Technician/CreateFromeTechnician2';
import Checked_paymentShow from './components/B6308490/Checked_payment/Checked_paymentShow';
import Checked_payment from './components/B6308490/Checked_payment/Checked_payment';
import Edit_Checked_payment from './components/B6308490/Checked_payment/Edit_Checked_payment';
import LoginCustomer from './components/LoginCustomer';
import Home from './components/Home';
import { Button } from '@mui/material';
import ContentClaimOrder from './components/B6304577/ClaimOrders/ContentClaim';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", path: "/" },

  { name: "ระบบสมาชิกแจ้งซ่อม", path: "/CustomerCreate" },
  { name: "ระบบ show สมาชิกแจ้งซ่อม", path: "/CustomerShow" },
  { name: "ระบบช่าง", path: "/TechnicianShow" },
  { name: "ระบบshowช่าง", path: "/TechnicianCreate" },
  { name: "ระบบที่อยู่ผู้แจ้ง", path: "/AddressShowPage" },
  { name: "ระบบอุปกรณ์ผู้แจ้ง", path: "/DeviceShowPage" },
  { name: "ระบบการจัดการข้อมูลการแจ้งซ่อม", path: "/OrderCreate" },
  { name: "ระบบยกเลิกการแจ้งซ่อม", path: "/RefundCreate" },
  { name: "ระบบ show ยกเลิกการแจ้งซ่อม", path: "/RefundShow" },
  { name: "ระบบรับออเดอร์ช่าง", path: "/OrderTech" },
  { name: "ระบบบันทึกค่าใช้จ่ายของช่าง", path: "PayTech" },
  { name: "ระบบชำระเงิน", path: "/PaymentShow" },
  { name: "ระบบตรวจสอบการชำระเงิน", path: "/Checked_paymentShow" },
  { name: "ระบบประเมินความพึงพอใจ", path: "/RankingForm" },
  { name: "ระบบรายงานปัญหาหลังการซ่อม", path: "/ContentClaimOrder" },
  // { name: "สมาชิก" />, path: "/users" },
  // { name: "การเข้าชมวีดีโอ", path: "/watch_videos" },
];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  // if (!token) {
  //   return <LoginCustomer />;
  // }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    // <Router>
    //   <Routes>
    //     {/* ทดสอบหน้า fontent ที่นี่ */}
    //     <Route path="/" element={<LoginCustomer />} /> 
    //     {/* <Route path="/" element={<PaymentShow />} />  */}
    //     {/* ทดสอบหน้า fontent ที่นี่ */}
    //     <Route path="/ContentClaimOrder" element={<ClaimForm />} />
    //     <Route path="/ClaimOrderForAdmin" element={<ClaimOrderForAdmin />} />
    //     <Route path="/RankingForm" element={<RankingForm />} />
    //     <Route path="/OrderCreate" element={<OrderCreate />} />
    // <Route path="/OrderUpdate" element={<OrderUpdate />} />
    // <Route path="/ShowOrder" element={<ShowOrder />} />
    //     <Route path="/PaymentShow" element={<PaymentShow />} />
    //     <Route path="/Payment" element={<Payment />} />
    //     <Route path="/EditPayment" element={<EditPayment />} />
    //     <Route path="/Checked_paymentShow" element={<Checked_paymentShow />} /> 
    //     <Route path="/Checked_payment" element={<Checked_payment />} /> 
    //     <Route path="/EditChecked_payment" element={<Edit_Checked_payment />} /> 
    //     <Route path="/AddressCreatePage" element={<AddressCreateForm />} />
    //     <Route path="/AddressShowPage" element={<AddressShowForm/>} />
    //     <Route path="/AddressEditPage" element={<AddressEditForm/>} />
    //     <Route path="/DeviceCreatePage" element={<DeviceCreateForm/>} />
    //     <Route path="/DeviceEditPage" element={<DeviceEditForm/>} />
    //     <Route path="/DeviceShowPage" element={<DeviceShowForm/>} />
    //     <Route path="/RefundCreate" element={<RefundCreate />} />
    //     <Route path="/RefundCreate" element={<RefundShow />} />
    //     <Route path="/OrderTech" element={<OrderTech />} /> 
    //     <Route path="/PayTech" element={<PayTech />} /> 
    //     <Route path="/CustomerCreate" element={<CreateForm />} /> 
    //     <Route path="/CustomerShow" element={<CreateForm2 />} /> 


    // <Route path="/TechnicianCreate" element={<CreateTechnician2 />} /> 
    // <Route path="/TechnicianShow" element={<CreateFormTech />} /> 
    //   </Routes>
    // </Router>
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                ระบบแจ้งซ่อมคอมพิวเตอร์
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => (
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/CustomerCreate" element={<CreateForm />} /> 
                <Route path="/CustomerShow" element={< CreateForm2 />} />
                <Route path="/TechnicianCreate" element={<CreateTechnician2 />} />
                <Route path="/TechnicianShow" element={<CreateFormTech />} />
                <Route path="/AddressShowPage" element={<AddressShowForm />} />
                <Route path="/AddressEditPage" element={<AddressEditForm />} />
                <Route path="/AddressCreatePage" element={<AddressCreateForm />} />
                <Route path="/DeviceShowPage" element={<DeviceShowForm />} />
                <Route path="/DeviceEditPage" element={<DeviceEditForm />} />
                <Route path="/DeviceCreatePage" element={<DeviceCreateForm />} />
                <Route path="/OrderCreate" element={<OrderCreate />} />
                <Route path="/OrderUpdate" element={<OrderUpdate />} />
                <Route path="/ShowOrder" element={<ShowOrder />} />
                <Route path="/RefundCreate" element={<RefundCreate />} />
                <Route path="/RefundShow" element={<RefundShow />} />
                <Route path="/OrderTech" element={<OrderTech />} />
                <Route path="/PayTech" element={<PayTech />} />
                <Route path="/PaymentShow" element={<PaymentShow />} />
                <Route path="/EditPayment" element={<EditPayment />} />
                <Route path="/Payment" element={<Payment />} />
                <Route path="/Checked_paymentShow" element={<Checked_paymentShow />} />
                <Route path="/EditChecked_payment" element={<Edit_Checked_payment />} />
                <Route path="/Checked_payment" element={<Checked_payment />} />
                <Route path="/RankingForm" element={<RankingForm />} />
                <Route path="/ContentClaimOrder" element={<ContentClaimOrder />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
