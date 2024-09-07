import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {
    Typography,
    Button,
    TextField,
    Box,
    CircularProgress,
    Alert
} from "@mui/material";
import CustomAlert from "../../components/modal/CustomAlert";
import PreviewSection from "../../components/questionPreview/PreviewSection";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function QuestionPreview() {
    const {bookId} = useParams();
    const [bookData, setBookData] = useState({});
    const [sections, setSections] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [targetTotal, setTargetTotal] = useState(100);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    // 추가: isChecked와 totalPoints 상태 정의
    const [isChecked, setIsChecked] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);

    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookRes = await axios.get(`/book/edit/${bookId}`);
                const bookData = bookRes.data.book;
                setBookData(bookData);
                setSections(bookRes.data.sections);
                setTotalPoints(bookData.bookTotalscore);
                // isChecked 설정: bookDivide 값에 따라 설정
                setIsChecked(bookData.bookDivide === 1);
                setTotalPoints(bookData.bookTotalscore || 100); // 기본값 100 설정

                const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
                const loadedQuestions = questionsRes.data.map(question => ({
                    ...question,
                    questionPoint: question.questionPoint || 0
                }));
                setQuestions(loadedQuestions);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("데이터를 가져오는 도중 문제가 발생했습니다.");
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId]);

    const handleScoreInput = (index, newScore) => {
        const updatedQuestions = [...questions];
        const parsedScore = newScore === "" ? "" : parseFloat(newScore) || 0.0;
        updatedQuestions[index].questionPoint = parsedScore === "" ? "" : parsedScore;

        const currentTotal = updatedQuestions.reduce((acc, curr) => acc + (curr.questionPoint || 0), 0);

        if (currentTotal > targetTotal) {
            const excess = currentTotal - targetTotal;
            updatedQuestions[index].questionPoint = Math.round((parsedScore - excess) * 10) / 10;
            openAlert(`총 점수가 목표 점수를 초과했습니다. 현재 문항의 배점이 ${targetTotal}점에 맞춰 조정되었습니다.`);
        } else {
            updatedQuestions[index].questionPoint = Math.round(parsedScore * 10) / 10;
        }

        setQuestions(updatedQuestions);
    };

    const totalScore = questions.reduce((acc, curr) => acc + (curr.questionPoint || 0), 0);
    const isTotalEqual = totalScore.toFixed(1) === targetTotal.toFixed(1);

    const handleSubmit = async () => {
        if (isChecked) {
            const totalQuestions = questions.length;
            const totalScore = parseInt(totalPoints, 10) || 0;
            const evenScore = Math.round((totalScore / totalQuestions) * 10) / 10;
            const updatedQuestions = questions.map((question) => ({
                ...question,
                questionPoint: evenScore
            }));

            setQuestions(updatedQuestions);
        }

        const sanitizedQuestions = questions.map(({ questionId, questionPoint }) => ({
            questionId,
            questionPoint,
        }));

        if (sanitizedQuestions.some((question) => question.questionPoint === 0 || question.questionPoint === "")) {
            openAlert("모든 문제에 대해 배점을 해야 합니다. 0점 또는 빈 점수가 있는 문제가 있습니다.");
        } else {
            try {
                // questions를 배열로 보내야 함
                const response = await axios.post(`/book/question/saveScore/${bookId}`, sanitizedQuestions);

                if (response.status === 200) {
                    openAlert("배점이 성공적으로 저장되었습니다.");
                    navigate("/");  // 저장 성공 후 메인 페이지로 이동
                } else {
                    openAlert("배점 저장에 실패했습니다.");
                }
            } catch (error) {
                console.error("Error saving scores:", error);
                openAlert("배점을 저장하는 도중 문제가 발생했습니다.");
            }
        }
    };

    const openAlert = (alertTitle) => {
        setAlertTitle(alertTitle);
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <div className={"space-y-8"}>
            <div className={"flex justify-center"}>
                <Typography variant="h5" mb={2}>문제 미리보기</Typography>
            </div>
            <div className={'sticky top-0 space-y-8 bg-white z-50'}>
                <div className={"flex justify-between p-4"}>
                    <Typography variant="h6">{bookData.user ? bookData.user.userNickname : "로드 중..."}</Typography>
                    <Typography variant="h6">
                        총 {questions.length} 문항 | 총 {bookData.bookTotalscore} 점
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary">
                        출제하기
                    </Button>
                    <Button onClick={()=>navigate(`/book/questionpreviewPDF/${bookId}`)}>미리보기</Button>
                </div>
                <div className="flex items-center bg-white rounded shadow-lg">
                    <div className="flex flex-col items-center space-y-2 justify-center bg-blue-50">
                        <div className="font-semibold whitespace-nowrap p-2">
                            문항번호
                        </div>
                        <div className="font-semibold whitespace-nowrap p-2">배점</div>
                    </div>

                    <Swiper
                        slidesPerView={10}
                        spaceBetween={30}
                        centeredSlides={true}
                        className="mySwiper"
                        virtual={false}
                        watchSlidesProgress={true}
                    >
                        {questions.map((question, index) => (
                            <SwiperSlide key={index} style={{ overflow: 'visible' }}>
                                <div className="flex flex-col items-center space-y-2 space-x-4">
                                    <div className="font-medium whitespace-nowrap p-2">{`${index + 1}번`}</div>
                                    <div className="min-w-max whitespace-nowrap p-2">
                                        <TextField
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={question.questionPoint}
                                            onChange={(e) => handleScoreInput(index, e.target.value)}
                                            size="small"
                                            variant="standard"
                                            inputProps={{
                                                step: 0.1,
                                                min: 0,
                                                className: "text-center"
                                            }}
                                            className="w-12"
                                            style={{ zIndex: 1 }}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex flex-col items-center space-y-2 justify-center bg-blue-50">
                        <div className="font-semibold whitespace-nowrap p-2">현재 배점 합계</div>
                        <div
                            className={`${isTotalEqual ? 'text-blue-500' : 'text-red-500'} font-bold whitespace-nowrap p-2`}>
                            {totalScore.toFixed(1)}점
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2 justify-center bg-blue-50">
                        <div className="font-semibold whitespace-nowrap p-2">총점</div>
                        <div className="text-blue-500 font-bold whitespace-nowrap p-2">
                            {bookData.bookTotalscore}점
                        </div>
                    </div>
                </div>

            </div>

            <div className="space-y-4">
                {sections && sections.map((section, index) => (
                    <PreviewSection
                        key={index}
                        index={index}
                        sectionCount={sections.length}
                        section={section}
                        book={bookData}
                        loading={loading}
                        setLoading={setLoading}
                    />
                ))}
            </div>

            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </div>
    );
}


