import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import { Button, Typography } from "@mui/material";
import PanoramaFishEyeOutlinedIcon from '@mui/icons-material/PanoramaFishEyeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Explanation = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState('');
  const [sections, setSections] = useState([]);
  const [questionsBySection, setQuestionsBySection] = useState({});
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);

  // 선택된 답안을 저장하기 위한 상태 관리
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // 응답자 정보 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/book/username');  // 사용자 정보 가져오는 API
        if (response.status === 200 && response.data) {
          setUser(response.data);  // 사용자 정보 설정
          setUserId(response.data.userId);  // 사용자 ID 설정
        }
      } catch (error) {
        setUser(null);  // 오류가 발생하면 사용자 정보 설정 안 함
      }
    };
    fetchUserId();
  }, []);

  // 책 데이터와 섹션 및 질문 데이터 가져오기
  useEffect(() => {
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
                  explanation: question.explanation || "해설이 없습니다."
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

    fetchSectionsAndQuestions();
  }, [bookId]);

  // 선택된 답안을 가져오는 API 호출
  const fetchUserAnswers = async (questionId) => {
    try {
      const response = await axios.get(`/book/choice/getall/${questionId}`);
      if (response.status === 200 && response.data) {
        setSelectedAnswers(prevState => ({
          ...prevState,
          [questionId]: response.data  // questionId에 해당하는 선택 답안을 저장
        }));
      }
    } catch (error) {
      console.error('Error fetching user answers:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Question Preview', 14, 20);

    let yOffset = 30;

    sections.forEach((section, sectionIndex) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Section ${sectionIndex + 1}: ${section.sectionTitle}`, 14, yOffset);
      yOffset += 10;

      const sectionQuestions = questionsBySection[section.sectionId]?.questions || [];

      if (sectionQuestions.length === 0) {
        doc.text('저장된 문제가 없습니다.', 14, yOffset);
        yOffset += 10;
      } else {
        sectionQuestions.forEach((question, questionIndex) => {
          doc.setFontSize(12);
          doc.text(`Question ${questionIndex + 1}: ${question.questionTitle}`, 14, yOffset);
          yOffset += 10;

          question.choices.forEach((choice, choiceIndex) => {
            doc.text(`${choiceIndex + 1}. ${choice.choiceText}`, 14, yOffset);
            yOffset += 10;
          });

          doc.text(`Explanation: ${question.explanation}`, 14, yOffset);
          yOffset += 20;
        });
      }

      yOffset += 10;
    });

    const fileName = `${bookData.bookTitle}.pdf`;
    doc.save(fileName);
  };

  // 번호를 유니코드 원형 기호로 변환하는 함수
  const getChoiceNumber = (index) => {
    return String.fromCharCode(9312 + index); // ① (9312) 부터 시작
  };

  const checkIfCorrect = (question, choiceId) => {
    return question.choices.some((choice) => choice.choiceId === choiceId && choice.choiceIsanswer);
  };

  const renderAnswerIcon = (isCorrect) => {
    return isCorrect ? (
        <PanoramaFishEyeOutlinedIcon color="success" fontSize="large" />
    ) : (
        <CloseOutlinedIcon color="error" fontSize="large" />
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-end">
          <Button variant="outlined" onClick={generatePDF}>
            PDF로 출력
          </Button>
        </div>
        <div>
          <div className="overflow-x-auto pt-5 py-8">
            <table className="min-w-full">
              <thead>
              <tr>
                <th
                    rowSpan="3"
                    className="text-2xl font-bold border border-gray-300 py-6 text-center"
                >
                  {bookData.bookTitle || 'No title'}
                </th>
              </tr>
              <tr>
                <th className="text-base font-semibold border border-gray-300 py-2 px-2 text-center w-24">
                  출제자
                </th>
                <td className="text-base border border-gray-300 text-center px-2 w-32">
                  {bookData.user?.userNickname || 'no info'}
                </td>
              </tr>
              <tr>
                <th className="text-base font-semibold border border-gray-300 px-2 py-2 w-24 text-center">
                  응시자
                </th>
                <td className="text-base border border-gray-300 text-center px-2 w-32">
                  {user?.userNickname || '응시자 없음'}  {/* 사용자 정보에 있는 nickname 표시 */}
                </td>
              </tr>
              </thead>
            </table>
          </div>
        </div>
        <div>
          {sections.map((section, sectionIndex) => (
              <div key={section.sectionId} className="p-10 border border-black mb-10">
            <span className="flex justify-end">
              {sectionIndex + 1} 섹션 / {sections.length} 섹션
            </span>
                <div className="text-center py-4">
                  <span className="text-xl font-bold">{section.sectionTitle}</span>
                  <h2 className="py-3 text-xl mb-3">{section.sectionDescription}</h2>
                  <hr />
                </div>

                {questionsBySection[section.sectionId]?.questions.length === 0 ? (
                    <p className="text-center">저장된 문제가 없습니다.</p>
                ) : (
                    questionsBySection[section.sectionId]?.questions.map(
                        (question, questionIndex) => {
                          // 사용자의 선택된 답안 가져오기
                          useEffect(() => {
                            fetchUserAnswers(question.questionId);  // 질문 ID로 선택한 답안을 가져옴
                          }, [question.questionId]);

                          const userAnswer = selectedAnswers[question.questionId];
                          const isCorrect = checkIfCorrect(question, userAnswer);

                          return (
                              <div key={question.questionId}>
                                <div className="flex justify-between items-center space-x-4 my-6">
                                  <div className="flex items-start space-x-4">
                                    <div className="bg-sky-500 w-14 text-center rounded-lg">
                                      <span className="text-white font-bold text-lg">Q.{questionIndex + 1}</span>
                                    </div>
                                    <span className="text-lg font-bold">{question.questionTitle}</span>
                                    {question.questionType === 0 ? (
                                        <span className="min-w-14">(객관식)</span>
                                    ) : question.questionType === 1 ? (
                                        <span className="min-w-14">(다중 선택)</span>
                                    ) : question.questionType === 2 ? (
                                        <span className="min-w-14">(OX 문제)</span>
                                    ) : (
                                        <span>(서술형)</span>
                                    )}
                                  </div>
                                  <div className="bg-neutral-100 w-20 text-center rounded-lg">
                                    <span>{question.questionPoint}점</span>
                                  </div>
                                </div>

                                <div>{renderAnswerIcon(isCorrect)}</div>

                                {question.questionType === 2 ? (
                                    <div className="flex w-full h-12 mb-4">
                                      <div
                                          className="flex-1 mx-6 bg-green-400 text-white font-bold rounded-lg flex items-center justify-center">
                                        O
                                      </div>
                                      <div
                                          className="flex-1 mx-6 bg-red-400 text-white font-bold rounded-lg flex items-center justify-center">
                                        X
                                      </div>
                                    </div>
                                ) : question.questionType === 3 ? (
                                    <div className="w-full h-20"></div>
                                ) : (
                                    <ul className="list-none p-0 pb-4">
                                      {question.choices.map((choice, choiceIndex) => {
                                        const isCorrectAnswer = choice.choiceIsanswer;
                                        const isSelected = userAnswer?.some(answer => answer.choiceId === choice.choiceId);

                                        return (
                                            <li key={choice.choiceId} className="flex items-start space-x-2 mb-2">
                                              <div
                                                  className={`w-4 h-4 flex items-center justify-center border rounded-full ${
                                                      isCorrectAnswer
                                                          ? 'border-blue-500 text-blue-500'
                                                          : isSelected
                                                              ? 'border-red-500 text-red-500'
                                                              : 'border-black'
                                                  }`}
                                              >
                                                <span className="text-sm">{choiceIndex + 1}</span>
                                              </div>
                                              <span
                                                  className={`text-sm leading-tight ${
                                                      isCorrectAnswer
                                                          ? 'text-blue-500 font-bold'
                                                          : isSelected
                                                              ? 'text-red-500 font-bold'
                                                              : ''
                                                  }`}
                                              >
                                                {` ${choice.choiceText}`} {/* 번호 동그라미 추가 */}
                                </span>
                                            </li>
                                        );
                                      })}
                                    </ul>
                                )}

                                <div className="mt-4">
                                  <Typography className="text-blue-500 font-bold">
                                    나의 답안: {userAnswer && userAnswer.map(answer => `${getChoiceNumber(question.choices.indexOf(answer))} ${answer.choiceText}`).join(', ')}
                                  </Typography>
                                </div>
                                <div className="mt-4">
                                  <Typography className="text-blue-500 font-bold">
                                    정답: {question.choices.filter(choice => choice.choiceIsanswer).map((choice) => {
                                    const index = question.choices.indexOf(choice);
                                    return `${getChoiceNumber(index)} ${choice.choiceText}`;
                                  }).join(', ')}
                                  </Typography>
                                </div>

                                <div className="w-full h-36 bg-blue-100 border rounded-lg mt-6 mb-10">
                                  <span className="block m-4 text-sm">[ 해 설 ]</span>
                                  <p className="px-4">{question.explanation}</p>
                                </div>
                              </div>
                          );
                        }
                    )
                )}
              </div>
          ))}
        </div>
      </div>
  );
};
export default Explanation;
