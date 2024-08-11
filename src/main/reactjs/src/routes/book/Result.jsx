// v0 by Vercel.
// https://v0.dev/t/aQF3J0XBXxU

export default function Result() {
    return (
        <div class="flex flex-col items-center w-full min-h-screen bg-gray-100">
        <header class="flex items-center justify-between w-full p-4 bg-white border-b">
            <div class="flex items-center space-x-4">
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
                class="w-6 h-6"
            >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
            </svg>
            <span class="text-lg font-semibold">홍길동</span>
            </div>
            <div class="flex items-center space-x-4">
            <span class="text-lg">16/20 문항</span>
            <span class="text-lg">80점</span>
            </div>
            <span class="text-xl font-bold">정보처리기사 기출문제</span>
        </header>
        <div class="w-full bg-black text-white p-6">
            <div class="flex justify-between items-center">
            <div class="space-y-2">
                <h2 class="text-lg font-bold">정보처리기사 2024 기출문제 1-2</h2>
                <div class="space-y-1">
                <div class="flex items-center">
                    <span class="w-32">박득점 총점</span>
                    <span class="w-32">80점</span>
                </div>
                <div class="flex items-center">
                    <span class="w-32">정답 문항수</span>
                    <span class="w-32">16/20문항</span>
                </div>
                <div class="flex items-center">
                    <span class="w-32">응시 일</span>
                    <span class="w-32">2024년 7월 28일 12시 31분</span>
                </div>
                <div class="flex items-center">
                    <span class="w-32">소요시간</span>
                    <span class="w-32">20분 54초</span>
                </div>
                </div>
            </div>
            <div class="flex flex-col items-center">
                <span class="text-lg">인자한 홍길동님의 점수는?</span>
                <div class="flex items-center space-x-2">
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
                    class="w-6 h-6"
                >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                </svg>
                <span class="text-4xl font-bold">80/100점</span>
                </div>
            </div>
            </div>
        </div>
        <div class="w-full p-6 bg-white">
            <div class="flex justify-end space-x-4 mb-4">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                해설보기
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                문제별 리뷰 작성
            </button>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                성적표 PDF로 출력
            </button>
            </div>
            <div class="relative w-full overflow-auto">
            <table class="w-full caption-bottom text-sm">
                <thead class="[&amp;_tr]:border-b">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    문항번호
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    배점
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    정답여부
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    정답률
                    </th>
                </tr>
                </thead>
                <tbody class="[&amp;_tr:last-child]:border-0">
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">1번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">⭕</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">2번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">❌</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">3번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">⭕</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">4번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">⭕</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">⭕</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">6번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">❌</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">7번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">❌</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">8번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">❌</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">9번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">⭕</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">10번 문항</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">5p</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">⭕</td>
                    <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">91%</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="flex justify-center mt-4">
            <div class="flex space-x-2">
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                1
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                2
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                3
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                4
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                5
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                6
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                7
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
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
            </div>
            </div>
        </div>
        </div>
    )
}
