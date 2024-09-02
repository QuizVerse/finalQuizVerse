// v0 by Vercel.
// https://v0.dev/t/b1mpVwcfUeX

import { MenuItem, TextField } from "@mui/material";


//필터
const conditions = [
  {
    value: 'popular',
    label: '인기순',
  },
  {
    value: 'recent',
    label: '최신순',
  },
  {
    value: 'old',
    label: '오래된순',
  },
  {
    value: 'title',
    label: '제목순',
  },
];

export default function SolvedBook() {
  return (
      <main className="flex-1 p-8">
        <h1 className="mb-8 text-2xl font-bold text-center">나의 학습이력</h1>
        <div className="flex items-center justify-end mb-4 space-x-4">
          <input
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
            placeholder="Name, email, etc..."
          />
          <div className="flex items-center mb-6 space-x-4">
                <TextField
                    id="outlined-select-currency"
                    select
                    defaultValue="popular">
                      {conditions &&
                      conditions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                  ))}
                </TextField>
           </div>
          <select
            aria-hidden="true"
            tabindex="-1"
          >
            <option value=""></option>
          </select>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
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
              className="w-5 h-5"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  문제집 이름
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  학습일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  제출일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  정답수/문항수
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"></th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024 정보처리기사 실기
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-24
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  진행중(80%)
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  미제출
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    이어서 학습하기
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2023 정보처리기사 실기
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-19
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-19
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  16/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2022 정보처리기사 실기
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-17
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-17
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  18/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2021 정보처리기사 실기
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-17
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-17
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  18/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2023 sqld 기출 4
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  19/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2023 sqld 기출 3
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  20/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2023 sqld 기출 2
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  19/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2023 sqld 기출 1
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-28
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  16/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2022 sqld 기출 4
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-27
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-27
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  19/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2022 sqld 기출 3
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-27
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-06-27
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  17/20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                    성적확인
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
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
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
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
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
            1
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
            2
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
            3
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
            4
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
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
              className="w-5 h-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
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
              className="w-5 h-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </main>
  );
}
