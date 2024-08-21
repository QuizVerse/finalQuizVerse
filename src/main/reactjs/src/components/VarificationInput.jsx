import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function VarificationInput(props) {
    const [timeLeft, setTimeLeft] = useState(180); // 180초 = 3분

    // 타이머 카운트다운 로직
    useEffect(() => {
        if (props.timerActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            props.onTimerEnd && props.onTimerEnd(); // 타이머가 끝나면 부모 컴포넌트에 알림
        }
    }, [timeLeft, props.timerActive]);

    // 시간을 MM:SS 형식으로 변환하는 함수
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const startTimer = () => {
        setTimeLeft(180); // 타이머를 초기화
        props.onStartTimer(); // 부모 컴포넌트에서 타이머를 시작하도록 요청
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <TextField id="standard-basic"
                           label={props.label}
                           value={props.value}
                           type={"email"}
                           variant="standard"
                           placeholder={props.placeholder}
                           onChange={(e) => props.updateValue(e.target.value)}
                />
                <div>
                    <Button variant="contained" onClick={startTimer}>확인</Button>
                </div>
            </div>

            {props.captionVisible && (
                <Typography variant="caption" color={props.captionColor}>{props.captionText}</Typography>
            )}

            <Typography variant="caption" color={props.captionColor}>
                인증 제한 시간: {formatTime(timeLeft)}
            </Typography>
        </div>
    );
}
