// v0 by Vercel.
// https://v0.dev/t/PyQHzVi1rPb

export default function Myclass() {
  return (
    <div class="flex min-h-screen">
      <aside class="w-64 p-4 border-r">
        <div class="flex items-center mb-6">
          <img
            src="/placeholder.svg"
            alt="Logo"
            class="mr-2"
            width="32"
            height="32"
            style="aspect-ratio:32/32;object-fit:cover"
          />
          <span class="text-xl font-bold">Logoipsu</span>
        </div>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
          placeholder="Placeholder"
        />
        <nav class="space-y-4">
          <div>
            <h2 class="font-semibold">나의 이력</h2>
            <ul class="space-y-2">
              <li>
                <a class="block" href="#">
                  나의 졸업이력
                </a>
              </li>
              <li>
                <a class="block" href="#">
                  나의 학습이력
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="font-semibold">나의 클래스</h2>
            <ul class="space-y-2">
              <li>
                <a class="block" href="#">
                  즐겨찾기
                </a>
              </li>
              <li>
                <a class="block" href="#">
                  오답노트
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="font-semibold">회원정보</h2>
            <ul class="space-y-2">
              <li>
                <a class="block" href="#">
                  회원정보 수정
                </a>
              </li>
              <li>
                <a class="block" href="#">
                  회원 탈퇴
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main class="flex-1 p-6">
        <h1 class="mb-6 text-2xl font-bold">나의 클래스</h1>
        <div class="flex items-center mb-4 space-x-4">
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            placeholder="Name, email, etc..."
          />
          <button
            type="button"
            role="combobox"
            aria-controls="radix-:Rilufnnkr:"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            data-placeholder=""
            class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Filter"
          >
            <span style="pointer-events:none">가입 일순</span>
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
              class="lucide lucide-chevron-down h-4 w-4 opacity-50"
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
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            클래스 생성
          </button>
        </div>
        <div
          class="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div class="relative w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
              <thead class="[&amp;_tr]:border-b">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    이름
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    구성원 수
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    가입일시
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    생성일시
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody class="[&amp;_tr:last-child]:border-0">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    정치가 스터디
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    10
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.31
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2022.11.06
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div
                      class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                      data-v0-t="badge"
                    >
                      멤버
                    </div>
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    자바 함께해요
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    3
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.26
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2020.07.06
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div
                      class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                      data-v0-t="badge"
                    >
                      멤버
                    </div>
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    영어 스터디
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    5
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.18
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2021.08.09
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div
                      class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                      data-v0-t="badge"
                    >
                      멤버
                    </div>
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    언어교환
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    9
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.16
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2017.07.20
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div
                      class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                      data-v0-t="badge"
                    >
                      멤버
                    </div>
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    백공모드
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    1
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.06
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2013.01.16
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div
                      class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      data-v0-t="badge"
                    >
                      클래스장
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <nav class="flex items-center space-x-2">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10">
              1
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              2
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              3
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              4
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              5
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              6
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              7
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}
