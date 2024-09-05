import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useEffect, useState } from 'react';
import axios from "axios";

// 필터
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'old', label: '오래된순' },
  { value: 'title', label: '제목순' },
];

const ITEMS_PER_PAGE = 8;
const SPACING = 2;

export default function Bookmark() {
  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCondition, setSortCondition] = useState('popular');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status state

  useEffect(() => {
    // user 정보 확인
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/book/username'); // Get user info from JWT
        if (response.status === 200 && response.data) {
          setIsLoggedIn(true); // 로그인 O
        } else {
          setIsLoggedIn(false); // 로그인 X
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    const fetchBookmarks = async () => {
      try {
        await checkLoginStatus();
        const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
        const bookWithDetails = await Promise.all(bookmarksResponse.data.map(async (book) => {
          const [bookmarkCountResponse, questionCountResponse, sectionCountResponse] = await Promise.all([
            axios.get(`/bookmark/countBookmarks/${book.bookId}`),
            axios.get(`/book/question/count/${book.bookId}`),
            axios.get(`/book/section/count/${book.bookId}`)
          ]);

          return {
            ...book,
            isBookmark: true,
            bookmarkCount: bookmarkCountResponse.data,
            bookQuestionCount: questionCountResponse.data,
            bookSectionCount: sectionCountResponse.data
          };
        }));

        setBooks(bookWithDetails);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const clickBookmark = async (bookId) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const book = books.find(book => book.bookId === bookId);
      const newIsBookmark = !book.isBookmark;

      // 서버에 북마크 토글 요청
      await axios.post('/bookmark/toggle', { bookId });

      // UI 상태 업데이트
      setBooks(books.map(book =>
          book.bookId === bookId
              ? { ...book, isBookmark: newIsBookmark }
              : book
      ));
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to the top when changing page
  };

  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = books.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);

  return (
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">즐겨찾기</h1>
          <div className="flex items-center space-x-4">
            <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                placeholder="Name, email, etc..."
            />
            <TextField
                id="outlined-select-currency"
                select
                defaultValue="popular"
                onChange={(e) => setSortCondition(e.target.value)}
            >
              {conditions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {currentItems.map((book) => (
              <BookCard
                  photo={`${photopath}/${book.bookImage}`}
                  key={book.bookId}
                  bookId={book.bookId}
                  cardType="A"
                  nickname={book.user?.userNickname || "Unknown"}
                  createDate={book.bookCreatedate}
                  title={book.bookTitle}
                  category={book.category?.categoryName || "Unknown"}
                  bookmarkCount={book.bookmarkCount}
                  bookQuestionCount={book.bookQuestionCount}
                  bookSectionCount={book.bookSectionCount}
                  bookUrl={`/book/detail/${book.bookId}`}
                  isBookmark={book.isBookmark}
                  isLoggedIn={isLoggedIn}
                  updateBookmark={() => clickBookmark(book.bookId)}
              />
          ))}
        </div>
        {/* Pagination */}
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
