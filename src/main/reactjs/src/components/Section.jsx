import React, {useEffect, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, TextField, Typography, Tooltip, Button} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';
import Question from "./Question";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CustomConfirm from "./modal/CustomConfirm";
import CustomAlert from "./modal/CustomAlert";

export default function Section({
                                    index,
                                    title,
                                    description,
                                    sectionCount,
                                    onDuplicate,
                                    onDelete,
                                    onUpdateSection,
                                    section,
                                    book
                                }) {


    // 섹션 접고 펴는 상태
    const [isCollapsed, setIsCollapsed] = useState(false);

    // confirm state
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    // 섹션 접고 펴는 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // 상태로 관리되는 질문 리스트
    const [questions, setQuestions] = useState([]);

    /**
     * @description : 새로운 질문 추가
     */
    const handleAddQuestion = () => {
        const newQuestion = {
                questionTitle: "",
                questionType:0,
                questionDescription: "",
                questionDescriptionimage: "",
                questionSolution: "",
                questionSolutionimage: "",
                questionOrder: questions.length + 1,
                book: book,
                questionPoint: 0,
                section: section
            };
        axios({
            method:'post',
            url:'/book/question/new',
            data: newQuestion
        }).then(res=>{
            console.log(res.data);
            setQuestions([...questions, res.data]);
        })
    };

    /**
     * @description : 질문 복제 기능
     */
    const handleDuplicateQuestion = (index) => {
        const newQuestion = {...questions[index]};

        axios({
            method:'post',
            url:'/book/question/new',
            data: newQuestion
        }).then(res=>{
            console.log(res.data);
            setQuestions([...questions, res.data]);
        })
    };

    /**
     * @description : 특정 질문 삭제 기능
     */
    const handleDeleteQuestion = (index) => {
        if (questions.length > 1) {
            setDeleteIndex(index);
            openConfirm();
        } else {
            openAlert("삭제할 수 없습니다. 질문은 최소 하나는 있어야 합니다.");
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


    // questions 상태가 변경될 때마다 1초 뒤에 저장하도록 하는 useEffect 추가
    useEffect(() => {
        const timer = setTimeout(() => {
            axios.post('/book/question/saveall', questions)
                .then(res => {
                    console.log('질문이 저장되었습니다:', res);
                })
                .catch(error => {
                    console.error('질문 저장 중 오류가 발생했습니다:', error);
                });
        }, 1000); // 1초 뒤에 저장

        return () => clearTimeout(timer);
    }, [questions]);

    /**
     * @description : 문제 변경 사항 업데이트
     */
    const handleUpdateQuestion = (index, updated) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            ...updated
        };
        setQuestions(updatedQuestions);

        console.log(updatedQuestions);
    };


    /**
     * @description : 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        setDeleteConfirm(false);
        setDeleteIndex('');
    };

    /**
     * @description : 확인 버튼 클릭시 실행되는 로직
     * */
    const clickBtn2 = () => {
        setDeleteConfirm(false);
        const question = questions[deleteIndex];
        if (questions.length > 1) {
            axios({
                method:'delete',
                url:'/book/question/delete/'+question.questionId,
            }).then(res=>{
                console.log(res);
                setQuestions(questions.filter((_, i) => i !== deleteIndex));
            })
        } else {

        }
    };

    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setDeleteConfirm(true);
    };

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

    // Image Upload
    const handleFileChange = (event, index, inputType) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const updated = [...questions];
            if(inputType === "solution"){
                updated[index] = {
                    ...updated[index],
                    questionSolutionimage: imageUrl,
                };
                setQuestions(updated);
            } else {
                updated[index] = {
                    ...updated[index],
                    questionDescriptionimage: imageUrl,
                };
                setQuestions(updated);
            }
        }
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
                    question={question}
                    openConfirm={openConfirm}
                    onDuplicate={() => handleDuplicateQuestion(index)}
                    onDelete={() => handleDeleteQuestion(index)}
                    moveQuestion={moveQuestion}
                    onUpdateQuestion={(updated) => handleUpdateQuestion(index, updated)}
                    onUploadImage={(e,inputType) => handleFileChange(e, index, inputType)}
                />
            ))}

            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />

            {/* 삭제 Confirm */}
            <CustomConfirm
                id={15}
                openConfirm={deleteConfirm}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            ></CustomConfirm>
        </div>
    );
}
