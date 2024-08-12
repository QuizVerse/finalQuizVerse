// v0 by Vercel.
// https://v0.dev/t/QGcuOmSrS3M

export default function MyclassDetail() {
  return (
    <div class="flex min-h-screen">
      <aside class="w-64 p-4 border-r">
        <div class="flex items-center mb-6">
          <img
            src="/placeholder.svg"
            alt="Logo"
            class="w-10 h-10 mr-2"
            width="40"
            height="40"
            style="aspect-ratio:40/40;object-fit:cover"
          />
          <span class="text-xl font-bold">Logoipsu</span>
        </div>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
          placeholder="Placeholder"
        />
        <nav class="space-y-4">
          <div>
            <h3 class="mb-2 text-sm font-semibold">나의 이력</h3>
            <ul class="space-y-2">
              <li>
                <a class="block text-sm" href="#">
                  나의 플레이리스트
                </a>
              </li>
              <li>
                <a class="block text-sm" href="#">
                  나의 학습이력
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-sm font-semibold">나의 클래스</h3>
            <ul class="space-y-2">
              <li>
                <a class="block text-sm" href="#">
                  정치기
                </a>
              </li>
              <li>
                <a class="block text-sm" href="#">
                  오답노트
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-sm font-semibold">회원정보 수정</h3>
            <ul class="space-y-2">
              <li>
                <a class="block text-sm" href="#">
                  회원 탈퇴
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main class="flex-1 p-6">
        <h1 class="mb-6 text-2xl font-bold">정치기 실기 스터디</h1>
        <div class="mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <input
                class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                placeholder="Name, email, etc..."
              />
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:R9alufnnkr:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                data-placeholder=""
                class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span style="pointer-events:none">등록일순</span>
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
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </div>
            <div class="space-x-2">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                구성원 추가
              </button>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                구성원 삭제
              </button>
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                클래스 나가기
              </button>
            </div>
          </div>
          <div class="relative w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
              <thead class="[&amp;_tr]:border-b">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-10">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    ></button>
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                      tabindex="-1"
                      value="on"
                    />
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    이름
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    이메일
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    등록일시
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody class="[&amp;_tr:last-child]:border-0">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    ></button>
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                      tabindex="-1"
                      value="on"
                    />
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div class="flex items-center space-x-2">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          PF
                        </span>
                      </span>
                      <span>Prabodhan Fitzgerald</span>
                    </div>
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    name@email.com
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.06
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
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    ></button>
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                      tabindex="-1"
                      value="on"
                    />
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div class="flex items-center space-x-2">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          HJ
                        </span>
                      </span>
                      <span>Hiro Joyce</span>
                    </div>
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    name@email.com
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.06
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
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    ></button>
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                      tabindex="-1"
                      value="on"
                    />
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div class="flex items-center space-x-2">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          LJ
                        </span>
                      </span>
                      <span>Lloyd Jefferson</span>
                    </div>
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    name@email.com
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.06
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
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    ></button>
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                      tabindex="-1"
                      value="on"
                    />
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div class="flex items-center space-x-2">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          CM
                        </span>
                      </span>
                      <span>Ceiran Mayo</span>
                    </div>
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    name@email.com
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024.07.06
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
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    ></button>
                    <input
                      type="checkbox"
                      aria-hidden="true"
                      style="transform:translateX(-100%);position:absolute;pointer-events:none;opacity:0;margin:0"
                      tabindex="-1"
                      value="on"
                    />
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div class="flex items-center space-x-2">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          TJ
                        </span>
                      </span>
                      <span>Thumbiko James</span>
                    </div>
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    name@email.com
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    1996.08.09
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <div
                      class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"
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
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">클래스 공개 문제집</h2>
          <a class="text-sm text-muted-foreground" href="#">
            전체보기
          </a>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div class="p-6">
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                class="w-full h-48 mb-4"
                width="200"
                height="200"
                style="aspect-ratio:200/200;object-fit:cover"
              />
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div
                    class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                    data-v0-t="badge"
                  >
                    문제집
                  </div>
                  <span class="text-sm text-muted-foreground">2022.04.27</span>
                </div>
                <h3 class="text-lg font-semibold">2024 정보처리기사 실기</h3>
                <p class="text-sm text-muted-foreground">작성 / 저작물</p>
                <p class="text-sm text-muted-foreground">
                  조회수 31 | 좋아요 20 | 해설수 2
                </p>
                <div class="flex items-center justify-between">
                  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    class="w-4 h-4 text-red-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div class="p-6">
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                class="w-full h-48 mb-4"
                width="200"
                height="200"
                style="aspect-ratio:200/200;object-fit:cover"
              />
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div
                    class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                    data-v0-t="badge"
                  >
                    문제집
                  </div>
                  <span class="text-sm text-muted-foreground">2022.04.27</span>
                </div>
                <h3 class="text-lg font-semibold">2024 정보처리기사 실기</h3>
                <p class="text-sm text-muted-foreground">작성 / 저작물</p>
                <p class="text-sm text-muted-foreground">
                  조회수 31 | 좋아요 20 | 해설수 2
                </p>
                <div class="flex items-center justify-between">
                  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    class="w-4 h-4 text-red-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div class="p-6">
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                class="w-full h-48 mb-4"
                width="200"
                height="200"
                style="aspect-ratio:200/200;object-fit:cover"
              />
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div
                    class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                    data-v0-t="badge"
                  >
                    문제집
                  </div>
                  <span class="text-sm text-muted-foreground">2022.04.27</span>
                </div>
                <h3 class="text-lg font-semibold">2024 정보처리기사 실기</h3>
                <p class="text-sm text-muted-foreground">작성 / 저작물</p>
                <p class="text-sm text-muted-foreground">
                  조회수 31 | 좋아요 20 | 해설수 2
                </p>
                <div class="flex items-center justify-between">
                  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    class="w-4 h-4 text-red-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div class="p-6">
              <img
                src="/placeholder.svg"
                alt="Thumbnail"
                class="w-full h-48 mb-4"
                width="200"
                height="200"
                style="aspect-ratio:200/200;object-fit:cover"
              />
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div
                    class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                    data-v0-t="badge"
                  >
                    문제집
                  </div>
                  <span class="text-sm text-muted-foreground">2022.04.27</span>
                </div>
                <h3 class="text-lg font-semibold">2024 정보처리기사 실기</h3>
                <p class="text-sm text-muted-foreground">작성 / 저작물</p>
                <p class="text-sm text-muted-foreground">
                  조회수 31 | 좋아요 20 | 해설수 2
                </p>
                <div class="flex items-center justify-between">
                  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                    class="w-4 h-4 text-red-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
