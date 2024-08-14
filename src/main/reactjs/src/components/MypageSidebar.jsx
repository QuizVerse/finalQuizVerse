export default function MypageSidebar() {
    return (
        <aside className="w-64 p-4 border-r">
            <div className="flex items-center mb-6">
                <img
                    src="/placeholder.svg"
                    alt="Logo"
                    className="w-10 h-10 mr-2"
                    width="40"
                    height="40"
                />
                <span className="text-xl font-bold">Logoipsu</span>
            </div>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
                placeholder="Placeholder"
            />
            <nav className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold">나의 이력</h3>
                    <ul className="space-y-2">
                        <li>나의 학습이력</li>
                        <li>나의 학습</li>
                        <li>나의 클래스</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">즐겨찾기</h3>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">오답노트</h3>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">회원정보</h3>
                    <ul className="space-y-2">
                        <li>회원정보 수정</li>
                        <li>회원 탈퇴</li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}