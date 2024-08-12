export default function FindUserResult() {
    return (
        <main className="flex flex-col items-center justify-center flex-1">
            <h2 className="text-lg font-semibold mb-4">회원정보 조회</h2>
            <div className="space-y-2 text-center">
                <p>
                    <a href="#" className="text-blue-600">
                        bitcamp1234@naver.com
                    </a>
                    은 가입 이력이 있는 아이디 입니다.
                </p>
                <p>
                    <a href="#" className="text-blue-600">
                        bitcamp1234@naver.com
                    </a>
                    은 가입 이력이 없는 아이디 입니다.
                </p>
            </div>
            <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4">
                로그인 페이지로 이동
            </button>
        </main>
    );
}