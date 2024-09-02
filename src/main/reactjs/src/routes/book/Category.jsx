import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";


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
const ITEMS_PER_PAGE = 10;  // 한 페이지당 보여줄 아이템 수
const SPACING = 2;  // 페이지네이션 사이의 간격

export default function Category() {
  const location = useLocation();
  const [categoryId, setCategoryId] = useState('');  // 현재 카테고리 ID 상태
  const [books, setBooks] = useState([]);  // 카테고리에 해당하는 책 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지네이션에 필요한 변수
  const [page, setPage] = useState(1);
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const catId = params.get('cat') || '';  // URL에서 cat 파라미터 가져오기
        setCategoryId(catId);

        if (catId) {
          const response = await axios.get(`/books/category?id=${catId}`);
          setBooks(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 페이지네이션 계산
  const currentItems = books.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);

  /**
   * @description : 페이지네이션에 필요한 함수
   */
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);  // 페이지 이동 시 화면을 상단으로 스크롤
  };

  return (
    <main className="p-4">
      <div className="flex items-center mb-6 space-x-4">
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
      </div>
      <section>
        {currentItems.length > 0 ? (
          currentItems.map(item => (
            <div key={item.bookId}>
              <BookCard
                cardType="A"
                nickname={item.user?.nickname || 'Unknown'}
                createDate={item.bookCreatedate}
                title={item.bookTitle}
                category={item.category?.categoryName || 'Unknown'}
                viewCount={item.bookViewCount}
                questionCount={item.bookQuestionCount}
                sectionCount={item.bookSectionCount}
                status={item.bookStatus}
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
