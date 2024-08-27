import {Button, IconButton, TableCell, TableRow, TextField} from "@mui/material";
import SearchInput from "./SearchInput";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function CategoryHeader() {
    const [categoryList,setCategoryList]=useState([]);
    //axio get으로 보내서 url
    //처음 딱 한번 목록 가져오기
    useEffect(()=>{
        getDataList();
    },[]);

    const getDataList=()=>{
        axios({
            method:'get',
            url:'/category/list',
        }).then(res=>{
            console.log(res);
            setCategoryList(res.data);
        })
    }

    return (
        <div className="flex justify-between px-12 py-4 items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
                {categoryList &&
                    categoryList.map((row) => (
                        <Button key={row.categoryId}
                            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">
                            <Link to={"/book/category?cat="+row.categoryId}>{row.categoryName}</Link>
                        </Button>
                    ))
                }
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">
                    <Link to={'/book/category'}>전체보기</Link>
                </Button>
            </div>
            <SearchInput/>
        </div>
    )
}
