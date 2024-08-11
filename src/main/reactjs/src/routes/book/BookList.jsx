  /**
 * v0 by Vercel.
 * @see https://v0.dev/t/JJXGo0DWIQO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function BookList() {
  return (
  <div class="min-h-screen bg-white">
    <header class="flex items-center justify-between p-4 border-b">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl font-bold">QuizVerse</h1>
        <nav class="flex space-x-4">
          <a href="#" class="text-gray-700">
            문제집 목록
          </a>
          <a href="#" class="text-gray-700">
            화상스터디
          </a>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded">로그인</button>
        <button class="px-4 py-2 text-white bg-blue-600 rounded">회원가입</button>
      </div>
    </header>
    <main class="p-4">
      <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">취업/자격증</button>
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">초등</button>
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">중고등</button>
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">외국어/어학</button>
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">컴퓨터</button>
        <button class="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">전체보기</button>
      </div>
      <div class="flex items-center justify-center mb-4">
        <input placeholder="검색어를 입력해주세요." class="w-full max-w-md px-4 py-2 border rounded" type="text" />
        <button class="p-2 ml-2 text-gray-600 bg-gray-100 rounded">
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
            class="w-5 h-5"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      </div>
      <div class="flex items-center justify-center mb-8">
        <div class="w-full max-w-4xl p-16 text-center bg-gray-200 rounded">문제집 추천배너</div>
      </div>
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">취업/자격증 문제집 Top 5</h2>
          <a href="#" class="text-gray-600">
            전체보기 &amp;gt;
          </a>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">초등 문제집 Top 5</h2>
          <a href="#" class="text-gray-600">
            전체보기 &amp;gt;
          </a>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">중고등 문제집 Top 5</h2>
          <a href="#" class="text-gray-600">
            전체보기 &amp;gt;
          </a>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold">외국어/어학 문제집 Top 5</h2>
          <a href="#" class="text-gray-600">
            전체보기 &amp;gt;
          </a>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" class="w-full h-48 rounded-t" />
            <div class="p-4">
              <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                data-v0-t="badge"
              >
                강쌤픽 · 2022.04.27
              </div>
              <h3 class="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
              <p class="mt-1 text-sm text-gray-600">취업 / 자격증</p>
              <p class="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
              <div class="flex items-center justify-between mt-4">
                <button class="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</button>
                <button class="text-red-600">
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
                    class="w-5 h-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  )
}


