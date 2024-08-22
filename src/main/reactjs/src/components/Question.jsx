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
import React, {useState} from "react";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export default function Question(props) {

    // More 버튼 관련
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [visibility, setVisibility] = useState('');

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


    return (
        <>
            <div className="flex flex-col gap-4 px-10 py-4 rounded shadow-lg bg-gray-100">
                <div className="flex items-center space-x-2 justify-center cursor-move">
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
                        {/**
                         * @Todo : select 하면 문제 type 변경
                         */}
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
                        />
                        {/**
                         * @Todo : 문제 설명에 사진 추가 버튼 기능 구현
                         */}
                        <IconButton>
                            <InsertPhotoIcon/>
                        </IconButton>
                        {/**
                         * @Todo : 문제 설명 삭제 버튼 기능 구현
                         */}
                        <IconButton>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    { /* 선택형 */
                        props.type &&
                        props.type === 0 ? <div>
                            <div className="flex gap-4 items-end">
                                <Radio/>
                                <TextField
                                    fullWidth multiline
                                    label={"답안"}
                                    placeholder="답안을 입력하세요."
                                    variant={"standard"}
                                />
                                {/**
                                 * @Todo : 문제 설명에 사진 추가 버튼 기능 구현
                                 */}
                                <IconButton>
                                    <InsertPhotoIcon/>
                                </IconButton>
                                {/**
                                 * @Todo : 문제 설명 삭제 버튼 기능 구현
                                 */}
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                            {/**
                             * @Todo : 답안 추가 버튼 기능 구현
                             */}
                            <div className="flex gap-4 items-center">
                                <Radio/>
                                <Button>답안 추가</Button>
                            </div>
                        </div> :""
                    }

                    {   /* 다중선택형 */
                        props.type &&
                        props.type === 1 ? <div>
                            <div className="flex gap-4 items-end">
                                <Checkbox />
                                <TextField
                                    fullWidth multiline
                                    label={"답안"}
                                    placeholder="답안을 입력하세요."
                                    variant={"standard"}
                                />
                                {/**
                                 * @Todo : 문제 설명에 사진 추가 버튼 기능 구현
                                 */}
                                <IconButton>
                                    <InsertPhotoIcon/>
                                </IconButton>
                                {/**
                                 * @Todo : 문제 설명 삭제 버튼 기능 구현
                                 */}
                                <IconButton>
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                            {/**
                             * @Todo : 답안 추가 버튼 기능 구현
                             */}
                            <div className="flex gap-4 items-center">
                                <Radio/>
                                <Button>답안 추가</Button>
                            </div>
                        </div> :""
                    }

                    {   /* ox 선택형 */
                        props.type &&
                        props.type === 2 ? <div>
                            <div className="flex gap-4 items-end">
                                {/**
                                 * @Todo : ox 답안 선택 기능 추가
                                 * 선택한 경우 variant contained, 선택하지 않은 경우 outlined, 둘중 하나만 선택가능
                                 */}
                                <Button
                                    className="flex items-center justify-center w-1/2 h-32 border-2 border-blue-300 text-blue-500 text-4xl font-bold"
                                    size={"large"} variant={"contained"}>
                                    <PanoramaFishEyeIcon fontSize={"large"}/>
                                </Button>
                                <Button
                                    className="flex items-center justify-center w-1/2 h-32 border-2 border-red-300 text-red-500 text-4xl font-bold"
                                    color={"warning"} variant={"outlined"}>
                                    <CloseIcon fontSize={"large"}/>
                                </Button>
                            </div>
                        </div> : ""
                    }
                    {   /* 단답형 */
                        props.type &&
                        props.type === 3 ?
                        <div>
                            <div className="flex gap-4 items-end">
                                <TextField
                                    fullWidth multiline
                                    label={"단답형 답안"}
                                    placeholder="답안을 입력하세요."
                                    variant={"standard"}
                                />
                            </div>
                        </div> :""
                    }
                    <div className="flex gap-4 justify-end">
                        {/**
                         * @Todo : 문제 복제 버튼 기능 구현
                         */}
                        <IconButton>
                            <ContentCopyIcon/>
                        </IconButton>
                        {/**
                         * @Todo : 문제 삭제 버튼 기능 구현 - 문제가 하나 밖에 없을 경우에는 삭제 되지 않도록 구현
                         */}
                        <IconButton>
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
                            {/**
                             * @Todo : 문제 설명 입력란이 없는 경우에만 보임, 누를 경우 문제 설명 입력란이 추가됨
                             */}
                            <MenuItem onClick={handleSettingClose}>설명 추가</MenuItem>
                            {/**
                             * @Todo : 현재 문제의 답안을 무작위로 섞음
                             */}
                            <MenuItem onClick={handleSettingClose}>답안 무작위로 섞기</MenuItem>
                            {/**
                             * @Todo : 문제 해설 입력란이 없는 경우에만 보임, 누를 경우 문제 해설 입력란이 추가됨
                             */}
                            <MenuItem onClick={handleSettingClose}>해설 추가</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
}

