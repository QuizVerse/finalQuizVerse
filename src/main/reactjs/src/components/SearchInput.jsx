import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ value, onChange, onSearch }) {
    const [searchKeyword, setSearchKeyword] = useState(value || ""); // props로 받은 value를 기본값으로 설정

    // 엔터 키를 눌렀을 때 검색을 수행하는 함수
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && onSearch) {
            onSearch(searchKeyword); // 부모 컴포넌트에서 전달받은 onSearch 함수 호출
        }
    };

    // 버튼 클릭 시 검색을 수행하는 함수
    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(searchKeyword); // 부모 컴포넌트에서 전달받은 onSearch 함수 호출
        }
    };

    return (
        <div className="flex items-center justify-center">
            <TextField
                placeholder="검색어를 입력해주세요."
                className="w-full max-w-md px-4 py-2 border rounded"
                type="text"
                size={"small"}
                style={{ width: "300px" }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
            />
            <IconButton style={{ marginLeft: "-50px" }} onClick={handleSearchClick}>
                <SearchIcon />
            </IconButton>
        </div>
    );
}
