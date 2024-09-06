import { CallGpt } from "../../components/gpt";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CustomAlert from "../../components/modal/CustomAlert"; // 페이지 이동을 위한 훅

export default function EditAi() {
    const [data, setData] = useState(null); // 현재 선택된 데이터
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [history, setHistory] = useState([]); // 히스토리 저장
    const [retryCount, setRetryCount] = useState(0); // 재시도 횟수 저장
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const { bookId } = useParams(); //URL에서 book_Id를 가져옴

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (title) => {
        setAlertTitle(title)
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };

    // 데이터 유효성 검증 함수
    const isValidData = (jsonData) => {
        return (
            jsonData &&
            jsonData.sectionTitle &&
            jsonData.sectionDescription &&
            Array.isArray(jsonData.questions) &&
            jsonData.questions.length > 0
        );
    };

    const handleClickAPICall = async () => {
        try {
            setIsLoading(true);
            const jsonData = await CallGpt({
                prompt: userInput,
            });

            // 데이터 유효성 검증
            if (isValidData(jsonData)) {
                setData(jsonData);
                setHistory((prevHistory) => [...prevHistory, { prompt: userInput, result: jsonData }]); // 히스토리에 추가
                console.log(jsonData);
            } else {
                // 데이터가 유효하지 않으면 재시도
                if (retryCount < 3) { // 재시도 횟수 제한 설정 (예: 3회)
                    setRetryCount(retryCount + 1);
                    handleClickAPICall().then(r => openAlert("다시 시도하고 있습니다. 조금만 더 기다려주세요.")); // 재시도
                } else {
                    console.error("재시도 횟수를 초과했습니다.");
                    openAlert("데이터를 불러오지 못했습니다. 다시 시도해 주세요.");
                    setRetryCount(0); // 재시도 횟수 초기화
                }
            }
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            openAlert("API 호출 중 오류가 발생했습니다. 다시 시도해 주세요."); // 에러 발생 시 사용자에게 메시지 표시
        } finally {
            setIsLoading(false);
        }
    };

    const handleHistoryClick = (selectedData) => {
        setData(selectedData.result); // 선택한 히스토리의 결과를 현재 데이터로 설정
    };

    const handleEditClick = () => {
        navigate(`/book/edit/` + bookId, { state: { data } }); // 데이터와 함께 edit 페이지로 이동
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <nav className="flex items-center space-x-4 justify-end w-full">
                    <Button variant={"contained"} onClick={handleEditClick}>
                        에디터로 편집하기
                    </Button>
                </nav>
            </header>
            <main className="flex flex-1 p-4">
                <aside className="w-1/4 p-4 border-r space-y-2">
                    <Button variant={"outlined"} fullWidth onClick={() => setHistory([])}>
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

            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </div>
    );
}
