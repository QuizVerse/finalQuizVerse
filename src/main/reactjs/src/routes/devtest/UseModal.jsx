import {Button, TextField} from "@mui/material";
import {useState} from "react";


// 모달 내용 수정 시 아래의 파일로 이동하여 수정
import CustomConfirm from "../../components/CustomConfirm";
import CustomAlert from "../../components/CustomAlert";
import SearchInput from "../../components/SearchInput";
import CustomInput from "../../components/CustomInput";

/**
 * @description:
 * 모달 사용 예시입니다
* */
export default function UseModal() {

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const openConfirm = () => {
        setConfirmVisible(true);
    };

    const closeConfirm = () => {
        setConfirmVisible(false);
    };

    const openAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    const [name, setName] = useState("Superman");
    const onSetName = (name) => {
        setName(name);
        console.log(name);
    }

    return (
        <>
            <Button
                onClick={openConfirm}
                className="whitespace-nowrap">
                버튼 두개 모달 띄우는 버튼
            </Button>
            <CustomConfirm
                id={9} // CustomConfirm에서 id 확인하여 입력
                // props으로도 입력 가능 (title, content, btn1Text,  btn2Text)
                content={
                    <CustomInput
                        label={"Class name"}
                        placeholder={""}
                        updateValue={onSetName}/>
                }
                openConfirm={confirmVisible}
                closeConfirm={closeConfirm}
            />
            <Button
                onClick={openAlert}
                className="whitespace-nowrap">
                버튼 한개 모달 띄우는 버튼
            </Button>
            <CustomAlert
                id={5} // CustomAlert id 확인하여 입력
                // props으로도 입력 가능 (title, content, btnText)
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </>
    );
}
