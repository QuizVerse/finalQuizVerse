import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "../../components/modal/CustomAlert";
import {
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    Container,
    Paper,
    Alert,
    AlertTitle,
} from "@mui/material";
import CustomInput from "../../components/CustomInput";

export default function Signup() {
    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const [user_nickname, setUser_nickname] = useState('');
    const [user_passwordcheck, setUser_passwordcheck] = useState('');
    const [auth_code, setAuth_code] = useState(''); // 사용자 입력 인증 코드
    const [timeLeft,setTimeLeft]=useState(180);
    const [timerRunning,setTimerRunning]=useState(false);

    const navi = useNavigate();

    const [emailcheck, setEmailcheck] = useState(false);
    const [nicknamecheck, setNicknamecheck] = useState(false);
    const [passwordcheck, setPasswordcheck] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요.');
    const [agreecheck, setAgreecheck] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);  // Alert 표시 여부
    const [alertTitle, setAlertTitle] = useState('');         // Alert 제목
    const [alertContent, setAlertContent] = useState('');     // Alert 내용
    const [alertBtnText, setAlertBtnText] = useState('확인');  // Alert 버튼 텍스트


    const showAlert = (title, content, btnText = '확인') => {
        setAlertTitle(title);
        setAlertContent(content);
        setAlertBtnText(btnText);
        setAlertVisible(true);  // Alert를 보이도록 설정
    };

    const closeAlert = () => {
        setAlertVisible(false);  // Alert를 닫음
    };


    // 비밀번호 유효성 검사
    const validatePassword = (password) => {
        const lengthCheck = password.length >= 8 && password.length <= 20;
        const typeCheck = /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])/.test(password);
        return lengthCheck && typeCheck;
    };

    // 닉네임 유효성 검사
    const validateNickname = (nickname) => {
        const lengthCheck = nickname.length >= 1 && nickname.length <= 10;
        const charCheck = /^[가-힣a-zA-Z0-9]+$/.test(nickname);
        return lengthCheck && charCheck;
    };


    // 타이머 관리
    useEffect(() => {
        if (timerRunning && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timerId); // 클린업 함수로 타이머 종료
        } else if (timeLeft === 0) {
            showAlert("인증 시간 만료","인증 시간이 만료되었습니다. 다시 시도해 주세요.");
            setTimerRunning(false);
            setTimeLeft(180); // 타이머 초기화

            let url = `/signup/user/deletecode?user_email=${encodeURIComponent(user_email)}`;

            axios.get(url)
                .then(res => {
                    if (res.data === 'success') {
                        console.log("인증 코드가 성공적으로 삭제되었습니다.");
                    } else {
                        console.error("인증 코드 삭제 실패.");
                    }
                })
                .catch(error => {
                    console.error("인증 코드 삭제 중 오류 발생:", error);
                });
        }
    }, [timeLeft, timerRunning]);


