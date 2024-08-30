import {Button, Checkbox, FormControlLabel, IconButton, Radio, RadioGroup, TextField} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import React, {useEffect, useState} from "react";

export default function Choices({question}) {

    const [choices, setChoices] = useState([]); // 답안 리스트 관리
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

        setChoices([...choices, newChoice]);
    };

    // 특정 답안 삭제 핸들러
    const handleDeleteChoice = (index) => {
        if(choices[index].choiceId === "") return;

        const newChoices = choices.filter((_, i) => i !== index);
        setChoices(newChoices);
    };

    // Image Upload
    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);

            const updatedChoices = [...choices];
            updatedChoices[index] = {
                ...updatedChoices[index],
                choiceImage: imageUrl,
            };
            setChoices(updatedChoices);
        }
    };


    // OX 선택 핸들러
    const handleOxSelect = (selection) => {
        const updatedChoices = {
            choiceText : selection
        };
        setChoices([updatedChoices]);
        setOxSelected(selection);
    };

    // 선택형 답안 업데이트
    const updateChoices = (e, index) => {
        const updatedChoices = [...choices];
        updatedChoices[index].choiceText = e.target.value;
        setChoices(updatedChoices);
        console.log(choices);
    };

    // 다중선택형 답안 업데이트
    const updateCheckBox = (index) => {
        const updatedChoices = [...choices];
        updatedChoices[index].choiceIsanswer ?
            updatedChoices[index].choiceIsanswer = false
            : updatedChoices[index].choiceIsanswer =true;
        setChoices(updatedChoices);
        console.log(choices);
    };


    // 선택형 답안 업데이트
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        const val = event.target.value;
        setValue(val);
        const updatedChoices = [...choices];
        updatedChoices.forEach((e, index)=>{
            index == val ? e.choiceIsanswer = true : e.choiceIsanswer = false;
        })
        setChoices(updatedChoices);
    };


    return (
        <>
            {question.questionType === 0 && (  // 선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                    {choices.map((choice, index) => (
<<<<<<< HEAD
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex gap-4 items-end">
                                <FormControlLabel value={index} control={<Radio/>} label=""/>
                                <TextField
                                    fullWidth multiline
                                    label={"답안"}
                                    placeholder="답안을 입력하세요."
                                    variant={"standard"}
                                    value={choice.choiceText}
                                    onChange={(e) => {updateChoices(e, index)}}
                                />
                                <IconButton onClick={() => document.getElementById('file-input').click()}>
                                    <InsertPhotoIcon/>
                                </IconButton>
                                <IconButton onClick={() => handleDeleteChoice(index)}>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                            <div className={"flex justify-center"}>
                                {/* Image Preview */}
                                {choice.choiceImage !== "" ?
                                    <img
                                        src={choice.choiceImage}
                                        alt="Cover"
                                        className="w-36 h-36 object-cover"
                                        width="150"
                                        height="150"
                                    /> : ""}
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e, index)}
                                    style={{display: 'none'}} // Hide the file input
                                />
                            </div>
=======
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
>>>>>>> a5ff69b (userId 하는중)
                        </div>
                    ))}
                    </RadioGroup>
                    <div className="flex gap-4 items-center">
                        <Button onClick={handleAddChoice}>답안 추가</Button> {/* 답안 추가 버튼 */}
                    </div>
                </div>
            )}
            {question.questionType === 1 && (  // 다중선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex gap-4 items-end">
                            <Checkbox
                                checked={choice.choiceIsanswer}
                                value={choice.choiceIsanswer}
                                onClick={()=>updateCheckBox(index)}/>
                            <TextField
                                fullWidth multiline
                                label={"답안"}
                                placeholder="답안을 입력하세요."
                                variant={"standard"}
                                value={choice.choiceText}
<<<<<<< HEAD
                                onChange={(e) => {updateChoices(e, index)}}
=======

>>>>>>> a5ff69b (userId 하는중)
                            />

                            <IconButton onClick={() => document.getElementById('file-input').click()}>
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
                        variant={"standard"}
                        onChange={(e) => {
                            const updatedChoices = {
                                choiceText : e.target.value
                            };
                            setChoices([updatedChoices]);
                        }}
                    />
                </div>
            )}
        </>
    );
}