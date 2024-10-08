import { CallGpt } from "../../components/gpt";
import React, {useEffect, useState} from "react";
import { Button, TextField } from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import CustomAlert from "../../components/modal/CustomAlert";
import axios from "axios";
import LoadingModal from "../../components/modal/LoadingModal"; // 페이지 이동을 위한 훅

export default function EditAi() {
    const [aiData, setAiData] = useState(null); // 현재 선택된 데이터
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [history, setHistory] = useState([]); // 히스토리 저장
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const { bookId } = useParams(); //URL에서 book_Id를 가져옴
    const [loadingVisible, setLoadingVisible] = useState(false);


    // 데이터 관련 변수
    const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가

    // 로딩 상태
    const [loading, setLoading] = useState(true);

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");


    // bookId에 해당하는 책 데이터를 가져옴
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`/book/edit/${bookId}`)
                    .then((res)=>{
                        setBookData(res.data.book);
                    });
                setLoading(false); // 모든 데이터를 성공적으로 가져온 후 로딩 상태를 false로 변경
            } catch (error) {
                console.error("Error fetching book, section data:", error);
                setLoading(false); // 에러 발생 시 로딩을 종료하고 콘솔에 에러 출력
            }
        };

        fetchData() // 데이터를 가져오는 함수 호출


    }, [bookId]);

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
            setLoadingVisible(true);
            const jsonData = await CallGpt({
                prompt: userInput,
            });

            // 데이터 유효성 검증
            if (isValidData(jsonData)) {
                setAiData(jsonData);
                setHistory((prevHistory) => [...prevHistory, { prompt: userInput, result: jsonData }]); // 히스토리에 추가
                console.log(jsonData);
            } else {
                console.log(jsonData);
                openAlert("데이터를 불러오지 못했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
            openAlert("API 호출 중 오류가 발생했습니다. 다시 시도해 주세요."); // 에러 발생 시 사용자에게 메시지 표시
        } finally {
            setLoadingVisible(false);
        }
    };

    const handleHistoryClick = (selectedData) => {
        setAiData(selectedData.result); // 선택한 히스토리의 결과를 현재 데이터로 설정
    };

    const handleEditClick = () => {

        const combinedData = {
            ...aiData,       // AI 문제 관련 데이터
            book: bookData
        };

        console.log("combinedData", combinedData);

        axios({
            method: 'post',
            url: '/book/edit/ai/save',
            data: combinedData
        }).then(res => {
            navigate(`/book/edit/` + bookId); // 데이터와 함께 edit 페이지로 이동
            console.log("AI 데이터가 성공적으로 저장되었습니다");
        }).catch(err => {
            console.error("AI 데이터 저장 중 오류가 발생했습니다:", err);
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <nav className="flex items-center space-x-4 justify-end w-full">
                    <Button variant={"outlined"}>
                        <Link to={"/book/edit"+bookId}>에디터로 돌아가기</Link>
                    </Button>
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
                                <Button
                                    fullWidth
                                    onClick={() => handleHistoryClick(item)}>
                                    {item.prompt} ...
                                </Button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <section className="flex-1 p-4">
                    <div className="p-4 border rounded-lg shadow-md bg-white">
                        <LoadingModal
                            open={loadingVisible}
                            title="AI 문제 생성중입니다. 잠시만 기다려주세요."
                        />
                        {loadingVisible ? (
                            <p>로딩 중...</p>
                        ) : aiData ? (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">{aiData.sectionTitle}</h2>
                                <p className="mb-4">{aiData.sectionDescription}</p>

                                {aiData.questions && aiData.questions.map((question, index) => (
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
