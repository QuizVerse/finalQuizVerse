// v0 by Vercel.
// https://v0.dev/t/a47qArNGF11
export default function StudyList() {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
        <header className="flex items-center justify-between w-full max-w-5xl p-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
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
                className="w-6 h-6"
            >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
            <span className="text-lg font-semibold">홍길동</span>
            </div>
            <div className="flex items-center space-x-4">
            <span className="text-lg">10/50 문항 | 10 섹션</span>
            <span className="text-lg">500점</span>
            </div>
            <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">퀴즈 제목을 넣으면 돼요</span>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary/80 h-10 px-4 py-2 bg-yellow-500 text-white">
                시험 종료
            </button>
            </div>
        </header>
        <main className="flex flex-col items-center w-full max-w-5xl p-4 bg-white shadow-md mt-4">
            <div className="flex items-center justify-between w-full p-4 bg-blue-100">
            <span className="text-lg font-semibold text-blue-600">Q1</span>
            <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-gray-200 text-gray-800"
                data-v0-t="badge"
            >
                50점
            </div>
            </div>
            <div className="w-full p-4">
            <p className="mb-4">선택형 문제입니다. 문제 내용이 이렇게 어려운데 풀 수 있습니까?</p>
            <p className="mb-4">
                문제 지문입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
                구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
                이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
                예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
                구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
                이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
                예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
            </p>
            <img
                src="/placeholder.svg"
                alt="Example"
                className="w-full max-w-xs mx-auto mb-4"
                width="300"
                height="200"
                style="aspect-ratio: 300 / 200; object-fit: cover;"
            />
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                <input id="option1" type="radio" name="question1" />
                <label for="option1">답안 1 입니다.</label>
                </div>
                <div className="flex items-center space-x-2">
                <input id="option2" type="radio" name="question1" />
                <label for="option2">답안 2 입니다.</label>
                </div>
                <div className="flex items-center space-x-2">
                <input id="option3" type="radio" name="question1" />
                <label for="option3">답안 3 입니다.</label>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
}
