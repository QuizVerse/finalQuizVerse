import {TextField} from "@mui/material";

export default function NewClass() {
    return (
        <TextField className="w-full max-w-md px-4 py-2 border rounded"
                   label={"클래스 이름"}
                   placeholder="클래스 이름"
                   type="text"
                   variant={"standard"}
        ></TextField>
    );
}