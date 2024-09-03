import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


export default function QuestionPreview() {
    // 데이터 관련 변수
    const {bookId} = useParams(); //URL에서 book_Id를 가져옴
    const [bookData, setBookData] = useState(''); // 책 데이터를 저장할 상태 추가
    const [sections, setSections] = useState([]);

    const [questions, setQuestions] = useState([]);
    const [targetTotal, setTargetTotal] = useState(100);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                        console.log("북북", res.data.book)
                        console.log("북북22", res.data.book.user)
                        setSections(res.data.sections);
                    });
                axios.get(`/book/questionpreview/${bookId}`)
                    .then((res)=>{
                        setQuestions(res.data);
                    });

                setLoading(false); // 모든 데이터를 성공적으로 가져온 후 로딩 상태를 false로 변경
            } catch (error) {
                console.error("Error fetching book, section data:", error);
                setLoading(false); // 에러 발생 시 로딩을 종료하고 콘솔에 에러 출력
            }
        };

        fetchData(); // 데이터를 가져오는 함수 호출
    }, [bookId]);

    const handleScoreInput = (index, newScore) => {
        const updatedQuestions = [...questions];
        const parsedScore = parseFloat(newScore) || 0.0;

        updatedQuestions[index].questionPoint = parsedScore; // questionPoint를 업데이트
        const currentTotal = updatedQuestions.reduce((acc, curr) => acc + curr.questionPoint, 0); // 총합 계산

        if (currentTotal <= targetTotal) {
            setQuestions(updatedQuestions); // 상태 업데이트
        } else {
            openAlert("총 점수가 목표 점수를 초과할 수 없습니다.");
        }
    };

    const totalScore = questions.reduce((acc, curr) => acc + curr.questionPoint, 0);
    const isTotalEqual = totalScore.toFixed(1) === targetTotal.toFixed(1);

    const handleSubmit = () => {
        // questionPoint가 0인 질문이 있는지 확인
        if (questions.some((question) => question.questionPoint === 0)) {
            openAlert("모든 문제에 대해 배점을 해야 합니다. 0점인 문제가 있습니다.");
        } else {
            openAlert("모든 문제에 대해 배점이 완료되었습니다. 제출을 진행합니다.");
        }
    };

    /** 모달 관련 함수 */
    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (alertTitle) => {
        setAlertTitle(alertTitle);
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
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
                    <Typography variant="h6">{bookData.user.userNickname}</Typography>
                    <Typography variant="h6">
                        총 {questions.length} 문항 | 총 {bookData.bookTotalscore} 점
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary">
                        출제하기
                    </Button>
                </div>
                <div className="flex items-center bg-white rounded shadow-lg">
                    {/* 문항번호와 배점 */}
                    <div className="flex flex-col items-center space-y-2 justify-center bg-blue-50">
                        <div className="font-semibold whitespace-nowrap p-2">
                            문항번호
                        </div>
                        <div className="font-semibold whitespace-nowrap p-2">배점</div>
                    </div>

                    {/* 문항번호 및 배점 입력 필드들 */}
                    <Swiper
                        slidesPerView={10}
                        spaceBetween={30}
                        centeredSlides={true}
                        className="mySwiper">
                        {questions.map((question, index) => (
                            <SwiperSlide>
                                <div key={index} className="flex flex-col items-center space-y-2 space-x-4">
                                    <div className="font-medium">{`${index + 1}번`}</div>
                                    <div className="min-w-max">
                                        <TextField
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={question.questionPoint}
                                            onChange={(e) => handleScoreInput(index, e.target.value)}
                                            size="small"
                                            variant="standard"
                                            inputProps={{className: "text-center"}}
                                            className="w-12"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* 현재 배점 합계 */}
                    <div className="flex flex-col items-center space-y-2 justify-center bg-blue-50">
                        <div className="font-semibold whitespace-nowrap p-2">현재 배점 합계</div>
                        <div
                            className={`${isTotalEqual ? 'text-blue-500' : 'text-red-500'} font-bold whitespace-nowrap p-2`}>
                            {totalScore.toFixed(1)}점
                        </div>
                    </div>

                    {/* 총점 */}
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


            {/*alert*/}
            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </div>
    );
}
