// v0 by Vercel.
// https://v0.dev/t/hx5RoREe1hV

import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useState } from 'react';


//필터
const conditions = [
  {
    value: 'popular',
    label: '인기순',
  },
  {
    value: 'recent',
    label: '최신순',
  },
  {
    value: 'old',
    label: '오래된순',
  },
  {
    value: 'title',
    label: '제목순',
  },
];


const ITEMS_PER_PAGE=8;
const SPACING=2;

export default function Bookmark() {
  const items= Array.from({length:30},(_, index) => ({
    photo:"",
    createDate:`2023-12${12-index}`,//각 항목의 날짜를 조금씩 다르게
    nickname:"엔믹스",
    title:`규진 ${index+1}`,
    category:"처음뵙겠습니다"
}));

//페이지 관리
const [page, setPage] = useState(1);

//페이지 변경 처리
const handleChange=(event, value) => {
  setPage(value);
  window.scrollTo(0,0); //페이지가 바뀔 때 상단으로 스크롤
};

//현재 페이지에 표시할 항목 계산
const itemoffset=(page-1)*ITEMS_PER_PAGE;
const currentItems=items.slice(itemoffset, itemoffset+ITEMS_PER_PAGE);
const pageCount=Math.ceil(items.length/ITEMS_PER_PAGE);

  return (
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">즐겨찾기</h1>
          <div className="flex items-center space-x-4">
            <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                placeholder="Name, email, etc..."
            />
            <div className="flex items-center mb-6 space-x-4">
                <TextField
                    id="outlined-select-currency"
                    select
                    defaultValue="popular">
                      {conditions &&
                      conditions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                  ))}
                </TextField>
           </div>
            <select
                aria-hidden="true"
                tabIndex="-1"
            >
              <option value=""></option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item, index) => (
          <BookCard
          key={index}
          cardType="A"
          className={"flex-1"}
          photo={item.photo}
          createDate={item.createDate}
          nickname={item.nickname}
          title={item.title}
          category={item.category}
          />
        ))}  
        </div>
        {/*페이지네이션*/}
        <Stack spacing={SPACING} justifyContent="center" direction="row" mt={4}>
          <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
          />
        </Stack>
      </main>
    );
}
