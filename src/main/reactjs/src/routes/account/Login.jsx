import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [user_email, setUser_email] = useState('');
  const [user_password, setUser_password] = useState('');
  const navi = useNavigate();

  return (
      <main className="flex flex-col items-center justify-center flex-1 w-full p-4">
        <div className="w-full max-w-md p-8 space-y-4 border rounded-md">
          <h2 className="text-2xl font-semibold text-center">로그인</h2>
          <form method="POST" action="/account/login" className="space-y-4"> {/* Form 태그 추가 */}
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
            />
            <img
                src="/navericon.png"
                alt="Naver"
                className="w-10 h-10"
                width="40"
                height="40"
            />
            <img
                src="/googleicon.png"
                alt="Google"
                className="w-10 h-10"
                width="40"
                height="40"
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
