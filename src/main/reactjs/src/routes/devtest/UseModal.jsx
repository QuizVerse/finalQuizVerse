import {Button, TextField} from "@mui/material";
import {useState} from "react";


// 모달 내용 수정 시 아래의 파일로 이동하여 수정
import CustomConfirm from "../../components/CustomConfirm";
import CustomAlert from "../../components/CustomAlert";
import CustomInput from "../../components/CustomInput";
import axios from "axios";
import NewClass from "../../components/NewClass";

/**
 * @description:
 * 모달 사용 예시입니다
* */
export default function UseModal() {

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [className, setClassName] = useState("");
    const [classDescription, setClassDescription] = useState("");

    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setConfirmVisible(true);
    };

    /**
     * @description : Confirm창 닫힐 때
     * */
    const closeConfirm = () => {
        console.log(className);
        createClass();
        setConfirmVisible(false);
    };

    /**
    * @description : Alert창 열릴 때
    * */
    const openAlert = () => {
        setAlertVisible(true);
    };


    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };


    /**
     * @description :
     * */
    const onSetClassName = (className) => {
        setClassName(className);
    }

    /**
     * @description :
     * */
    const onSetClassDescription = (classDescription) => {
        setClassDescription(classDescription);
    }

    /**
     * @description : class 생성
     * */
    const createClass=(e)=>{
        axios({
            method:'post',
            url:'/myclass/newclass',
            data:{
                "class_name": className,
                "class_description": classDescription,
            },
        }).then(res=>{
            console.log(res);
        })
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
                    <NewClass
                        label={"Class name"}
                        placeholder={""}
                        updateClassName={onSetClassName}
                        updateClassDescription={onSetClassDescription}
                    />
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
