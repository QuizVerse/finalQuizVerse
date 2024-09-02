import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Box,
    CircularProgress,
    Alert
} from "@mui/material";

export default function QuestionPreview() {
    const { book_Id } = useParams(); // URL에서 book_Id를 가져옴
    const [scores, setScores] = useState([]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [targetTotal, setTargetTotal] = useState(100);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/book/detail/${book_Id}`); // 책 정보 엔드포인트 호출
                const questionData = response.data;

                setScores(Array(questionData.length).fill(0)); // 문제 수에 맞춰 초기 점수 배열 설정
                setTotalQuestions(questionData.length); // 총 문제 수 설정
                setTargetTotal(questionData.totalScore); // 총점 목표 설정 (예시: 서버에서 받는 경우)

                setLoading(false); // 로딩 완료
            } catch (error) {
                setError("데이터를 불러오는 중 에러가 발생했습니다.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleScoreInput = (index, newScore) => {
        const updatedScores = [...scores];
        const parsedScore = parseFloat(newScore) || 0.0;

        updatedScores[index] = parsedScore;
        const currentTotal = updatedScores.reduce((acc, curr) => acc + curr, 0);

        if (currentTotal <= targetTotal) {
            setScores(updatedScores);
        } else {
            alert("총 점수가 목표 점수를 초과할 수 없습니다.");
        }
    };

    const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
    const isTotalEqual = totalScore.toFixed(1) === targetTotal.toFixed(1);

    const handleSubmit = () => {
        if (scores.some((score) => score === 0)) {
            alert("모든 문제에 대해 배점을 해야 합니다. 0점인 문제가 있습니다.");
        } else {
            alert("모든 문제에 대해 배점이 완료되었습니다. 제출을 진행합니다.");
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" py={2} borderBottom={1}>
                <Typography variant="h6">홍길동</Typography>
                <Typography variant="h6">
                    총 {totalQuestions} 문항 | 총 {targetTotal} 점
                </Typography>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: 'yellow', color: 'black' }}
                >
                    출제하기
                </Button>
            </Box>
            <Box mt={4} textAlign="center">
                <Typography variant="h5" mb={2}>문제 미리보기</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>문항번호</TableCell>
                                {scores.map((_, index) => (
                                    <TableCell key={index}>{`${index + 1}번`}</TableCell>
                                ))}
                                <TableCell align="center">현재 배점 합계</TableCell>
                                <TableCell align="center">총점</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">배점</TableCell>
                                {scores.map((score, index) => (
                                    <TableCell key={index} align="center">
                                        <TextField
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={score}
                                            onChange={(e) => handleScoreInput(index, e.target.value)}
                                            size="small"
                                            variant="outlined"
                                            inputProps={{ style: { textAlign: 'center' } }}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell align="center" style={{ color: isTotalEqual ? 'blue' : 'red' }}>
                                    {totalScore.toFixed(1)}점
                                </TableCell>
                                <TableCell align="center" style={{ color: 'blue' }}>
                                    {targetTotal}점
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
