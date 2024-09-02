import {
    IconButton,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PreviewChoices from "./PreviewChoices";

const ITEM_TYPE = 'QUESTION'; // 드래그 앤 드롭 기능에서 사용할 아이템 타입 정의

export default function PreviewQuestion({
                                            index,
                                            moveQuestion,
                                            onDuplicate,
                                            onDelete,
                                            totalQuestions,
                                            question,
                                            onUpdateQuestion,
                                            onUploadImage
                                        }) {

    /** 일반 코드 */
        // 질문 접힘 상태 관리
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 질문 접기/펼치기 핸들러
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex flex-col gap-4 px-10 py-4 rounded shadow-lg bg-gray-100">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{question.questionTitle || "문제 질문"}</Typography>
                <div>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>} {/* 질문 접기/펼치기 아이콘 */}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (  // 질문이 접혀있지 않을 때만 내용 표시
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Typography>{question.questionTitle}</Typography>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Typography>{question.questionDescription}</Typography>
                        </div>
                        <div className={"flex justify-center"}>
                            {/* Image Preview */}
                            {question.questionDescriptionimage !== "" ?
                                <img
                                    src={"https://kr.object.ncloudstorage.com/bitcamp701-129/book/" + question.questionDescriptionimage}
                                    alt="Cover"
                                    className="w-36 h-36 object-cover"
                                    width="150"
                                    height="150"
                                /> : ""}
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                id={'description-image-' + question.questionId}
                                accept="image/*"
                                onChange={(e) => onUploadImage(e, "description")}
                                style={{display: 'none'}} // Hide the file input
                            />
                        </div>
                    </div>
                    <PreviewChoices question={question}/>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Typography>{question.questionSolution}</Typography>
                        </div>
                        <div className={"flex justify-center"}>
                            {/* Image Preview */}
                            {question.questionSolutionimage !== "" ?
                                <img
                                    src={"https://kr.object.ncloudstorage.com/bitcamp701-129/book/" + question.questionSolutionimage}
                                    alt="Cover"
                                    className="w-36 h-36 object-cover"
                                    width="150"
                                    height="150"
                                /> : ""}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
