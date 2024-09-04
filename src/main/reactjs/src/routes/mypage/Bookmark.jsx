import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, {useEffect, useState} from 'react';
import axios from "axios";

//필터
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'old', label: '오래된순' },
  { value: 'title', label: '제목순' },
];

const ITEMS_PER_PAGE=8;
const SPACING=2;

export default function Bookmark() {

  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        // 로그인한 유저 정보 가져오기
        const userResponse = await axios.get('/bookmark/userid');
        setUser(userResponse.data);
        console.log("유저 : ", userResponse.data);

        // 유저의 북마크된 책 목록 가져오기
        const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
        // books 상태에 IsBookmark 속성 추가하여 초기화
        const bookWithBookmarks = bookmarksResponse.data.map(book => ({
          ...book, isBookmark : true
        }))
        setBooks(bookWithBookmarks);
        console.log("문제집 : " , bookmarksResponse.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const clickBookmark = async (bookId) => {
    // setIsBookmark(!isBookmark);
    try {
      const book = books.find(book => book.bookId === bookId);
      const newIsBookmark = !book.isBookmark;

      // 서버에 북마크 토글 요청
      await axios.post('/bookmark/toggle', {
        bookId : bookId
      });

      // UI 상태 업데이트
      setBooks(books.map(book =>
          book.bookId === bookId
              ? {...book, isBookmark: newIsBookmark}
              : book
      ));
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
    }
  }

  //페이지 변경 처리
  const handleChange=(event, value) => {
    setPage(value);
    window.scrollTo(0,0); //페이지가 바뀔 때 상단으로 스크롤
  };

//현재 페이지에 표시할 항목 계산
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
          {currentItems.map((book) => (
              <BookCard
                  photo = {`${photopath}/${book.bookImage}`}
                  key={book.bookId}
                  bookId={book.bookId}
                  cardType="A"
                  nickname={book.user?.userNickname || "Unknown"}
                  createDate={book.bookCreatedate}
                  title={book.bookTitle}
                  category={book.category?.categoryName || "Unknown"}
                  questionCount={book.bookQuestionCount}
                  bookmarkCount={book.bookMarkCount}
                  bookUrl={`/book/detail/${book.bookId}`}
                  isBookmark={book.isBookmark}
                  updateBookmark = {()=>clickBookmark(book.bookId)}
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