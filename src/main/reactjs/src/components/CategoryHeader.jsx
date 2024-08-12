export default function CategoryHeader() {
    return (
        <div>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">취업/자격증</button>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">초등</button>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">중고등</button>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">외국어/어학</button>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">컴퓨터</button>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">전체보기</button>
            </div>
            <div className="flex items-center justify-center mb-4">
                <input placeholder="검색어를 입력해주세요." className="w-full max-w-md px-4 py-2 border rounded" type="text"/>
                <button className="p-2 ml-2 text-gray-600 bg-gray-100 rounded">
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
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}
