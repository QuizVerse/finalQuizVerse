import {Link, useNavigate} from "react-router-dom";
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
            const response = await axios.post('/login/user/check', {
                userEmail: user_email,
                userPassword: user_password
            }, {
                withCredentials: true // 쿠키를 클라이언트에 저장하고 서버로 전달하는 옵션
            });

            // 성공적으로 로그인한 경우 홈 화면으로 리디렉션
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
        window.location.href = "https://www.quizverse.kro.kr/oauth2/authorization/google";
    }
    const handleNaverLogin = () => {
        window.location.href = "https://www.quizverse.kro.kr/oauth2/authorization/naver";
    }
    const handleKakaoLogin = () => {
        window.location.href = "https://www.quizverse.kro.kr/oauth2/authorization/kakao";
    }

    const [passwordVisible, setPasswordVisible] = useState(false);

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
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <Button
                            variant={"text"}
                            type="button">
                            <Link to={"/account/finduser"}>
                                회원정보 조회
                            </Link>
                        </Button>
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