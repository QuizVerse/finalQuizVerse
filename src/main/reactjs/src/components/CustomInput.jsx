import React from 'react';
import {IconButton, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function CustomInput(props) {

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <TextField id="standard-basic"
                           label={props.label}
                           value={props.value}
                           type={props.isPassword ? (props.isPasswordVisible ? "text" : "password") : props.type}
                           variant="standard"
                           placeholder={props.placeholder}
                           onChange={(e) => props.updateValue(e.target.value)}
                />

                {props.isPassword && (
                    <div>
                        <IconButton onClick={props.updatePasswordVisible}>
                            {props.isPasswordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </IconButton>
                    </div>
                )}
            </div>

            {props.captionText === "" ? "" :
                <Typography variant="caption" color={props.captionColor}>{props.captionText}</Typography>
            }

        </div>
    );
}
