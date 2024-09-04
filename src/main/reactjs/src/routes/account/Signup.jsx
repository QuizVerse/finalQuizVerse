import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomAlert from "../../components/modal/CustomAlert";

export default function Signup() {
    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const [user_nickname, setUser_nickname] = useState('');
    const [user_passwordcheck, setUser_passwordcheck] = useState('');
    const [auth_code, setAuth_code] = useState(''); // 사용자 입력 인증 코드
    const[timeLeft,setTimeLeft]=useState(180);
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
                })

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
                    showAlert("이미 존재하는 이메일입니다.  다른 이메일을 사용하세요.");
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
    }
// 타이머 표시용 포맷
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // 닉네임 중복 확인 이벤트
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
    }

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
        <main className="flex flex-col items-center w-full max-w-2xl p-4 mt-8 space-y-4">
            <h2 className="text-2xl font-bold">회원가입</h2>
            <form className="w-full space-y-4" onSubmit={joinUser}>
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            placeholder="이메일"
                            onChange={(e) => setUser_email(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0"
                        onClick={sendEmail}
                    >
                        인증코드 발송
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex-1">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="auth-code"
                        >
                            Authentication code
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="auth-code"
                            placeholder="인증 코드"
                            value={auth_code} // 사용자 입력 코드
                            onChange={(e) => setAuth_code(e.target.value)} // 입력 값 상태로 업데이트
                        />
                        <p className="text-xs text-muted-foreground">인증 제한 시간: {formatTime(timeLeft)}</p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0"
                        onClick={checkEmail}
                    >
                        확인
                    </button>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 self-end"
                    onClick={sendEmail}
                >
                    인증코드 재발송
                </button>
                <div className="relative">
                    <label htmlFor="nickname" className="text-sm font-medium">Nickname</label>
                    <input
                        id="nickname"
                        placeholder="닉네임"
                        value={user_nickname}
                        onChange={(e) => setUser_nickname(e.target.value)}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                    />
                    <button
                        type="button"
                        onClick={checkNickname}
                        className="inline-flex items-center justify-center mt-2 h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md"
                    >
                        중복확인
                    </button>
                </div>
                <p className={`text-xs ${nicknamecheck ? 'text-green-500' : 'text-red-500'}`}>
                    {nicknameMessage}
                </p>
                <div className="relative">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        value={user_password}
                        onChange={(e) => setUser_password(e.target.value)}  // 비밀번호 입력 시 상태 업데이트
                    />
                </div>
                <div className="relative">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="password-check"
                    >
                        Password Check
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        id="password-check"
                        placeholder="비밀번호 확인"
                        value={user_passwordcheck}
                        onChange={(e) => setUser_passwordcheck(e.target.value)}
                    />
                </div>
                <p className={`text-xs ${passwordcheck ? 'text-green-500' : 'text-red-500'}`}>
                    {passwordMessage}
                </p>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            id="terms"
                            onChange={checkAgree}
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="terms"
                        >
                            [필수] 서비스 이용약관 동의
                        </label>
                    </div>
                    <textarea
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                        id="terms-details"
                        placeholder="이용약관 동의"
                    ></textarea>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            id="email-consent"
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email-consent"
                        >
                            [선택] 이메일 정보수신 동의
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            id="kakao-consent"
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="kakao-consent"
                        >
                            [선택] 카카오톡 정보수신 동의
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            id="not-robot"
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="not-robot"
                        >
                            로봇이 아닙니다
                        </label>
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src="/placeholder.svg"
                        alt="Captcha"
                        className="w-full max-w-xs"
                        width="300"
                        height="200"
                    />
                    <button
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        새로고침
                    </button>
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white"
                >
                    회원가입
                </button>

                <CustomAlert
                    openAlert={alertVisible}
                    closeAlert={closeAlert}
                    title={alertTitle}
                    content={alertContent}
                    btnText={alertBtnText}
                />

            </form>


        </main>
    );
}
