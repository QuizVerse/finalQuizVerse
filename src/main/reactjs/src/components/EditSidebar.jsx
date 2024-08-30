import {IconButton, Tooltip} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import LoopIcon from "@mui/icons-material/Loop";
import React from "react";

export default function EditSidebar({ onAddSection, onSortSection }) {
    return (
        <aside className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 flex flex-col border-gray-300 border rounded p-4">
            <Tooltip title="섹션 재정렬">
                <IconButton onClick={onSortSection}>
                    <LoopIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="섹션 추가">
                <IconButton onClick={onAddSection}>
                    <ArticleIcon />
                </IconButton>
            </Tooltip>
        </aside>
    );
}
