import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Button, Typography } from "@mui/material";

const Explanation = () => {
  const { bookId, solvedbookId } = useParams(); // URL 경로에서 bookId와 solvedbookId 추출
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터에서 wrongRepeat 추출
  const wrongRepeat = queryParams.get("wrongRepeat"); // 'wrongRepeat' 값 추출

  const [bookData, setBookData] = useState({});
  const [sections, setSections] = useState([]);
  const [questionsBySection, setQuestionsBySection] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});  // 사용자의 선택된 답안

  // 응시자 정보를 가져오는 함수
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/book/username');  // 사용자 정보 가져오는 API
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // 책과 섹션 및 질문 데이터를 가져오는 함수
  const fetchSectionsAndQuestions = async () => {
    try {
      const bookRes = await axios.get(`/book/edit/${bookId}`);
      setBookData(bookRes.data.book);

      const sectionRes = await axios.get(`/book/section/getall/${bookId}`);
      const sectionsData = sectionRes.data;
      setSections(sectionsData);

      const questionsPromises = sectionsData.map(async (section) => {
        const questionsRes = await axios.get(`/book/question/getall/${section.sectionId}`);
        const questionsData = questionsRes.data;

        const questionsWithChoicesAndExplanation = await Promise.all(
            questionsData.map(async (question) => {
              const choicesRes = await axios.get(`/book/choice/getall/${question.questionId}`);
              return {
                ...question,
                choices: choicesRes.data,
                explanation: question.questionSolution || "해설이 없습니다.",
              };
            })
        );
        return { section, questions: questionsWithChoicesAndExplanation };
      });

      const sectionsWithQuestions = await Promise.all(questionsPromises);
      const questionsBySectionMap = sectionsWithQuestions.reduce((acc, { section, questions }) => {
        acc[section.sectionId] = { section, questions };
        return acc;
      }, {});

      setQuestionsBySection(questionsBySectionMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sections or questions:', error);
      setLoading(false);
    }
  };

  // 사용자의 선택된 답안을 가져오는 함수
  const fetchUserAnswers = async () => {
    try {
      // solvedbookId와 wrongRepeat 값을 쿼리 파라미터로 보냄
      const response = await axios.get(`/book/user/answer`, {
        params: {
          solvedbookId: solvedbookId,  // solvedbookId를 URL에서 추출한 값으로 설정
          wrongRepeat: wrongRepeat     // wrongRepeat 값을 쿼리 파라미터에서 가져옴
        },
      });
      if (response.status === 200) {
        // 응답받은 사용자 답안 데이터를 질문 ID를 키로 한 객체로 변환
        const answerMap = response.data.reduce((acc, answer) => {
          acc[answer.question.questionId] = answer;
          return acc;
        }, {});
        setSelectedAnswers(answerMap);  // 사용자의 답안 데이터를 저장
      }
    } catch (error) {
      console.error('Error fetching user answers:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  useEffect(() => {
    fetchUserData();
    fetchSectionsAndQuestions();
    fetchUserAnswers(); // 사용자 답안 가져오는 함수 호출
  }, [bookId, solvedbookId, wrongRepeat]);

  // 사용자 선택한 답안이 정답인지 확인
  const checkIfCorrect = (question, userAnswer) => {
    return userAnswer.choices?.some(choice => choice.choiceIsanswer);
  };

  // 주관식 문제와 OX 문제에서 정답과 사용자 답을 텍스트로만 출력
  const renderTextAnswer = (question) => {
    const userAnswer = selectedAnswers[question.questionId];  // 사용자가 선택한 answer 정보
    if (!userAnswer) return "답안이 없습니다.";

    const isCorrect = checkIfCorrect(question, userAnswer);
    const correctAnswer = question.choices?.find(choice => choice.choiceIsanswer)?.choiceText || "정답이 없습니다.";

    return (
        <>
          <Typography className={`font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? '정답' : '오답'}
          </Typography>
          <div className="w-full bg-blue-100 border rounded-lg mt-2 mb-4 p-2">
            <p><strong>사용자 답안:</strong> {userAnswer.subjectiveAnswer || userAnswer.choices[0]?.choiceText || '답안이 없습니다.'}</p>
            <p><strong>정답:</strong> {correctAnswer}</p> {/* 정답을 텍스트로 표시 */}
          </div>
          <div className="w-full h-36 bg-blue-100 border rounded-lg mt-2 mb-4">
            <span className="block m-4 text-sm">[ 해 설 ]</span>
            <p className="px-4">{question.explanation}</p>
          </div>
        </>
    );
  };

  // 선택형 문제는 기존 방식대로 처리
  const renderChoiceAnswer = (question) => {
    const userAnswer = selectedAnswers[question.questionId];  // 사용자가 선택한 answer 정보
    if (!userAnswer) return "답안이 없습니다.";

    const isCorrect = checkIfCorrect(question, userAnswer);

    return (
        <>
          <Typography className={`font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? '정답' : '오답'}
          </Typography>
          <div className="w-full h-36 bg-blue-100 border rounded-lg mt-2 mb-4">
            <span className="block m-4 text-sm">[ 해 설 ]</span>
            <p className="px-4">{question.explanation}</p>
          </div>
        </>
    );
  };

  // 문제 유형에 따라 처리하는 함수
  const renderAnswer = (question) => {
    if (question.questionType === 2 || question.questionType === 3) { // OX 문제 또는 서술형 문제
      return renderTextAnswer(question);
    } else {
      return renderChoiceAnswer(question); // 객관식 및 다중 선택형 문제
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-end">
          <Button variant="outlined">
            <Link to={`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`}>성적보기</Link>
          </Button>
        </div>
        <div>
          <table className="min-w-full">
            <thead>
            <tr>
              <th rowSpan="3" className="text-2xl font-bold border border-gray-300 py-6 text-center">
                {bookData.bookTitle || 'No title'}
              </th>
            </tr>
            <tr>
              <th className="text-base font-semibold border border-gray-300 py-2 px-2 text-center w-24">출제자</th>
              <td className="text-base border border-gray-300 text-center px-2 w-32">
                {bookData.user?.userNickname || 'no info'}
              </td>
            </tr>
            <tr>
              <th className="text-base font-semibold border border-gray-300 px-2 py-2 w-24 text-center">응시자</th>
              <td className="text-base border border-gray-300 text-center px-2 w-32">
                {user?.userNickname || '응시자 없음'}
              </td>
            </tr>
            </thead>
          </table>
        </div>
        <div>
          {sections.map((section, sectionIndex) => (
              <div key={section.sectionId} className="p-10 border border-black mb-10">
                <span className="flex justify-end">{sectionIndex + 1} 섹션 / {sections.length} 섹션</span>
                <div className="text-center py-4">
                  <span className="text-xl font-bold">{section.sectionTitle}</span>
                  <h2 className="py-3 text-xl mb-3">{section.sectionDescription}</h2>
                  <hr />
                </div>
                {questionsBySection[section.sectionId]?.questions.length === 0 ? (
                    <p className="text-center">저장된 문제가 없습니다.</p>
                ) : (
                    questionsBySection[section.sectionId]?.questions.map((question, questionIndex) => (
                        <div key={question.questionId}>
                          <div className="flex justify-between items-center space-x-4 my-6">
                            <div className="flex items-start space-x-4">
                              <div className="bg-sky-500 w-14 text-center rounded-lg">
                                <span className="text-white font-bold text-lg">Q.{questionIndex + 1}</span>
                              </div>
                              <span className="text-lg font-bold">
                        {question.questionTitle} {question.questionType === 0
                                  ? "(객관식)"
                                  : question.questionType === 1
                                      ? "(다중 선택)"
                                      : question.questionType === 2
                                          ? "(OX 문제)"
                                          : "(서술형)"}
                      </span>
                            </div>
                            <div className="bg-neutral-100 w-20 text-center rounded-lg">
                              <span>{question.questionPoint}점</span>
                            </div>
                          </div>

                          {/* 사용자 답안 강조 및 해설 표시 */}
                          {question.questionType === 0 || question.questionType === 1 ? ( // 선택형 문제만 선택 UI 표시
                              <ul className="list-none p-0 pb-4">
                                {question.choices.map((choice, choiceIndex) => {
                                  const userAnswer = selectedAnswers[question.questionId]; // 사용자의 답안
                                  const isSelected = userAnswer?.choices?.some(ansChoice => ansChoice.choiceId === choice.choiceId); // 사용자가 선택한지 확인

                                  return (
                                      <li key={choice.choiceId} className="flex items-start space-x-2 mb-2">
                                        <div
                                            className={`w-4 h-4 flex items-center justify-center border rounded-full ${
                                                isSelected
                                                    ? choice.choiceIsanswer
                                                        ? 'border-green-500 text-green-500'
                                                        : 'border-red-500 text-red-500'
                                                    : 'border-black'
                                            }`}
                                        >
                                          <span className="text-sm">{choiceIndex + 1}</span>
                                        </div>
                                        <span className={`text-sm leading-tight ${choice.choiceIsanswer ? 'text-blue-500 font-bold' : ''}`}>
                              {choice.choiceText}
                            </span>
                                      </li>
                                  );
                                })}
                              </ul>
                          ) : null}

                          {/* 문제 유형에 따라 정답/오답 및 해설 표시 */}
                          {renderAnswer(question)}
                        </div>
                    ))
                )}
              </div>
          ))}
        </div>
      </div>
  );
};

export default Explanation;
