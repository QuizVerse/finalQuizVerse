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
import CustomAlert from "../../components/modal/CustomAlert";
import PreviewSection from "../../components/questionPreview/PreviewSection";

export default function QuestionPreview() {
    // 데이터 관련 변수
    const {bookId} = useParams(); //URL에서 book_Id를 가져옴
    const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가
    const [sections, setSections] = useState([]);

    const [scores, setScores] = useState([1,2,3,34,5,5,6,6,7,8,3,33,4,5,6,21,1,1,34,5,435,345,43,54,5,5]);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [targetTotal, setTargetTotal] = useState(100);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");



    // bookId에 해당하는 책 데이터를 가져옴
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(`/book/edit/${bookId}`)
                    .then((res)=>{
                        setBookData(res.data.book);
                        setSections(res.data.sections);
                    });
                setLoading(false); // 모든 데이터를 성공적으로 가져온 후 로딩 상태를 false로 변경
            } catch (error) {
                console.error("Error fetching book, section data:", error);
                setLoading(false); // 에러 발생 시 로딩을 종료하고 콘솔에 에러 출력
            }
        };

        fetchData(); // 데이터를 가져오는 함수 호출
    }, [bookId]);

    const handleScoreInput = (index, newScore) => {
        const updatedScores = [...scores];
        const parsedScore = parseFloat(newScore) || 0.0;

        updatedScores[index] = parsedScore;
        const currentTotal = updatedScores.reduce((acc, curr) => acc + curr, 0);

        if (currentTotal <= targetTotal) {
            setScores(updatedScores);
        } else {
            openAlert("총 점수가 목표 점수를 초과할 수 없습니다.");
        }
    };

    const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
    const isTotalEqual = totalScore.toFixed(1) === targetTotal.toFixed(1);

    const handleSubmit = () => {
        if (scores.some((score) => score === 0)) {
            openAlert("모든 문제에 대해 배점을 해야 합니다. 0점인 문제가 있습니다.");
        } else {
            openAlert("모든 문제에 대해 배점이 완료되었습니다. 제출을 진행합니다.");
        }
    };

    /** 모달 관련 함수 */
    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (alertTitle) => {
        setAlertTitle(alertTitle);
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
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
        <>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" py={2} borderBottom={1}>
                    <Typography variant="h6">홍길동</Typography>
                    <Typography variant="h6">
                        총 {totalQuestions} 문항 | 총 {targetTotal} 점
                    </Typography>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary">
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
                                                variant="standard"
                                                inputProps={{style: {textAlign: 'center'}}}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell align="center" style={{color: isTotalEqual ? 'blue' : 'red'}}>
                                        {totalScore.toFixed(1)}점
                                    </TableCell>
                                    <TableCell align="center" style={{color: 'blue'}}>
                                        {targetTotal}점
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <div className="space-y-4">
                    {sections && sections.map((section, index) => (
                        <PreviewSection
                            key={index}
                            index={index}
                            sectionCount={sections.length}
                            section={section}
                            book={bookData}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    ))}
                </div>
            </Container>

            {/*alert*/}
            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </>
    );
}
