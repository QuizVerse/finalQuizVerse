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
                setChoices(res.data); // 가져온 선택지 데이터를 choices 상태에 저장
                if (res.data[0]?.choiceText === "O") { // 만약 첫 번째 선택지가 "O"라면
                    setOxSelected("O"); // O를 선택된 값으로 설정
                } else if (res.data[0]?.choiceText === "X") { // 첫 번째 선택지가 "X"라면
                    setOxSelected("X"); // X를 선택된 값으로 설정
                }
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

        // 선택된 값으로 선택지 배열을 업데이트
        const selectedChoice = choices.find(choice => choice.choiceText === selection);

        if (!selectedChoice) {
            console.error(`선택한 텍스트 (${selection})에 해당하는 선택지가 없습니다.`);
            return; // 선택지가 없으면 함수를 종료합니다.
        }

        // 선택된 값과 관련된 정보를 updatedChoice로 구성
        const updatedChoice = [{ choiceId: selectedChoice.choiceId, choiceText: selection, choiceIsanswer: selection === "O", question }];

        // choiceId와 함께 상위 컴포넌트에 전달
        onAnswerChange(question.questionId, updatedChoice);
    };

    // 다중 선택형에서 체크박스를 클릭했을 때 선택지 상태 업데이트
    const updateCheckBox = (index) => {
        const updatedChoices = [...choices]; // 기존 선택지를 복사
        updatedChoices[index].choiceIsanswer = !updatedChoices[index].choiceIsanswer; // 선택 여부를 토글
        setChoices(updatedChoices); // 선택지 상태를 업데이트

        // 선택된 답안을 choiceId를 포함한 형태로 상위 컴포넌트로 전달
        const selectedChoices = updatedChoices.filter(choice => choice.choiceIsanswer).map(choice => ({
            choiceId: choice.choiceId,
            choiceText: choice.choiceText,
            choiceIsanswer: choice.choiceIsanswer
        }));

        onAnswerChange(question.questionId, selectedChoices); // 선택한 choiceId들을 전달
    };


    // 선택형 문제에서 라디오 버튼이 선택됐을 때의 로직
    const handleChange = (event) => {
        const val = event.target.value; // 선택한 라디오 버튼의 인덱스를 가져옴
        const updatedChoices = [...choices]; // 기존 선택지를 복사
        // 선택된 인덱스의 답안을 true로, 나머지를 false로 설정
        updatedChoices.forEach((e, index) => {
            e.choiceIsanswer = index === Number(val);
        });
        setChoices(updatedChoices); // 선택지 상태 업데이트

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
        setSubjectiveAnswer(answer); // 입력된 답변을 상태에 저장
        onAnswerChange(question.questionId, answer); // 주관식 답변을 상위 컴포넌트로 전달
    };

    // 로딩 중일 때 로딩 메시지를 표시
    if (loading) return <div>Loading...</div>;
    // 에러가 발생했을 때 에러 메시지를 표시
    if (error) return <div>{error}</div>;

    return (
        <>
            {question.questionType === 0 && ( // 선택형 문제일 경우
                <RadioGroup value={choices.findIndex(choice => choice.choiceIsanswer)} onChange={handleChange}>
                    {choices.map((choice, index) => ( // 선택지를 라디오 버튼으로 표시
                        <div key={index}>
                            <FormControlLabel value={index} control={<Radio />} label={choice.choiceText} />
                            {choice.choiceImage && ( // 이미지가 있는 경우 이미지를 표시
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
                choices.map((choice, index) => ( // 선택지를 체크박스로 표시
                    <div key={index}>
                        <Checkbox checked={choice.choiceIsanswer} onChange={() => updateCheckBox(index)} />
                        <Typography>{choice.choiceText}</Typography>
                        {choice.choiceImage && ( // 이미지가 있는 경우 이미지를 표시
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
                    value={subjectiveAnswer} // 주관식 답변을 텍스트 필드에 표시
                    onChange={handleSubjectiveAnswer} // 답변이 변경될 때 상태 업데이트
                    fullWidth
                />
            )}

            <CustomAlert openAlert={alertVisible} closeAlert={() => setAlertVisible(false)} /> {/* 알림 창 */}
        </>
    );
}
