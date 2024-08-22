import CustomConfirm from "../../components/modal/CustomConfirm";
import SectionSort from "../../components/modal/SectionSort";
import {Button} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import Review from "../../components/modal/Review";
import AddClassMember from "../../components/modal/AddClassMember";
import CustomAlert from "../../components/modal/CustomAlert";
import Alarm from "../../components/modal/Alarm";

export default function ReviewModal() {
    // confirm state
    const [alertVisible, setAlertVisible] = useState(false);

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


    return (
        <>
            <Button
                onClick={openAlert}
                className="whitespace-nowrap">
                알람
            </Button>
            <CustomAlert
                title={"알림"}
                content={<Alarm/>}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </>
    );
}
