import React, {useEffect, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, TextField, Typography, Tooltip, Button} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import CustomConfirm from "./modal/CustomConfirm";
import SectionSort from "./modal/SectionSort";
import Question from "./Question";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

export default function Section({
                                    index,
                                    title,
                                    description,
                                    sectionCount,
                                    onDuplicate,
                                    onDelete,
                                    openConfirm,
                                    onUpdateSection,
                                    section,
                                    book
                                }) {


    // 섹션 접고 펴는 상태
    const [isCollapsed, setIsCollapsed] = useState(false);

    // section 상태
    // const [sectionTitle, setSectionTitle] = useState('');
    // const [sectionDescription, setSectionDescription] = useState('');

    // 섹션 접고 펴는 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // 상태로 관리되는 질문 리스트
    const [questions, setQuestions] = useState([ {
        questionTitle: "",
        questionType: 0,
        questionDescription: "",
        questionDescriptionimage: "",
        questionSolution: "",
        questionSolutionimage: "",
        questionPoint: 0,
    }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(section.sectionId === '') return;
                axios.post(`/book/question/getallbysection`, section).then((res)=>{
                    setQuestions(res.data);
                });
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchData(); // 데이터를 가져오는 함수 호출
    }, []);

    /**
     * @description : 새로운 질문 추가
     */
    const handleAddQuestion = () => {
        const newQuestion = {
                questionTitle: "",
                questionDescription: "",
                questionDescriptionimage: "",
                questionSolution: "",
                questionSolutionimage: "",
                book: book,
                questionPoint: 0,
                section: section
            }
        ;
        axios({
            method:'post',
            url:'/book/question/new',
            data: newQuestion,
        }).then(res=>{
            console.log(res)
            setQuestions([...questions, newQuestion]);
        })
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
            axios({
                method:'delete',
                url:'/book/question/delete/'+questions[index].questionId,
                data: questions[index],
            }).then(res=>{
                console.log(res)
                setQuestions(newQuestions);
            })
            const newQuestions = questions.filter((_, i) => i !== index);
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

    // /**
    //  * @description : 현재 섹션 복제 기능
    //  */
    // const handleDuplicateSection = () => {
    //     // 섹션을 복제할 때 질문과 입력된 제목, 설명을 함께 복제
    //     const newSection = {
    //         questions: [...questions],
    //         sectionTitle: title,  // 섹션 제목을 복제하거나 새롭게 설정할 수 있음
    //         sectionDescription: description  // 섹션 설명을 복제하거나 새롭게 설정할 수 있음
    //     };
    //     console.log("복제된 섹션:", newSection);
    //     // 실제로 섹션을 복제하는 로직은 상위 컴포넌트에서 수행될 수 있음
    // };

    /**
     * @description : 문제 변경 사항 업데이트
     */
    const handleUpdateQuestion = (index, title, description, questionType, solution) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            questionTitle: title,
            questionDescription: description,
            questionType : questionType,
            questionSolution : solution,
        };
        setQuestions(updatedQuestions);

        console.log(updatedQuestions);
    };


    return (
        <div className="flex flex-col gap-4 bg-blue-50 px-10 py-4 rounded">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{title || "섹션 제목"}</Typography>
                <div>
                    <span>{index+1} 섹션 / {sectionCount} 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    <TextField
                        fullWidth
                        label={"섹션 제목"}
                        placeholder="질문을 입력하세요."
                        variant={"standard"}
                        value={title}
                        onChange={(e) => onUpdateSection(e.target.value, description)}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label={"섹션 설명"}
                        placeholder="여러줄로 섹션 설명을 입력할 수 있습니다."
                        variant={"standard"}
                        value={description}
                        onChange={(e) => onUpdateSection(title, e.target.value)}
                    />
                    <div className="flex gap-4 justify-end">
                        <Tooltip title="섹션 복사">
                            <IconButton onClick={onDuplicate}>
                                <ContentCopyIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="섹션 삭제">
                            <IconButton onClick={onDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="섹션 재정렬">
                            <IconButton onClick={openConfirm}>
                                <LoopIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="질문 추가">
                            <IconButton onClick={handleAddQuestion}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            )}
            {questions.map((question, index) => (
                <Question
                    key={index}
                    index={index}
                    questionType={question.questionType}
                    title={question.questionTitle}
                    description={question.questionDescription}
                    totalQuestions={questions.length}
                    onDuplicate={() => handleDuplicateQuestion(index)}
                    onDelete={() => handleDeleteQuestion(index)}
                    moveQuestion={moveQuestion}
                    onUpdateQuestion={(title, description, questionType, solution) =>
                        handleUpdateQuestion(index, title, description, questionType, solution)}
                />
            ))}
        </div>
    );
}
