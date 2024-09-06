import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

// 필터 옵션 정의
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'title', label: '가나다순' },
];

const ITEMS_PER_PAGE = 5;  // 한 페이지당 보여줄 아이템 수
const SPACING = 2;  // 페이지네이션 사이의 간격

export default function Category() {
  const location = useLocation();
  const [categoryId, setCategoryId] = useState('');  // 현재 카테고리 ID 상태
  const [books, setBooks] = useState([]);  // 카테고리에 해당하는 책 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로그인 상태 및 유저 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // 페이지네이션 관련 상태
  const [page, setPage] = useState(1);
  const [sortCondition, setSortCondition] = useState('popular');  // 정렬 기준 상태 추가
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;

  // 로그인 체크 함수
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('/book/username', {
        validateStatus: function (status) {
          return status < 500;  // 500 미만의 상태 코드만 에러로 처리
        }
      });
      if (response.status === 200) {
        setIsLoggedIn(true);  // 로그인 상태로 변경
        setUserInfo(response.data);  // 사용자 정보 저장
      } else if (response.status === 401) {
        setIsLoggedIn(false);  // 로그인 안된 상태로 처리
      }
    } catch (error) {
      setIsLoggedIn(false);  // 로그인 안된 상태로 처리
      console.error('Failed to check login status', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const catId = params.get('cat') || '';  // URL에서 cat 파라미터 가져오기
        setCategoryId(catId);

        if (catId) {
          const response = await axios.get(`/books/category?id=${catId}`);
          let booksData = response.data;

          // 정렬 조건에 따라 책 목록 정렬
          if (sortCondition === 'recent') {
            booksData = booksData.sort((a, b) => new Date(b.bookCreatedate) - new Date(a.bookCreatedate));
          } else if (sortCondition === 'title') {
            booksData = booksData.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle, 'ko-KR'));
          } else if (sortCondition === 'popular') {
            booksData = booksData.sort((a, b) => b.bookViewCount - a.bookViewCount);
          }

          let bookmarkedBookIds = [];

          // 로그인한 경우 유저 북마크 정보를 가져와서 표시
          if (isLoggedIn) {
            const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
            bookmarkedBookIds = bookmarksResponse.data.map(book => book.bookId);
          }

          // 각 책의 문제수, 섹션수, 북마크 수 가져오기
          const updatedBooks = await Promise.all(
              booksData.map(async (book) => {
                const countBookmarkResponse = await axios.get(`/bookmark/countBookmarks/${book.bookId}`);
                const countQuestionResponse = await axios.get(`/book/question/count/${book.bookId}`);
                const countSectionResponse = await axios.get(`/book/section/count/${book.bookId}`);

                return {
                  ...book,
                  bookmarkCount: countBookmarkResponse.data,
                  bookQuestionCount: countQuestionResponse.data,
                  bookSectionCount: countSectionResponse.data,
                  isBookmark: bookmarkedBookIds.includes(book.bookId),  // 로그인한 유저의 북마크 여부
                };
              })
          );

          setBooks(updatedBooks);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchBooks();
  }, [location.search, sortCondition, isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 페이지네이션 계산
  const currentItems = books.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);  // 페이지 이동 시 화면을 상단으로 스크롤
  };

  const handleSortChange = (event) => {
    setSortCondition(event.target.value);
  };

  // 북마크 클릭 함수
  const clickBookmark = async (bookId) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const updatedBooks = books.map((book) =>
          book.bookId === bookId ? { ...book, isBookmark: !book.isBookmark } : book
      );

      // 북마크 토글 요청
      await axios.post('/bookmark/toggle', { bookId });

      setBooks(updatedBooks);
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  };

  return (
      <main className="p-4">
        <div className="flex items-center mb-6 space-x-4">
          <TextField
              id="outlined-select-currency"
              select
              value={sortCondition}  // 정렬 기준 상태를 사용
              onChange={handleSortChange}  // 정렬 기준 변경 시 호출되는 함수
          >
            {conditions &&
                conditions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
          </TextField>
        </div>
        <section className="grid grid-cols-5 gap-4">
          {currentItems.length > 0 ? (
              currentItems.map(book => (
                  <div key={book.bookId}>
                    <BookCard
                        cardType="A"
                        nickname={book.user?.nickname || 'Unknown'}
                        createDate={book.bookCreatedate}
                        title={book.bookTitle}
                        category={book.category?.categoryName || 'Unknown'}
                        viewCount={book.bookViewCount}
                        bookQuestionCount={book.bookQuestionCount}
                        bookSectionCount={book.bookSectionCount}
                        bookmarkCount={book.bookmarkCount}
                        isBookmark={book.isBookmark}  // 북마크 상태 전달
                        updateBookmark={() => clickBookmark(book.bookId)}  // 북마크 클릭 처리
                        isLoggedIn={isLoggedIn}  // 로그인 상태 전달
                    />
                  </div>
              ))
          ) : (
              <div>No books available</div>
          )}
        </section>
        <div className="flex justify-center mt-4">
          <Stack spacing={SPACING}>
            <Pagination
                count={pageCount}  // 전체 페이지 수
                page={page}  // 현재 페이지 번호
                onChange={handleChange}  // 페이지 변경 시 호출되는 함수
                showFirstButton  // 첫 페이지로 이동 버튼 표시
                showLastButton  // 마지막 페이지로 이동 버튼 표시
            />
          </Stack>
        </div>
      </main>
  );
}
