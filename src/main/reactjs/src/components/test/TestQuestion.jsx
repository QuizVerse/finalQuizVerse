import {
    IconButton,
    Typography
} from "@mui/material";
import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TestChoices from "./TestChoices";

export default function TestQuestion({
                                         question,
                                         onUploadImage,
                                         onAnswerChange,
                                         savedAnswer = [] // 기본값 설정
                                     }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [answer, setAnswer] = useState(savedAnswer);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

    useEffect(() => {
        setAnswer(savedAnswer);
    }, [savedAnswer]);

    const handleAnswerChange = (newAnswer) => {
        setAnswer(newAnswer);
        onAnswerChange(question.questionId, newAnswer);
    };

    return (
        <div className="flex flex-col gap-4 px-10 py-4 rounded shadow-lg bg-gray-100">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{question.questionTitle || "문제 질문"}</Typography>
                <div>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Typography>{question.questionTitle}</Typography>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Typography>{question.questionDescription}</Typography>
                        </div>
                        <div className="flex justify-center">
                            {question.questionDescriptionimage ? (
                                <img
                                    src={imagePath + question.questionDescriptionimage}
                                    alt="Cover"
                                    className="w-36 h-36 object-cover"
                                />
                            ) : ""}
                        </div>
                    </div>
                    <TestChoices
                        question={question}
                        onAnswerChange={handleAnswerChange}
                        savedAnswer={answer}
                    />
                </div>
            )}
        </div>
    );
}
