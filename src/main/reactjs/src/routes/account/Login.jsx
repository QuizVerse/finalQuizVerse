import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Login() {

    //console.log('Login component rendered');
    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const navi = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 쿠키에서 JWT 토큰을 읽어오는 함수
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        // JWT 토큰을 쿠키에서 가져오기
        const jwtToken = getCookieValue('token');

        if (jwtToken) {
            console.log("JWT 토큰:", jwtToken); // 콘솔에 JWT 토큰 출력
            localStorage.setItem('token', jwtToken); // 로컬 스토리지에 저장 (선택 사항)
            navi('/'); // 홈 페이지로 리다이렉트
        } else {
            console.log("JWT 토큰이 쿠키에 존재하지 않습니다.");
        }
    }, [navi]);

    const submitLoginEvent = (e) => {
        e.preventDefault();


        axios.post(
            '/login/user/check', // 서버의 로그인 엔드포인트
            {
                user_email: user_email,
                user_password: user_password,
            },
            {
                headers: {
                    'Content-Type': 'application/json', // 요청 헤더에 JSON 데이터임을 명시
                },
            }
        )
            .then(res => {
                if (res.status === 200) {
                    console.log('전체 응답:', res);
                    // 응답 헤더에서 JWT 토큰을 추출합니다.
                    const token = res.headers['authorization']; // 'Authorization' 헤더에서 JWT 토큰을 가져옴

                    if (token) {
                        // 'Bearer ' 문자열을 제거하고 순수한 토큰 값만 추출합니다.
                        const jwtToken = token.split(' ')[1]; // 'Bearer ' 다음에 있는 실제 토큰만 추출

                        // 토큰을 localStorage에 저장합니다.
                        localStorage.setItem('token', jwtToken);
                        console.log('JWT 토큰이 응답되었습니다.');
                        console.log(jwtToken);

                        // 로그인 성공 후 홈 페이지로 이동합니다.
                        navi('/');
                    } else {
                        console.error('응답 헤더에 토큰이 없습니다.');
                        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
                    }
                }
            })
            .catch(error => {
                console.error('로그인 중 오류 발생:', error);
                alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            });

    }
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:9002/oauth2/authorization/google";
    }
    const handleNaverLogin = () => {
        window.location.href = "http://localhost:9002/oauth2/authorization/naver";
    }
    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:9002/oauth2/authorization/kakao";
    }
    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full p-4">
            <div className="w-full max-w-md p-8 space-y-4 border rounded-md">
                <h2 className="text-2xl font-semibold text-center">로그인</h2>
                <form onSubmit={submitLoginEvent} className="space-y-4"> {/* Form 태그 추가 */}
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="user_email"
                        >
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="user_email"
                            name="user_email" // 이름을 서버에서 기대하는 이름으로 설정
                            type="email"
                            placeholder="이메일"
                            value={user_email}
                            onChange={(e) => setUser_email(e.target.value)} // 입력 값 변경 시 상태 업데이트
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="user_password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                type="password"
                                id="user_password"
                                name="user_password" // 이름을 서버에서 기대하는 이름으로 설정
                                placeholder="비밀번호"
                                value={user_password}
                                onChange={(e) => setUser_password(e.target.value)} // 입력 값 변경 시 상태 업데이트
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
                            >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
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
                        <button type="button">회원정보 조회</button>
                        <span>|</span>
                        <button type="button">비밀번호 재설정</button>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500"
                    >
                        로그인
                    </button>
                </form>
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                    onClick={() => navi('/account/signup')} // 회원가입 버튼 클릭 시 경로 변경
                >
                    회원가입
                </button>
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
                <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full"
                >
                    최근 로그인
                </button>
            </div>
        </main>
    );
}