import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Cookies from 'js-cookie';
import axios from "axios";

export default function MainHeader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userNickname, setUserNickname] = useState("");
    const navi = useNavigate();

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user";

    useEffect(() => {
        // 쿠키에서 jwtToken과 refreshToken 확인
        const jwtToken = Cookies.get('jwtToken');
        const refreshToken = Cookies.get('refreshToken');

        console.log('jwtToken:', jwtToken);  // 디버깅: 쿠키에 jwtToken이 제대로 저장되었는지 확인
        console.log('refreshToken:', refreshToken);  // 디버깅: 쿠키에 refreshToken이 제대로 저장되었는지 확인

        // jwtToken과 refreshToken이 모두 있으면 로그인 상태로 설정
        if (jwtToken && refreshToken) {
            setIsLoggedIn(true);

            // 로그인한 사용자의 데이터 가져오기
            const fetchUserData = async () => {
                try {
                    const response = await axios.get("/update/user/data", {
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        },
                        withCredentials: true // 쿠키 기반 인증을 위해 추가
                    });
                    setUserData(response.data);
                    setUserNickname(response.data.nickname || ""); // 서버에서 가져온 닉네임 설정
                } catch (e) {
                    console.error("Failed to fetch user data:", e);
                }
            };
            fetchUserData();
        } else {
            setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
        }
    }, []);  // 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번 실행

    const handleLogout = async () => {
        try {
            const jwtToken = Cookies.get('jwtToken');

            // 소셜 회원 (쿠키에 저장된 JWT 토큰 삭제)
            if (jwtToken) {
                await axios.get('/login/oauth/logout', {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    },
                    withCredentials: true // 쿠키 기반 인증을 위해 추가
                });

                // 쿠키에서 jwtToken 및 refreshToken 삭제
                Cookies.remove('jwtToken');
                Cookies.remove('refreshToken');

                window.location.reload(); // 로그아웃 후 페이지 새로고침하여 상태 업데이트
            }
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }

        setIsLoggedIn(false); // 로그아웃 상태로 설정
        navi('/');  // 홈으로 리디렉션
    };

    return (
        <div>
            <header className="flex items-center justify-between w-full px-4 py-2 bg-[#E9F5FF]">
                <Link to='/'>
                    <h1 className="text-xl font-bold">
                        <img src="/logooo.png" alt="quizverse" style={{ height: "50px" }} />
                    </h1>
                </Link>
                <nav className="flex items-center space-x-4">
                    <Button size={"large"}>
                        <Link to='/book/list'>
                            문제집 목록
                        </Link>
                    </Button>
                    <Button size={"large"}>
                        <Link to='/study/list'>
                            화상스터디
                        </Link>
                    </Button>
                </nav>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <Button onClick={handleLogout} size={"large"}>
                            로그아웃
                        </Button>
                        <Link to='/mypage'>
                            {userData && userData.userImage ? (
                                <img
                                    src={userData.userImagePreview ? userData.userImagePreview : `${photopath}/${userData.userImage}`}
                                    alt="User Profile"
                                    style={{ width: '48px', height: '48px' }}
                                    className="h-full w-full object-cover rounded-full border border-[#cccccc]"
                                />
                            ) : (
                                <img
                                    src="/DefaultProfileImage.png" // 기본 프로필 이미지 경로
                                    alt="Default Profile"
                                    style={{ width: '48px', height: '48px' }}
                                    className="h-full w-full object-cover rounded-full border border-[#cccccc]"
                                />
                            )}
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Button size={"large"}>
                            <Link to='/account/login'>로그인</Link>
                        </Button>
                        <Button size={"large"}>
                            <Link to='/account/signup'>회원가입</Link>
                        </Button>
                    </div>
                )}
            </header>
        </div>
    );
}