// 인증번호 보내기 및 재발송 이벤트
    const sendEmail = () => {
        let url = `/signup/user/send?user_email=${encodeURIComponent(user_email)}`;
        axios.get(url)
            .then(res => {
                if (res.data === 'success') {
                    showAlert("인증 코드가 이메일로 발송되었습니다.");
                    setTimerRunning(true); // 타이머 시작
                    setTimeLeft(180); // 타이머를 다시 3분으로 초기화
                } else if (res.data === '이메일이 존재하는 회원입니다.') {
                    showAlert("이미 존재하는 이메일입니다. 다른 이메일을 사용하세요.");
                } else {
                    showAlert("이메일 전송 실패");
                }
            })
            .catch(error => {
                console.error("Error sending email:", error);
                showAlert("이메일 전송 중 오류가 발생했습니다.");
            });
    };

    // 이메일 인증 코드 맞는지 확인 이벤트
    const checkEmail = () => {
        let url = `/signup/user/emailcheck?user_email=${encodeURIComponent(user_email)}&auth_code=${auth_code}`;
        axios.get(url)
            .then(res => {
                if (res.data === 'success') {
                    setEmailcheck(true);
                    showAlert("이메일 인증이 성공적으로 완료되었습니다.");
                } else {
                    setEmailcheck(false);
                    showAlert("인증 코드가 일치하지 않습니다.");
                }
            });
    };

    // 타이머 표시용 포맷
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const checkNickname = () => {
        if (validateNickname(user_nickname)) {
            let url = `/signup/user/nicknamecheck?user_nickname=${user_nickname}`;
            axios.get(url)
                .then(res => {
                    if (res.data === 'success') {
                        setNicknamecheck(true);
                        setNicknameMessage("사용 가능한 닉네임 입니다.");
                    } else {
                        setNicknamecheck(false);
                        setNicknameMessage("동일한 닉네임 사용자가 있습니다. 다른 닉네임을 사용해 주세요.");
                    }
                });
        } else {
            setNicknameMessage("닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요.");
            setNicknamecheck(false);
        }
    };

    // 비밀번호 확인 이벤트
    useEffect(() => {
        // 비밀번호 일치 여부 확인
        if (user_password === user_passwordcheck && user_password !== '') {
            if (validatePassword(user_password)) {
                setPasswordcheck(true);
                setPasswordMessage("비밀번호가 일치합니다.");
            } else {
                setPasswordcheck(false);
                setPasswordMessage("비밀번호는 영문/숫자/특수문자 중 2가지 이상 조합하여 8~20자로 설정해주세요.");
            }
        } else {
            if (user_passwordcheck === '') {
                setPasswordMessage('');
            } else {
                setPasswordcheck(false);
                setPasswordMessage("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            }
        }
    }, [user_password, user_passwordcheck]);

    // 사용자가 인증 코드 또는 닉네임을 수정할 경우 상태 초기화
    useEffect(() => {
        setEmailcheck(false); // 인증 코드가 변경되면 이메일 체크 상태 초기화
    }, [auth_code]);

    useEffect(() => {
        setNicknamecheck(false); // 닉네임이 변경되면 닉네임 체크 상태 초기화
    }, [user_nickname]);

    // 필수 동의 이벤트
    const checkAgree = (e) => {
        const isChecked = e.target.checked;

        if (!isChecked) {
            showAlert("필수 동의사항에 동의하셔야 합니다.");
            setAgreecheck(false);
        } else {
            setAgreecheck(true);
            showAlert("필수 동의사항에 동의하셨습니다.");
        }
    };

    // 회원가입 이벤트
    const joinUser = (e) => {
        e.preventDefault();
        if (emailcheck && nicknamecheck && passwordcheck && agreecheck) {
            let url = `/signup/user/join`;
            axios.post(url, {
                userNickname: user_nickname,
                userPassword: user_password,
                userEmail: user_email
            })
                .then(res => {
                    navi("/");
                })
                .catch(err => {
                    console.error("회원가입 오류:", err);
                });
        } else {
            if (!emailcheck) {
                showAlert("이메일 인증을 완료해주세요.");
            } else if (!nicknamecheck) {
                showAlert("닉네임 중복 확인을 완료해주세요.");
            } else if (!passwordcheck) {
                showAlert("비밀번호가 일치하지 않습니다.");
            } else if (!agreecheck) {
                showAlert("필수 동의사항에 동의해주세요.");
            }
        }
    };

    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full p-4">
            <div className="w-full max-w-md p-8 space-y-4 border rounded-md">
                <h2 className="text-2xl font-semibold text-center">회원가입</h2>
                <form onSubmit={joinUser}>
                    <Box sx={{mb: 2}} className={"flex items-center gap-2"}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant={"standard"}
                            size="small"
                            placeholder="이메일"
                            value={user_email}
                            onChange={(e) => setUser_email(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            onClick={sendEmail}
                            sx={{mt: 1, float: 'right'}}
                            className={"whitespace-nowrap"}
                        >
                            인증코드 발송
                        </Button>
                    </Box>
                    <Box sx={{mb: 2}} className={"flex items-center gap-2"}>
                        <div className={"w-full"}>
                            <TextField
                                fullWidth
                                label="Authentication code"
                                variant="standard"
                                size="small"
                                placeholder="인증 코드"
                                value={auth_code}
                                onChange={(e) => setAuth_code(e.target.value)}
                            />
                            <Typography variant="caption" display="block">
                                인증 제한 시간: {formatTime(timeLeft)}
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            onClick={checkEmail}
                            sx={{mt: 1, float: 'right'}}
                        >
                            확인
                        </Button>
                    </Box>
                    <Box sx={{mb: 2}}>
                        <div className={"w-full flex items-center gap-2"}>
                            <TextField
                                fullWidth
                                label="Nickname"
                                variant="standard"
                                size="small"
                                placeholder="닉네임"
                                value={user_nickname}
                                onChange={(e) => setUser_nickname(e.target.value)}
                            />
                            <Button
                                variant="outlined"
                                className={"whitespace-nowrap"}
                                onClick={checkNickname}
                                sx={{mt: 1, float: 'right'}}
                            >
                                중복확인
                            </Button>
                        </div>

                        <Typography variant="caption" color={nicknamecheck ? 'success.main' : 'error.main'}>
                            {nicknameMessage}
                        </Typography>
                    </Box>
                    <Box sx={{mb: 2}}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="standard"
                            type="password"
                            size="small"
                            placeholder="비밀번호"
                            value={user_password}
                            onChange={(e) => setUser_password(e.target.value)}
                        />
                    </Box>
                    <Box sx={{mb: 2}}>
                        <TextField
                            fullWidth
                            label="Password Check"
                            variant="standard"
                            type="password"
                            size="small"
                            placeholder="비밀번호 확인"
                            value={user_passwordcheck}
                            onChange={(e) => setUser_passwordcheck(e.target.value)}
                        />
                        <Typography variant="caption" color={passwordcheck ? 'success.main' : 'error.main'}>
                            {passwordMessage}
                        </Typography>
                    </Box>
                    <Box sx={{mb: 2}}>
                        <FormControlLabel
                            control={<Checkbox onChange={checkAgree}/>}
                            label="[필수] 서비스 이용약관 동의"
                        />
                    </Box>
                    <Box sx={{mb: 2}}>
                        <FormControlLabel
                            control={<Checkbox/>}
                            label="[선택] 이메일 정보수신 동의"
                        />
                    </Box>
                    <Box sx={{mb: 2}}>
                        <FormControlLabel
                            control={<Checkbox/>}
                            label="[선택] 카카오톡 정보수신 동의"
                        />
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                    >
                        회원가입
                    </Button>
                </form>
                <CustomAlert
                    openAlert={alertVisible}
                    closeAlert={closeAlert}
                    title={alertTitle}
                    content={alertContent}
                    btnText={alertBtnText}
                />
            </div>
        </main>
    );
}
