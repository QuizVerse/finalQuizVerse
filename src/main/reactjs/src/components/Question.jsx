import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import {useDrag, useDrop} from "react-dnd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import QuestionButtons from "./QuestionButtons";

const ITEM_TYPE = 'QUESTION'; // 드래그 앤 드롭 기능에서 사용할 아이템 타입 정의

export default function Question({index, moveQuestion, onDuplicate, onDelete, totalQuestions, title, description, questionType, solution, onUpdateQuestion}) {

    /** 드래그앤 드롭 관련 코드 */
    const ref = React.useRef(null); // 드래그 앤 드롭을 위한 요소 참조

    // Drop 설정: 다른 질문을 드래그하여 이 위치에 놓을 수 있게 설정
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // 드래그 중인 아이템과 호버 중인 아이템이 같으면 아무 작업도 하지 않음
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // 아래쪽으로 드래그 중일 때
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // 위쪽으로 드래그 중일 때
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveQuestion(dragIndex, hoverIndex); // 질문의 위치를 변경
            item.index = hoverIndex; // 드래그 중인 아이템의 인덱스를 업데이트
        },
    });

    // Drag 설정: 이 질문을 드래그할 수 있게 설정
    const [{isDragging}, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref)); // 드래그와 드롭을 결합

    /** 일반 코드 */
    // 컴포넌트 상태 관리
    const [answers, setAnswers] = useState([]); // 답안 리스트 관리
    const [showDescription, setShowDescription] = useState(false); // 문제 설명 표시 여부 관리
    const [showExplanation, setShowExplanation] = useState(false); // 해설 입력란 표시 여부 관리
    const [explanation, setExplanation] = useState(""); // 해설 관리
    const [oxSelected, setOxSelected] = useState(""); // OX 선택 상태 관리

    // 답안 추가 핸들러
    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
    };

    // 특정 답안 삭제 핸들러
    const handleDeleteAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    // 문제 설명 삭제 핸들러
    const handleDeleteDescription = () => {
        setShowDescription(false);
    };

    // 문제 해설 삭제 핸들러
    const handleDeleteExplanation = () => {
        setShowExplanation(false);
    };

    // OX 선택 핸들러
    const handleOxSelect = (selection) => {
        setOxSelected(selection);
    };

    // 질문 접기/펼치기 핸들러
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [isCollapsed, setIsCollapsed] = useState(false); // 질문 접힘 상태 관리

    return (
        <div ref={preview} style={{opacity: isDragging ? 0.5 : 1}}
             className="flex flex-col gap-4 px-10 py-4 rounded shadow-lg bg-gray-100">
            <div className="flex items-center space-x-2 justify-center cursor-move" ref={ref}>
                <DragHandleIcon/> {/* 드래그 핸들 아이콘 */}
            </div>
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">{title || "문제 질문"}</Typography>
                <div>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>} {/* 질문 접기/펼치기 아이콘 */}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (  // 질문이 접혀있지 않을 때만 내용 표시
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <TextField
                            fullWidth
                            label={"문제 질문"}
                            placeholder="질문을 입력하세요."
                            variant={"standard"}
                            value={title}
                            onChange={(e) => onUpdateQuestion(e.target.value, description, questionType, solution)}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="visibility-label">문제 형식</InputLabel>
                            <Select
                                labelId="visibility-label"
                                value={questionType}
                                label="문제 형식"
                                variant={"standard"}
                                onChange={(e)=> onUpdateQuestion(title, description, e.target.value, solution)}
                            >
                                <MenuItem value={0}>선택형</MenuItem>
                                <MenuItem value={1}>다중선택형</MenuItem>
                                <MenuItem value={2}>OX 선택형</MenuItem>
                                <MenuItem value={3}>단답형</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {showDescription && (  // 문제 설명이 있을 때만 표시
                        <div className="flex gap-4">
                            <TextField
                                fullWidth multiline
                                label={"문제 설명"}
                                placeholder="여러줄로 문제 설명을 입력할 수 있습니다."
                                variant={"standard"}
                                value={description}
                                onChange={(e) => onUpdateQuestion(title, e.target.value, questionType, solution)}
                            />
                            <IconButton>
                                <InsertPhotoIcon/>
                            </IconButton>
                            <IconButton onClick={handleDeleteDescription}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    )}
                    {questionType === 0 && (  // 선택형 문제일 경우
                        <div className={"flex flex-col gap-2"}>
                            {answers.map((answer, index) => (
                                <div key={index} className="flex gap-4 items-end">
                                    <Radio/>
                                    <TextField
                                        fullWidth multiline
                                        label={"답안"}
                                        placeholder="답안을 입력하세요."
                                        variant={"standard"}
                                        value={answer}
                                        onChange={(e) => {
                                            const newAnswers = [...answers];
                                            newAnswers[index] = e.target.value;
                                            setAnswers(newAnswers);
                                        }}
                                    />
                                    <IconButton>
                                        <InsertPhotoIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteAnswer(index)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            ))}
                            <div className="flex gap-4 items-center">
                                <Button onClick={handleAddAnswer}>답안 추가</Button> {/* 답안 추가 버튼 */}
                            </div>
                        </div>
                    )}
                    {questionType === 1 && (  // 다중선택형 문제일 경우
                        <div className={"flex flex-col gap-2"}>
                            {answers.map((answer, index) => (
                                <div key={index} className="flex gap-4 items-end">
                                    <Checkbox/>
                                    <TextField
                                        fullWidth multiline
                                        label={"답안"}
                                        placeholder="답안을 입력하세요."
                                        variant={"standard"}
                                        value={answer}
                                        onChange={(e) => {
                                            const newAnswers = [...answers];
                                            newAnswers[index] = e.target.value;
                                            setAnswers(newAnswers);
                                        }}
                                    />
                                    <IconButton>
                                        <InsertPhotoIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteAnswer(index)}>
                                        <CloseIcon/>
                                    </IconButton>
                                </div>
                            ))}
                            <div className="flex gap-4 items-center">
                                <Button onClick={handleAddAnswer}>답안 추가</Button> {/* 답안 추가 버튼 */}
                            </div>
                        </div>
                    )}
                    {questionType === 2 && (  // OX 선택형 문제일 경우
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
                    {questionType === 3 && (  // 단답형 문제일 경우
                        <div className={"flex flex-col gap-2"}>
                            <TextField
                                fullWidth
                                label={"답안"}
                                placeholder="정답을 입력하세요."
                                variant={"standard"}/>
                        </div>
                    )}
                    {showExplanation && (  // 해설 입력란이 표시되어 있을 경우
                        <div className="flex gap-4">
                            <TextField
                                fullWidth multiline
                                label={"문제 해설"}
                                placeholder="여러줄로 문제 해설을 입력할 수 있습니다."
                                variant={"standard"}
                                value={explanation}
                                onChange={(e) => onUpdateQuestion(title, description, questionType, e.target.value)}
                            />
                            <IconButton>
                                <InsertPhotoIcon/>
                            </IconButton>
                            <IconButton onClick={handleDeleteExplanation}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    )}
                    <QuestionButtons
                        onDuplicate={onDuplicate} // 질문 복제 핸들러
                        onDelete={onDelete} // 질문 삭제 핸들러
                        totalQuestions={totalQuestions} // 전체 질문 수
                        answers={answers} // 답안 리스트
                        setAnswers={setAnswers} // 답안 리스트 업데이트 함수
                        showExplanation={showExplanation} // 해설 입력란 표시 여부
                        setShowExplanation={setShowExplanation} // 해설 입력란 표시 여부 업데이트 함수
                        showDescription={showDescription} // 문제 설명
                        setShowDescription={setShowDescription} // 문제 설명 업데이트 함수
                    />
                </div>
            )}
        </div>
    );
}
