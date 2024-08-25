import axios from 'axios';

// 요청 인터셉터 추가
axios.interceptors.request.use(
    config => {
        // 로컬 스토리지에서 Access Token을 가져옵니다.
        const token = localStorage.getItem('token');
        if (token) {
            // Access Token을 Authorization 헤더에 추가하여 요청을 보냅니다.
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config; // 수정된 설정을 반환하여 요청을 진행합니다.
    },
    error => {
        // 요청을 보내기 전에 에러가 발생하면, 에러를 반환합니다.
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
    response => response, // 응답이 성공적인 경우, 그대로 반환합니다.
    async error => {
        const originalRequest = error.config; // 원래 요청 정보를 저장합니다.

        // 응답이 401(인증 오류)이고, 재시도한 요청이 아닌 경우
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 플래그를 설정합니다.

            try {
                // 서버에 Refresh Token을 보내어 새로운 Access Token을 요청합니다.
                // withCredentials: true는 쿠키를 포함하여 요청을 보내도록 설정합니다.
                const response = await axios.post('/login/token/refresh', null, {
                    withCredentials: true // 쿠키를 포함하여 요청
                });

                // 서버로부터 새로 발급된 Access Token을 가져옵니다.
                const newToken = response.data.access_token;

                // 새로운 Access Token을 로컬 스토리지에 저장합니다.
                localStorage.setItem('token', newToken);

                // Authorization 헤더를 새로 발급된 Access Token으로 업데이트합니다.
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                // 원래 요청을 새로 발급된 Access Token으로 재시도합니다.
                return axios(originalRequest);
            } catch (refreshError) {
                // Refresh Token을 사용한 요청이 실패한 경우 (예: 만료된 경우)
                console.error('Refresh Token 실패:', refreshError);

                // 로컬 스토리지에서 Access Token을 제거합니다.
                localStorage.removeItem('token');

                // 사용자를 로그인 페이지로 리다이렉트하여 재로그인을 요구합니다.
                window.location.href = '/login';
            }
        }

        // 다른 종류의 에러는 그대로 반환합니다.
        return Promise.reject(error);
    }
);
