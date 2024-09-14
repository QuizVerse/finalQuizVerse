import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import axios from "axios";
import Review from "../../components/modal/Review";
import TestSection from "../../components/test/TestSection";

export default function ParentComponent() {
  const [confirmVisible, setConfirmVisible] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();
  const { bookId, solvedbookId } = useParams(); // URL에서 파라미터 가져오기
  const [bookData, setBookData] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // 제출할 답안 관리
  const [answerOrderCount, setAnswerOrderCount] = useState(1); // 답안 순서 관리
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const wrongRepeat = queryParams.get("wrongRepeat"); // 오답 문제인지 여부

  const [timeElapsed, setTimeElapsed] = useState(0); // 경과 시간을 저장하는 상태
  const [timerPaused, setTimerPaused] = useState(false); // 타이머 일시정지 상태
  const [totalTime, setTotalTime] = useState(0); // 남은 시간을 저장하는 상태

  // 새로고침 경고 추가
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome에서는 returnValue를 설정해야 경고창이 나타남
    };

    // 페이지 떠날 때 경고 표시
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 데이터 및 bookTimer 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bookRes = await axios.get(`/book/edit/${bookId}`);
        setBookData(bookRes.data.book);
        setSections(bookRes.data.sections);

        // bookTimer를 가져와서 초 단위로 변환 후 타이머 설정
        if (bookRes.data.book.bookTimer) {
          const bookTimerInMinutes = bookRes.data.book.bookTimer; // 타이머를 분 단위로 가져옴
          const bookTimerInSeconds = bookTimerInMinutes * 60; // 분을 초로 변환
          setTotalTime(bookTimerInSeconds); // 남은 시간을 초 단위로 설정
          setTimeElapsed(bookTimerInSeconds); // 타이머 초기 설정
          console.log(bookTimerInMinutes, bookTimerInSeconds);

        }



        // 질문 가져오기
        const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
        setQuestions(questionsRes.data);

        if (wrongRepeat > 0) {
          const wrongQuestionsRes = await axios.get(`http://localhost:9002/book/test/wrong`, {
            params: { solvedbookId, wrongRepeat },
          });
          setQuestions(wrongQuestionsRes.data);
        }

      } catch (error) {
        console.error("데이터를 가져오는 도중 문제가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, wrongRepeat, solvedbookId]);

  // 타이머: bookTimerInSeconds 값으로 시작해서 감소
  useEffect(() => {
    if (!timerPaused && timeElapsed > 0) {
      const timer = setInterval(() => {
        setTimeElapsed((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(timer); // 시간이 0이 되면 타이머 멈춤
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerPaused, timeElapsed]);

  // 답안 제출 함수
  const submitAnswers = async () => {
    console.log("답안 제출 중. answers:", answers); // 제출할 답안 확인

    const formattedAnswers = answers.map((answer) => {
      const answerData = {
        solvedbook: { solvedbookId: solvedbookId },
        question: { questionId: answer.questionId },
        answerOrder: answer.answerOrder,
      };

      // 객관식 문제 처리
      if (Array.isArray(answer.answer)) {
        answerData.choices = answer.answer.map((choice) => ({
          choiceId: choice.choiceId,
        }));
      } else if (typeof answer.answer === "string") {
        // 주관식 문제 처리
        answerData.subjectiveAnswer = answer.answer || null;
      }

      return answerData;
    });

    try {
      const response = await axios.post(`/book/save/answers?wrongRepeat=${wrongRepeat}`, formattedAnswers);
      console.log("답안 제출 성공", response.data);

      // 제출 후 시험 상태 업데이트
      await axios.post(`/book/submit/${solvedbookId}`);
      console.log("시험 제출 상태 업데이트 성공");
      // 답안 제출 후 로컬 스토리지에서 저장된 답변 삭제
      answers.forEach((answer) => {
        localStorage.removeItem(`answer_${answer.questionId}`);
      });

      // 답안 제출 후 모달을 띄움
      setConfirmVisible(true);

      // 답안 제출 후 모달을 띄움
      setConfirmVisible(true);
    } catch (error) {
      console.error("답안 제출 중 오류:", error);
    }
  };

  // 임시 저장 시 타이머 멈추게 하기
  const handleTemporarySave = () => {
    navigate('/');
  };

  // 시험 종료 버튼을 클릭했을 때 답안 제출 후 모달 표시
  const handleSubmitAndShowModal = async () => {
    await submitAnswers(); // 답안을 먼저 제출한 후 모달을 띄움
  };

  // 모달 내 제출 버튼 클릭 시 호출
  const submitbtn = async () => {
    setConfirmVisible(false); // 모달 닫기
    navigate(`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`); // 결과 페이지로 이동
  };

  // 모달 내 통과 버튼 클릭 시 호출
  const passbtn = () => {
    setConfirmVisible(false); // 모달 닫기
    navigate(`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`); // 결과 페이지로 이동
  };

  // TestSection에서 답안을 전달받아 업데이트
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((a) => a.questionId === questionId);
      const newAnswerOrder = answerOrderCount;
      setAnswerOrderCount(answerOrderCount + 1);

      if (Array.isArray(answer)) {
        const choices = answer.map((choice) => ({
          choiceId: choice.choiceId,
        }));

        if (existingAnswer) {
          return prevAnswers.map((a) =>
              a.questionId === questionId ? { ...a, answer: choices, answerOrder: newAnswerOrder } : a
          );
        } else {
          return [...prevAnswers, { questionId, answer: choices, answerOrder: newAnswerOrder }];
        }
      }

      if (typeof answer === "string") {
        if (existingAnswer) {
          return prevAnswers.map((a) =>
              a.questionId === questionId ? { ...a, answer, answerOrder: newAnswerOrder } : a
          );
        } else {
          return [...prevAnswers, { questionId, answer, answerOrder: newAnswerOrder }];
        }
      }

      return prevAnswers;
    });
  };

  // 경과 시간을 분:초로 변환하여 표시하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
      <div className={"space-y-8"}>
        <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <DensityMediumOutlinedIcon />
            <span className="text-lg font-semibold">
            {bookData?.bookTitle} | 출제자: {bookData?.user ? bookData.user.userNickname : "로드 중..."}
          </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">{questions.length}문항 | {sections.length} 섹션</span>
            {bookData?.bookTimer && bookData.bookTimer > 0 ? (
                <span className="text-lg">타이머: {formatTime(timeElapsed)}</span>
            ) : (
                <span className="text-lg">시간 제한 없음</span>
            )}
            <Button variant="outlined" onClick={handleTemporarySave}>
              임시 저장
            </Button>
            <Button variant="contained" onClick={handleSubmitAndShowModal}>
              시험종료
            </Button>
          </div>
        </header>

        <div className="space-y-4">
          {sections.map((section, index) => (
              <TestSection
                  key={index}
                  index={index}
                  sectionCount={sections.length}
                  section={section}
                  book={bookData}
                  loading={loading}
                  setLoading={setLoading}
                  onAnswerChange={handleAnswerChange}
              />
          ))}
        </div>

        {/* 리뷰 모달 */}
        <Review
            confirmVisible={confirmVisible}
            clickBtn1={passbtn} // 통과 버튼 클릭 시
            clickBtn2={submitbtn} // 제출 버튼 클릭 시
            bookId={bookId}
        />
      </div>
  );
}
