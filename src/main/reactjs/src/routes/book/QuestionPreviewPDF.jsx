import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import {Button} from "@mui/material";

const QuestionPreviewPDF = () => {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState('');
    const [sections, setSections] = useState([]);
    const [questionsBySection, setQuestionsBySection] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSectionsAndQuestions = async () => {
            try {

                // 문제집 정보 가져오기
                const bookRes = await axios.get(`/book/edit/${bookId}`);
                setBookData(bookRes.data.book);

                // 섹션 불러오기
                const sectionRes = await axios.get(`/book/section/getall/${bookId}`);
                const sectionsData = sectionRes.data;
                setSections(sectionsData);

                // 각 섹션에 대한 질문 불러오기
                const questionsPromises = sectionsData.map(async (section) => {
                    const questionsRes = await axios.get(`/book/question/getall/${section.sectionId}`);
                    const questionsData = questionsRes.data;

                    // 각 질문에 대한 선택지 불러오기
                    const questionsWithChoices = await Promise.all(
                        questionsData.map(async (question) => {
                            const choicesRes = await axios.get(`/book/choice/getall/${question.questionId}`);
                            return {
                                ...question,
                                choices: choicesRes.data,
                            };
                        })
                    );

                    return { section, questions: questionsWithChoices };
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

    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text('Question Preview', 14, 20);

        let yOffset = 30;

        sections.forEach((section, sectionIndex) => {
            // Section Title
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text(`Section ${sectionIndex + 1}: ${section.sectionTitle}`, 14, yOffset);
            yOffset += 10;

            const sectionQuestions = questionsBySection[section.sectionId]?.questions || [];

            if (sectionQuestions.length === 0) {
                doc.text('저장된 문제가 없습니다..', 14, yOffset);
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

                    yOffset += 10;
                });
            }

            yOffset += 10;
        });

        // 파일 이름을 동적으로 지정, 기본값은 'question_preview.pdf'
        const fileName = `${bookData.bookTitle}.pdf`;

        // Save PDF
        doc.save(fileName);
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className={"flex justify-end"} >
            <Button variant={"outlined"} onClick={generatePDF}>PDF로 출력</Button>
            </div>
            <div>
                <div className="overflow-x-auto pt-5 py-8">
                    <table className="min-w-full">
                        <thead>
                        <tr>
                            <th rowSpan="3"  className="text-2xl font-bold border border-gray-300 py-6 text-center">{bookData.bookTitle || "No title"}</th>
                        </tr>
                        <tr>
                            <th className="text-base font-semibold border border-gray-300 py-2 px-2 text-center w-24">출제자</th>
                            <td className="text-base border border-gray-300 text-center px-2 w-32">{bookData.user.userNickname || "no info"}</td>
                        </tr>
                        <tr>
                            <th className="text-base font-semibold border border-gray-300 px-2 py-2 w-24 text-center">응시자</th>
                            <td className="text-base border border-gray-300 text-center px-2 w-32"></td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div >
                {sections.map((section, sectionIndex) => (
                    <div key={section.sectionId} className="p-10 border border-black mb-10">
                        {/* 섹션 정보 */}
                        <span className="flex justify-end">{sectionIndex + 1} 섹션 / {sections.length} 섹션 </span>
                        <div className="text-center py-4">
                            <span className="text-xl font-bold">{section.sectionTitle}</span>
                            <h2 className="py-3 text-xl mb-3">{section.sectionDescription}</h2>
                            <hr/>
                        </div>

                        {questionsBySection[section.sectionId]?.questions.length === 0 ? (
                            // 문제가 없을 경우
                            <p className="text-center">저장된 문제가 없습니다.</p>
                        ) : (
                            // 문제가 있는 경우
                            questionsBySection[section.sectionId]?.questions.map((question, questionIndex) => (
                                <div key={question.questionId}>
                                    {/* 문제 번호, 타이틀, 배점*/}
                                    <div className="flex justify-between items-center space-x-4 my-6 ">
                                        <div className="flex items-start  space-x-4">
                                            <div className="bg-sky-500 w-14 text-center rounded-lg">
                                                <span
                                                    className="text-white font-bold text-lg">Q. {questionIndex + 1}</span>
                                            </div>
                                            <span className="text-lg font-bold">{question.questionTitle}</span>
                                            {
                                                question.questionType === 0 ? <span className="min-w-14">(객관식)</span>
                                                    : question.questionType === 1 ?
                                                        <span className="min-w-14">(다중 선택)</span>
                                                        : question.questionType === 2 ?
                                                            <span className="min-w-14">(OX 문제)</span>
                                                            : <span>(서술형)</span>
                                            }
                                        </div>
                                        <div className="bg-neutral-100 w-20 text-center rounded-lg">
                                            <span>{question.questionPoint}점</span>
                                        </div>
                                    </div>
                                    {question.questionType === 2 ? ( // OX 문제

                                        <div className="flex w-full h-12 mb-4">
                                        <div
                                                className="flex-1 mx-6 bg-green-400 text-white font-bold rounded-lg flex items-center justify-center">
                                                O
                                            </div>
                                            <div
                                                className="flex-1  mx-6 bg-red-400 text-white font-bold rounded-lg flex items-center justify-center">
                                                X
                                            </div>
                                        </div>
                                    ) : question.questionType === 3 ? ( // 서술형 문제
                                            <div className="w-full h-20"></div>
                                        ) : // 객관식 (다중선택까지 포함)
                                        <ul className="list-none p-0 pb-4">
                                            {question.choices.map((choice, choiceIndex) => (
                                                <li key={choice.choiceId} className="flex items-start space-x-2 mb-2">
                                                    <div
                                                        className="w-4 h-4 flex items-center justify-center border border-black rounded-full">
                                                        <span className="text-sm">{choiceIndex + 1}</span>
                                                    </div>
                                                    <span className="text-sm leading-tight">{choice.choiceText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                    <div className="w-full h-36 bg-blue-100 border rounded-lg mt-6 mb-10">
                                        <span className="block m-4 text-sm">[ 정답 입력란 ]</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionPreviewPDF;