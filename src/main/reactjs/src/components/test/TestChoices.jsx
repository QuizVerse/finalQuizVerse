import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomAlert from "../modal/CustomAlert";

export default function TestChoices({ question, onAnswerChange }) {
    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

    const [choices, setChoices] = useState([]); // 선택지 데이터를 저장하는 상태
    const [oxSelected, setOxSelected] = useState(""); // OX 문제에서 선택된 값(O 또는 X)을 관리하는 상태
    const [subjectiveAnswer, setSubjectiveAnswer] = useState(""); // 주관식 답변을 저장하는 상태
    const [loading, setLoading] = useState(true); // 데이터를 로딩하는 상태를 관리
    const [error, setError] = useState(null); // 에러가 발생했을 때 에러 메시지를 저장
    const [alertVisible, setAlertVisible] = useState(false); // 알림 창의 표시 여부를 관리하는 상태

    // 선택지 데이터를 가져오는 로직
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // 로딩 상태를 true로 설정
            try {
                // API 호출을 통해 해당 questionId에 대한 선택지 데이터를 가져옴
                const res = await axios.get('/book/choice/getall/' + question.questionId);
                const fetchedChoices = res.data.map(choice => ({
                    ...choice,
                    choiceIsanswer: false // 선택지 초기화: 모두 선택되지 않은 상태로 설정
                }));
                setChoices(fetchedChoices); // 선택지 데이터를 초기화 상태로 저장
                setOxSelected(""); // OX 문제의 선택 초기화
                setSubjectiveAnswer(""); // 주관식 답변 초기화
                setLoading(false); // 데이터를 성공적으로 가져왔으면 로딩 상태를 false로 설정
            } catch (error) {
                setError("Error fetching choices"); // 에러 발생 시 에러 메시지를 설정
                setLoading(false); // 에러가 발생했어도 로딩 상태를 false로 설정
            }
        };
        fetchData(); // 선택지 데이터를 가져오는 함수 호출
    }, [question.questionId]); // question의 ID가 변경될 때마다 데이터를 다시 불러옴

    // OX 문제에서 O 또는 X를 선택했을 때의 로직
    const handleOxSelect = (selection) => {
        setOxSelected(selection); // 선택한 값을 상태에 저장

        const selectedChoice = choices.find(choice => choice.choiceText === selection);

        if (!selectedChoice) {
            console.error(`선택한 텍스트 (${selection})에 해당하는 선택지가 없습니다.`);
            return;
        }

        const updatedChoice = [{ choiceId: selectedChoice.choiceId, choiceText: selection, choiceIsanswer: selection === "O", question }];

        onAnswerChange(question.questionId, updatedChoice);
    };

    // 다중 선택형에서 체크박스를 클릭했을 때 선택지 상태 업데이트
    const updateCheckBox = (index) => {
        const updatedChoices = [...choices];
        updatedChoices[index].choiceIsanswer = !updatedChoices[index].choiceIsanswer;
        setChoices(updatedChoices);

        const selectedChoices = updatedChoices.filter(choice => choice.choiceIsanswer).map(choice => ({
            choiceId: choice.choiceId,
            choiceText: choice.choiceText,
            choiceIsanswer: choice.choiceIsanswer
        }));

        onAnswerChange(question.questionId, selectedChoices);
    };

    // 선택형 문제에서 라디오 버튼이 선택됐을 때의 로직
    const handleChange = (event) => {
        const val = event.target.value;
        const updatedChoices = [...choices];
        updatedChoices.forEach((e, index) => {
            e.choiceIsanswer = index === Number(val);
        });
        setChoices(updatedChoices);

        const selectedChoice = updatedChoices.find(choice => choice.choiceIsanswer);

        onAnswerChange(question.questionId, [{
            choiceId: selectedChoice.choiceId,
            choiceText: selectedChoice.choiceText,
            choiceIsanswer: true
        }]);
    };

    // 주관식 문제에서 답변이 입력됐을 때의 로직
    const handleSubjectiveAnswer = (event) => {
        const answer = event.target.value;
        setSubjectiveAnswer(answer);
        onAnswerChange(question.questionId, answer);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {question.questionType === 0 && ( // 선택형 문제일 경우
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
            {question.questionType === 1 && ( // 다중 선택형 문제일 경우
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
            {question.questionType === 2 && ( // OX 문제일 경우
                <div className="flex gap-4">
                    <Button variant={oxSelected === "O" ? "contained" : "outlined"} onClick={() => handleOxSelect("O")}>
                        <PanoramaFishEyeIcon fontSize="large" />
                    </Button>
                    <Button variant={oxSelected === "X" ? "contained" : "outlined"} onClick={() => handleOxSelect("X")}>
                        <CloseIcon fontSize="large" />
                    </Button>
                </div>
            )}
            {question.questionType === 3 && ( // 주관식 문제일 경우
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