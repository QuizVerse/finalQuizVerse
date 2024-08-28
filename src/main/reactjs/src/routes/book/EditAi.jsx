import { CallGpt } from "../../components/gpt";
import { useState } from "react";

export default function EditAi() {
    const [data, setData] = useState([]); // 초기 상태를 빈 배열로 설정
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');

    const handleClickAPICall = async () => {
        try {
            setIsLoading(true);
            const message = await CallGpt({
                prompt: userInput,
            });

            // 문제 데이터를 객체로 변환
            const parsedData = parseResponse(message);
            setData(parsedData);
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 받은 응답을 문제 객체의 배열로 파싱하는 함수
    const parseResponse = (message) => {
        const problemBlocks = message.trim().split("[Title]:").slice(1); // 첫 번째 빈 항목 제거
        return problemBlocks.map((block, index) => {
            const lines = block.trim().split("\n").filter(line => line.trim() !== "");
            const problemData = {};
            lines.forEach(line => {
                const [key, ...rest] = line.split(":");
                problemData[key.trim()] = rest.join(":").trim();
            });
            problemData["Number"] = index + 1; // 문제 번호 추가
            return problemData;
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-bold">QuizVerse</h1>
                <nav className="flex items-center space-x-4">
                    <a className="text-blue-500" href="#">로그인</a>
                    <a className="text-blue-500" href="#">가입동의</a>
                </nav>
            </header>
            <main className="flex flex-1 p-4">
                <aside className="w-1/4 p-4 border-r">
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full mb-4"
                    >
                        히스토리 초기화
                    </button>
                    <ul className="space-y-2">
                        <li>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                            >
                                고등학교 3학년 6월 모의고사 ...
                            </button>
                        </li>
                        <li>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                            >
                                고등학교 3학년 9월 모의고사 ...
                            </button>
                        </li>
                        <li>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                            >
                                고등학교 2학년 6월 모의고사 ...
                            </button>
                        </li>
                        <li>
                            <button
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                            >
                                고등학교 3학년 6월 모의고사 ...
                            </button>
                        </li>
                    </ul>
                </aside>
                <section className="flex-1 p-4">
                    <div className="p-4 border rounded-lg shadow-md bg-white">
                        {isLoading ? (
                            <p>로딩 중...</p>
                        ) : (
                            Array.isArray(data) && data.length > 0 ? (
                                data.map((question, index) => (
                                    <div key={index} className="mb-4">
                                        <h2 className="text-xl font-bold mb-2">{question.Title}</h2>
                                        <p className="text-gray-600 mb-2">Number: {question.Number}</p>
                                        <p className="mb-2">{question.Summary}</p>
                                        <p className="mb-4">{question.Problem}</p>
                                        <ul className="list-disc pl-5 mb-4">
                                            {question.Questionnaire && question.Questionnaire.split(" ").map((option, i) => (
                                                <li key={i}>{option}</li>
                                            ))}
                                        </ul>
                                        <p className="text-green-600"><strong>Answer:</strong> {question.Answer}</p>
                                        <p className="text-gray-500"><strong>Explanation:</strong> {question.Description}</p>
                                    </div>
                                ))
                            ) : (
                                <p>올바른 데이터 형식이 아닙니다.</p>
                            )
                        )}
                    </div>
                    <div className="mt-4 flex items-start space-x-4">
                        <textarea
                            className="flex-1 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-32 p-2"
                            placeholder="고등학교 3학년 6월 모의고사 수준으로 영어 문제 내역 내줘"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        ></textarea>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                            onClick={handleClickAPICall}
                        >
                            문항 생성하기
                        </button>
                    </div>
                </section>
            </main>
            <footer className="p-4 border-t">
                {/* Add any footer content here if needed */}
            </footer>
        </div>
    );
}
