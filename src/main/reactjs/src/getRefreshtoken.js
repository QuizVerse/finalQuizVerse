import axios from 'axios';

// 요청 인터셉터 추가
axios.interceptors.request.use(
    async config => {
        // 로컬 스토리지에서 토큰을 가져옵니다.
        const token = localStorage.getItem('token');
        if (token) {
            // 요청 헤더에 Authorization 토큰을 설정합니다.
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 요청 에러가 발생하면, 에러를 그대로 반환합니다.
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config; // 원래 요청 설정을 저장합니다.
        if (error.response.status === 401 && !originalRequest._retry) {
            // 인증 오류(401)가 발생하고, 재시도하지 않았던 경우
            originalRequest._retry = true; // 재시도 플래그를 설정합니다.
            try {
                // Refresh Token을 사용하여 새로운 JWT 요청
                await axios.post('/login/token/refresh'); // 토큰 갱신 요청을 보냅니다.
                // 새 JWT 토큰을 로컬 스토리지에서 가져옵니다.
                const newToken = axios.defaults.headers['Authorization'].replace('Bearer ', '');
                localStorage.setItem('token', newToken); // 새 토큰을 로컬 스토리지에 저장합니다.
                // 원래 요청을 새 토큰으로 재시도합니다.
                return axios(originalRequest);
            } catch (refreshError) {
                // Refresh Token이 실패한 경우, 에러를 콘솔에 출력합니다.
                console.error('Refresh Token 실패:', refreshError);
                // 로그아웃 처리 또는 추가 조치가 필요할 수 있습니다.
            }
        }
        // 다른 에러는 그대로 반환합니다.
        return Promise.reject(error);
    }
);
