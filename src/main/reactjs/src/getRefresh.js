import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    withCredentials: true, // 쿠키를 자동으로 포함
});

// 응답 인터셉터 설정 (401 에러 처리)
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // 401 Unauthorized 에러 발생 시
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 리프레시 토큰으로 새 액세스 토큰 요청
                await api.post('/api/refresh-token');

                // 새 액세스 토큰 발급 성공 후, 원래 요청 재시도
                return api(originalRequest);
            } catch (err) {
                console.log('리프레시 토큰 만료: 다시 로그인해야 합니다.');
                window.location.href = '/account/login';
            }
        }

        return Promise.reject(error);
    }
);
