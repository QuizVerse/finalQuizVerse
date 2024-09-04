import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import CustomAlert from "../../components/modal/CustomAlert";
import {Button, TextField} from "@mui/material";
import CustomInput from "../../components/CustomInput";

export default function Login() {

    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const navi = useNavigate();

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


    const submitLoginEvent=async (e)=>{
        e.preventDefault();
        try {
            const response=await axios.post('/login/user/check',{
                user_email,
                user_password
            });
            const token=response.headers['authorization'];
            localStorage.setItem('token',token);
            navi('/');
        }
        catch (error) {
            console.error('로그인 실패:', error);
            showAlert("오류","로그인 실패");
        }
    };

    const handlePasswordReset = () => {
        navi('/account/changepassword');
    };
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:9002/oauth2/authorization/google";
    }
    const handleNaverLogin = () => {
        window.location.href = "http://localhost:9002/oauth2/authorization/naver";
    }
    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:9002/oauth2/authorization/kakao";
    }

    const [value, setValue] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [timerActive, setTimerActive] = useState(false);

    const onSetValue = (value) => {
        setUser_password(value);
    }

    const clickPasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full p-4">
            <div className="w-full max-w-md p-8 space-y-4 border rounded-md">
                <h2 className="text-2xl font-semibold text-center">로그인</h2>
                <form onSubmit={submitLoginEvent} className="space-y-8"> {/* Form 태그 추가 */}
                    <div className="space-y-2">
                        <TextField
                            fullWidth
                            label={"Email"}
                            id="user_email"
                            name="user_email" // 이름을 서버에서 기대하는 이름으로 설정
                            type="email"
                            placeholder="이메일"
                            value={user_email}
                            variant={"standard"}
                            onChange={(e) => setUser_email(e.target.value)} // 입력 값 변경 시 상태 업데이트
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <CustomInput
                                updateValue={onSetValue}
                                label={"Password"}
                                type={"text"}
                                id="user_password"
                                name="user_password" // 이름을 서버에서 기대하는 이름으로 설정
                                placeholder={"비밀번호"}
                                isPassword={true}
                                updatePasswordVisible={clickPasswordVisible}
                                isPasswordVisible={passwordVisible}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="remember"
                        >
                            자동 로그인
                        </label>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <Button
                            variant={"text"}
                            type="button">회원정보 조회</Button>
                        <span>|</span>
                        <Button type="button"
                                variant={"text"}
                                onClick={handlePasswordReset}>비밀번호 재설정</Button>
                    </div>
                    <Button
                        fullWidth
                        variant={"contained"}
                        type="submit">
                        로그인
                    </Button>
                </form>
                <Button
                    fullWidth
                    variant={"outlined"}
                    onClick={() => navi('/account/signup')} // 회원가입 버튼 클릭 시 경로 변경
                >
                    회원가입
                </Button>
                <div className="flex justify-center space-x-4">
                    <img
                        src="/kakaoicon.png"
                        alt="Kakao"
                        className="w-10 h-10"
                        width="40"
                        height="40"
                        onClick={handleKakaoLogin}
                        style={{cursor: 'pointer'}}
                    />
                    <img
                        src="/navericon.png"
                        alt="Naver"
                        className="w-10 h-10"
                        width="40"
                        height="40"
                        onClick={handleNaverLogin}
                        style={{cursor: 'pointer'}}
                    />
                    <img
                        src="/googleicon.png"
                        alt="Google"
                        className="w-10 h-10"
                        width="40"
                        height="40"
                        onClick={handleGoogleLogin}
                        style={{cursor: 'pointer'}}
                    />
                </div>

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