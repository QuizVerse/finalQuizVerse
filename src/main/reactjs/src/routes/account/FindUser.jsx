// v0 by Vercel.
// https://v0.dev/t/Um0kKeG105U

export default function FindUser() {
    return (
        <div class="flex flex-col items-center min-h-screen">
          <header class="flex items-center justify-between w-full h-16 px-4 border-b">
            <div class="flex items-center">
              <span class="text-lg font-bold">QuizVerse</span>
            </div>
            <nav class="flex items-center space-x-4">
              <a class="text-sm" href="#">
                문제집 목록
              </a>
              <a class="text-sm" href="#">
                화상스터디
              </a>
            </nav>
            <div class="flex items-center space-x-4">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm">
                로그인
              </button>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm">
                회원가입
              </button>
            </div>
          </header>
          <main class="flex flex-col items-center justify-center flex-1 w-full px-4 py-8">
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
              <div class="flex flex-col space-y-1.5 p-6 text-center">
                <h3 class="whitespace-nowrap tracking-tight text-lg font-bold">회원정보 조회</h3>
                <p class="text-sm text-muted-foreground">이메일을 입력하여 가입여부가 있는 회원인지 조회할 수 있습니다.</p>
              </div>
              <div class="p-6 space-y-4">
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
                    placeholder="이메일을 입력해주세요."
                  />
                </div>
              </div>
              <div class="flex items-center p-6">
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                  조회
                </button>
              </div>
            </div>
          </main>
        </div>
    );
}