import React from "react";
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {closeAuth} from "../features/authSlice";

function Menu() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)

    const changeState = () => {
        dispatch(closeAuth())
        navigate('/')
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome {auth.userInfo.name}!
                        </Typography>
                        <Button type='button' onClick={changeState} color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Menu