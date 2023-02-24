


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; //npm i react-router-dom


import "./home.css"






const images = [
    {
        url: 'https://i.postimg.cc/kMFWVQLk/image.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบ show สมาชิกแจ้งซ่อม',
        width: '30%',
        path: "CustomerShow",
    },
    {
        url: 'https://i.postimg.cc/28k93897/image.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบที่อยู่ผู้แจ้ง',
        width: '30%',
        path: "AddressShowPage",
    },
    {
        url: 'https://i.postimg.cc/vTznpyWQ/image.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบอุปกรณ์ผู้แจ้ง',
        width: '30%',
        path: "DeviceShowPage",
    },
    {
        url: 'https://i.postimg.cc/DZ1LPL04/image.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบการจัดการข้อมูลการแจ้งซ่อม',
        width: '30%',
        path: "ShowOrder",
    },
    {
        url: 'https://i.postimg.cc/43DpcBfT/Payment.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบชำระเงิน',
        width: '30%',
        path: "PaymentShow",
    },
    {
        url: 'https://i.postimg.cc/02nG4Yfp/image.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ระบบประเมินความพึงพอใจ',
        width: '30%',
        path: "RankingForm",
    },
    {
        url: 'https://i.postimg.cc/qv7cHNbW/image.png', // <------- ใส้รูปตรงนี้โดยใช้เว็บ "https://postimages.org"
        title: 'ตรวจสอบการเคลม',
        width: '30%',
        path: "ShowClaim",
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



function HomeForCus() {

    const [customerName, setCustomerName] = React.useState("");
    const userID = parseInt(localStorage.getItem("uid") + "");
    const [nameTime, setNameTime] = React.useState("");

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
        } else if (timeHours > 19) {
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

    const getCustomerName = async () => {
        const apiUrl = `http://localhost:8080/GetCustomer/${userID}`;
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    // setReviews(res.data)
                    setCustomerName(res.data.Name);
                }
            });
    };
    React.useEffect(() => {
        getCustomerName();

        timeCheck(date.getHours());
        setTimeout(() => {
            timeCheck(date.getHours());
        }, 5000)

    }, []);
    return (

        <Box id="frame-outline-PageForCus" >
            <Typography id='helloCustomer'>
                สวัสดีตอน{nameTime} คุณ{customerName}
            </Typography>
            <Typography id='Topic1Customer'>
                🖥️ บริการทั้งหมดจากเรา
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', justifyContent: "center", }}>
                {images.map((image, index) => (

                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        sx={{ marginX: "10px" ,marginY:"10px"}}
                        onClick={ (e) => window.location.href = image.path + ""}


                    >
                        <ImageSrc sx={{borderRadius:"25px"}} style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop sx={{borderRadius:"25px"}} className="MuiImageBackdrop-root" />
                        <Image sx={{borderRadius:"25px"}}>
                            <Typography
                                sx={{ backgroundColor: 'transparent', justifyContent: "center" ,borderRadius:"25px",fontSize:"20px",fontWeight:"800",fontFamily:"Noto Sans Thai"}}
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

export default HomeForCus