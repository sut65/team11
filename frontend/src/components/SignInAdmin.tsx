import React, { useState } from "react"
import Box from "@mui/material/Box";
import "./SignIn.css"
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Link as RouterLink, Route } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SignInAd } from "../services/HttpClientService";


const defaultSigninAdmin = {
    Email: "",
    Password: "",
};


function SignInAdmin() {
    const [signin, setSignin] = useState(defaultSigninAdmin);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };
    const submit = async () => {
        let res = await SignInAd(signin);

        console.log(res);

        if (res) {
            setSuccess(true);
            console.log("true");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            setError(true);
        }
    };

    return (
        <div >
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    เข้าสู่ระบบสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="error">
                    อีเมลหรือรหัสผ่านไม่ถูกต้อง
                </Alert>
            </Snackbar>
            <Box id="signinform">
                <Typography component="h1" variant="h5">
                    Sign In For Admin
                </Typography>
                <div id="textField">
                    <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="Email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={signin.Email}
                        onChange={(event) =>
                            setSignin(({ ...signin, Email: event.target.value }))}
                    />
                </div>

                <div id="textField">
                    <TextField
                        className="textField"
                        variant="standard"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="Password"
                        autoComplete="current-password"
                        value={signin.Password}
                        onChange={(event) =>
                            setSignin(({ ...signin, Password: event.target.value }))}
                    />
                </div>
                <Button
                    id="buttonSignInTech"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submit}
                >
                    Sign In
                </Button>
                <Typography id="alternativeSignUp">
                    Or Sign In
                </Typography>
                <Button
                    id="buttonGoSignInCustomerPage"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component={RouterLink} to="/SignInCustomer"
                >
                    หน้า sing in สำหรับลูกค้า
                </Button>
                <Button
                    id="buttonGoSignInTeshPage"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component={RouterLink} to="/SignInTech"
                >
                    หน้า sing in สำหรับช่าง
                </Button>
            </Box>
        </div>
    );
}

export default SignInAdmin;