import {IconButton, Menu, MenuItem} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";

export default function QuestionButtons(props) {

    // More 버튼 관련
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [answers, setAnswers] = useState([]); // 답안 리스트 상태 관리
    const [questionDesc, setQuestionDesc] = useState(""); // 문제 설명 상태 관리
    const [showExplanation, setShowExplanation] = useState(false); // 해설 입력란 보이기 여부 상태

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
     * @description : 문제 복제 버튼 기능 구현
     */
    const handleDuplicateQuestion = () => {
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
     * @description : 문제 해설 입력란 추가 기능
     */
    const handleAddExplanation = () => {
        setShowExplanation(true);
        handleSettingClose();
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
        <div className="flex gap-4 justify-end">
            <IconButton onClick={handleDuplicateQuestion}>
                <ContentCopyIcon/>
            </IconButton>
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
                {!questionDesc && (
                    <MenuItem onClick={handleAddDescription}>설명 추가</MenuItem>
                )}
                <MenuItem onClick={handleShuffleAnswers}>답안 무작위로 섞기</MenuItem>
                {!showExplanation && (
                    <MenuItem onClick={handleAddExplanation}>해설 추가</MenuItem>
                )}
            </Menu>
        </div>
    );
}
