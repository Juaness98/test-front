import React from "react";
import {Alert, AlertTitle} from "@mui/material";

export default function Error(props) {
    return (
        <>
            {props.error ?
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Something went wrong <strong> {props.error}</strong>
                </Alert>
                :null
            }
        </>
    )
}