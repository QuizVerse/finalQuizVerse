import React, {useState} from "react";
import {Button} from "@mui/material";
import EditSidebar from "../../components/EditSidebar";
import Section from "../../components/Section";
import Question from "../../components/Question";
import {DndProvider, useDrag, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

// 드래그 아이템 타입을 지정합니다.
const ITEM_TYPE = 'QUESTION';

export default function Edit() {
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

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="p-4 space-y-4">
                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        <Button variant={"outlined"} onClick={() => console.log("임시저장")}>임시저장</Button>
                        <Button variant={"outlined"} onClick={() => handleAddQuestion(3)}>AI 문제 출제</Button>
                        <Button variant={"contained"} onClick={() => console.log("출제하기")}>출제하기</Button>
                    </div>
                </div>

                <Section/>

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
                <EditSidebar/>
            </main>
        </DndProvider>
    );
}
