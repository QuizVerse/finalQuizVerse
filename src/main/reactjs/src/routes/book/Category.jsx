import React, { useEffect, useState } from 'react';
import { MenuItem, Pagination, Stack, TextField } from '@mui/material';
import BookCard from '../../components/BookCard';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// 필터 옵션 정의
const conditions = [
  { value : 'popular', label : '인기순' },
  { value : 'recent', label : '최신순' },
  { value : 'oldest', label : '오래된순'},
  { value : 'title', label : '가나다순' },
];

const ITEMS_PER_PAGE = 20;  // 한 페이지당 보여줄 아이템 수
const SPACING = 2;  // 페이지네이션 사이의 간격

export default function Category() {

  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";


  const location = useLocation();
  const [categoryId, setCategoryId] = useState('');  // 현재 카테고리 ID 상태
  const [books, setBooks] = useState([]);  // 카테고리에 해당하는 책 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [sortCondition, setSortCondition] = useState('popular');  // 정렬 기준 상태 추가

  const itemOffset = (page - 1) * ITEMS_PER_PAGE;

  // 로그인 체크 함수
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('/book/username', {
        validateStatus: status => status < 500
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserInfo(response.data);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Failed to check login status', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const catId = params.get('cat') || '';
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
            booksData = booksData.sort((a, b) => b.bookmarkCount - a.bookmarkCount);
          } else if (sortCondition === 'oldest') {
            booksData = booksData.sort((a, b) => new Date(a.bookCreatedate) - new Date(b.bookCreatedate));
          }

          let bookmarkedBookIds = [];

          if (isLoggedIn) {
            const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
            bookmarkedBookIds = bookmarksResponse.data.map(book => book.bookId);
          }

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
                  isBookmark: bookmarkedBookIds.includes(book.bookId),
                  userNickname: book.user?.userNickname || 'Unknown',  // 사용자 닉네임 처리
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
    window.scrollTo(0, 0);
  };

  const handleSortChange = (event) => {
    setSortCondition(event.target.value);
  };

  const clickBookmark = async (bookId) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const updatedBooks = books.map((book) =>
          book.bookId === bookId ? { ...book, isBookmark: !book.isBookmark } : book
      );

      await axios.post('/bookmark/toggle', { bookId });

      setBooks(updatedBooks);
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  };

  return (
      <main className="p-4">
        <div className="flex items-center mb-6 space-x-4 justify-end">
          <TextField
              id="outlined-select-currency"
              select
              value={sortCondition}
              onChange={handleSortChange}
          >
            {conditions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
            ))}
          </TextField>
        </div>
        <section className="grid grid-cols-5 gap-4">
          {currentItems.length > 0 ? (
              currentItems
                  .filter(book => book.bookStatus === 0 || book.bookStatus ===1)  // status가 0 또는 1일 때만 필터링
                  .map(book => (
                  <div key={book.bookId}>
                    <BookCard
                        Key={book.bookId}
                        bookId={book.bookId}
                        cardType="A"
                        nickname={book.userNickname}  // 사용자 닉네임 표시
                        createDate={book.bookCreatedate}
                        title={book.bookTitle}
                        photo={`${photopath}/${book.bookImage}`}
                        category={book.category?.categoryName || 'Unknown'}
                        viewCount={book.bookViewCount}
                        bookQuestionCount={book.bookQuestionCount}
                        bookSectionCount={book.bookSectionCount}
                        bookmarkCount={book.bookmarkCount}
                        isBookmark={book.isBookmark}
                        updateBookmark={() => clickBookmark(book.bookId)}
                        isLoggedIn={isLoggedIn}
                        status={book.bookStatus}
                        bookUrl={`/book/detail/${book.bookId}`}
                    />
                  </div>
              ))
          ) : (
              <div style={{fontSize:"30px"}}>이용가능한 문제집이 없습니다!</div>
          )}
        </section>
        <div className="flex justify-center mt-4">
          <Stack spacing={SPACING}>
            <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
            />
          </Stack>
        </div>
      </main>
  );
}
