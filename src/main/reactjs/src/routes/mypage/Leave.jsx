// v0 by Vercel.
// https://v0.dev/t/iQOyZU5fuUx

export default function Leave() {
  return (
    <div class="flex min-h-screen">
      <aside class="w-64 p-4 border-r">
        <div class="flex items-center mb-4">
          <img
            src="/placeholder.svg"
            alt="Logo"
            class="w-8 h-8 mr-2"
            width="32"
            height="32"
            style="aspect-ratio:32/32;object-fit:cover"
          />
          <span class="text-lg font-bold">Logoipsu</span>
        </div>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
          placeholder="Placeholder"
        />
        <nav class="space-y-2">
          <div>
            <button class="flex items-center justify-between w-full px-4 py-2 text-left">
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
                class="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div class="pl-4 space-y-1">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full text-left">
                나의 출제이력
              </button>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full text-left">
                나의 학습이력
              </button>
            </div>
          </div>
          <div>
            <button class="flex items-center justify-between w-full px-4 py-2 text-left">
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
                class="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <button class="flex items-center justify-between w-full px-4 py-2 text-left">
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
                class="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <button class="flex items-center justify-between w-full px-4 py-2 text-left">
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
                class="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <button class="flex items-center justify-between w-full px-4 py-2 text-left">
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
                class="w-4 h-4"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div class="pl-4 space-y-1">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full text-left">
                회원정보 수정
              </button>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full text-left">
                회원 탈퇴
              </button>
            </div>
          </div>
        </nav>
      </aside>
      <main class="flex-1 p-8">
        <div class="max-w-md mx-auto">
          <h1 class="mb-6 text-2xl font-bold text-center">회원 탈퇴</h1>
          <div class="flex justify-between mb-4">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-1/2 mr-2">
              인증코드 발송
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-1/2 ml-2">
              인증코드 재발송
            </button>
          </div>
          <div class="space-y-4">
            <div>
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="auth-code"
              >
                Authentication code
              </label>
              <input
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                id="auth-code"
                placeholder="인증 코드"
              />
              <p class="mt-1 text-sm text-muted-foreground">
                인증 재발 시간 : 03:00
              </p>
            </div>
            <div class="flex items-center">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                for="password"
              >
                Password
              </label>
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
                class="w-5 h-5 text-muted-foreground"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              type="password"
              id="password"
              placeholder="비밀번호"
            />
            <p class="mt-1 text-sm text-red-500">
              * 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
            </p>
            <div>
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="reason"
              >
                탈퇴사유
              </label>
              <textarea
                class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                id="reason"
                placeholder="탈퇴사유를 입력해주세요"
              ></textarea>
            </div>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4">
              확인
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
