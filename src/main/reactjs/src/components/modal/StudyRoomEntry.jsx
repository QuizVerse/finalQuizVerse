import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function StudyRoomEntry({ studyId, studyTitle, studyPasswd, open, setOpen }) {
    const [inputPasswd, setInputPasswd] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!studyPasswd) {
            // 비밀번호가 없으면 바로 입장
            navigate(`/study/room/${studyId}`,{ state: { studyTitle } });
        }
    }, [studyPasswd, studyId, studyTitle, navigate]);

    // 모달에서 입력된 비밀번호를 확인하는 함수
    const handlePasswordSubmit = () => {
        if (inputPasswd === studyPasswd) {
            // 비밀번호가 맞으면 방으로 이동
            navigate(`/study/room/${studyId}`,{ state: { studyTitle } });
        } else {
            // 비밀번호가 틀리면 에러 메시지 표시
            setError(true);
        }
    };

    // 모달 닫기 및 상태 초기화
    const handleClose = () => {
        setOpen(false);
        setInputPasswd('');
        setError(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>비밀번호 입력</DialogTitle>
            <DialogContent >
                <div className={"p-4"}>
                    <TextField
                        label="비밀번호"
                        type="password"
                        fullWidth
                        value={inputPasswd}
                        onChange={(e) => setInputPasswd(e.target.value)}
                        error={error}
                        helperText={error ? "비밀번호가 틀렸습니다." : ""}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handlePasswordSubmit}>확인</Button>
            </DialogActions>
        </Dialog>
    );
}
