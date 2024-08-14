// v0 by Vercel.
// https://v0.dev/t/MH9WmcxxRpC

export default function Detail() {
    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4">
        <header className="flex items-center justify-between w-full px-4 py-2 border-b">
            <h1 className="text-xl font-bold">QuizVerse</h1>
            <nav className="flex items-center space-x-4">
            <a href="#" className="text-sm font-medium">
                문제집 목록
            </a>
            <a href="#" className="text-sm font-medium">
                화상스터디
            </a>
            </nav>
            <div className="flex items-center space-x-4">
            <button className="text-sm font-medium">로그인</button>
            <div className="flex items-center space-x-2">
                <img src="/placeholder.svg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">귀염둥이</span>
            </div>
            </div>
        </header>
        <main className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-8">
            <img
            src="/placeholder.svg"
            alt="Main Content"
            className="w-full max-w-lg"
            width="600"
            height="400"
            
            />
            <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">[카테고리]</span>
                <h2 className="text-2xl font-bold">
                문제집 제목 어쩌고 저쩌고 조금 여유있게 작성하시면 될 듯 합니다 아주 크게요
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>출제자 박민지</span>
                <span>조회수 180회</span>
                <span>출제일자 2024.07.18</span>
                </div>
            </div>
            <div className="p-4 border rounded-md bg-gray-50">
                <p className="text-sm text-muted-foreground">
                문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집
                설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                </p>
            </div>
            </div>
        </main>
        </div>
    )
}

