import { CallGpt } from "../../components/gpt";
import { useState } from "react";
import {Button, TextField} from "@mui/material";

export default function EditAi() {
    const [data, setData] = useState(null); // 현재 선택된 데이터
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [history, setHistory] = useState([]); // 히스토리 저장

    const handleClickAPICall = async () => {
        try {
            setIsLoading(true);
            const jsonData = await CallGpt({
                prompt: userInput,
            });
            setData(jsonData);
            setHistory((prevHistory) => [...prevHistory, { prompt: userInput, result: jsonData }]); // 히스토리에 추가
            console.log(jsonData);
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHistoryClick = (selectedData) => {
        setData(selectedData.result); // 선택한 히스토리의 결과를 현재 데이터로 설정
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <nav className="flex items-center space-x-4 justify-end w-full">
                    <Button variant={"contained"}>
                        에디터로 편집하기
                    </Button>
                </nav>
            </header>
            <main className="flex flex-1 p-4">
                <aside className="w-1/4 p-4 border-r space-y-2">
                    <Button variant={"outlined"} fullWidth
                            onClick={() => setHistory([])} // 히스토리 초기화
                    >
                        히스토리 초기화
                    </Button>
                    <ul className="space-y-2">
                        {history.map((item, index) => (
                            <li key={index}>
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                                    onClick={() => handleHistoryClick(item)}
                                >
                                    {item.prompt} ...
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <section className="flex-1 p-4">
                    <div className="p-4 border rounded-lg shadow-md bg-white">
                        {isLoading ? (
                            <p>로딩 중...</p>
                        ) : data ? (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">{data.sectionTitle}</h2>
                                <p className="mb-4">{data.sectionDescription}</p>

                                {data.questions && data.questions.map((question, index) => (
                                    <div key={index} className="p-4 mb-4 border rounded-lg shadow-sm bg-gray-50">
                                        <h3 className="text-lg font-semibold mb-2">문제 {question.questionOrder}</h3>
                                        <p className="mb-2">{question.questionTitle}</p>
                                        {question.choices && (
                                            <ul className="mb-2">
                                                {question.choices.map((option, idx) => (
                                                    <li key={idx} className="pl-2">
                                                        {option.choiceText}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <p className="font-medium">정답: {question.correctAnswer}</p>
                                        <p className="text-sm text-gray-600">해설: {question.questionSolution}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>데이터가 없습니다.</p>
                        )}
                    </div>
                    <div className="mt-4 flex items-center space-x-4 ">
                        <TextField
                            multiline
                            fullWidth
                            placeholder="고등학교 3학년 6월 모의고사 수준으로 영어 문제 내역 내줘"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        ></TextField>
                        <Button
                            variant={"contained"}
                            size={"large"}
                            className={"whitespace-nowrap"}
                            onClick={handleClickAPICall}
                        >
                            문항 생성하기
                        </Button>
                    </div>
                </section>
            </main>
            <footer className="p-4 border-t">
                {/* Add any footer content here if needed */}
            </footer>
        </div>
    );
}
