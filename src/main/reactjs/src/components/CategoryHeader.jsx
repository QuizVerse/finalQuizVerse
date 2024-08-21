import {Button, IconButton, TableCell, TableRow, TextField} from "@mui/material";
import SearchInput from "./SearchInput";
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function CategoryHeader() {
    const [categoryList,setCategoryList]=useState([]);

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
                        <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">{row.category_name}</Button>
                    ))
                }
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">전체보기</Button>
            </div>
            <SearchInput/>
        </div>
    )
}
