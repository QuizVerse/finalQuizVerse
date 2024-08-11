export default function FindUserResult() {
    return (
    <div class="min-h-screen flex flex-col">
    <header class="flex justify-between items-center p-4 border-b">
        <div class="text-xl font-bold">QuizVerse</div>
        <nav class="flex space-x-4">
        <a href="#" class="text-sm">
            문제집 목록
        </a>
        <a href="#" class="text-sm">
            화상스터디
        </a>
        </nav>
        <div class="flex space-x-2">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            로그인
        </button>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            회원가입
        </button>
        </div>
    </header>
    <main class="flex flex-col items-center justify-center flex-1">
        <h2 class="text-lg font-semibold mb-4">회원정보 조회</h2>
        <div class="space-y-2 text-center">
        <p>
            <a href="#" class="text-blue-600">
            bitcamp1234@naver.com
            </a>
            은 가입 이력이 있는 아이디 입니다.
        </p>
        <p>
            <a href="#" class="text-blue-600">
            bitcamp1234@naver.com
            </a>
            은 가입 이력이 없는 아이디 입니다.
        </p>
        </div>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4">
        로그인 페이지로 이동
        </button>
    </main>
    </div>
    );
}