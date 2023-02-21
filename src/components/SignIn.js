import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createAuth} from "../features/authSlice";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Error from "./Error";

const API_URL = 'https://test-back-liao.onrender.com/users/';

const theme = createTheme();

function SignIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    const loginPost = async () => {
        try {
            await axios.post(`${API_URL}login`, user)
                .then(res => dispatch(createAuth(res.data)))
            navigate('/company')
        } catch (e){
            setError(e.response.data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginPost()
    }

    return (
        <>
            <Error error={error}></Error>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                                value={user.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={user.password}

                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to={'/signUp'}>
                                        "Don't have an account? Sign Up"
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default SignIn