// v0 by Vercel.
// https://v0.dev/t/4qOtQq0bmGV

export default function Login() {
  return (
    <div class="flex flex-col items-center min-h-screen">
      <header class="flex items-center justify-between w-full p-4 border-b">
        <div class="text-lg font-bold">QuizVerse</div>
        <nav class="flex items-center space-x-4">
          <button class="text-sm">문제집 목록</button>
          <button class="text-sm">화상스터디</button>
        </nav>
        <div class="flex items-center space-x-2">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            로그인
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            회원가입
          </button>
        </div>
      </header>
      <main class="flex flex-col items-center justify-center flex-1 w-full p-4">
        <div class="w-full max-w-md p-8 space-y-4 border rounded-md">
          <h2 class="text-2xl font-semibold text-center">로그인</h2>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >
              Email
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="이메일"
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="password"
            >
              Password
            </label>
            <div class="relative">
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                class="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              type="button"
              role="checkbox"
              aria-checked="false"
              data-state="unchecked"
              value="on"
              class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              id="remember"
            ></button>
            <input
              type="checkbox"
              aria-hidden="true"
              tabindex="-1"
              value="on"
            />
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="remember"
            >
              자동 로그인
            </label>
          </div>
          <div class="flex justify-between text-sm text-muted-foreground">
            <button>회원정보 조회</button>
            <span>|</span>
            <button>비밀번호 재설정</button>
          </div>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500">
            로그인
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
            회원가입
          </button>
          <div class="flex justify-center space-x-4">
            <img
              src="/placeholder.svg"
              alt="Kakao"
              class="w-10 h-10"
              width="40"
              height="40"
            />
            <img
              src="/placeholder.svg"
              alt="Naver"
              class="w-10 h-10"
              width="40"
              height="40"
            />
            <img
              src="/placeholder.svg"
              alt="Google"
              class="w-10 h-10"
              width="40"
              height="40"
            />
          </div>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full">
            최근 로그인
          </button>
        </div>
      </main>
    </div>
  );
}
