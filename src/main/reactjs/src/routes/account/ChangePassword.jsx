// v0 by Vercel.
// https://v0.dev/t/oLrBdD72t9Y

import axios from "axios";
import {useState} from "react";

export default function ChangePassword() {
  const [user_email, setUser_email] = useState('');
  const [auth_code, setAuth_code] = useState('');
  const [emailcheck, setEmailcheck] = useState(false);

  // 인증번호 보내기 및 재발송 이벤트
  const sendEmail = () => {
    let url = `/change/user/password?user_email=${encodeURIComponent(user_email)}`;
    axios.get(url)
        .then(res => {
          if (res.data === 'success') {
            alert("인증 코드가 이메일로 발송되었습니다.");
          }
          else {
            alert("이메일 전송 실패");
          }
        })
        .catch(error => {
          console.error("Error sending email:", error);
          alert("이메일 전송 중 오류가 발생했습니다.");
        });
  };

  // 이메일 인증 코드 맞는지 확인 이벤트
  const checkEmail = () => {
    let url = `/signup/user/emailcheck?user_email=${encodeURIComponent(user_email)}&auth_code=${auth_code}`;
    axios.get(url)
        .then(res => {
          if (res.data === 'success') {
            setEmailcheck(true);
            alert("이메일 인증이 성공적으로 완료되었습니다.");
          } else {
            setEmailcheck(false);
            alert("인증 코드가 일치하지 않습니다.");
          }
        });
  }

    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full p-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                비밀번호 재설정
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                >
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="email"
                      placeholder="이메일"
                      onChange={(e) => setUser_email(e.target.value)}
                  />
                  <button
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      onClick={sendEmail}
                  >
                    인증코드 발송
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="auth-code"
                >
                  Authentication code
                </label>
                <div className="flex items-center space-x-2">
                  <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="auth-code"
                      placeholder="인증 코드"
                      value={auth_code} // 사용자 입력 코드
                      onChange={(e) => setAuth_code(e.target.value)} // 입력 값 상태로 업데이트
                  />
                  <button
                      type="button"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0"
                      onClick={checkEmail}
                  >
                    확인
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">인증 제한 시간: 03:00</p>
              </div>
              <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="password"
                      placeholder="비밀번호"
                  />
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground">영문/숫자/특수문자 2가지 이상 조합 (8~20자)</p>
              </div>
              <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password-check"
                >
                  Password Check
                </label>
                <div className="relative">
                  <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      id="password-check"
                      placeholder="비밀번호 확인"
                  />
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <p className="text-xs text-red-500">* 비밀번호가 일치하지 않습니다. 다시 입력해주세요</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-red-500">* 비밀번호 양식 형식을 맞춰주세요.</p>
                <p className="text-xs text-red-500">* 사용 가능한 비밀번호입니다.</p>
                <p className="text-xs text-green-500">* 비밀번호가 일치합니다.</p>
              </div>
            </div>
            <div className="flex items-center p-6">
              <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                확인
              </button>
            </div>
          </div>
        </main>
    );
}