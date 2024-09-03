import {Button, Checkbox, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomAlert from "../modal/CustomAlert";

export default function PreviewChoices({question}) {

    const [choices, setChoices] = useState([]); // 답안 리스트 관리
    const [oxSelected, setOxSelected] = useState(""); // OX 선택 상태 관리

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);

    // questionType이 변경될 때마다 choices를 초기화
    useEffect(() => {
        setChoices([]);
        setOxSelected("");
    }, [question.questionType]);

    // 화면 로딩될 때
    useEffect(() => {
        const fetchData = async () => {
            // questionId에 해당하는 choice 데이터를 가져옴
            axios.get('/book/choice/getall/'+question.questionId)
                .then(res => {
                    setChoices(res.data);
                    if(res.data[0].choiceText === "O") {
                        setOxSelected("O");
                    } else if(res.data[0].choiceText === "X") {
                        setOxSelected("X");
                    }
                })
                .catch(error => {
                    console.error("Error fetching question data:", error);
                })
        };
        fetchData(); // 데이터를 가져오는 함수 호출
    }, []);

    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = () => {
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };

    // OX 선택 핸들러
    const handleOxSelect = (selection) => {
        const updatedChoices = {
            choiceText : selection,
            choiceImage: "",
            choiceIsanswer: false,
            question: question
        };
        setChoices([updatedChoices]);
        setOxSelected(selection);
    };

    // 다중선택형 답안 업데이트
    const updateCheckBox = (index) => {
        const updatedChoices = [...choices];
        updatedChoices[index].choiceIsanswer ?
            updatedChoices[index].choiceIsanswer = false
            : updatedChoices[index].choiceIsanswer =true;
        setChoices(updatedChoices);
    };


    // 선택형 답안 radio 업데이트
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        const val = event.target.value;
        setValue(val);
        const updatedChoices = [...choices];
        updatedChoices.forEach((e, index)=>{
            index === Number(val) ? e.choiceIsanswer = true : e.choiceIsanswer = false;
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
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <FormControlLabel value={index} control={<Radio/>} label=""/>
                                <Typography>{choice.choiceText}</Typography>
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
                            </div>
                        </div>
                    ))}
                    </RadioGroup>
                </div>
            )}
            {question.questionType === 1 && (  // 다중선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex items-center">
                            <Checkbox
                                checked={choice.choiceIsanswer}
                                value={choice.choiceIsanswer}
                                onClick={()=>updateCheckBox(index)}/>
                            <Typography>{choice.choiceText}</Typography>
                        </div>
                    ))}
                </div>
            )}
            {question.questionType === 2 && (  // OX 선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    <div className="flex gap-4 items-end">
                        <Button
                            className="flex items-center justify-center w-1/2 h-32 border-2 border-blue-300 text-blue-500 text-4xl font-bold"
                            size={"large"}
                            variant={oxSelected === "O" ? "contained" : "outlined"}
                            onClick={() => handleOxSelect("O")}>
                            <PanoramaFishEyeIcon fontSize={"large"}/>
                        </Button>
                        <Button
                            className="flex items-center justify-center w-1/2 h-32 border-2 border-red-300 text-red-500 text-4xl font-bold"
                            color={"warning"}
                            variant={oxSelected === "X" ? "contained" : "outlined"}
                            onClick={() => handleOxSelect("X")}>
                            <CloseIcon fontSize={"large"}/>
                        </Button>
                    </div>
                </div>
            )}
            {question.questionType === 3 && (  // 단답형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    <Typography>{choices[0].choiceText}</Typography>
                </div>
            )}

            <CustomAlert
                id={8} // 답안 개수 초과 alert
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
        </>
    );
}