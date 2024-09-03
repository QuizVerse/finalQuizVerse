import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SearchInput({ value, onChange, onSearch }) {
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 검색을 처리하는 함수
    const handleSearch = () => {
        if (searchKeyword) {
            // 검색어를 쿼리 파라미터로 추가하여 URL 업데이트
            navigate(`/book/searchbook?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };

    // 엔터 키를 눌렀을 때 검색을 수행하는 함수
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // 엔터 키가 눌렸을 때 검색 함수 호출
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
                onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
            />
            <IconButton style={{ marginLeft: "-50px" }} onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </div>
    );
}
