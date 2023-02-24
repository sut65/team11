import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //npm i react-router-dom


import "./home.css"

const images = [
    {
        url: '/static/images/buttons/burgers.jpg', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบช่าง',
        width: '50%',
        path: "TechnicianCreate",
    },
    {
        url: '/static/images/buttons/burgers.jpg', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบตรวจสอบการชำระเงิน',
        width: '50%',
        path: "Checked_paymentShow",
    },
    {
        url: '/static/images/buttons/camera.jpg', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'รับเรื่องการรายงานปัญหาหลังการซ่อม',
        width: '50%',
        path: "ClaimOrderForAdmin",
    },
    {
        url: '/static/images/buttons/camera.jpg', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบ show ยกเลิกการแจ้งซ่อม',
        width: '50%',
        path: "RefundShow",
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));



function HomeForAdmin() {

    // const [customerName, setCustomerName] = React.useState("");
    const _user = localStorage.getItem("name")
    const [nameTime, setNameTime] = React.useState("");

    console.log(_user);
    

    let [date, updateDate] = React.useState(new Date());

    const timeCheck = (timeHours: number): void => {

        if (timeHours >= 0 && timeHours < 11) {
            setNameTime('เช้า')
        } else if (timeHours >= 11 && timeHours < 12) {
            setNameTime('สาย')
        } else if (timeHours >= 12 && timeHours < 13) {
            setNameTime('เที่ยง')
        } else if (timeHours >= 13 && timeHours < 17) {
            setNameTime('บ่าย')
        } else if (timeHours >= 17 && timeHours < 19) {
            setNameTime('เย็น')
        } else if (timeHours >= 19) {
            setNameTime('ค่ำ')
        }
    };




    const handleNext = () => {
        setTimeout(() => { window.location.href = "/RankingForm"; }, 3000);
    };

    // เราใช้ useEffect เพื่อจัดการบางอย่างเมื่อ component เราถูก insert หรือ remove ออกจาก UI tree
    React.useEffect(() => {
        // เราสร้าง setInterval เพื่อ udpate date state ค่าใหม่ทุกๆ 1 วินาที
        let timerID = setInterval(() => updateDate(new Date()), 1000);

        // เราต้อง return function สำหรับ clear interval ด้วยเมื่อ component ถูกเอาออกจาก UI tree
        return () => clearInterval(timerID);
    });
    React.useEffect(() => {
        timeCheck(date.getHours());
        setTimeout(() => {
            timeCheck(date.getHours());
        }, 5000)

    }, []);
    return (
        <Box id="frame-outline-PageForCus" >
            <Typography id='helloCustomer'>
                สวัสดีตอน{nameTime} คุณ{_user}
            </Typography>
            <Typography id='Topic1Customer'>
                เมนูรายการทั้งหมด
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: "center", }}>
                {images.map((image, index) => (

                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        sx={{ marginX: "10px", marginY: "10px" }}
                        onClick={(e) => window.location.href = image.path + ""}


                    >
                        <ImageSrc sx={{ borderRadius: "25px" }} style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop sx={{ borderRadius: "25px" }} className="MuiImageBackdrop-root" />
                        <Image sx={{ borderRadius: "25px" }}>
                            <Typography
                                sx={{ backgroundColor: 'transparent', justifyContent: "center", borderRadius: "25px", fontSize: "20px", fontWeight: "800", fontFamily: "Noto Sans Thai" }}
                                color="inherit"
                            >
                                {image.title}
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
            </Box>
        </Box>
    )
}

export default HomeForAdmin