import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Typography } from "@mui/material";
import TestQuestion from "./TestQuestion";
import CustomConfirm from "../modal/CustomConfirm";
import CustomAlert from "../modal/CustomAlert";
import axios from "axios";

export default function TestSection({
                                        index,
                                        sectionCount,
                                        section,
                                        filterquestions = [], // 기본값을 빈 배열로 설정
                                        setLoading,
                                        onAnswerChange,
                                        savedAnswer = [] // 기본값을 빈 배열로 설정
                                    }) {
    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [showDescription, setShowDescription] = useState(
        section.sectionDescription !== "" || section.sectionImage !== ""
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/book/question/getall/${section.sectionId}`);
                setQuestions(res.data || []); // 데이터가 없을 때 빈 배열로 설정
                setLoading(false);

                const savedData = localStorage.getItem('temporarySave');
                if (savedData) {
                    const parsedData = JSON.parse(savedData);
                    setQuestions((prevQuestions) => {
                        return prevQuestions.map((question) => {
                            const savedAnswer = parsedData.answers.find(
                                (answer) => answer.question.questionId === question.questionId
                            );
                            if (savedAnswer) {
                                return {
                                    ...question,
                                    answer: savedAnswer.choices || savedAnswer.subjectiveAnswer,
                                };
                            }
                            return question;
                        });
                    });
                }
            } catch (error) {
                setLoading(true);
                console.error("Error fetching book data:", error);
            }
        };
        fetchData();
    }, [section.sectionId, setLoading]);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleUpdateQuestion = (index, updated) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            ...updated,
        };
        setQuestions(updatedQuestions);
        console.log(updatedQuestions);
    };

    const clickBtn1 = () => {
        setDeleteConfirm(false);
        setDeleteIndex('');
    };

    const clickBtn2 = () => {
        setDeleteConfirm(false);
        setDeleteIndex('');
    };

    const openConfirm = () => {
        setDeleteConfirm(true);
    };

    const openAlert = (alertTitle) => {
        setAlertTitle(alertTitle);
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    return (
        <div className="flex flex-col gap-4 bg-blue-100 px-10 py-4 rounded">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{section.sectionTitle || "섹션 제목"}</Typography>
                <div>
                    <span>{index + 1} 섹션 / {sectionCount} 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    <Typography>{section.sectionTitle}</Typography>
                    <div className="flex flex-col gap-4">
                        {showDescription && (
                            <Typography>{section.sectionDescription}</Typography>
                        )}
                        <div className={"flex justify-center"}>
                            {section.sectionImage !== "" ? (
                                <img
                                    src={imagePath + section.sectionImage}
                                    alt={section.sectionDescription}
                                    className="w-36 h-36 object-cover"
                                />
                            ) : ""}
                        </div>
                    </div>
                </div>
            )}
            {filterquestions.length > 0 ? (
                filterquestions.map((question, index) => (
                    <TestQuestion
                        key={index}
                        index={index}
                        totalQuestions={questions.length}
                        question={question}
                        openConfirm={openConfirm}
                        onAnswerChange={onAnswerChange}
                        savedAnswer={savedAnswer.find(answer => answer.question.questionId === question.questionId)?.answer || []}
                    />
                ))
            ) : (
                <div>질문이 없습니다.</div>
            )}

            <CustomAlert
                title={alertTitle}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />

            <CustomConfirm
                id={15}
                openConfirm={deleteConfirm}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            />
        </div>
    );
}
