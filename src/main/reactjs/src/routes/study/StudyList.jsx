// v0 by Vercel.
// https://v0.dev/t/sIyMyfnOzwY

export default function StudyList() {
  return (
    <div class="flex flex-col items-center w-full min-h-screen">
      <header class="flex items-center justify-between w-full h-16 px-4 border-b shrink-0 md:px-6">
        <div class="flex items-center gap-2 text-lg font-semibold">
          <span>QuizVerse</span>
        </div>
        <nav class="flex items-center gap-6 text-lg font-medium md:text-sm lg:gap-6">
          <a class="font-bold" href="#">
            문제집 목록
          </a>
          <a class="font-bold" href="#">
            화상스터디
          </a>
        </nav>
        <div class="flex items-center gap-4">
          <a class="text-muted-foreground" href="#">
            로그인
          </a>
          <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
              귀
            </span>
          </span>
        </div>
      </header>
      <main class="flex flex-col items-center w-full p-4 md:p-10">
        <h1 class="text-2xl font-bold mb-4">‘정보처리기사’ 검색결과(20)</h1>
        <div class="flex items-center w-full max-w-2xl mb-6">
          <input
            class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            type="search"
            placeholder="스터디방 이름을 입력해주세요."
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
            class="absolute right-4 top-4 h-5 w-5 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <div class="flex flex-col w-full max-w-2xl gap-4">
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
            data-v0-t="card"
          >
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                스터디
              </span>
            </span>
            <div class="flex flex-col flex-1 ml-4">
              <h2 class="text-lg font-semibold">화상 스터디 제목</h2>
              <p class="text-sm text-muted-foreground">
                화상 스터디에 관한 설명글을 확인할 수 있습니다.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">3/8</span>
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
                class="h-5 w-5 text-muted-foreground"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
            data-v0-t="card"
          >
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                스터디
              </span>
            </span>
            <div class="flex flex-col flex-1 ml-4">
              <h2 class="text-lg font-semibold">화상 스터디 제목</h2>
              <p class="text-sm text-muted-foreground">
                화상 스터디에 관한 설명글을 확인할 수 있습니다.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">3/8</span>
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
                class="h-5 w-5 text-muted-foreground"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
            data-v0-t="card"
          >
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                스터디
              </span>
            </span>
            <div class="flex flex-col flex-1 ml-4">
              <h2 class="text-lg font-semibold">화상 스터디 제목</h2>
              <p class="text-sm text-muted-foreground">
                화상 스터디에 관한 설명글을 확인할 수 있습니다.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">3/8</span>
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
                class="h-5 w-5 text-muted-foreground"
              >
                <path d="M20 6 9 17l-5-5"></path>
              </svg>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
            data-v0-t="card"
          >
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                스터디
              </span>
            </span>
            <div class="flex flex-col flex-1 ml-4">
              <h2 class="text-lg font-semibold">화상 스터디 제목</h2>
              <p class="text-sm text-muted-foreground">
                화상 스터디에 관한 설명글을 확인할 수 있습니다.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">3/8</span>
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
                class="h-5 w-5 text-muted-foreground"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
            data-v0-t="card"
          >
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                스터디
              </span>
            </span>
            <div class="flex flex-col flex-1 ml-4">
              <h2 class="text-lg font-semibold">화상 스터디 제목</h2>
              <p class="text-sm text-muted-foreground">
                화상 스터디에 관한 설명글을 확인할 수 있습니다.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">3/8</span>
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
                class="h-5 w-5 text-muted-foreground"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
            data-v0-t="card"
          >
            <span class="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
              <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                스터디
              </span>
            </span>
            <div class="flex flex-col flex-1 ml-4">
              <h2 class="text-lg font-semibold">화상 스터디 제목</h2>
              <p class="text-sm text-muted-foreground">
                화상 스터디에 관한 설명글을 확인할 수 있습니다.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm">3/8</span>
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
                class="h-5 w-5 text-muted-foreground"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center w-full mt-6">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2">
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
              class="h-5 w-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            1
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            2
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            3
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            4
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            5
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            6
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mx-1">
            7
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ml-2">
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
              class="h-5 w-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
