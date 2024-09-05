import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, MenuItem, TextField } from '@mui/material';

// 필터
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'old', label: '오래된순' },
  { value: 'title', label: '제목순' },
];

const ITEMS_PER_PAGE = 8; // 페이지당 출력할 아이템 수
const SPACING = 2; // 페이지네이션 사이의 간격

export default function PublishedBook() {
  const [bookList, setBookList] = useState([]); // 책 목록 상태
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [sort, setSort] = useState('popular'); // 정렬 기준 상태
  const [userId, setUserId] = useState(null); // 사용자 ID 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 페이지 변경 처리
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // 페이지가 바뀔 때 상단으로 스크롤
  };

  // 정렬 기준 변경 처리
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // 사용자 정보를 가져오는 함수
  const getUserDto = async () => {
    try {
      const res = await axios.get(`/publishedbook/user-id`); // URL 수정
      setUserId(res.data); // 서버에서 반환된 userId 사용
    } catch (error) {
      setError(error);
    }
  };

  // book list 출력
  const getBookList = async () => {
    try {
      const res = await axios.get(`/publishedbook/user-books?userId=${userId}`);
      setBookList(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    getUserDto();
  }, []);

  useEffect(() => {
    if (userId) { // userId가 설정된 이후에만 책 목록을 가져옴
      getBookList();
    }
  }, [userId]); // userId가 변경될 때마다 책 목록을 가져옴

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 현재 페이지에 표시할 항목 계산
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks = bookList.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(bookList.length / ITEMS_PER_PAGE);

  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">나의 출제이력</h1>
      </div>
      <div className="flex items-center mb-6 space-x-4">
        <input
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
          placeholder="Search..."
        />
        <TextField
          id="outlined-select-sort"
          select
          value={sort}
          onChange={handleSortChange}
        >
          {conditions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained">
          문제출제하기
        </Button>
      </div>

      {/* BookCard 출력 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <BookCard
              key={book.bookId} // bookId를 키로 사용
              cardType="B"
              className="flex-1"
              photo={book.bookImage}
              createDate={book.bookCreatedate}
              title={book.bookTitle}
            />
          ))
        ) : (
          <div>No books available</div>
        )}
      </div>

      {/* 페이지네이션 */}
      <Stack spacing={SPACING} justifyContent="center" direction="row" mt={4}>
        <Pagination
          count={pageCount} // 전체 페이지 수
          page={page} // 현재 페이지 번호
          onChange={handleChange} // 페이지 변경 시 호출되는 함수
          showFirstButton // 첫 페이지로 이동 버튼 표시
          showLastButton // 마지막 페이지로 이동 버튼 표시
        />
      </Stack>
    </main>
  );
}
