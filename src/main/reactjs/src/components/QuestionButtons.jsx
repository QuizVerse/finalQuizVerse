import {IconButton, Menu, MenuItem} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, {useState} from "react";
import {Tooltip} from "@mui/material";

export default function QuestionButtons(props) {
    const [anchorEl, setAnchorEl] = useState(null); // 메뉴 열림 여부를 관리하는 상태
    const open = Boolean(anchorEl); // 메뉴 열림 상태

    // '더 보기' 버튼 클릭 시 메뉴 열기
    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // 메뉴 닫기
    const handleSettingClose = () => {
        setAnchorEl(null);
    };

    // 질문 복제 핸들러 호출
    const handleDuplicateQuestion = () => {
        if (props.onDuplicate) {
            props.onDuplicate();
        }
    };

    // 질문 삭제 핸들러 호출 (최소 1개의 질문이 남아있어야 함)
    const handleDeleteQuestion = () => {
        props.onDelete();
    };

    // 문제 설명 추가 핸들러
    const handleAddDescription = () => {
        if (!props.questionDesc) {
            props.setQuestionDesc(true); // 문제 설명을 빈 문자열로 초기화하여 추가
        }
        handleSettingClose(); // 메뉴 닫기
    };

    // 해설 추가 핸들러
    const handleAddExplanation = () => {
        props.setShowExplanation(true); // 해설 입력란을 표시
        handleSettingClose(); // 메뉴 닫기
    };

    // 답안 섞기 핸들러
    const handleShuffleAnswers = () => {
        const shuffledAnswers = [...props.answers].sort(() => Math.random() - 0.5); // 답안을 무작위로 섞음
        props.setAnswers(shuffledAnswers); // 섞인 답안 리스트로 업데이트
        handleSettingClose(); // 메뉴 닫기
    };

    return (
        <div className="flex gap-4 justify-end">
            <Tooltip title="질문 복제">
                <IconButton onClick={handleDuplicateQuestion}>
                    <ContentCopyIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="질문 삭제">
                <IconButton onClick={handleDeleteQuestion}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="설정 더보기">
                <IconButton onClick={handleMoreClick}>
                    <MoreVertIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleSettingClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                {!props.questionDesc && (
                    <MenuItem onClick={handleAddDescription}>설명 추가</MenuItem> /* 설명 추가 메뉴 */
                    )}
                <MenuItem onClick={handleShuffleAnswers}>답안 무작위로 섞기</MenuItem> {/* 답안 섞기 메뉴 */}
                {!props.showExplanation && (
                    <MenuItem onClick={handleAddExplanation}>해설 추가</MenuItem> /* 해설 추가 메뉴 */
                    )}
            </Menu>
        </div>
    );
}
