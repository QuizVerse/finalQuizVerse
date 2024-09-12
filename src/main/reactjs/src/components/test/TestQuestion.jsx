import React, { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TestChoices from "./TestChoices"; // 선택지 컴포넌트

export default function TestQuestion({
                                         question, // 문제 데이터
                                         onUploadImage, // 이미지 업로드 함수
                                         onAnswerChange // 답안 변경 함수 (상위 컴포넌트로 답안 전달)
                                     }) {
    // 질문 접기/펼치기 상태
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 질문 접기/펼치기 핸들러
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // 이미지 경로 설정
    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

    return (
        <div className="flex flex-col gap-4 px-10 py-4 rounded shadow-lg bg-gray-100">
            {/* 질문 제목과 접기/펼치기 아이콘 */}
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{question.questionTitle || "문제 질문"}</Typography>
                <IconButton onClick={toggleCollapse}>
                    {isCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} {/* 접기/펼치기 아이콘 */}
                </IconButton>
            </div>

            {/* 질문 내용 (접혀있지 않으면 표시) */}
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    {/* 질문 설명 */}
                    <Typography>{question.questionDescription}</Typography>

                    {/* 이미지 프리뷰 */}
                    {question.questionDescriptionimage && (
                        <div className="flex justify-center">
                            <img
                                src={imagePath + question.questionDescriptionimage}
                                alt="Description Image"
                                className="w-36 h-36 object-cover"
                                width="150"
                                height="150"
                            />
                        </div>
                    )}

                    {/* 선택지 컴포넌트 */}
                    <TestChoices question={question} onAnswerChange={onAnswerChange} />

                    {/* 정답 설명 및 이미지 (선택사항) */}
                    {question.questionSolution && (
                        <div className="flex flex-col gap-4">
                            <Typography>{question.questionSolution}</Typography>
                            {question.questionSolutionimage && (
                                <div className="flex justify-center">
                                    <img
                                        src={imagePath + question.questionSolutionimage}
                                        alt="Solution Image"
                                        className="w-36 h-36 object-cover"
                                        width="150"
                                        height="150"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
