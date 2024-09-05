// v0 by Vercel.
// https://v0.dev/t/3SShzm6vJSF

import React, { useState } from 'react';
import { Stack, Pagination, TextField, MenuItem } from "@mui/material";
import BookCardH from "../../components/BookCardH";



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
    label: '가나다순',
  },
];

const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 아이템 수
const SPACING = 2; // 페이지네이션 버튼 간의 간격

export default function Wrong() {
  // 데이터 배열 생성: 반복되는 이미지와 내용을 포함
  const items = Array.from({ length: 20 }, (_, index) => {
    const images = []; // 반복할 이미지 배열
    const titles = ["홍지혜", "이아희", "장나영", "이시연", "규진"];
    const categories = ["카", "테", "고", "리"];
    const nicknames = ["엔믹스", "QWER"];
    
    return {
      photo: images[index % images.length], // 이미지를 순환하도록 설정
      createDate: `2023-12-12`,
      nickname: nicknames[index % nicknames.length], // 닉네임 순환
      title: titles[index % titles.length], // 타이틀 순환
      category: categories[index % categories.length] // 카테고리 순환
    };
  });

  // 페이지 상태 관리
  const [page, setPage] = useState(1);

  // 페이지 변경 시 처리 함수
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  // 현재 페이지에 표시할 아이템 계산
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <main className="flex-1 p-6">
      <h1 className="mb-6 text-2xl font-bold">오답노트</h1>
      <div className="flex items-center mb-6 space-x-4">
        <input
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
          placeholder="Name, email, etc..."
        />
        <TextField
              id="outlined-select-currency"
              select
              defaultValue="popular"
          >
            {conditions &&
                conditions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>
        <select
          aria-hidden="true"
          tabindex="-1"
        >
          <option value=""></option>
        </select>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-5 h-5"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>

      {/* BookCard 목록 출력 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item, index) => (
          <BookCardH
            key={index}
            cardType="C"
            className={"flex-1"}
            photo={item.photo}
            createDate={item.createDate}
            nickname={item.nickname}
            title={item.title}
            category={item.category}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
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
