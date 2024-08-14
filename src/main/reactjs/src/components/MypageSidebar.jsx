import {Link} from "react-router-dom";

export default function MypageSidebar() {
    return (
        <aside className="w-64 p-4 border-r">
            <div className="flex items-center mb-6">
                <span className="text-xl font-bold">Logoipsu</span>
            </div>
            <nav className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold">나의 이력</h3>
                    <ul className="space-y-2">
                        <li><Link to={"publishedbook"}>나의 출제이력</Link></li>
                        <li><Link to={"solvedbook"}>나의 학습이력</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        <Link to={"myclass"}>나의 클래스</Link>
                    </h3>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        <Link to={"bookmark"}>즐겨찾기</Link>
                    </h3>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        <Link to={"wrong"}>오답노트</Link>
                    </h3>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        <Link to={"updateuser"}>회원정보</Link>
                    </h3>
                    <ul className="space-y-2">
                        <li><Link to={"updateuser"}>회원정보 수정</Link></li>
                        <li><Link to={"leave"}>회원 탈퇴</Link></li>
                    </ul>
                </div>
            </nav>
        </aside>
    )
}