import React, {useEffect, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, Typography} from "@mui/material";
import PreviewQuestion from "./PreviewQuestion";
import axios from "axios";
import CustomConfirm from "../modal/CustomConfirm";
import CustomAlert from "../modal/CustomAlert";


export default function PreviewSection({
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

    // confirm state
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(0);

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

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


    /**
     * @description : 질문 복제 기능
     */
    const handleDuplicateQuestion = (index) => {
        const newQuestion = {
            ...questions[index],
            questionId : "",
        };
        axios({
            method:'post',
            url:'/book/question/new',
            data: newQuestion
        }).then(res=> {
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

        const uploadForm=new FormData();
        uploadForm.append("upload",file);

        axios({
            method:'post',
            url:'/book/edit/upload',
            data:uploadForm,
            headers:{'Content-Type':'multipart/form-data'},
        }).then(res=>{
            console.log("saved picture", res.data);
            const updated = [...questions];
            if(inputType === "solution"){
                updated[index] = {
                    ...updated[index],
                    questionSolutionimage: res.data.photo,
                };
                setQuestions(updated);
            } else {
                updated[index] = {
                    ...updated[index],
                    questionDescriptionimage: res.data.photo,
                };
                setQuestions(updated);
            }
        })
    };


    return (
        <div className="flex flex-col gap-4 bg-[#EEF7FF] px-10 py-4 rounded">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{section.sectionTitle || "섹션 제목"}</Typography>
                <div>
                    <span>{index+1} 섹션 / {sectionCount} 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    {/*<Typography>{section.sectionTitle}</Typography>*/}
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
                    openConfirm={openConfirm}
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
