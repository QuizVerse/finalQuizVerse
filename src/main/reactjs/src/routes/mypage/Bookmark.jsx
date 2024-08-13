// v0 by Vercel.
// https://v0.dev/t/hx5RoREe1hV

export default function Bookmark() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">
        <div className="flex items-center mb-6">
          <img
            src="/placeholder.svg"
            alt="Logo"
            className="w-10 h-10 mr-2"
            width="40"
            height="40"
          />
          <span className="text-xl font-bold">Logoipsu</span>
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
          placeholder="Placeholder"
        />
        <nav className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">나의 이력</h3>
            <ul className="space-y-2">
              <li>나의 학습이력</li>
              <li>나의 학습</li>
              <li>나의 클래스</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">즐겨찾기</h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold">오답노트</h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold">회원정보</h3>
            <ul className="space-y-2">
              <li>회원정보 수정</li>
              <li>회원 탈퇴</li>
            </ul>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">즐겨찾기</h1>
          <div className="flex items-center space-x-4">
            <input
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
              placeholder="Name, email, etc..."
            />
            <button
              type="button"
              role="combobox"
              aria-controls="radix-:R19lufnnkr:"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              data-placeholder=""
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Filter"
            >
              <span>등록일순</span>
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
            >
              <option value=""></option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-full h-48 object-cover"
              width="200"
              height="200"
            />
            <div className="p-6">
              <div className="text-sm text-blue-500">캠퍼스 · 2022.04.27</div>
              <h2 className="mt-2 text-lg font-semibold">2024 정보처리기사 실기</h2>
              <div className="mt-2 text-sm text-gray-500">
                <p>취미 / 자격증</p>
                <p>조회수 31 | 응원수 20 | 댓글수 2</p>
                <p>비공개</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                  31
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            1
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            2
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            3
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            4
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            5
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            6
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            7
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
