import {TextField} from "@mui/material";
import CustomInput from "../CustomInput";
import {useState} from "react";

export default function NewClass(props) {

    const updateClassName = (e) => {
        props.updateClassName(e.target.value);
    }

    const updateClassDescription = (e) => {
        props.updateClassDescription(e.target.value);
    }

    return (
        <div className="flex flex-col gap-6">
            <TextField
                label={"클래스 이름"}
                placeholder="클래스 이름"
                type="text"
                variant={"standard"}
                onChange={updateClassName}
            ></TextField>
            <TextField
                label={"클래스 설명"}
                placeholder="클래스 설명"
                type="text"
                multiline
                maxRows={4}
                variant={"standard"}
                onChange={updateClassDescription}
            ></TextField>
        </div>
    );
}