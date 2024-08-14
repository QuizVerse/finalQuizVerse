
// v0 by Vercel.
// https://v0.dev/t/A2fE8LQfqgY

export default function Signup() {
    return (
    <main className="flex flex-col items-center w-full max-w-2xl p-4 mt-8 space-y-4">
        <h2 className="text-2xl font-bold">회원가입</h2>
        <form className="w-full space-y-4">
        <div className="flex items-center space-x-2">
            <div className="flex-1">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email"
            >
                Email
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="이메일"
            />
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0">
            인증코드 발송
            </button>
        </div>
        <div className="flex items-center space-x-2">
            <div className="flex-1">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="auth-code"
            >
                Authentication code
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="auth-code"
                placeholder="인증 코드"
            />
            <p className="text-xs text-gray-500">인증 유효 시간 : 03:00</p>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0">
            확인
            </button>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 self-end">
            인증코드 재발송
        </button>
        <div className="flex items-center space-x-2">
            <div className="flex-1">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="nickname"
            >
                Nickname
            </label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="nickname"
                placeholder="닉네임"
            />
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0">
            중복확인
            </button>
        </div>
        <div className="relative">
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="password"
            >
            Password
            </label>
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
            className="absolute right-2 top-2.5 h-5 w-5 text-gray-500"
            >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <p className="text-xs text-gray-500">영문/숫자/특수문자 2가지 이상 조합 (8~20자)</p>
        </div>
        <div className="relative">
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="password-check"
            >
            Password Check
            </label>
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
            className="absolute right-2 top-2.5 h-5 w-5 text-gray-500"
            >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
            </svg>
        </div>
        <p className="text-xs text-red-500">* 비밀번호가 일치하지 않습니다. 다시 입력해주세요.</p>
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
            <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="terms"
            ></button>
            <input
                type="checkbox"
                aria-hidden="true"
                tabindex="-1"
                value="on"
            />
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="terms"
            >
                [필수] 서비스 이용약관 동의
            </label>
            </div>
            <textarea
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            id="terms-details"
            placeholder="이용약관 동의"
            ></textarea>
            <div className="flex items-center space-x-2">
            <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="email-consent"
            ></button>
            <input
                type="checkbox"
                aria-hidden="true"
                tabindex="-1"
                value="on"
            />
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="email-consent"
            >
                [선택] 이메일 정보수신 동의
            </label>
            </div>
            <div className="flex items-center space-x-2">
            <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="kakao-consent"
            ></button>
            <input
                type="checkbox"
                aria-hidden="true"
                tabindex="-1"
                value="on"
            />
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="kakao-consent"
            >
                [선택] 카카오톡 정보수신 동의
            </label>
            </div>
            <div className="flex items-center space-x-2">
            <button
                type="button"
                role="checkbox"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                id="not-robot"
            ></button>
            <input
                type="checkbox"
                aria-hidden="true"
                tabindex="-1"
                value="on"
            />
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="not-robot"
            >
                로봇이 아닙니다
            </label>
            </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
            <img
            src="/placeholder.svg"
            alt="Captcha"
            className="w-full max-w-xs"
            width="300"
            height="200"
            />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            새로고침
            </button>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white">
            회원가입
        </button>
        </form>
    </main>
    );
}