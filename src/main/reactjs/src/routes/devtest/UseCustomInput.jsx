import CustomInput from "../../components/CustomInput";
import {useState} from "react";

export default function UseCustomInput() {
    const [value, setValue] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onSetValue = (value) => {
        setValue(value);
        console.log(value);
    }

    const clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    return(
        <div>
            <CustomInput
                updateValue={onSetValue}
                label={"hi"}
                type={"text"}
                placeholder={"hi"}
                isPassword={true}
                updatePasswordVisible={clickPasswordVisible}
                isPasswordVisible={passwordVisible}
                captionVisible={true}
                captionText={"sdf"}
                timerVisible={true}
            />
        </div>

    );
}
