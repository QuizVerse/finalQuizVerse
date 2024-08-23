// v0 by Vercel.
// https://v0.dev/t/dyAI4Y9Tu3s

import {Rating, TextField} from "@mui/material";
import {useState} from "react";

export default function Review() {

    const [value, setValue] = useState(2);
    return (
        <>
            <div className="p-6 space-y-4">
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <div>
                    <TextField
                        id="standard-multiline-static"
                        label="평가 내용"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                        variant="standard"
                    />
                </div>
            </div>
        </>
    );
}