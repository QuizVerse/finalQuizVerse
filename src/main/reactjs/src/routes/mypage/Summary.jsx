// v0 by Vercel.
// https://v0.dev/t/AIdkA9Pm9Pa

export default function Summary() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">
        <div className="flex items-center mb-6">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              Logo
            </span>
          </span>
          <span className="ml-2 text-xl font-bold">Logoipsu</span>
        </div>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
          placeholder="Placeholder"
        />
        <nav className="space-y-2">
          <a className="block py-2" href="#">
            나의 이력
          </a>
          <a className="block py-2" href="#">
            나의 풀이이력
          </a>
          <a className="block py-2" href="#">
            나의 학습이력
          </a>
          <div className="space-y-2">
            <a className="block py-2" href="#">
              나의 클래스
            </a>
            <a className="block py-2" href="#">
              즐겨찾기
            </a>
            <a className="block py-2" href="#">
              오답노트
            </a>
          </div>
          <div className="space-y-2">
            <a className="block py-2" href="#">
              회원정보
            </a>
            <a className="block py-2" href="#">
              회원정보 수정
            </a>
            <a className="block py-2" href="#">
              회원 탈퇴
            </a>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">개요</h2>
          <div className="grid grid-cols-4 gap-4">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">내가 만든 문제집</h3>
                <div className="text-3xl font-bold">12개</div>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">나의 클래스</h3>
                <div className="text-3xl font-bold">9개</div>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">내가 푼 문제집</h3>
                <div className="text-3xl font-bold">37개</div>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">즐겨찾기한 문제집</h3>
                <div className="text-3xl font-bold">60개</div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">내가 만든 문제집</h2>
          <div className="grid grid-cols-4 gap-4">
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center justify-center p-4 h-96 w-"
                data-v0-t="card"
            >
              <div className="p-6">
                <div className="text-lg font-semibold">문제집 추가</div>
                <div className="text-3xl font-bold">+</div>
              </div>
            </div>
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 h-96"
                data-v0-t="card"
            >
              <div className="p-6">
                <img
                    src="/placeholder.svg"
                    alt="Placeholder"
                    className="w-full mb-4"
                    width="150"
                    height="150"
                />
                <div className="mb-2 text-sm text-blue-500">
                  캠페인 • 2022.04.27
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  2024 정보처리기사 실기
                </h3>
                <div className="mb-2 text-sm text-muted-foreground">
                  취업 / 자격증
                </div>
                <div className="mb-2 text-sm text-muted-foreground">
                  조회수 311 | 좋아요 20 | 댓글수 2
                </div>
                <div className="flex items-center justify-between">
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
                      className="w-5 h-5 text-muted-foreground"
                  >
                    <path
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    공유하기
                  </button>
                </div>
              </div>
            </div>
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 h-96"
                data-v0-t="card"
            >
              <div className="p-6">
                <img
                    src="/placeholder.svg"
                    alt="Placeholder"
                    className="w-full mb-4"
                    width="150"
                    height="150"
                />
                <div className="mb-2 text-sm text-blue-500">
                  캠페인 • 2022.04.27
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  2024 정보처리기사 실기
                </h3>
                <div className="mb-2 text-sm text-muted-foreground">
                  취업 / 자격증
                </div>
                <div className="mb-2 text-sm text-muted-foreground">
                  조회수 311 | 좋아요 20 | 댓글수 2
                </div>
                <div className="flex items-center justify-between">
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
                      className="w-5 h-5 text-muted-foreground"
                  >
                    <path
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    공유하기
                  </button>
                </div>
              </div>
            </div>
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 h-96"
                data-v0-t="card"
            >
              <div className="p-6">
                <img
                    src="/placeholder.svg"
                    alt="Placeholder"
                    className="w-full mb-4"
                    width="150"
                    height="150"
                />
                <div className="mb-2 text-sm text-blue-500">
                  캠페인 • 2022.04.27
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  2024 정보처리기사 실기
                </h3>
                <div className="mb-2 text-sm text-muted-foreground">
                  취업 / 자격증
                </div>
                <div className="mb-2 text-sm text-muted-foreground">
                  조회수 311 | 좋아요 20 | 댓글수 2
                </div>
                <div className="flex items-center justify-between">
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
                      className="w-5 h-5 text-muted-foreground"
                  >
                    <path
                        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <button
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    공유하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-bold">나의 클래스</h2>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  클래스 이름
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  등록일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  구성원 수
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  상태
                </th>
              </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  정치기 스터디
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-23
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  10
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  멤버
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  자바 함께해요
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  3
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  멤버
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    영어스터디
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024-07-19
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    5
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    멤버
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                    언어교환
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    2024-07-17
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    9
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
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
