import React, {useEffect, useState} from 'react';
import { Stack, Pagination, TextField, MenuItem } from "@mui/material";
import BookCard from "../../components/BookCard";
import axios from "axios";

// 필터 옵션
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'old', label: '오래된순' },
  { value: 'title', label: '가나다순' },
];

const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 아이템 수
const SPACING = 2; // 페이지네이션 버튼 간의 간격

export default function Wrong() {
  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";
  const [bookList, setBookList] = useState([]); // 오답 목록 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const [userId, setUserId] = useState(1); // 유저 ID (임의로 설정)

  // 책 목록 가져오기
  const getWrongBooks = async () => {
    try {
      const res = await axios.get(`/wrongbook/user`);
      const bookWithDetails = await Promise.all(res.data.map(async (book) => {
        const [bookmarkCountResponse, questionCountResponse, sectionCountResponse] = await Promise.all([
          axios.get(`/bookmark/countBookmarks/${book.book.bookId}`),  // 북마크 수 가져오기
          axios.get(`/book/question/count/${book.book.bookId}`),      // 문항 수 가져오기
          axios.get(`/book/section/count/${book.book.bookId}`)        // 섹션 수 가져오기
        ]);

        return {
          ...book.book, // book 정보를 직접 활용
          bookmarkCount: bookmarkCountResponse.data,
          bookQuestionCount: questionCountResponse.data,
          bookSectionCount: sectionCountResponse.data,
        };
      }));

      setBookList(bookWithDetails); // 책 목록 상태 업데이트
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 컴포넌트가 마운트될 때 사용자 정보 및 책 목록 가져오기
  useEffect(() => {
    getWrongBooks();
  }, []);

  // 페이지 변경 시 처리 함수
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // 페이지 변경 시 스크롤을 위로 이동
  };

  // 현재 페이지에 표시할 아이템 계산
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks = bookList.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(bookList.length / ITEMS_PER_PAGE);

  return (
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold">오답노트</h1>

        {/* 필터 및 검색 */}
        <div className="flex items-center mb-6 space-x-4">
          <input
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
              placeholder="책 제목, 카테고리 검색"
          />
          <TextField id="outlined-select-currency" select defaultValue="popular">
            {conditions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>
        </div>

        {/* BookCard 출력 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
              <div>Loading...</div>
          ) : error ? (
              <div>Error loading data</div>
          ) : currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                  <BookCard
                      key={book.bookId}
                      bookId={book.bookId}
                      photo={book.bookImage ? `${photopath}/${book.bookImage}` : '/default-image.jpg'} // 이미지가 없을 경우 대체 이미지 사용
                      cardType="B"
                      nickname={book.userNickname || "Unknown"}
                      createDate={book.bookCreatedate}
                      title={book.bookTitle}
                      bookUrl={`/book/detail/${book.bookId}`}
                      bookmarkCount={book.bookmarkCount}
                      bookQuestionCount={book.bookQuestionCount}
                      bookSectionCount={book.bookSectionCount}
                      status={book.bookStatus}
                  />
              ))
          ) : (
              <div>No books available</div>
          )}
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
