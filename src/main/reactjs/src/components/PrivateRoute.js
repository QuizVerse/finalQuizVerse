import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = checkAuthentication(); // 인증 상태 확인 로직

    return isAuthenticated ? children : <Navigate to="/account/login" />;
};

const checkAuthentication = () => {
    // 인증 상태 확인 (예: JWT 토큰, 세션, 쿠키 확인 등)
    return !!localStorage.getItem('token'); // 예시로 로컬 스토리지에서 토큰 확인
};

export default PrivateRoute;