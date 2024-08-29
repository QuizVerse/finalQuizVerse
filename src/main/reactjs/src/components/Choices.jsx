import {Button, Checkbox, IconButton, Radio, TextField} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Choices({question}) {

    const [choices, setChoices] = useState([]); // 답안 리스트 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionId = question.questionId;
                if(questionId === '') return;
                axios.get(`/book/choice/getall/`+questionId).then((res)=>{
                    setChoices(res.data);
                    console.log(res.data);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // 데이터를 가져오는 함수 호출
    }, []);


    // OX 선택 핸들러
    const handleOxSelect = (selection) => {
        setOxSelected(selection);
    };

    const [oxSelected, setOxSelected] = useState(""); // OX 선택 상태 관리

    // 답안 추가 핸들러
    const handleAddChoice = () => {
        const newChoice = {
                choiceId: "",
                choiceText: "",
                choiceImage: "",
                choiceIsanswer: false,
                question: question
            }
        ;
        axios({
            method:'post',
            url:'/book/choice/new',
            data: newChoice,
        }).then(res=>{
            console.log(res)
            setChoices([...choices, newChoice]);
        })

    };

    // 특정 답안 삭제 핸들러
    const handleDeleteChoice = (index) => {
        if(choices[index].choiceId === "") return;
        axios({
            method:'delete',
            url:'/book/choice/delete/'+choices[index].choiceId,
            data: choices[index],
        }).then(res=>{
            console.log(res)
            const newChoices = choices.filter((_, i) => i !== index);
            setChoices(newChoices);
        })
    };

    return (
        <>
            {question.questionType === 0 && (  // 선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex gap-4 items-end">
                            <Radio/>
                            <TextField
                                fullWidth multiline
                                label={"답안"}
                                placeholder="답안을 입력하세요."
                                variant={"standard"}
                                value={choice.choiceText}
                            />
                            {/** @todo: 사진추가 버튼 누르면 사진 추가되게 */}
                            <IconButton>
                                <InsertPhotoIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleDeleteChoice(index)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    ))}
                    <div className="flex gap-4 items-center">
                        <Button onClick={handleAddChoice}>답안 추가</Button> {/* 답안 추가 버튼 */}
                    </div>
                </div>
            )}
            {question.questionType === 1 && (  // 다중선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex gap-4 items-end">
                            <Checkbox/>
                            <TextField
                                fullWidth multiline
                                label={"답안"}
                                placeholder="답안을 입력하세요."
                                variant={"standard"}
                                value={choice.choiceText}

                            />
                            {/** @todo: 사진추가 버튼 누르면 사진 추가되게 */}
                            <IconButton>
                                <InsertPhotoIcon/>
                            </IconButton>
                            <IconButton onClick={() => handleDeleteChoice(index)}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    ))}
                    <div className="flex gap-4 items-center">
                        <Button onClick={handleAddChoice}>답안 추가</Button> {/* 답안 추가 버튼 */}
                    </div>
                </div>
            )}
            {question.questionType === 2 && (  // OX 선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    <div className="flex gap-4 items-end">
                        <Button
                            className="flex items-center justify-center w-1/2 h-32 border-2 border-blue-300 text-blue-500 text-4xl font-bold"
                            size={"large"}
                            variant={oxSelected === "O" ? "contained" : "outlined"}
                            onClick={() => handleOxSelect("O")}
                        >
                            <PanoramaFishEyeIcon fontSize={"large"}/>
                        </Button>
                        <Button
                            className="flex items-center justify-center w-1/2 h-32 border-2 border-red-300 text-red-500 text-4xl font-bold"
                            color={"warning"}
                            variant={oxSelected === "X" ? "contained" : "outlined"}
                            onClick={() => handleOxSelect("X")}
                        >
                            <CloseIcon fontSize={"large"}/>
                        </Button>
                    </div>
                </div>
            )}
            {question.questionType === 3 && (  // 단답형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    <TextField
                        fullWidth
                        label={"답안"}
                        placeholder="정답을 입력하세요."
                        variant={"standard"}/>
                </div>
            )}
        </>
    );
}