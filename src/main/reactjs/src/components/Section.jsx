import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, TextField, Typography, Tooltip} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import CustomConfirm from "./modal/CustomConfirm";
import SectionSort from "./modal/SectionSort";
import Question from "./Question";

export default function Section() {
    // 섹션 접고 펴는 상태
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 섹션 접고 펴는 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // confirm state
    const [confirmVisible, setConfirmVisible] = useState(false);

    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setConfirmVisible(true);
    };

    /**
     * @description : 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        setConfirmVisible(false);
    };

    /**
     * @description : 확인 버튼 클릭시 실행되는 로직
     * */
    const clickBtn2 = () => {
        /**
         * @TODO: 확인 눌렀을 때 해당 사항 저장되는 로직 추가
         * */
        setConfirmVisible(false);
    };

    const arr = [
        { id: 0, title: '야호' },
        { id: 1, title: '야호1' },
        { id: 2, title: '야호2' },
    ];

    // 상태로 관리되는 질문 리스트
    const [questions, setQuestions] = useState([{id: 1, type: 3}]);

    /**
     * @description : 새로운 질문 추가
     */
    const handleAddQuestion = (type) => {
        const newQuestion = {id: questions.length + 1, type: type};
        setQuestions([...questions, newQuestion]);
    };

    /**
     * @description : 질문 복제 기능
     */
    const handleDuplicateQuestion = (index) => {
        const newQuestion = {...questions[index], id: questions.length + 1};
        console.log(questions);
        setQuestions([...questions, newQuestion]);
    };

    /**
     * @description : 특정 질문 삭제 기능
     */
    const handleDeleteQuestion = (index) => {
        if (questions.length > 1) {
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
        }
    };

    /**
     * @description : 질문 순서 변경 기능
     */
    const moveQuestion = (dragIndex, hoverIndex) => {
        const dragQuestion = questions[dragIndex];
        const updatedQuestions = [...questions];
        updatedQuestions.splice(dragIndex, 1);
        updatedQuestions.splice(hoverIndex, 0, dragQuestion);
        setQuestions(updatedQuestions);
    };

    /**
     * @description : 현재 섹션 복제 기능
     */
    const handleDuplicateSection = () => {
        // 섹션을 복제할 때 질문과 입력된 제목, 설명을 함께 복제
        const newSection = {
            questions: [...questions],
            sectionTitle: "복제된 섹션 제목",  // 섹션 제목을 복제하거나 새롭게 설정할 수 있음
            sectionDescription: "복제된 섹션 설명"  // 섹션 설명을 복제하거나 새롭게 설정할 수 있음
        };
        console.log("복제된 섹션:", newSection);
        // 실제로 섹션을 복제하는 로직은 상위 컴포넌트에서 수행될 수 있음
    };

    /**
     * @description : 현재 섹션 삭제 기능
     */
    const handleDeleteSection = () => {
        // 섹션이 하나만 있을 경우 삭제하지 않음
        if (questions.length > 1) {
            console.log("섹션 삭제됨");
            // 실제로 섹션을 삭제하는 로직은 상위 컴포넌트에서 수행될 수 있음
        } else {
            console.log("삭제할 수 없습니다. 섹션은 최소 하나는 있어야 합니다.");
        }
    };

    return (
        <div className="flex flex-col gap-4 bg-blue-50 px-10 py-4 rounded">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">섹션 제목</Typography>
                <div>
                    <span>1 섹션 / 3 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <TextField
                            fullWidth
                            label={"섹션 제목"}
                            placeholder="질문을 입력하세요."
                            variant={"standard"}
                        />
                        <TextField
                            fullWidth
                            multiline
                            label={"섹션 설명"}
                            placeholder="여러줄로 섹션 설명을 입력할 수 있습니다."
                            variant={"standard"}
                        />
                    </div>
                    <div className="flex gap-4 justify-end">
                        {/**
                         * 현재 섹션을 복제하는 기능 추가, 현재 섹션에 입력된 내용을 모두 복사함
                         */}
                        <Tooltip title="섹션 복사">
                            <IconButton onClick={handleDuplicateSection}>
                                <ContentCopyIcon/>
                            </IconButton>
                        </Tooltip>

                        {/**
                         * 현재 섹션을 삭제하는 기능 추가, 섹션이 하나일 경우에는 삭제할 수 없음
                         */}
                        <Tooltip title="섹션 삭제">
                            <IconButton onClick={handleDeleteSection}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="섹션 재정렬">
                            <IconButton onClick={openConfirm}>
                                <LoopIcon/>
                            </IconButton>
                        </Tooltip>

                        {/* 섹션 재정렬 Confirm */}
                        <CustomConfirm
                            id={7}
                            content={<SectionSort sortData={arr} />}
                            openConfirm={confirmVisible}
                            clickBtn1={clickBtn1}
                            clickBtn2={clickBtn2}
                        ></CustomConfirm>
                    </div>
                </div>
            )}

            {/* 질문 리스트 렌더링 */}
            {questions.map((question, index) => (
                <Question
                    key={question.id}
                    index={index}
                    type={question.type}
                    totalQuestions={questions.length}
                    onDuplicate={() => handleDuplicateQuestion(index)}
                    onDelete={() => handleDeleteQuestion(index)}
                    moveQuestion={moveQuestion}
                />
            ))}
        </div>
    );
}
