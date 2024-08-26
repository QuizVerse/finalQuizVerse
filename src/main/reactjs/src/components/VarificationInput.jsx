import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomAlert from "./modal/CustomAlert";
import Alarm from "./modal/Alarm";

export default function VarificationInput(props) {
    const [timeLeft, setTimeLeft] = useState(10); // 180초 = 3분
    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertId, setAlertId] = useState(1);

    // 타이머 카운트다운 로직
    /**
     * @Todo : 인증시간 안에 이메일 인증로직
     * */
    useEffect(() => {
        if (props.timerActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            props.onTimerEnd && props.onTimerEnd(); // 타이머가 끝나면 부모 컴포넌트에 알림
            // 타이머가 끝났음을 알리는 alert 호출
            setAlertId(9);
            openAlert();
        }
    }, [timeLeft, props.timerActive]);

    // 시간을 MM:SS 형식으로 변환하는 함수
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

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
        if(alertId === 1) startTimer();
        if(alertId === 9) setAlertId(1);

    };

    const startTimer = () => {
        setTimeLeft(10); // 타이머를 초기화
        props.onStartTimer(); // 부모 컴포넌트에서 타이머를 시작하도록 요청
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex items-center gap-4">
                    <TextField id="standard-basic"
                               label={props.label}
                               value={props.value}
                               type={"email"}
                               variant="standard"
                               placeholder={props.placeholder}
                               onChange={(e) => props.updateValue(e.target.value)}
                    />
                    <div>
                        <Button variant="contained" onClick={openAlert}>확인</Button>
                    </div>
                </div>

                <Typography variant="caption" color={props.captionColor}>
                    인증 제한 시간: {formatTime(timeLeft)}
                </Typography>
            </div>

            <CustomAlert
                id={alertId}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </>
    );
}
