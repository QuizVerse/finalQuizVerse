import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import axios from "axios";
import CustomAlert from "../modal/CustomAlert";

export default function TestChoices({ question, onAnswerChange, savedAnswer }) {
    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

    const [choices, setChoices] = useState([]);
    const [oxSelected, setOxSelected] = useState("");
    const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertVisible, setAlertVisible] = useState(false);

    // 선택지를 가져오는 useEffect는 한번만 실행되도록 설정
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/book/choice/getall/${question.questionId}`);
                const fetchedChoices = res.data.map(choice => ({
                    ...choice,
                    choiceIsanswer: false
                }));
                setChoices(fetchedChoices);

                // 로컬 스토리지에서 임시 저장된 답변을 가져와 설정
                const localStorageAnswer = JSON.parse(localStorage.getItem(`answer_${question.questionId}`)) || [];

                if (question.questionType === 0 || question.questionType === 1) {
                    const selectedChoices = localStorageAnswer.map(ans => ans.choiceId);
                    const updatedChoices = fetchedChoices.map(choice => ({
                        ...choice,
                        choiceIsanswer: selectedChoices.includes(choice.choiceId),  // 선택된 항목 설정
                    }));
                    setChoices(updatedChoices);
                } else if (question.questionType === 2) {
                    setOxSelected(localStorageAnswer[0]?.choiceText || "");
                } else if (question.questionType === 3) {
                    setSubjectiveAnswer(localStorageAnswer || "");
                }
                setLoading(false);
            } catch (error) {
                setError("Error fetching choices");
                setLoading(false);
            }
        };

        // 첫 로딩시에만 선택지를 가져옴
        fetchData();
    }, [question.questionId]);

    // 상태 업데이트는 로컬 스토리지에 저장할 때만 발생
    useEffect(() => {
        const saveAnswerToLocalStorage = () => {
            let answerToSave;
            if (question.questionType === 0 || question.questionType === 1) {
                // 저장할 선택지를 필터링하여 로컬스토리지에 저장
                answerToSave = choices.filter(choice => choice.choiceIsanswer).map(choice => ({
                    choiceId: choice.choiceId,
                    choiceText: choice.choiceText,
                    choiceIsanswer: choice.choiceIsanswer
                }));
            } else if (question.questionType === 2) {
                answerToSave = [{ choiceText: oxSelected }];
            } else if (question.questionType === 3) {
                answerToSave = subjectiveAnswer;
            }
            // 저장된 답변 로컬스토리지에 저장
            localStorage.setItem(`answer_${question.questionId}`, JSON.stringify(answerToSave));
        };

        if (!loading) {
            saveAnswerToLocalStorage();  // 상태 변경마다 로컬 스토리지 저장
        }
    }, [choices, oxSelected, subjectiveAnswer, question.questionId, loading]);

    // OX 문제 선택
    const handleOxSelect = (selection) => {
        setOxSelected(selection);
        const selectedChoice = choices.find(choice => choice.choiceText === selection);
        if (!selectedChoice) {
            console.error(`선택한 텍스트 (${selection})에 해당하는 선택지가 없습니다.`);
            return;
        }
        const updatedChoice = [{ choiceId: selectedChoice.choiceId, choiceText: selection, choiceIsanswer: selection === "O", question }];
        onAnswerChange(question.questionId, updatedChoice);
    };

    // 체크박스 선택
    const updateCheckBox = (index) => {
        const updatedChoices = [...choices];
        updatedChoices[index].choiceIsanswer = !updatedChoices[index].choiceIsanswer;  // 선택 여부 반전
        setChoices(updatedChoices);
        const selectedChoices = updatedChoices.filter(choice => choice.choiceIsanswer).map(choice => ({
            choiceId: choice.choiceId,
            choiceText: choice.choiceText,
            choiceIsanswer: choice.choiceIsanswer
        }));
        onAnswerChange(question.questionId, selectedChoices);
    };

    // 라디오 버튼 선택
    const handleChange = (event) => {
        const val = event.target.value;
        const updatedChoices = [...choices];
        updatedChoices.forEach((e, index) => {
            e.choiceIsanswer = index === Number(val);  // 하나만 선택
        });
        setChoices(updatedChoices);
        const selectedChoice = updatedChoices.find(choice => choice.choiceIsanswer);
        onAnswerChange(question.questionId, [{
            choiceId: selectedChoice.choiceId,
            choiceText: selectedChoice.choiceText,
            choiceIsanswer: true
        }]);
    };

    // 주관식 답변 입력
    const handleSubjectiveAnswer = (event) => {
        const answer = event.target.value;
        setSubjectiveAnswer(answer);
        onAnswerChange(question.questionId, answer);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {question.questionType === 0 && (
                <RadioGroup value={choices.findIndex(choice => choice.choiceIsanswer)} onChange={handleChange}>
                    {choices.map((choice, index) => (
                        <div key={index}>
                            <FormControlLabel value={index} control={<Radio />} label={choice.choiceText} />
                            {choice.choiceImage && (
                                <img
                                    src={imagePath + choice.choiceImage}
                                    alt="Choice"
                                    className="w-36 h-36 object-cover"
                                />
                            )}
                        </div>
                    ))}
                </RadioGroup>
            )}
            {question.questionType === 1 && (
                choices.map((choice, index) => (
                    <div key={index}>
                        <Checkbox checked={choice.choiceIsanswer} onChange={() => updateCheckBox(index)} />
                        <Typography>{choice.choiceText}</Typography>
                        {choice.choiceImage && (
                            <img
                                src={imagePath + choice.choiceImage}
                                alt="Choice"
                                className="w-36 h-36 object-cover"
                            />
                        )}
                    </div>
                ))
            )}
            {question.questionType === 2 && (
                <div className="flex gap-4">
                    <Button variant={oxSelected === "O" ? "contained" : "outlined"} onClick={() => handleOxSelect("O")}>
                        <PanoramaFishEyeIcon fontSize="large" />
                    </Button>
                    <Button variant={oxSelected === "X" ? "contained" : "outlined"} onClick={() => handleOxSelect("X")}>
                        <CloseIcon fontSize="large" />
                    </Button>
                </div>
            )}
            {question.questionType === 3 && (
                <TextField
                    label="답변을 입력하세요"
                    multiline
                    rows={4}
                    value={subjectiveAnswer}
                    onChange={handleSubjectiveAnswer}
                    fullWidth
                />
            )}

            <CustomAlert openAlert={alertVisible} closeAlert={() => setAlertVisible(false)} />
        </>
    );
}