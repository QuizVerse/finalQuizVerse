import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Typography } from "@mui/material";
import TestQuestion from "./TestQuestion";
import axios from "axios";
import CustomConfirm from "../modal/CustomConfirm";
import CustomAlert from "../modal/CustomAlert";

export default function TestSection({
                                        index,            // 섹션의 순서 (인덱스)
                                        sectionCount,     // 전체 섹션 수
                                        section,          // 섹션 데이터 (각 섹션의 정보)
                                        setLoading,       // 로딩 상태 관리
                                        onAnswerChange    // 상위 컴포넌트에서 답안 변경 시 호출되는 함수
                                    }) {
    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/"; // 이미지 경로
    const [isCollapsed, setIsCollapsed] = useState(false);   // 섹션이 접혀 있는지 상태 관리
    const [questions, setQuestions] = useState([]);          // 섹션에 해당하는 질문 데이터
    const [deleteConfirm, setDeleteConfirm] = useState(false); // 삭제 확인 상태
    const [alertVisible, setAlertVisible] = useState(false);   // 알림창 표시 여부
    const [alertTitle, setAlertTitle] = useState("");          // 알림창 제목

    // 섹션 설명을 표시할지 여부 결정
    const showDescription = section.sectionDescription !== "" || section.sectionImage !== "";

    // 질문 데이터를 불러오기 위한 useEffect
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);  // 로딩 시작
                const res = await axios.get(`/book/question/getall/${section.sectionId}`);
                setQuestions(res.data);
                setLoading(false);  // 로딩 완료
            } catch (error) {
                console.error("Error fetching questions:", error);
                setLoading(false);  // 오류 발생 시에도 로딩 상태 해제
            }
        };
        fetchQuestions(); // 질문 데이터를 가져오는 함수 호출
    }, [section.sectionId, setLoading]);  // 섹션 ID 변경 시 데이터 새로 가져오기

    // 섹션 접기/펼치기 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // 질문이 업데이트될 때 호출되는 함수
    const handleUpdateQuestion = (index, updatedQuestion) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], ...updatedQuestion };
        setQuestions(updatedQuestions);
        console.log(updatedQuestions); // 업데이트된 질문 상태 확인
    };

    // Confirm 창 닫기
    const closeConfirm = () => {
        setDeleteConfirm(false);
    };

    // Alert 창 닫기
    const closeAlert = () => {
        setAlertVisible(false);
    };

    return (
        <div className="flex flex-col gap-4 bg-blue-100 px-10 py-4 rounded">
            <div className="flex items-center space-between">
                <Typography variant="h5">{section.sectionTitle || "섹션 제목"}</Typography>
                <div>
                    <span>{index + 1} 섹션 / {sectionCount} 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                </div>
            </div>

            {/* 섹션 내용 (접혀 있지 않으면 표시) */}
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    {showDescription && <Typography>{section.sectionDescription}</Typography>}
                    <div className="flex justify-center">
                        {section.sectionImage && (
                            <img
                                src={imagePath + section.sectionImage}
                                alt={section.sectionDescription}
                                className="w-36 h-36 object-cover"
                            />
                        )}
                    </div>

                    {/* 각 질문을 렌더링 */}
                    {questions.map((question, questionIndex) => (
                        <TestQuestion
                            key={questionIndex}
                            question={question}
                            onAnswerChange={onAnswerChange}
                            index={questionIndex}
                            totalQuestions={questions.length}
                            openConfirm={setDeleteConfirm}
                        />
                    ))}
                </div>
            )}

            {/* CustomAlert 컴포넌트 */}
            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />

            {/* CustomConfirm 컴포넌트 */}
            <CustomConfirm
                id={15}
                openConfirm={deleteConfirm}
                clickBtn1={closeConfirm}
                clickBtn2={closeConfirm}
            />
        </div>
    );
}
