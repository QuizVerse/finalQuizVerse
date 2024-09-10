import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function CategoryHeader() {
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDataList();
    }, []);

    const getDataList = () => {
        axios.get('/category/list')
            .then(res => {
                setCategoryList(res.data);
            });
    };

    // 검색 시 navigate 처리
    const handleSearch = (keyword) => {
        if (keyword) {
            navigate(`/book/searchbook?keyword=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <div className="flex justify-between px-8 py-4 items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {categoryList &&
                    categoryList.map((row) => (
                        <Button key={row.categoryId}
                                size={"large"}
                                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">
                            <Link to={`/book/category?cat=${row.categoryId}`}>{row.categoryName}</Link>
                        </Button>
                    ))
                }
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">
                    <Link to={'/book/list'}>전체보기</Link>
                </Button>
            </div>
            <div>
                <SearchInput onSearch={handleSearch} /> {/* 검색 시 handleSearch 실행 */}
            </div>
        </div>
    );
}
