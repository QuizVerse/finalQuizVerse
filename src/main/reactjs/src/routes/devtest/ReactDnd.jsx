import CustomConfirm from "../../components/modal/CustomConfirm";
import SectionSort from "../../components/modal/SectionSort";
import {Button} from "@mui/material";
import {useState} from "react";
import axios from "axios";

export default function ReactDnd() {
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
        /**
         * @TODO: 확인 눌렀을 때 해당 사항 저장되는 로직 추가
        * */
        setConfirmVisible(false);
    };

    const arr = [
        { id: 0, title: '야호' },
        { id: 1, title: '야호1' },
        { id: 2, title: '야호2' },
    ];

    return (
        <>
            <Button
                onClick={openConfirm}
                className="whitespace-nowrap">
                섹션 재정렬
            </Button>
            <CustomConfirm
                id={7}
                content={<SectionSort sortData={arr} />}
                openConfirm={confirmVisible}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            ></CustomConfirm>
        </>
    );
}
