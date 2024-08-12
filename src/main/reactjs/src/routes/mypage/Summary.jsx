// v0 by Vercel.
// https://v0.dev/t/AIdkA9Pm9Pa

export default function Summary() {
  return (
    <div class="flex min-h-screen">
      <aside class="w-64 p-4 border-r">
        <div class="flex items-center mb-6">
          <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <span class="flex h-full w-full items-center justify-center rounded-full bg-muted">
              Logo
            </span>
          </span>
          <span class="ml-2 text-xl font-bold">Logoipsu</span>
        </div>
        <input
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
          placeholder="Placeholder"
        />
        <nav class="space-y-2">
          <a class="block py-2" href="#">
            나의 이력
          </a>
          <a class="block py-2" href="#">
            나의 풀이이력
          </a>
          <a class="block py-2" href="#">
            나의 학습이력
          </a>
          <div class="space-y-2">
            <a class="block py-2" href="#">
              나의 클래스
            </a>
            <a class="block py-2" href="#">
              즐겨찾기
            </a>
            <a class="block py-2" href="#">
              오답노트
            </a>
          </div>
          <div class="space-y-2">
            <a class="block py-2" href="#">
              회원정보
            </a>
            <a class="block py-2" href="#">
              회원정보 수정
            </a>
            <a class="block py-2" href="#">
              회원 탈퇴
            </a>
          </div>
        </nav>
      </aside>
      <main class="flex-1 p-8">
        <section class="mb-8">
          <h2 class="mb-4 text-2xl font-bold">개요</h2>
          <div class="grid grid-cols-4 gap-4">
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <h3 class="mb-2 text-lg font-semibold">내가 만든 문제집</h3>
                <div class="text-3xl font-bold">12개</div>
              </div>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <h3 class="mb-2 text-lg font-semibold">나의 클래스</h3>
                <div class="text-3xl font-bold">9개</div>
              </div>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <h3 class="mb-2 text-lg font-semibold">내가 푼 문제집</h3>
                <div class="text-3xl font-bold">37개</div>
              </div>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <h3 class="mb-2 text-lg font-semibold">즐겨찾기한 문제집</h3>
                <div class="text-3xl font-bold">60개</div>
              </div>
            </div>
          </div>
        </section>
        <section class="mb-8">
          <h2 class="mb-4 text-2xl font-bold">내가 만든 문제집</h2>
          <div class="grid grid-cols-3 gap-4">
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center justify-center p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <div class="text-lg font-semibold">문제집 추가</div>
                <div class="text-3xl font-bold">+</div>
              </div>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <img
                  src="/placeholder.svg"
                  alt="Placeholder"
                  class="w-full mb-4"
                  width="150"
                  height="150"
                  style="aspect-ratio:150/150;object-fit:cover"
                />
                <div class="mb-2 text-sm text-blue-500">
                  캠페인 • 2022.04.27
                </div>
                <h3 class="mb-2 text-lg font-semibold">
                  2024 정보처리기사 실기
                </h3>
                <div class="mb-2 text-sm text-muted-foreground">
                  취업 / 자격증
                </div>
                <div class="mb-2 text-sm text-muted-foreground">
                  조회수 311 | 좋아요 20 | 댓글수 2
                </div>
                <div class="flex items-center justify-between">
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
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    공유하기
                  </button>
                </div>
              </div>
            </div>
            <div
              class="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div class="p-6">
                <img
                  src="/placeholder.svg"
                  alt="Placeholder"
                  class="w-full mb-4"
                  width="150"
                  height="150"
                  style="aspect-ratio:150/150;object-fit:cover"
                />
                <div class="mb-2 text-sm text-blue-500">
                  캠페인 • 2022.04.27
                </div>
                <h3 class="mb-2 text-lg font-semibold">
                  2024 정보처리기사 실기
                </h3>
                <div class="mb-2 text-sm text-muted-foreground">
                  취업 / 자격증
                </div>
                <div class="mb-2 text-sm text-muted-foreground">
                  조회수 311 | 좋아요 20 | 댓글수 2
                </div>
                <div class="flex items-center justify-between">
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
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    공유하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 class="mb-4 text-2xl font-bold">나의 클래스</h2>
          <div class="relative w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
              <thead class="[&amp;_tr]:border-b">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    클래스 이름
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    등록일시
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    구성원 수
                  </th>
                  <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody class="[&amp;_tr:last-child]:border-0">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    정치기 스터디
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024-07-23
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    10
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    멤버
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    자바 함께해요
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024-07-20
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    3
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    멤버
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    영어스터디
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024-07-19
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    5
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    멤버
                  </td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    언어교환
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024-07-17
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    9
                  </td>
                  <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    멤버
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
