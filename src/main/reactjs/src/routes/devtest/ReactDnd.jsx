import CustomConfirm from "../../components/CustomConfirm";
import SectionSort from "../../components/SectionSort";
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
        axios({
            method:'post',
            url:'/myclass/newclass',
            data:{

            },
        }).then(res=>{
            console.log(res);

        })
        setConfirmVisible(false);
    };

    return (
        <>
            <Button
                onClick={openConfirm}
                className="whitespace-nowrap">
                버튼 두개 모달 띄우는 버튼
            </Button>
            <CustomConfirm
                id={7}
                content={<SectionSort/>}
                openConfirm={true}
            ></CustomConfirm>

        </>
    );
}
