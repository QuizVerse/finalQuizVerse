import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import CustomAlert from "../../components/modal/CustomAlert";

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

  // alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  /**
   * @description : Alert창 열릴 때
   * */
  const openAlert = (title) => {
    setAlertTitle(title);
    setAlertVisible(true);
  };

  /**
   * @description : Alert창 닫힐 때
   * */
  const closeAlert = () => {
    setAlertVisible(false);
  };


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
      openAlert("로그인이 필요한 서비스입니다.");
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
      <main className="flex-1 py-12 px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">즐겨찾기</h1>
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
                  isBookmark={book.isBookmark}
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
        <CustomAlert
            title={alertTitle}
            openAlert={alertVisible}
            closeAlert={closeAlert}
        />
      </main>
  );
}
