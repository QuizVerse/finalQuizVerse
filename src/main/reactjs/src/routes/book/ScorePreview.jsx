// v0 by Vercel.
// https://v0.dev/t/sYs3DjiaYvI

export default function ScorePreview() {
    return (
        <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">정보처리기사 2024 기출문제 1-2</h1>
            <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                성적표로 돌아가기
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                PDF로 출력
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                메인으로
                </button>
            </div>
            <div className="mt-2">
                <div className="flex items-center space-x-4">
                <div className="text-sm">
                    <div className="font-semibold">제출일시</div>
                    <div>2024-08-01</div>
                </div>
                <div className="text-sm">
                    <div className="font-semibold">응시자</div>
                    <div>우태형</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">성적</h2>
            <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-md">
            <div className="flex flex-col">
                <div className="font-semibold">나의 점수</div>
                <div>50점 / 100</div>
            </div>
            <div className="flex flex-col">
                <div className="font-semibold">백분율 환산 점수</div>
                <div>50점</div>
            </div>
            <div className="flex flex-col">
                <div className="font-semibold">정답 문항 수</div>
                <div>7개 / 15</div>
            </div>
            <div className="flex flex-col">
                <div className="font-semibold">소요 시간</div>
                <div>2분 30초</div>
            </div>
            </div>
        </div>
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">정오답 표</h2>
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">1번 문항</th>
                    <th className="px-4 py-2 border-b">2번 문항</th>
                    <th className="px-4 py-2 border-b">3번 문항</th>
                    <th className="px-4 py-2 border-b">4번 문항</th>
                    <th className="px-4 py-2 border-b">5번 문항</th>
                    <th className="px-4 py-2 border-b">6번 문항</th>
                    <th className="px-4 py-2 border-b">7번 문항</th>
                    <th className="px-4 py-2 border-b">8번 문항</th>
                    <th className="px-4 py-2 border-b">9번 문항</th>
                    <th className="px-4 py-2 border-b">10번 문항</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">X</td>
                    <td className="px-4 py-2 text-center">x</td>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">x</td>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">X</td>
                    <td className="px-4 py-2 text-center">X</td>
                </tr>
                </tbody>
            </table>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">11번 문항</th>
                    <th className="px-4 py-2 border-b">12번 문항</th>
                    <th className="px-4 py-2 border-b">13번 문항</th>
                    <th className="px-4 py-2 border-b">14번 문항</th>
                    <th className="px-4 py-2 border-b">15번 문항</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">X</td>
                    <td className="px-4 py-2 text-center">x</td>
                    <td className="px-4 py-2 text-center">O</td>
                    <td className="px-4 py-2 text-center">x</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
    )
}

