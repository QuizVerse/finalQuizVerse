import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomAlert from "../modal/CustomAlert";

export default function PreviewChoices({ question }) {
    const imagePath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

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
            axios
                .get("/book/choice/getall/" + question.questionId)
                .then((res) => {
                    setChoices(res.data);
                    if (res.data[0].choiceText === "O") {
                        setOxSelected("O");
                    } else if (res.data[0].choiceText === "X") {
                        setOxSelected("X");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching question data:", error);
                });
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

    // 번호를 유니코드 원형 기호로 변환하는 함수
    const getChoiceNumber = (index) => {
        // ① (9312) 부터 시작하므로 9312 + index
        return String.fromCharCode(9312 + index);
    };

    return (
        <>
            {question.questionType === 0 && ( // 선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex items-center">
                                {/* 번호와 선택된 답안은 강조 표시 */}
                                <Typography className={choice.choiceIsanswer ? "text-blue-500 font-bold" : ""}>
                                    {`${getChoiceNumber(index)} ${choice.choiceText}`}
                                </Typography>
                            </div>
                            <div className={"flex justify-center"}>
                                {/* Image Preview */}
                                {choice.choiceImage !== "" ? (
                                    <img
                                        src={imagePath + choice.choiceImage}
                                        alt="Cover"
                                        className="w-36 h-36 object-cover"
                                        width="150"
                                        height="150"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {question.questionType === 1 && ( // 다중선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    {choices.map((choice, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex items-center">
                                {/* 번호와 선택된 답안은 강조 표시 */}
                                <Typography className={choice.choiceIsanswer ? "text-blue-500 font-bold" : ""}>
                                    {`${getChoiceNumber(index)} ${choice.choiceText}`}
                                </Typography>
                            </div>
                            <div className={"flex justify-center"}>
                                {/* Image Preview */}
                                {choice.choiceImage !== "" ? (
                                    <img
                                        src={imagePath + choice.choiceImage}
                                        alt="Cover"
                                        className="w-36 h-36 object-cover"
                                        width="150"
                                        height="150"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {question.questionType === 2 && ( // OX 선택형 문제일 경우
                <div className={"flex flex-col gap-2"}>
                    <div className="flex gap-4 items-end">
                        {/* OX 선택 상태에 따라 텍스트 표시 */}
                        <Typography className="text-2xl font-bold">
                            {oxSelected === "O" ? "O" : "X"}
                        </Typography>
                    </div>
                </div>
            )}
            {question.questionType === 3 && ( // 단답형 문제일 경우
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
