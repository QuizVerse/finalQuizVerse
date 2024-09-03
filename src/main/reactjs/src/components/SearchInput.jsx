import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

export default function SearchInput({ value, onChange, onSearch }) {
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용
    const handleSearch = () => {
        if (searchKeyword) {
            // 검색어를 쿼리 파라미터로 추가하여 URL 업데이트
            navigate(`/book/searchbook?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };
    return (
        <div className="flex items-center justify-center">
            <TextField
                placeholder="검색어를 입력해주세요."
                className="w-full max-w-md px-4 py-2 border rounded"
                type="text"
                style={{ width: "300px" }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <IconButton style={{ marginLeft: "-50px" }} onClick={handleSearch}>
                <SearchIcon />
            </IconButton>

           
        </div>
    );
}
