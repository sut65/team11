import React, { useState } from "react";
import Box from "@mui/material/Box";
import "./SignIn.css"
import { Button, Divider, Snackbar, TextField, Typography } from "@mui/material";
import { Link as RouterLink, Route } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SigninInterface } from "../interfaces/ISignin";
import { SignInCus } from "../services/HttpClientService";
import { log } from "console";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const defaultSigninCustomer = {
    Email: "",
    Password: "",
};

function SignInCustomer() {
    const [signin, setSignin] = useState(defaultSigninCustomer)
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
        let res = await SignInCus(signin);

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
                <Typography component="h1" variant="h5" id="alternativeSignUp">
                    Sign In For Customer
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
                    id="buttonSignInCustomert"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submit}
                >
                    Sign In
                </Button>

                <Typography id="alternativeSignUp">
                    Don't have an account yet?
                    <Button
                        component={RouterLink} to="/CreateForm"
                    >
                        Sign Up
                    </Button>
                </Typography>


                <Typography id="alternativeSignUp">
                    Or Sign In
                </Typography>
                <Button
                    id="buttonGoSignInTeshPage"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component={RouterLink} to="/SignInTech"
                >
                    หน้า sing in สำหรับช่าง
                </Button>
                <Button
                    id="buttonGoSignInCustomerPage"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    component={RouterLink} to="/SignInAdmin"
                >
                    หน้า sing in สำหรับ Admin
                </Button>


            </Box>
        </div>
    );
}

export default SignInCustomer;