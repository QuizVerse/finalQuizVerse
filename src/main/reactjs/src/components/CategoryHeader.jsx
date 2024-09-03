import { Button, IconButton, TableCell, TableRow, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 훅을 import

export default function CategoryHeader() {
    const [categoryList, setCategoryList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        getDataList();
    }, []);

    const getDataList = () => {
        axios({
            method: 'get',
            url: '/category/list',
        }).then(res => {
            console.log(res);
            setCategoryList(res.data);
        });
    };

    const handleSearch = () => {
        if (searchKeyword) {
            // 검색어를 쿼리 파라미터로 추가하여 URL 업데이트
            navigate(`/book/searchbook?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };

    return (
        <div className="flex justify-between px-12 py-4 items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {categoryList &&
                    categoryList.map((row) => (
                        <Button key={row.categoryId}
                                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">
                            <Link to={`/book/category?cat=${row.categoryId}`}>{row.categoryName}</Link>
                        </Button>
                    ))
                }
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">
                    <Link to={'/book/list'}>전체보기</Link>
                </Button>
            </div>
            {/* 검색어 입력 필드와 버튼 */}
            <div>
                <TextField
                    label="검색어 입력"
                    variant="outlined"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button variant="contained" onClick={handleSearch}>
                    검색
                </Button>
            </div>
        </div>
    );
}
