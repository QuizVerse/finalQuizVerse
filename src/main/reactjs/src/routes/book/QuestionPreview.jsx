// v0 by Vercel.
// https://v0.dev/t/HlGo04GwQ0g

export default function QuestionPreview() {
    return (
    <div class="w-full max-w-5xl mx-auto p-4">
    <header class="flex items-center justify-between py-2 border-b">
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
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
        </svg>
        <span class="text-lg font-semibold">홍길동</span>
        </div>
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        </svg>
        <span class="text-lg font-semibold">총 20 문항 | 총 10 섹션 | 총 100 점</span>
        </div>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-500 text-white">
        출제하기
        </button>
    </header>
    <main class="mt-4">
        <div class="text-center text-xl font-semibold mb-4">문제 미리보기</div>
        <div class="overflow-x-auto">
        <table class="w-full border-collapse">
            <thead>
            <tr class="bg-gray-100">
                <th class="border p-2">문항번호</th>
                <th class="border p-2">1번</th>
                <th class="border p-2">2번</th>
                <th class="border p-2">3번</th>
                <th class="border p-2">4번</th>
                <th class="border p-2">5번</th>
                <th class="border p-2">6번</th>
                <th class="border p-2">7번</th>
                <th class="border p-2">8번</th>
                <th class="border p-2">9번</th>
                <th class="border p-2">10번</th>
                <th class="border p-2">현재 배점 합계</th>
                <th class="border p-2">총점</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="border p-2">배점</td>
                <td class="border p-2">5</td>
                <td class="border p-2">5</td>
                <td class="border p-2">5</td>
                <td class="border p-2">3</td>
                <td class="border p-2">7</td>
                <td class="border p-2">4</td>
                <td class="border p-2">5</td>
                <td class="border p-2">6</td>
                <td class="border p-2">5</td>
                <td class="border p-2">6</td>
                <td class="border p-2 text-red-500">95점</td>
                <td class="border p-2 text-blue-500">100점</td>
            </tr>
            </tbody>
        </table>
        </div>
        <section class="mt-4">
        <div class="bg-blue-50 p-4 rounded-md">
            <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">1 섹션에는 귀여운 문제만 나올예정입니다.</h2>
            <span class="text-sm text-gray-500">1 섹션 / 3 섹션</span>
            </div>
            <img
            src="/placeholder.svg"
            alt="Cute Image"
            class="w-full max-w-sm mx-auto"
            width="300"
            height="200"
            style="aspect-ratio:300/200;object-fit:cover"
            />
            <p class="mt-4 text-gray-700">이렇게 귀여운 문제가 관련된 문제로 모여 배정됩니다. 열심히 처리해 주세요.</p>
        </div>
        </section>
        <section class="mt-4">
        <div class="bg-white p-4 rounded-md shadow-md">
            <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
                <div
                class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-blue-500 text-white"
                data-v0-t="badge"
                >
                Q1
                </div>
                <h3 class="text-lg font-semibold">선택형 문제입니다. 문제 내용이 이렇게 어려운데 풀 수 있습니까?</h3>
            </div>
            <span class="text-sm text-gray-500">50점</span>
            </div>
            <p class="text-gray-700 mb-4">
            문제 질문입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
            구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
            이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
            예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
            구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
            이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
            예정입니다.
            </p>
            <img
            src="/placeholder.svg"
            alt="Cute Image"
            class="w-full max-w-sm mx-auto mb-4"
            width="300"
            height="200"
            style="aspect-ratio:300/200;object-fit:cover"
            />
            <div class="space-y-2">
            <div class="flex items-center space-x-2">
                <input type="radio" id="option1" class="form-radio" name="question1" />
                <label for="option1" class="text-gray-700">
                답안 1 입니다.
                </label>
            </div>
            <div class="flex items-center space-x-2">
                <input type="radio" id="option2" class="form-radio" name="question1" />
                <label for="option2" class="text-gray-700">
                답안 2 입니다.
                </label>
            </div>
            <div class="flex items-center space-x-2">
                <input type="radio" id="option3" class="form-radio" name="question1" />
                <label for="option3" class="text-gray-700">
                답안 3 입니다.
                </label>
            </div>
            </div>
        </div>
        </section>
        <section class="mt-4">
        <div class="bg-blue-50 p-4 rounded-md">
            <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">2섹션에는 귀여운 문제만 나올예정입니다.</h2>
            <span class="text-sm text-gray-500">2 섹션 / 3 섹션</span>
            </div>
        </div>
        </section>
    </main>
    </div>
    )
}

