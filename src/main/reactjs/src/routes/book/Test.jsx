import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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


  const queryParmas=new URLSearchParams(search);
  const wrongRepeat=queryParmas.get("wrongRepeat");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`/book/edit/${bookId}`);
        setBookData(bookRes.data.book);
        setSections(bookRes.data.sections);

        const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
        setQuestions(questionsRes.data);

        setLoading(false);
      } catch (error) {
        setError("데이터를 가져오는 도중 문제가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId]);
  const openConfirm = async () => {
    console.log("answers:", answers);  // 전송될 데이터 확인

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

    console.log("전송할 데이터:", formattedAnswers);  // 최종 데이터 확인

    try {
      const response = await axios.post(`/book/save/answers?wrongRepeat=${wrongRepeat}`, formattedAnswers);
      console.log("답안 제출 성공", response.data);
    } catch (error) {
      console.error("답안 제출 중 오류:", error.response?.data);
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
    navigate(`/book/score/${bookId}`);
  };

  // TestSection에서 답안을 전달받아 업데이트
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((a) => a.questionId === questionId);
      const newAnswerOrder = answerOrderCount;
      setAnswerOrderCount(answerOrderCount + 1);

      // 객관식일 때 배열로 저장 (다중 선택 가능)
      if (Array.isArray(answer)) {
        // choiceId만 추출해서 저장
        const choices = answer.map((choice) => {
          if (!choice.choiceId) {
            console.error("Undefined choiceId detected:", choice);
            return null;
          }
          return { choiceId: choice.choiceId };
        }).filter(choice => choice !== null); // null 값을 제거합니다.

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


  return (
      <div className={"space-y-8"}>
        <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <DensityMediumOutlinedIcon />
            <span className="text-lg font-semibold">{bookData?.user ? bookData.user.userNickname : "로드 중..."}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">10/{questions.length} 문항 | 10 섹션</span>
            <span className="text-lg">총 {bookData?.bookTotalscore}점</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">{bookData?.bookTitle}</span>
            <Button variant="contained" onClick={openConfirm}>
              시험종료
            </Button>
          </div>
        </header>
        <div className="space-y-4">
          {sections &&
              sections.map((section, index) => (
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