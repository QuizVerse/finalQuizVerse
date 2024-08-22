// v0 by Vercel.
// https://v0.dev/t/DgsfEP9Xtbj
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton, TextField, Typography} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import LoopIcon from '@mui/icons-material/Loop';

export default function Section() {
    // 섹션 접고 펴는 상태
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 섹션 접고 펴는 함수
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex flex-col gap-4 bg-blue-50 px-10 py-4 rounded">
            <div className="flex items-center space-x-2 justify-between">
                <Typography variant="h5">섹션 제목</Typography>
                <div>
                    <span>1 섹션 / 3 섹션</span>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                    </IconButton>
                </div>
            </div>
            {!isCollapsed && (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                    <TextField
                            fullWidth
                            label={"섹션 제목"}
                            placeholder="질문을 입력하세요."
                            variant={"standard"}
                        />
                        <TextField
                            fullWidth
                            multiline
                            label={"섹션 설명"}
                            placeholder="여러줄로 섹션 설명을 입력할 수 있습니다."
                            variant={"standard"}
                        />
                    </div>
                    <div className="flex gap-4 justify-end">
                        <IconButton>
                            <ContentCopyIcon/>
                        </IconButton>
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton>
                            <LoopIcon/>
                        </IconButton>
                    </div>
                </div>
            )}

        </div>
    );
}
