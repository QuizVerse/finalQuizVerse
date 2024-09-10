import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ReactDOM from "react-dom";
import LoadingModal from "../../components/modal/LoadingModal";
import axios from "axios";

export default function ScorePreview() {
    const navigate = useNavigate();
    const printpdfRef = useRef(null);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [bookData, setBookData] = useState({
        correctAnswersCount: 0,     // 맞힌 문제 수
        totalQuestions: 0,          // 전체 문제 수
        backscore: 0,               // 백분율점수
        startDay: '',               // 시험 응시 날짜
        userpoint: 0,               // 사용자의 점수 (문제 배점들의 합)
        questionIds: [],            // 사용자가 푼 문제의 questionId 리스트
        bookTotalscore: 0,          // 문제집 총점
    });    const [questions, setQuestions] = useState([]);
    const { bookId, solvedbookId } = useParams();
    const [userScore,setUserScore] = useState(0);
    const { search } = useLocation();
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const queryParmas=new URLSearchParams(search);
    const wrongRepeat=queryParmas.get("wrongRepeat");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 성적 정보
                const scoreResponse = await axios.get(`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`);
                console.log(scoreResponse.data);
                setBookData(scoreResponse.data);

                const userScoreResponse = await axios.get(`/book/score/userpoint/${solvedbookId}`);
                console.log(userScoreResponse.data);
                setUserScore(userScoreResponse.data);

                // 사용자 정보
                const userResponse = () => {
                    axios.get(`/book/username`).then((res) => {
                        //닉네임 불러오기
                        setUsername(res.data.userNickname);
                        //프로필 사진불러오기
                        // setUserphoto(res.data.userImage);
                    });
                };

                //문제집 정보
                const bookResponse = await axios.get(`/book/score/${bookId}`);
                setBookData(prevState => ({
                    ...prevState,
                    ...bookResponse.data
                }));

                console.log(bookResponse.data);
                console.log(bookData.bookTotalscore);
                userResponse();

            } catch (error) {
                console.log("Error : ", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchQuestions = async () => {
            try {
                const answersResponse = await axios.get(`/book/score/answers/${solvedbookId}/${wrongRepeat}`);
                setQuestions(answersResponse.data);

                console.log("setQuestion 업데이트 : " , answersResponse.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchData();
        fetchQuestions();
    }, [bookId, solvedbookId]);

    if (!bookData) {
        return <div>No data found</div>; // 데이터가 없을 때 표시
    }
    const downloadpdf = async () => {
            setLoadingVisible(true);

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const margin = 5;
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // 문제를 80개씩 나누어서 각 페이지에 렌더링
            const chunks = Array.from(
                { length: Math.ceil(questions.length / 80) },
                (_, i) => questions.slice(i * 80, i * 80 + 80)
            );

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                const container = document.createElement("div");
                container.style.position = "absolute";
                container.style.top = "-10000px";
                container.style.left = "-10000px";
                container.style.width = `${pdfWidth}mm`;
                document.body.appendChild(container);

                const startNumber = i * 80 + 1;

                ReactDOM.render(
                    <PdfPage
                        answers={chunk}
                        username={username}
                        bookData={bookData}
                        startNumber={startNumber}
                    />,
                    container
                );

                const canvas = await html2canvas(container, {
                    scale: 2,
                    useCORS: true,
                });

                const imgData = canvas.toDataURL("image/png");
                let imgWidth = pdfWidth - 2 * margin;
                let imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (imgHeight > pdfHeight - 2 * margin) {
                    const scalingFactor = (pdfHeight - 2 * margin) / imgHeight;
                    imgWidth *= scalingFactor;
                    imgHeight = pdfHeight - 2 * margin;
                }

                imgWidth *= 0.95;
                imgHeight *= 0.95;

                const x = (pdfWidth - imgWidth) / 2;

                if (i > 0) {
                    pdf.addPage();
                }

                pdf.addImage(imgData, "PNG", x, margin, imgWidth, imgHeight);
                pdf.setFontSize(10);
                pdf.text(
                    `${i + 1} / ${chunks.length}`,
                    pdfWidth / 2,
                    pdfHeight - margin,
                    {
                        align: "center",
                    }
                );

                ReactDOM.unmountComponentAtNode(container);
                document.body.removeChild(container);
            }

            pdf.save("성적표.pdf");
            setLoadingVisible(false);
        };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-end space-x-2 mb-4">
                <Button variant="outlined" onClick={() => navigate(`/book/score/${bookId}/${solvedbookId}`)}>
                    성적표로 돌아가기
                </Button>
                <Button variant="outlined" onClick={downloadpdf}>
                    PDF로 출력
                </Button>
                <Button variant="contained" onClick={() => navigate("/book")}>
                    메인으로
                </Button>
            </div>
            <section className="flex flex-col gap-2" ref={printpdfRef}>
                <PdfPage answers={questions} username={username} bookData={bookData} startNumber={1} />
            </section>
            <LoadingModal
                open={loadingVisible}
                title="PDF 생성중입니다. 잠시만 기다려주세요."
            />
        </div>
    );
}

