import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button, MenuItem, TextField } from '@mui/material';

// 필터 조건
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'old', label: '오래된순' },
  { value: 'title', label: '제목순' },
];

const ITEMS_PER_PAGE = 8; // 페이지당 아이템 수
const SPACING = 2; // 페이지네이션 간격

export default function PublishedBook() {
  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

  const [bookList, setBookList] = useState([]); // 책 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [sort, setSort] = useState('popular'); // 정렬 기준
  const [userId, setUserId] = useState(null); // 사용자 ID
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
   // 마이크 상태를 관리하는 state (초기값: off)
   const [isMicOn, setIsMicOn] = useState(false);

   // 마이크 상태를 토글하는 함수
   const toggleMic = () => {
     setIsMicOn((prevState) => !prevState); // 이전 상태를 반대로 변경
   };

   // 카메라 상태를 관리하는 state (초기값: off)
  const [isCameraOn, setIsCameraOn] = useState(false);

  // 카메라 상태를 토글하는 함수
  const toggleCamera = () => {
    setIsCameraOn((prevState) => !prevState); // 이전 상태를 반대로 변경
  };

  // 페이지 변경 핸들러
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // 페이지가 바뀔 때 상단으로 이동
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // 사용자 로그인 상태 및 ID 가져오기
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`/book/username`); // 사용자 정보 요청
      setUserId(res.data.userId);
      setIsLoggedIn(true); // 로그인 상태
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  // 책 목록 가져오기
  const getPublishedBooks = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`/publishedbook/user-books?userId=${userId}`);
      const bookWithDetails = await Promise.all(res.data.map(async (book) => {
        const [bookmarkCountResponse, questionCountResponse, sectionCountResponse] = await Promise.all([
          axios.get(`/bookmark/countBookmarks/${book.bookId}`),  // 북마크 수 가져오기
          axios.get(`/book/question/count/${book.bookId}`),      // 문항 수 가져오기
          axios.get(`/book/section/count/${book.bookId}`)        // 섹션 수 가져오기
        ]);

        return {
          ...book,
          bookmarkCount: bookmarkCountResponse.data,      // 북마크 수
          bookQuestionCount: questionCountResponse.data,  // 문항 수
          bookSectionCount: sectionCountResponse.data     // 섹션 수
        };
      }));

      setBookList(bookWithDetails);  // 책 목록 상태 업데이트
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };


  // 컴포넌트가 마운트될 때 사용자 정보 및 책 목록 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) {
      getPublishedBooks();
    }
  }, [userId]);

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
          <Button variant="contained">문제출제하기</Button>
        </div>

        {/* BookCard 출력 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                  <BookCard
                      key={book.bookId}
                      bookId={book.bookId}
                      photo={`${photopath}/${book.bookImage}`}
                      cardType="B"
                      nickname={book.user?.userNickname || "Unknown"}
                      className="flex-1"
                      createDate={book.bookCreatedate}
                      title={book.bookTitle}
                      bookUrl={`/book/detail/${book.bookId}`}
                      bookmarkCount={book.bookmarkCount}
                      bookQuestionCount={book.bookmarkCount}
                      bookSectionCount={book.bookSectionCount}
                      status={book.bookStatus}
                  />
              ))
          ) : (
              <div>No books available</div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {/* 버튼을 클릭하면 마이크 상태를 토글 */}
          <button onClick={toggleMic} style={{ fontSize: "20px" }}>
            {isMicOn ? "🎤 마이크 켜짐" : "🔇 마이크 꺼짐"}
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {/* 버튼을 클릭하면 카메라 상태를 토글 */}
          <button onClick={toggleCamera} style={{ fontSize: "20px" }}>
            {isCameraOn ? "📸 카메라 켜짐" : "🚫 카메라 꺼짐"}
          </button>
        </div>

        {/* 페이지네이션 */}
        <Stack spacing={SPACING} justifyContent="center" direction="row" mt={4}>
          <Pagination
              count={pageCount} // 전체 페이지 수
              page={page} // 현재 페이지
              onChange={handleChange} // 페이지 변경 핸들러
              showFirstButton
              showLastButton
          />
        </Stack>
      </main>
  );
}
