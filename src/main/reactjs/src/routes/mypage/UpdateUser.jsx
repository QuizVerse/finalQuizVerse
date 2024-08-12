// v0 by Vercel.
// https://v0.dev/t/oJhvLMfaWGD

export default function UpdateUser() {
  return (
    <div className="flex">
      <aside className="w-64 p-4 border-r">
        <div className="flex items-center mb-4">
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
            className="w-6 h-6 mr-2"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" x2="3" y1="12" y2="12"></line>
          </svg>
          <span className="text-lg font-bold">Logoipsu</span>
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
          placeholder="Placeholder"
        />
        <nav className="space-y-2">
          <div>
            <button className="flex items-center justify-between w-full py-2 text-left">
              나의 이력
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
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className="pl-4 space-y-2">
              <a className="block py-1" href="#">
                나의 졸제이력
              </a>
              <a className="block py-1" href="#">
                나의 학습이력
              </a>
            </div>
          </div>
          <div>
            <button className="flex items-center justify-between w-full py-2 text-left">
              나의 클래스
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
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <button className="flex items-center justify-between w-full py-2 text-left">
              즐겨찾기
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
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <button className="flex items-center justify-between w-full py-2 text-left">
              오답노트
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
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <button className="flex items-center justify-between w-full py-2 text-left">
              회원정보
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
                className="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className="pl-4 space-y-2">
              <a className="block py-1" href="#">
                회원정보 수정
              </a>
              <a className="block py-1" href="#">
                회원 탈퇴
              </a>
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          <h1 className="mb-6 text-2xl font-bold text-center">회원 정보 수정</h1>
          <div className="flex justify-center mb-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                U
              </span>
            </span>
            <button className="ml-2">
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
                className="w-5 h-5"
              >
                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
              </svg>
            </button>
          </div>
          <form className="space-y-4">
            <div className="flex items-center space-x-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                for="nickname"
              >
                Nickname
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                id="nickname"
                placeholder="닉네임"
              />
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
                className="absolute right-2 top-2.5 w-5 h-5"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <p className="text-xs text-muted-foreground">
                영문/숫자/특수문자 2가지 이상 조합 (8~20자)
              </p>
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
                className="absolute right-2 top-2.5 w-5 h-5"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <p className="text-xs text-red-500">
                * 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                for="email-notifications"
              >
                이메일 정보 수신
              </label>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                data-state="checked"
                value="on"
                className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                id="email-notifications"
              >
                <span
                  data-state="checked"
                  className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
              <input
                type="checkbox"
                aria-hidden="true"
                style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                tabindex="-1"
                checked=""
                value="on"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                for="kakao-notifications"
              >
                카카오톡 정보 수신
              </label>
              <button
                type="button"
                role="switch"
                aria-checked="false"
                data-state="unchecked"
                value="on"
                className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                id="kakao-notifications"
              >
                <span
                  data-state="unchecked"
                  className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
              <input
                type="checkbox"
                aria-hidden="true"
                style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                tabindex="-1"
                value="on"
              />
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
              확인
            </button>
          </form>
          <div className="mt-4 space-y-1 text-xs text-red-500">
            <p>* 비밀번호 입력 형식을 맞춰주세요.</p>
            <p className="text-green-500">* 사용 가능한 비밀번호입니다.</p>
            <p>* 비밀번호가 일치합니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
