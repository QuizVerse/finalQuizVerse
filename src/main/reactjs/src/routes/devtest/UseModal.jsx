import {Button} from "@mui/material";
import {useState} from "react";


// 모달 내용 수정 시 아래의 파일로 이동하여 수정
import CustomConfirm from "../../components/CustomConfirm";
import CustomAlert from "../../components/CustomAlert";

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

    return (
        <>
            <Button
                onClick={openConfirm}
                className="whitespace-nowrap">
                버튼 두개 모달 띄우는 버튼
            </Button>
            <CustomConfirm id={0} // CustomConfirm에서 id 확인하여 입력
                           openConfirm={confirmVisible}
                           closeConfirm={closeConfirm}/>

            <Button
                onClick={openAlert}
                className="whitespace-nowrap">
                버튼 한개 모달 띄우는 버튼
            </Button>
            <CustomAlert
                id={0} // CustomAlert id 확인하여 입력
                openAlert={alertVisible}
                closeAlert={closeAlert}/>
        </>
    );
}
