import React, { useState } from 'react';
import BookCardH from "../../components/BookCardH";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, MenuItem, TextField } from '@mui/material';

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
const ITEMS_PER_PAGE = 8; // 페이지당 출력할 아이템 수
const SPACING = 2;

export default function PublishedBook() {
  // BookCard에 표시될 아이템 데이터 배열
  const items = [
    { photo: "", createDate: "1998-11-01", nickname: "홍지혜", title: "Q", category: "드럼 / 리다" },
    { photo: "", createDate: "1997-06-02", nickname: "이아희", title: "W", category: "베이스 / 4줄기타" },
    { photo: "", createDate: "2001-01-30", nickname: "장나영", title: "E", category: "기타 / 메인기타" },
    { photo: "", createDate: "2000-05-16", nickname: "이시연", title: "R", category: "보컬 / 서브기타" },
    { photo: "", createDate: "2000-05-16", nickname: "이시연", title: "R", category: "보컬 / 서브기타" },
    { photo: "", createDate: "2001-01-30", nickname: "장나영", title: "E", category: "기타 / 메인기타" },
    { photo: "", createDate: "1997-06-02", nickname: "이아희", title: "W", category: "베이스 / 4줄기타" },
    { photo: "", createDate: "1998-11-01", nickname: "홍지혜", title: "Q", category: "드럼 / 리다" },
    { photo: "", createDate: "1997-06-02", nickname: "이아희", title: "W", category: "베이스 / 4줄기타" },
    { photo: "", createDate: "1998-11-01", nickname: "홍지혜", title: "Q", category: "드럼 / 리다" },
  ];

  // 페이지 관리
  const [page, setPage] = useState(1);

  // 페이지 변경 처리
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // 페이지가 바뀔 때 상단으로 스크롤
  };

  // 현재 페이지에 표시할 항목 계산
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">나의 출제이력</h1>
        
      </div>
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
          <Button variant='contained'>
            문제출제하기
          </Button>
      </div>

      {/* BookCardH 출력 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item, index) => (
          <BookCardH
            key={index}
            cardType="B"
            className="flex-1"
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
