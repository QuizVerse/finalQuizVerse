import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import axios from "axios";
import Review from "../../components/modal/Review";
import TestSection from "../../components/test/TestSection";

export default function ParentComponent() {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const navigate = useNavigate();
  const { bookId, solvedbookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerOrderCount, setAnswerOrderCount] = useState(1);
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const wrongRepeat = queryParams.get("wrongRepeat");

  const [timeLeft, setTimeLeft] = useState(null); // 남은 시간을 저장하는 상태

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`/book/edit/${bookId}`);
        setBookData(bookRes.data.book);
        setSections(bookRes.data.sections);

        // 서버에서 받은 bookTimer (분 단위) 값을 초로 변환해서 저장
        setTimeLeft(bookRes.data.book.bookTimer * 60);

        // 틀린 문제만 가져오기 (wrongRepeat이 있을 경우)
        if (wrongRepeat && wrongRepeat > 0) {
          try {
            const wrongQuestionsRes = await axios.get(`http://localhost:9002/book/test/wrong`, {
              params: { solvedbookId, wrongRepeat }
            });
            setQuestions(wrongQuestionsRes.data); // 틀린 문제들만 저장
          } catch (error) {
            console.error("오답 문제 요청 중 오류:", error);
          }
        } else {
          // 모든 문제 가져오기
          const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
          setQuestions(questionsRes.data); // 전체 문제를 저장
        }

        setLoading(false);
      } catch (error) {
        setError("데이터를 가져오는 도중 문제가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, wrongRepeat, solvedbookId]);

  // 타이머를 관리하는 useEffect
  useEffect(() => {
    if (timeLeft === 0) {
      handleAutoSubmit(); // 시간이 다 되면 자동 제출하는 함수 호출
    }

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1); // 1초씩 감소
      }, 1000);

      return () => clearInterval(timer); // 메모리 누수를 방지하기 위해 타이머 정리
    }
  }, [timeLeft]);

  // 임시 저장 버튼을 눌렀을 때 처리
  const handleTemporarySave = async () => {
    console.log("임시 저장 중. answers:", answers);

    const formattedAnswers = answers.map((answer) => {
      const answerData = {
        solvedbook: { solvedbookId: solvedbookId },
        question: { questionId: answer.questionId },
        answerOrder: answer.answerOrder,
      };

      if (Array.isArray(answer.answer)) {
        answerData.choices = answer.answer.map((choice) => ({
          choiceId: choice.choiceId,
        }));
      } else if (typeof answer.answer === "string") {
        answerData.subjectiveAnswer = answer.answer || null;
      }

      return answerData;
    });

    const saveData = {
      answers: formattedAnswers,
      timeLeft: timeLeft, // 남은 시간도 함께 전송
    };

    console.log("전송할 데이터:", saveData); // 데이터가 올바르게 구성되었는지 확인

    try {
      const response = await axios.post(`/book/save/temporary`, saveData);
      console.log("임시 저장 성공", response.data);
    } catch (error) {
      console.error("임시 저장 중 오류:", error.response?.data);
    }
  };

  const openConfirm = async () => {
    console.log("answers:", answers); // 전송될 데이터 확인

    const formattedAnswers = answers.map((answer) => {
      const answerData = {
        solvedbook: { solvedbookId: solvedbookId },
        question: { questionId: answer.questionId },
        answerOrder: answer.answerOrder,
      };

      // 객관식 문제 처리: choiceId 배열로 전송
      if (Array.isArray(answer.answer)) {
        answerData.choices = answer.answer.map((choice) => ({
          choiceId: choice.choiceId,
        }));
      }
      // 주관식 문제 처리
      else if (typeof answer.answer === "string") {
        answerData.subjectiveAnswer = answer.answer || null;
      }

      return answerData;
    });

    console.log("전송할 데이터:", formattedAnswers); // 최종 데이터 확인
    navigate(`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`);

    try {
      const response = await axios.post(`/book/save/answers?wrongRepeat=${wrongRepeat}`, formattedAnswers);
      console.log("답안 제출 성공", response.data);
    } catch (error) {
      console.error("답안 제출 중 오류:", error.response?.data); // 에러 메시지 확인
    }
  };

  // 자동 제출을 처리하는 함수
  const handleAutoSubmit = async () => {
    console.log("자동 제출 시작. answers:", answers);

    const formattedAnswers = answers.map((answer) => {
      const answerData = {
        solvedbook: { solvedbookId: solvedbookId },
        question: { questionId: answer.questionId },
        answerOrder: answer.answerOrder,
      };

      if (Array.isArray(answer.answer)) {
        answerData.choices = answer.answer.map((choice) => ({
          choiceId: choice.choiceId,
        }));
      } else if (typeof answer.answer === "string") {
        answerData.subjectiveAnswer = answer.answer || null;
      }

      return answerData;
    });

    try {
      const response = await axios.post(`/book/save/answers`, formattedAnswers);
      console.log("자동 답안 제출 성공", response.data);

      // 제출 후 시험 결과 페이지로 이동
      navigate(`/book/score/${bookId}`);
    } catch (error) {
      console.error("자동 답안 제출 중 오류:", error.response?.data);
    }
  };

  const closeConfirm = () => {
    setConfirmVisible(false);
  };

  const passbtn = () => {
    closeConfirm();
    navigate(`/book/score/${bookId}`);
  };

  const submitbtn = () => {
    closeConfirm();
    navigate(`/book/score/${bookId}/${solvedbookId}`);
  };

  // TestSection에서 답안을 전달받아 업데이트
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((a) => a.questionId === questionId);
      const newAnswerOrder = answerOrderCount;
      setAnswerOrderCount(answerOrderCount + 1);

      // 객관식일 때 배열로 저장 (다중 선택 가능)
      if (Array.isArray(answer)) {
        const choices = answer.map((choice) => {
          if (!choice.choiceId) {
            console.error("Undefined choiceId detected:", choice);
            return null;
          }
          return { choiceId: choice.choiceId };
        }).filter((choice) => choice !== null); // null 값을 제거합니다.

        if (existingAnswer) {
          return prevAnswers.map((a) =>
              a.questionId === questionId
                  ? { ...a, answer: choices, answerOrder: newAnswerOrder }
                  : a
          );
        } else {
          return [...prevAnswers, { questionId, answer: choices, answerOrder: newAnswerOrder }];
        }
      }

      // 주관식일 때
      if (typeof answer === "string") {
        if (existingAnswer) {
          return prevAnswers.map((a) =>
              a.questionId === questionId
                  ? { ...a, answer, answerOrder: newAnswerOrder }
                  : a
          );
        } else {
          return [...prevAnswers, { questionId, answer, answerOrder: newAnswerOrder }];
        }
      }

      return prevAnswers;
    });
  };

  // 분:초로 타이머를 변환하여 표시하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
      <div className={"space-y-8"}>
        <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <DensityMediumOutlinedIcon/>
            <span className="text-lg font-semibold">
              {bookData?.bookTitle} | 출제자: {bookData?.user ? bookData.user.userNickname : "로드 중..."}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">{questions.length}문항 | {sections.length} 섹션</span>
            <span className="text-lg">총 {bookData?.bookTotalscore}점</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">남은 시간: {formatTime(timeLeft)}</span> {/* 타이머 표시 */}
            <Button variant="outlined" onClick={handleTemporarySave}>
              임시 저장
            </Button>
            <Button variant="contained" onClick={openConfirm}>
              시험종료
            </Button>
          </div>
        </header>
        <div className="space-y-4">
          {sections &&
              sections.map((section, index) => {
                // 각 섹션에 해당하는 틀린 문제들만 필터링
                const filteredQuestions = questions.filter(
                    (question) => question.section.sectionId === section.sectionId
                );

                // 필터링된 질문이 없으면 해당 섹션을 렌더링하지 않음
                if (filteredQuestions.length === 0) return null;

                return (
                    <TestSection
                        key={index}
                        index={index}
                        sectionCount={sections.length}
                        section={section}
                        book={bookData}
                        loading={loading}
                        setLoading={setLoading}
                        filterquestions={filteredQuestions} // 필터링된 질문들만 전달
                        onAnswerChange={handleAnswerChange}
                    />
                );
              })}
        </div>
        <Review
            openConfirm={openConfirm}
            confirmVisible={confirmVisible}
            clickBtn1={passbtn}
            clickBtn2={submitbtn}
            bookId={bookId}
        />
      </div>
  );
}
