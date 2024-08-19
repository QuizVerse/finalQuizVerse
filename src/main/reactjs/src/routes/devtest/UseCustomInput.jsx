import CustomInput from "../../components/CustomInput";
import {useState} from "react";

export default function UseCustomInput() {
    const [value, setValue] = useState("");
    const onSetValue = (value) => {
        setValue(value);
        console.log(value);
    }

    return(
        <CustomInput updateValue={onSetValue}/>
    );
}
