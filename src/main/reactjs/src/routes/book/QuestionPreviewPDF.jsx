import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { useParams } from 'react-router-dom';

const QuestionPreviewPDF = () => {
    const { bookId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch questions and choices from the server
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`/book/questionpreviewPDF/${bookId}`);
                const questionsData = response.data;

                // Fetch choices for each question
                const questionsWithChoices = await Promise.all(
                    questionsData.map(async (question) => {
                        const choicesRes = await axios.get(`/book/choice/getall/${question.questionId}`);
                        return {
                            ...question,
                            choices: choicesRes.data,
                        };
                    })
                );

                setQuestions(questionsWithChoices);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions or choices:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [bookId]);

    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text('Question Preview', 14, 20);

        // Define table columns
        const columns = [
            { title: 'Question No.', dataKey: 'questionNumber' },
            { title: 'Question', dataKey: 'questionTitle' },
            { title: 'Choices', dataKey: 'choices' }
        ];

        // Map questions to data format for jsPDF
        const data = questions.map((question, index) => ({
            questionNumber: index + 1,
            questionTitle: question.questionTitle,
            choices: question.choices.map(choice => choice.choiceText).join(', ')
        }));

        // Add table to PDF
        doc.autoTable({
            columns: columns,
            body: data,
            startY: 30,
            margin: { horizontal: 10 }
        });

        // Save PDF
        doc.save('question_preview.pdf');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Question Preview</h1>
            <button onClick={generatePDF}>Export to PDF</button>
            <div>
                {questions.map((question, index) => (
                    <div key={index}>
                        <h2>Question {index + 1}</h2>
                        <p>{question.questionTitle}</p>
                        <ul>
                            {question.choices.map((choice, idx) => (
                                <li key={idx}>{choice.choiceText}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionPreviewPDF;
