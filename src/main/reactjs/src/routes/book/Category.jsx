// v0 by Vercel.
// https://v0.dev/t/Onu9RySa1RJ


export default function Category() {
    return (

<div className="min-h-screen">
  <header className="flex items-center justify-between p-4 border-b">
    <h1 className="text-2xl font-bold">QuizVerse</h1>
    <nav className="flex items-center space-x-4">
      <a href="#" className="text-lg">
        문제집 목록
      </a>
      <a href="#" className="text-lg">
        학습스테디
      </a>
      <div className="flex items-center space-x-2">
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded">로그아웃</button>
        <div className="flex items-center space-x-2">
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
            className="w-6 h-6"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="text-lg">게임동이</span>
        </div>
      </div>
    </nav>
  </header>
  <main className="p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex space-x-2">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
          취업/자격증
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          초등
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          중등
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          고등
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          외국어/어학
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          취미
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          전체보기
        </button>
      </div>
      <input
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
        type="search"
        placeholder="검색어를 입력해주세요."
      />
    </div>
    <section>
      <h2 className="mb-4 text-xl font-bold">취업/자격증 문제집 Top 5</h2>
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 className="mb-4 text-xl font-bold">취업/자격증 문제집</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <div
            className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
            data-v0-t="badge"
          >
            내가 만든 문제집일 경우
          </div>
          <div
            className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
            data-v0-t="badge"
          >
            다른 사람이 만든 문제집일 경우
          </div>
        </div>
        <button
          type="button"
          role="combobox"
          aria-controls="radix-:R2jlufnnkr:"
          aria-expanded="false"
          aria-autocomplete="none"
          dir="ltr"
          data-state="closed"
          data-placeholder=""
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="filter"
        >
          <span style="pointer-events:none">필터</span>
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
            className="lucide lucide-chevron-down h-4 w-4 opacity-50"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <select
          aria-hidden="true"
          tabindex="-1"
          style="position:absolute;border:0;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;word-wrap:normal"
        >
          <option value=""></option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-full h-48 object-cover"
            width="200"
            height="200"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                합격률 80%
              </div>
              <span className="text-sm text-muted-foreground">2022.04.27</span>
            </div>
            <h3 className="mb-2 text-lg font-bold">2024 정보처리기사 실기</h3>
            <p className="mb-2 text-sm text-muted-foreground">문제집 / 자격증</p>
            <p className="mb-2 text-sm text-muted-foreground">문제집 2권 / 해설 2권</p>
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                공유하기
              </button>
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="flex justify-center mt-8">
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        1
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        2
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        3
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        4
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
        5
      </button>
    </div>
  </main>
</div>
    )
}












