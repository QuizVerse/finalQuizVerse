// v0 by Vercel.
// https://v0.dev/t/AIdkA9Pm9Pa

import BookCard from "../../components/BookCard";

export default function Summary() {
  return (
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
                className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center justify-center space-x-4"
                data-v0-t="card"
            >
              <div className="p-6 flex-1 flex flex-col items-center">
                <div className="text-lg font-semibold">문제집 추가</div>
                <div className="text-3xl font-bold">+</div>
              </div>
            </div>
            <BookCard cardType="B" className={"flex-1"}/>
            <BookCard cardType="B" className={"flex-1"}/>
            <BookCard className={"flex-1"}/>
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
  );
}
