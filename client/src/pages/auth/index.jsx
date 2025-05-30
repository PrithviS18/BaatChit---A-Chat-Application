import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import namaste_2537106 from "../../assets/namaste_2537106.png";
import backgroundImage from "../../assets/41919.jpg";
import { toast } from 'react-toastify';
import { apiClient } from "../../lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../utils/constant";

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';

const Auth = () => {
    // State to keep track of the selected tab
    const [value, setValue] = useState('1');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Event handler for tab changes
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [email, setemail] = useState("");
    const handleEmailChange = (event) => {
        setemail(event.target.value);
    };

    const [password, setpassword] = useState("");
    const handlePasswordChange = (event) => {
        setpassword(event.target.value);
    };
    const [username, setusername] = useState("");
    const handleUsernameChange = (event) => {
        setusername(event.target.value);
    };

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    //VALIDATE FIELDS BEFORE REQUESTING FOR SIGNUP
    const validatesignup = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!username.length) {
            toast.error("Username is required");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        return true;
    }

    const validatelogin = () => {
        if (!email.length){
            toast.error("Email is required");
            return false;
        }
        if (!password.length){
            toast.error("Password is required");
            return false;
        }
        return true;
    }

    // LOGIN LOGIC
    const handleLogin = async () => {
        if (validatelogin()){
            try {
                const response = await apiClient.post(LOGIN_ROUTE, {
                    email,
                    password
                },{withCredentials:true});

                // Handle successful signup
                toast.success("Successfully LoggedIn");
                if (response.data.user.id){
                    dispatch(setUser(response.data.user));
                    if (response.data.user.profileSetup)navigate('/chat')
                    else navigate('/profile');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };


    // SIGN UP LOGIC
    const handleSignup = async () => {
        if (validatesignup()) {
            try {
                const response = await apiClient.post(SIGNUP_ROUTE, {
                    email,
                    username,
                    password
                },{withCredentials:true});

                // Handle successful signup
                if (response.status===201){
                    dispatch(setUser(response.data.user));
                    toast.success("Sign Up Completed");
                    navigate('/profile');
                }
            } catch (error) {
                // Axios wraps all network errors here
                if (error.response) {
                    // Server responded with a status code outside 2xx
                    console.error("Signup failed:", error.response.data);

                    alert(`Signup error: ${error.response.data}`);

                } else if (error.request) {
                    // No response was received from server
                    console.error("No response received:", error.request);

                    alert("Server is not responding. Please try again later.");

                } else {
                    // Something else happened setting up the request
                    console.error("Axios error:", error.message);

                    alert("Unexpected error occurred.");
                }
            }
        }
    };



    return (
        <div>
            <div style={{ background: `url(${backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center' }} className=" h-[100vh] w-[100vw] flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg h-[80vh] text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw]">
                    <div className="flex items-center justify-center flex-col gap-10 h-full w-full">
                        <h1 className='flex gap-5 font-mono font-bold'>Namaste <img className='w-20 h-20' src={namaste_2537106} alt="" /></h1>
                        <TabContext value={value}>
                            <Box>
                                <TabList onChange={handleChange} aria-label="auth tabs" centered>
                                    <Tab className='w-60' label="login" value="1" />
                                    <Tab className='w-60' label="sign up" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel className='flex flex-col justify-center items-center gap-4' value="1">
                                <TextField className='w-96' id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
                                <FormControl className='w-96' variant="outlined" value={password} onChange={handlePasswordChange}>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Button className='w-96' variant="contained" onClick={handleLogin}>Login</Button>
                            </TabPanel>

                            <TabPanel className='flex flex-col justify-center items-center gap-4' value="2">
                                <TextField className='w-96' id="outlined-basic1" label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
                                <TextField className='w-96' id="outlined-basic2" label="Username" variant="outlined" value={username} onChange={handleUsernameChange} />
                                <FormControl className='w-96' variant="outlined" value={password} onChange={handlePasswordChange}>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Button className='w-96' variant="contained" onClick={handleSignup}>SignUp</Button>
                            </TabPanel>
                        </TabContext>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
