import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Cookies from 'js-cookie';
import React from 'react';

export default function MainHeader() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navi = useNavigate();

    useEffect(() => {
        // Check if the token is in localStorage
        const localStorageToken = localStorage.getItem('token');

        // Check if the token is in cookies
        const cookieToken = Cookies.get('jwtToken');

        // Determine if the user is logged in
        if(localStorageToken || cookieToken){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');

        // Remove token from cookies
        Cookies.remove('jwtToken');

        setIsLoggedIn(false);
        navi('/');
    }


    return (
        <div>
            <header className="flex items-center justify-between w-full px-4 py-2 border-b">
                <Link to='/'>
                    <h1 className="text-xl font-bold">QuizVerse</h1>
                </Link>
                <nav className="flex items-center space-x-4">
                    <Button>
                        <Link to='/book/list' className="text-sm font-medium text-gray-700">
                            문제집 목록
                        </Link>
                    </Button>
                    <Button>
                        <Link to='/study/list' className="text-sm font-medium text-gray-700">
                            화상스터디
                        </Link>
                    </Button>
                </nav>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-2">
                        <Button onClick={handleLogout}>
                            로그아웃
                        </Button>
                        <Link to='/mypage'>
                            <img src="/placeholder-user.jpg" alt="User Avatar" />
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
