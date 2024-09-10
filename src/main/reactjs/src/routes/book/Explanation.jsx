import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import { Button } from "@mui/material";
import { CircularProgress, Alert } from "@mui/material";
import ExplanationSection from "../../components/explanation/ExplanationSection";


export default function Explanation() {
  const navigate = useNavigate();
  const { bookId } = useParams(); // URL 파라미터로부터 bookId를 가져옴

  // 상태 관리
  const [bookData, setBookData] = useState(null); // 책 데이터를 저장
  const [questions, setQuestions] = useState([]); // 질문 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [sections, setSections] = useState([]);

  // 사용자 선택 답안 및 정답 확인 상태
  const [userAnswers, setUserAnswers] = useState({}); // 예시로 사용자 선택 답안을 저장

  // 버튼의 show/hide 상태
  const [showAnswer, setShowAnswer] = useState({
    myanswer: false,
    answer: false,
  });

  // 버튼 눌렀을 때 답안 show 상태
  const showContent = (btn) => {
    setShowAnswer((prevState) => ({
      ...prevState,
      [btn]: !prevState[btn],
    }));
  };

  // useEffect로 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`/book/edit/${bookId}`);
        const bookData = bookRes.data.book;
        setSections(bookRes.data.sections || []); // 섹션 데이터가 없을 때 빈 배열로 초기화
        setBookData(bookData);

        const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
        const loadedQuestions = questionsRes.data.map((question) => ({
          ...question,
          questionPoint: question.questionPoint || 0,
        }));

        setQuestions(loadedQuestions || []); // 질문 목록이 없을 때 빈 배열로 초기화
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("데이터를 가져오는 도중 문제가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  if (loading) {
    return (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex justify-center mt-4">
          <Alert severity="error">{error}</Alert>
        </div>
    );
  }

  // 선택지가 클릭되었을 때 사용자 답변 저장
  const handleChoiceSelect = (questionId, choiceId) => {
    setUserAnswers((prevState) => ({
      ...prevState,
      [questionId]: choiceId,
    }));
  };



  return (
      <div className="w-full mx-auto p-4">
        {/* 헤더 */}
        <header className="flex items-center justify-between p-4 bg-gray-200 pr-4">
          <div className="flex items-center space-x-4">
            <KeyboardArrowLeftIcon fontSize="large" onClick={() => navigate("/book/score")}/>
            <div className="flex items-center gap-2 pr-4">
              {bookData?.bookTitle || "책 제목 로드 중..."}
              <span>출제자: {bookData?.user?.userNickname || "로드 중..."}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
    <span>
      <MenuBookIcon/>
      {questions.length} 문항
    </span>
            <span>
      <CheckCircleOutlineIcon/>
              {"내 점수로 고쳐야댐"}점
    </span>
          </div>
        </header>
        {/* 섹션별 문제 표시 */}
        <main>
          <section className="mb-8">
            <div className="space-y-4">
              {sections.length > 0 && sections.map((section, index) => (
                  <ExplanationSection
                      key={index}
                      index={index}
                      sectionCount={sections.length}
                      section={section}
                      setLoading={setLoading} // 로딩 상태 전달
                  />
              ))}
            </div>
          </section>
        </main>

        {/* 문제 해설 */}
        <main>
          <section className="mb-8">
            <div className="container mx-auto px-4 mt-8 mb-4">
              {questions.length > 0 && questions.map((question, index) => (
                  <div key={index} className="p-4 mb-4 rounded-lg shadow-sm">
                    <div className="flex flex-col space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        {question.correct ? (
                            <PanoramaFishEyeOutlinedIcon
                                color="success"
                                fontSize="large"
                            />
                        ) : (
                            <CloseOutlinedIcon color="warning" fontSize="large" />
                        )}

                        <p className="font-bold text-lg">{question.Number}</p>
                        <p className="font-bold text-lg">{question.que}</p>
                      </div>
                    </div>

                    {/* 선택지 표시 */}
                    <div className="choices">
                      {question.choices &&
                          question.choices.length > 0 &&
                          question.choices.map((choice, choiceIndex) => {
                            const isCorrectAnswer = choice.choiceIsanswer;
                            const userSelected = userAnswers[question.questionId] === choice.choiceId;

                            return (
                                <div
                                    key={choiceIndex}
                                    style={{
                                      color: isCorrectAnswer ? "blue" : userSelected ? "red" : "black",
                                      fontWeight: isCorrectAnswer || userSelected ? "bold" : "normal",
                                    }}
                                >
                                  {choice.choiceText || <img src={choice.choiceImage} alt="choice"/>}
                                </div>
                            );
                          })}
                    </div>


                    <p className="text-lg">{question.content}</p>
                    <img src="./image/E.jpg" alt="explanation-example"/>

                    <div className="flex flex-col space-y-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Button
                            variant="outlined"
                            className="w-24"
                            onClick={() => showContent("myanswer")}
                        >
                          나의 답안
                        </Button>
                        {showAnswer.myanswer && <div className="pl-4"> 3 </div>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                            variant="contained"
                            className="w-24"
                            onClick={() => showContent("answer")}
                        >
                          정답
                        </Button>
                        {showAnswer.answer && <div className="pl-4">5 </div>}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-bold py-3">해설</h3>
                      <textarea
                          className="flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full min-h-[100px]"
                          placeholder="해설내용"
                      ></textarea>
                    </div>
                  </div>
              ))}
            </div>
          </section>
        </main>
      </div>
  );
}