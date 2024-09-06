import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import { jsPDF } from "jspdf";
// import 'jspdf-autotable'; // Optional if you want to use table formatting

export default function QuestionPDF() {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const pdfRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookRes = await axios.get(`/book/edit/${bookId}`);
                setBookData(bookRes.data.book);

                const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
                setQuestions(questionsRes.data);

                const userResponse = await axios.get(`/book/username`);
                setUsername(userResponse.data.userNickname);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId]);

    // PDF generation logic
    const generatePDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text(bookData.bookTitle || "문제집 제목", 10, 10);

        // Add questions
        questions.forEach((question, index) => {
            doc.setFontSize(12);
            doc.text(`${index + 1}. ${question.questionContent}`, 10, 20 + index * 10);
        });

        doc.save(`${bookData.bookTitle}_preview.pdf`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (

        <div className="max-w-4xl mx-auto p-4">
            <div className="overflow-x-auto pt-5 py-8">
            <table className="min-w-full">
                <thead>
                <tr>
                    <th
                        rowSpan="3"
                        className="text-2xl font-bold border border-gray-300 py-6 text-center"
                    >
                        {bookData.bookTitle || "No title"}
                    </th>
                </tr>
                <tr>
                    <th className="text-base font-semibold border border-gray-300 min-w-24 py-2 text-center">
                        출제자
                    </th>
                    <td className="text-base border border-gray-300 min-w-24 text-center">
                        {bookData.user.userNickname || "no info"}
                    </td>
                </tr>
                <tr>
                    <th className="text-base font-semibold border border-gray-300 min-w-24 py-2 text-center">
                        응시자
                    </th>
                    <td className="text-base border border-gray-300 min-w-24  text-center">
                    </td>
                </tr>
                </thead>
            </table>
            <div>
                {/*<Typography variant="h5" mb={2}>{bookData.bookTitle} - 문제 미리보기</Typography>*/}

                <div ref={pdfRef}>
                    {questions.map((question, index) => (
                        <div key={index} style={{marginBottom: "20px"}}>
                            <Typography variant="h6">
                                {index + 1}. {question.questionTitle} ({question.questionPoint}점)
                            {/*    각 문제에 해당하는 보기 불러오기 */}
                            </Typography>
                        </div>
                    ))}
                </div>

                <Button onClick={generatePDF} variant="contained" color="primary" style={{marginTop: "20px"}}>
                    PDF 저장
                </Button>
            </div>
            </div>
        </div>
    )
        ;
}
