import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Radio,
    Select,
    TextField, Typography
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useRef, useState} from "react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import {useDrag, useDrop} from "react-dnd";

const ITEM_TYPE = 'QUESTION';

export default function Question(props, {index, moveQuestion}) {

    // drag and drop 관련
    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveQuestion(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    // More 버튼 관련
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [visibility, setVisibility] = useState('');
    const [answers, setAnswers] = useState([]); // 답안 리스트 상태 관리
    const [questionDesc, setQuestionDesc] = useState(""); // 문제 설명 상태 관리
    const [showExplanation, setShowExplanation] = useState(false); // 해설 입력란 보이기 여부 상태
    const [explanation, setExplanation] = useState(""); // 해설 상태 관리
    const [oxSelected, setOxSelected] = useState(""); // OX 선택 상태 관리

    /**
     * @description : More 버튼 클릭했을때
     * */
    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * @description : More 닫힐 때
     * */
    const handleSettingClose = () => {
        setAnchorEl(null);
    };

    /**
     * @description : 문제형식 select 메뉴 보이기 여부 조절
     * */
    const handleVisibilityChange = (event) => {
        setVisibility(event.target.value);
    };

    /**
     * @description : 답안 추가 버튼 클릭 시 새로운 답안을 추가
     */
    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
    };

    /**
     * @description : 특정 답안을 삭제
     */
    const handleDeleteAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    /**
     * @description : 문제 복제 버튼 기능 구현
     */
    const handleDuplicateQuestion = () => {
        // props.onDuplicate는 부모 컴포넌트에서 제공되어야 함
        if (props.onDuplicate) {
            props.onDuplicate();
        }
    };

    /**
     * @description : 문제 삭제 버튼 기능 구현 - 문제가 하나 밖에 없을 경우에는 삭제 되지 않도록 구현
     */
    const handleDeleteQuestion = () => {
        if (props.onDelete && props.totalQuestions > 1) {
            props.onDelete();
        }
    };

    /**
     * @description : 문제 설명 입력란 추가 기능
     */
    const handleAddDescription = () => {
        if (!questionDesc) {
            setQuestionDesc("");
        }
        handleSettingClose();
    };

    /**
     * @description : 문제 설명 삭제 버튼 기능 구현
     */
    const handleDeleteDescription = () => {
        setQuestionDesc("");
    };

    /**
     * @description : 문제 해설 입력란 추가 기능
     */
    const handleAddExplanation = () => {
        setShowExplanation(true);
        handleSettingClose();
    };

    /**
     * @description : OX 답안 선택 기능 추가
     */
    const handleOxSelect = (selection) => {
        setOxSelected(selection);
    };

    /**
     * @description : 답안 무작위로 섞기 기능
     */
    const handleShuffleAnswers = () => {
        const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
        setAnswers(shuffledAnswers);
        handleSettingClose();
    };

    return (
        <>
            <div ref={preview} style={{opacity: isDragging ? 0.5 : 1}}  className="flex flex-col gap-4 px-10 py-4 rounded shadow-lg bg-gray-100">
                <div className="flex items-center space-x-2 justify-center cursor-move" ref={ref}>
                    <DragHandleIcon/>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <TextField
                            fullWidth
                            label={"문제 질문"}
                            placeholder="질문을 입력하세요."
                            variant={"standard"}
                        />
                        {/* 문제형식 select 메뉴 */}
                        <FormControl fullWidth>
                            <InputLabel id="visibility-label">문제 형식</InputLabel>
                            <Select
                                labelId="visibility-label"
                                value={visibility}
                                label="문제 형식"
                                variant={"standard"}
                                onChange={handleVisibilityChange}
                            >
                                <MenuItem value={0}>선택형</MenuItem>
                                <MenuItem value={1}>다중선택형</MenuItem>
                                <MenuItem value={2}>ox 선택형</MenuItem>
                                <MenuItem value={3}>단답형</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="flex gap-4">
                        <TextField
                            fullWidth multiline
                            label={"문제 설명"}
                            placeholder="여러줄로 문제 설명을 입력할 수 있습니다."
                            variant={"standard"}
                            value={questionDesc}
                            onChange={(e) => setQuestionDesc(e.target.value)}
                        />
                        {/* 문제 설명에 사진 추가 버튼 기능 구현 */}
                        <IconButton>
                            <InsertPhotoIcon/>
                        </IconButton>
                        {/* 문제 설명 삭제 버튼 기능 구현 */}
                        <IconButton onClick={handleDeleteDescription}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    { /* 선택형 */
                        visibility === 0 ? (
                            <div>
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
                                        {/* 답안에 사진 추가 버튼 기능 구현 */}
                                        <IconButton>
                                            <InsertPhotoIcon/>
                                        </IconButton>
                                        {/* 답안 삭제 버튼 기능 구현 */}
                                        <IconButton onClick={() => handleDeleteAnswer(index)}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                ))}
                                {/* 답안 추가 버튼 기능 구현 */}
                                <div className="flex gap-4 items-center">
                                    <Radio/>
                                    <Button onClick={handleAddAnswer}>답안 추가</Button>
                                </div>
                            </div>
                        ) : ""
                    }

                    {   /* 다중선택형 */
                        visibility === 1 ? (
                            <div>
                                {answers.map((answer, index) => (
                                    <div key={index} className="flex gap-4 items-end">
                                        <Checkbox />
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
                                        {/* 답안에 사진 추가 버튼 기능 구현 */}
                                        <IconButton>
                                            <InsertPhotoIcon/>
                                        </IconButton>
                                        {/* 답안 삭제 버튼 기능 구현 */}
                                        <IconButton onClick={() => handleDeleteAnswer(index)}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>
                                ))}
                                {/* 답안 추가 버튼 기능 구현 */}
                                <div className="flex gap-4 items-center">
                                    <Checkbox />
                                    <Button onClick={handleAddAnswer}>답안 추가</Button>
                                </div>
                            </div>
                        ) : ""
                    }

                    {   /* ox 선택형 */
                        visibility === 2 ? (
                            <div>
                                <div className="flex gap-4 items-end">
                                    {/* OX 답안 선택 기능 추가 */}
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
                        ) : ""
                    }

                    {   /* 단답형 */
                        visibility === 3 ? (
                            <div>
                                <div className="flex gap-4 items-end">
                                    <TextField
                                        fullWidth multiline
                                        label={"단답형 답안"}
                                        placeholder="답안을 입력하세요."
                                        variant={"standard"}
                                    />
                                </div>
                            </div>
                        ) : ""
                    }

                    {/* 해설 입력란 */}
                    {showExplanation && (
                        <div className="flex gap-4">
                            <TextField
                                fullWidth
                                label={"문제 해설"}
                                placeholder="해설을 입력하세요."
                                variant={"standard"}
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex gap-4 justify-end">
                        {/* 문제 복제 버튼 기능 구현 */}
                        <IconButton onClick={handleDuplicateQuestion}>
                            <ContentCopyIcon/>
                        </IconButton>
                        {/* 문제 삭제 버튼 기능 구현 */}
                        <IconButton onClick={handleDeleteQuestion}>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton onClick={handleMoreClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleSettingClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}>
                            {/* 문제 설명 입력란 추가 */}
                            {!questionDesc && (
                                <MenuItem onClick={handleAddDescription}>설명 추가</MenuItem>
                            )}
                            {/* 답안 무작위로 섞기 */}
                            <MenuItem onClick={handleShuffleAnswers}>답안 무작위로 섞기</MenuItem>
                            {/* 해설 입력란 추가 */}
                            {!showExplanation && (
                                <MenuItem onClick={handleAddExplanation}>해설 추가</MenuItem>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
}
