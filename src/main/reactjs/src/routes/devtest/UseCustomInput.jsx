import CustomInput from "../../components/CustomInput";
import {useState} from "react";
import VarificationInput from "../../components/VarificationInput";

export default function UseCustomInput() {
    const [value, setValue] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [timerActive, setTimerActive] = useState(false);

    const onSetValue = (value) => {
        setValue(value);
        console.log(value);
    }

    const clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    /**
     * @description : 타이머 시작시 로직
     * @Todo: alert추가
     * */
    const handleStartTimer = () => {
        setTimerActive(true);
    }

    /**
     * @description : 타이머 종료시 로직
     * @Todo: alert추가
     * */
    const handleTimerEnd = () => {
        setTimerActive(false);
    }

    return (
        <div>
            <CustomInput
                updateValue={onSetValue}
                label={"hi"}
                type={"text"}
                placeholder={"hi"}
                isPassword={true}
                updatePasswordVisible={clickPasswordVisible}
                isPasswordVisible={passwordVisible}
                captionText={"sdf"}
            />

            <VarificationInput
                label={"hi"}
                placeholder={"hi"}
                timerActive={timerActive}
                onStartTimer={handleStartTimer} // 타이머 시작 함수 전달
                onTimerEnd={handleTimerEnd} // 타이머 종료 시 호출할 함수 전달
            />
        </div>
    );
}
