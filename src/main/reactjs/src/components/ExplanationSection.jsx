import React, {useEffect, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, Typography} from "@mui/material";
import PreviewQuestion from "./questionPreview/PreviewQuestion";
import axios from "axios";


export default function ExplanationSection({
                                           index,
                                           sectionCount,
                                           section,
                                           setLoading,
                                       }) {

    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/"

    // 섹션 접고 펴는 상태
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 섹션 접고 펴는 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };


    // 상태로 관리되는 질문 리스트
    const [questions, setQuestions] = useState([]);

    // 섹션 설명 표시 여부 관리
    const [showDescription, setShowDescription] = useState(section.sectionDescription !== "" || section.sectionImage !== "");

    // 화면 로딩될 때
    useEffect(() => {
        const fetchData = async () => {
            // sectionId에 해당하는 질문 데이터를 가져옴
            axios.get('/book/question/getall/'+section.sectionId)
                .then(res => {
                    setQuestions(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(true);
                    console.error("Error fetching book data:", error);
                })
        };
        fetchData(); // 데이터를 가져오는 함수 호출
    }, []);


    return (
        <div className="flex flex-col gap-4 bg-blue-50 px-10 py-4 rounded">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{section.sectionTitle || "섹션 제목"}</Typography>
                <div>
                    <span>{index + 1} 섹션 / {sectionCount} 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    {/* 제목 출력 부분을 제거하였습니다 */}
                    <div className="flex flex-col gap-4">
                        {showDescription && (
                            <Typography>{section.sectionDescription}</Typography>
                        )}
                        <div className={"flex justify-center"}>
                            {/* Image Preview */}
                            {section.sectionImage !== "" ?
                                <img
                                    src={imagePath + section.sectionImage}
                                    alt={section.sectionDescription}
                                    className="w-36 h-36 object-cover"
                                /> : ""}
                        </div>
                    </div>
                </div>
            )}
            {questions.map((question, index) => (
                <PreviewQuestion
                    key={index}
                    index={index}
                    totalQuestions={questions.length}
                    question={question}
                />
            ))}
        </div>
    );
}