const PdfPage = React.forwardRef(
    ({ answers, username, bookData, startNumber, userScore }, ref) => (
                <table className="min-w-full">
                    <thead>
                    <tr>
                        <th
                            rowSpan="3"
                            className="text-2xl font-bold border border-gray-300 py-6 text-center"
                        >
                            {bookData.bookTitle || "No title"}
                        </th>
                    </tr>
                    <tr>
                        <th className="text-base font-semibold border border-gray-300 py-2 text-center">
                            제출일시
                        </th>
                        <td className="text-base border border-gray-300 text-center">
                            {new Date().toISOString().split('T')[0]}
                        </td>
                    </tr>
                    <tr>
                        <th className="text-base font-semibold border border-gray-300 py-2 text-center">
                            응시자
                        </th>
                        <td className="text-base border border-gray-300 text-center">
                            {username || "no info"}
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">성적</h2>
                <table className="min-w-full p-4 border-2 border-gray-300">
                    <tbody>
                    <tr>
                        <td className="w-1/4 font-semibold text-lg bg-gray-100 py-3 border border-gray-300 text-center">
                            나의 점수
                        </td>
                        <td
                            className="w-1/4 text-lg pr-5 border border-gray-300 text-end"
                            colSpan={3}
                        >
                            {userScore}/ {bookData.bookTotalscore || 0}점
                        </td>
                    </tr>
                    <tr>
                        <td className="w-1/4 font-semibold text-lg py-3 bg-gray-100 border border-gray-300 text-center">
                            백분율 환산 점수
                        </td>
                        <td
                            className="w-1/4 text -lg pr-5 border border-gray-300 text-end"
                            colSpan={3}
                        >
                            {bookData.backscore}점
                        </td>
                    </tr>
                    <tr>
                        <td className="w-1/4 font-semibold text-lg py-3 bg-gray-100 border border-gray-300 text-center">
                            정답 문항 수
                        </td>
                        <td className="w-1/4 text-lg pr-5 border border-gray-300 text-end">
                            {bookData.correctAnswersCount || 0} / {bookData.totalQuestions || 0}개
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">문제 풀이 결과</h2>
                <table className="min-w-full p-4 border-2 border-gray-300">
                    {/*<thead>*/}
                    {/*<tr>*/}
                        {/*<th className="w-1/4 text-lg font-semibold border border-gray-300 text-center">문제 번호</th>*/}
                        {/*<th className="w-1/4 text-lg font-semibold border border-gray-300 text-center">배점</th>*/}
                        {/*<th className="w-1/2 text-lg font-semibold border border-gray-300 text-center">정답 여부</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <tbody>
                    {answers.map((answer, index) => (
                        <tr key={index}>
                            <td className="text-center border border-gray-300 py-2">
                                {startNumber + index}
                            </td>
                            <td className="text-center border border-gray-300 py-2">
                                {answer.questionPoint}
                            </td>
                            <td className="text-center border border-gray-300 py-2">
                                {answer.answerCorrect ? (
                                    <CheckIcon color="success" />
                                ) : (
                                    <ClearIcon color="error" />
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
);
