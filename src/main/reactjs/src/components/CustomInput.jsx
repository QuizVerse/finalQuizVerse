import {TextField} from "@mui/material";

export default function CustomInput(prop) {
    return (
        <>
            <TextField id="standard-basic"
                       label={prop.label}
                       value={prop.value}
                       variant="standard"
                       placeholder={prop.placeholder}/>

        </>
        )
}
