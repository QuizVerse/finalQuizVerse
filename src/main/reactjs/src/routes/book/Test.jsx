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
  const [timeElapsed, setTimeElapsed] = useState(0); // 0부터 시작하는 타이머

  // 페이지 떠날 때 경고 표시
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome에서는 returnValue를 설정해야 경고창이 나타남
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`/book/edit/${bookId}`);
        setBookData(bookRes.data.book);
        setSections(bookRes.data.sections);

        if (wrongRepeat && wrongRepeat > 0) {
          const wrongQuestionsRes = await axios.get(`http://localhost:9002/book/test/wrong`, {
            params: { solvedbookId, wrongRepeat },
          });
          setQuestions(wrongQuestionsRes.data);
        } else {
          const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
          setQuestions(questionsRes.data);
        }

        setLoading(false);
      } catch (error) {
        setError("데이터를 가져오는 도중 문제가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, wrongRepeat, solvedbookId]);

  // 로컬 스토리지에서 임시 저장된 데이터 복원
  useEffect(() => {
    const savedData = localStorage.getItem("temporarySave");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setAnswers(parsedData.answers || []);
      setTimeElapsed(parsedData.timeElapsed || 0); // 복원 시 타이머 시간도 복원
    }
  }, []);

  useEffect(() => {
    const saveDataToLocalStorage = () => {
      const saveData = {
        answers: answers,
        timeElapsed: timeElapsed,
      };
      localStorage.setItem("temporarySave", JSON.stringify(saveData));
    };

    window.addEventListener("beforeunload", saveDataToLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", saveDataToLocalStorage);
    };
  }, [answers, timeElapsed]);

  // 타이머 관리 (시간이 흘러가는 방식)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000); // 1초마다 시간 증가

    return () => clearInterval(timer); // 메모리 누수를 방지하기 위해 타이머 정리
  }, []);

  const formatAnswers = () => {
    return answers.map((answer) => {
      const answerData = {
        solvedbook: { solvedbookId: solvedbookId },
        question: { questionId: answer.questionId },
        answerOrder: answer.answerOrder,
      };

      if (Array.isArray(answer.answer)) {
        answerData.choices = answer.answer.map((choice) => ({ choiceId: choice.choiceId }));
      } else if (typeof answer.answer === "string") {
        answerData.subjectiveAnswer = answer.answer || null;
      }

      return answerData;
    });
  };

  const handleTemporarySave = () => {
    const saveData = {
      answers: formatAnswers(),
      timeElapsed: timeElapsed,
    };

    localStorage.setItem("temporarySave", JSON.stringify(saveData));

    navigate("/");
  };

  const openConfirm = async () => {
    try {
      const response = await axios.post(`/book/save/answers?wrongRepeat=${wrongRepeat}`, formatAnswers());
      setConfirmVisible(true);
      console.log("답안 제출 성공", response.data);
      //navigate(`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`);
    } catch (error) {
      console.error("답안 제출 중 오류:", error.response?.data);
    }
  };

  const closeConfirm = () => setConfirmVisible(false);
  const passbtn = () => {
    closeConfirm();
    navigate(`/book/score/${bookId}`);
  };

  const submitbtn = () => {
    closeConfirm();
    navigate(`/book/score/${bookId}/${solvedbookId}`);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((a) => a.questionId === questionId);
      const newAnswerOrder = answerOrderCount;
      setAnswerOrderCount(answerOrderCount + 1);

      if (Array.isArray(answer)) {
        const choices = answer.map((choice) => {
          if (!choice.choiceId) {
            console.error("Undefined choiceId detected:", choice);
            return null;
          }
          return { choiceId: choice.choiceId };
        }).filter((choice) => choice !== null);

        return existingAnswer
            ? prevAnswers.map((a) =>
                a.questionId === questionId
                    ? { ...a, answer: choices, answerOrder: newAnswerOrder }
                    : a
            )
            : [...prevAnswers, { questionId, answer: choices, answerOrder: newAnswerOrder }];
      }

      if (typeof answer === "string") {
        return existingAnswer
            ? prevAnswers.map((a) =>
                a.questionId === questionId
                    ? { ...a, answer, answerOrder: newAnswerOrder }
                    : a
            )
            : [...prevAnswers, { questionId, answer, answerOrder: newAnswerOrder }];
      }

      return prevAnswers;
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
      <div className="space-y-8">
        <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <DensityMediumOutlinedIcon />
            <span className="text-lg font-semibold">
            {bookData?.bookTitle} | 출제자: {bookData?.user ? bookData.user.userNickname : "로드 중..."}
          </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">{questions.length}문항 | {sections.length} 섹션</span>
            <span className="text-lg">총 {bookData?.bookTotalscore}점</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">경과 시간: {formatTime(timeElapsed)}</span>
            <Button variant="outlined" onClick={handleTemporarySave}>
              임시 저장
            </Button>
            <Button variant="contained" onClick={openConfirm}>
              시험종료
            </Button>
          </div>
        </header>
        <div className="space-y-4">
          {sections.map((section, index) => {
            const filteredQuestions = questions.filter(
                (question) => question.section.sectionId === section.sectionId
            );

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
                    filterquestions={filteredQuestions}
                    onAnswerChange={handleAnswerChange}
                    savedAnswer={answers} // Pass saved answers
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