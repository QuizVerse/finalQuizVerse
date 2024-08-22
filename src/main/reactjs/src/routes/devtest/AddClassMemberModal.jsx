import CustomConfirm from "../../components/modal/CustomConfirm";
import SectionSort from "../../components/modal/SectionSort";
import {Button} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import Review from "../../components/modal/Review";
import AddClassMember from "../../components/modal/AddClassMember";

export default function ReviewModal() {
    // confirm state
    const [confirmVisible, setConfirmVisible] = useState(false);

    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setConfirmVisible(true);
    };

    /**
     * @description : 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        setConfirmVisible(false);
    };

    /**
     * @description : 확인 버튼 클릭시 실행되는 로직
     * */
    const clickBtn2 = () => {
        setConfirmVisible(false);
    };


    return (
        <>
            <Button
                onClick={openConfirm}
                className="whitespace-nowrap">
                구성원 추가
            </Button>
            <CustomConfirm
                id={10}
                content={<AddClassMember/>}
                openConfirm={confirmVisible}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            ></CustomConfirm>
        </>
    );
}
