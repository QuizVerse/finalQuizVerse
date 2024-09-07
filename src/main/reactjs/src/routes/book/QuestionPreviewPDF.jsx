import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';

const QuestionPreviewPDF = () => {
    const { bookId } = useParams();
    const [sections, setSections] = useState([]);
    const [questionsBySection, setQuestionsBySection] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSectionsAndQuestions = async () => {
            try {
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

        // Save PDF
        doc.save('question_preview.pdf');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="py-10">
                <h1>Question Preview</h1>
                <button onClick={generatePDF}>Export to PDF</button>
            </div>
            <div className="mx-20">
                {sections.map((section, sectionIndex) => (
                    <div key={section.sectionId} className="p-10 border border-black mb-10">
                        {/* 섹션 정보 */}
                        <span className="flex justify-end">{sectionIndex + 1} 섹션 / {sections.length} 섹션 </span>
                        <div className="text-center py-4">
                            <span className="text-xl font-bold">{section.sectionTitle}</span>
                            <h2 className="py-3 text-xl">{section.sectionDescription}</h2>
                        </div>
                        {questionsBySection[section.sectionId]?.questions.length === 0 ? (
                            <p className="text-center">저장된 문제가 없습니다.</p>
                        ) : (
                            questionsBySection[section.sectionId]?.questions.map((question, questionIndex) => (
                                <div key={question.questionId}>
                                    {/* 문제 번호, 타이틀, 배점*/}
                                    <div className="flex justify-between items-center space-x-4 my-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-sky-500 w-14 text-center rounded-lg">
                                                <span
                                                    className="text-white font-bold text-lg">Q. {questionIndex + 1}</span>
                                            </div>
                                            <span className="text-lg font-bold">{question.questionTitle}</span>
                                        </div>
                                        <div className="bg-neutral-100 w-20 text-center rounded-lg">
                                            <span>{question.questionPoint}점</span>
                                        </div>
                                    </div>
                                    {question.questionType === 2 ? (

                                        <div className="flex w-full  h-12">
                                        <span className="flex-1 mx-6 bg-green-400 text-white font-bold rounded-lg flex items-center justify-center">
                                        O
                                        </span>
                                        <span className="flex-1  mx-6 bg-red-400 text-white font-bold rounded-lg flex items-center justify-center">
                                        X
                                        </span>
                                        </div>
                                    ) : question.questionType === 3 ? (
                                        <div>서술형</div>
                                    ) :
                                        <ul className="list-none p-0 pb-4">
                                            {question.choices.map((choice, choiceIndex) => (
                                                <li key={choice.choiceId} className="flex items-center space-x-2 mb-2">
                                                    <div
                                                        className="w-4 h-4 flex items-center justify-center border border-black rounded-full">
                                                        <span className="text-xs">{choiceIndex + 1}</span>
                                                    </div>
                                                    <span>{choice.choiceText}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    }
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