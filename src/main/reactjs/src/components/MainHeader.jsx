import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import Cookies from 'js-cookie';
import React from 'react';
import axios from "axios";

export default function MainHeader() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navi = useNavigate();

    // user 정보
    const [userData, setUserData] = useState(null);
    const [userNickname, setUserNickname] = useState("");

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user";


    useEffect(() => {
        // Check if the token is in localStorage
        const localStorageToken = localStorage.getItem('token');

        // Check if the token is in cookies
        const cookieToken = Cookies.get('jwtToken');

        // Determine if the user is logged in
        if(localStorageToken || cookieToken){
            setIsLoggedIn(true);

            const fetchUserData = async () => {
                try {
                    const response = await axios.get("/update/user/data");
                    setUserData(response.data);
                    setUserNickname(response.data.nickname || ""); // 서버에서 가져온 닉네임 설정
                } catch (e) {
                    console.error("Failed to fetch user data:", e);
                }
            };
            fetchUserData();
        }else{
            setIsLoggedIn(false);
        }

    }, []);


    const handleLogout = async() => {
        try {
            //로컬 회원
            if(localStorage.getItem('token')){
                localStorage.removeItem('token');
            }
            //소셜회원
            else{
                const jwtToken=Cookies.get('jwtToken')

                await axios.get('/login/oauth/logout',{

                    headers:{
                        'Authorization':`${jwtToken}`
                    }
                });

                console.log(jwtToken);
                window.location.reload();
                Cookies.remove('jwtToken');
            }


        }catch(error){

        }
        setIsLoggedIn(false);
        navi('/');
    };



    return (
        <div>

                <header className="flex items-center justify-between w-full px-4 py-2 border-b bg-[#171717]">
                    <Link to='/'>
                        <h1 className="text-xl font-bold">
                            <img src="/favicon.svg" alt="quizverse"/>
                        </h1>
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Button>
                            <Link to='/book/list'>
                                문제집 목록
                            </Link>
                        </Button>
                        <Button>
                            <Link to='/study/list'>
                                화상스터디
                            </Link>
                        </Button>
                    </nav>
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <Button onClick={handleLogout}>
                                로그아웃
                            </Button>
                            <Link to='/mypage'>
                                {userData && userData.userImage ? (
                                    <img
                                        src={userData.userImagePreview ? userData.userImagePreview : `${photopath}/${userData.userImage}`}
                                        alt="User Profile"
                                        style={{ width: '48px', height: '48px'}}
                                        className="h-full w-full object-cover rounded-full border border-[#FFC038]"
                                    />
                                ) : (
                                    <span>User</span>
                                )}
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button>
                                <Link to='/account/login'>로그인</Link>
                            </Button>
                            <Button>
                                <Link to='/account/signup'>회원가입</Link>
                            </Button>
                        </div>
                    )}
                </header>

        </div>
    );
}
