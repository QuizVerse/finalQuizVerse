import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCardH from "../../components/BookCardH";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BookList() {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndBooks = async () => {
      try {
        // 카테고리 목록 가져오기
        const categoryResponse = await axios.get('/category/list');
        const categories = categoryResponse.data;
        setCategories(categories);

        // 각 카테고리의 책 목록 가져오기
        const booksResponses = await Promise.all(
          categories.map(category =>
            axios.get(`${'/books/category'}?id=${category.categoryId}`)
              .then(response => ({
                categoryId: category.categoryId,
                books: response.data
              }))
          )
        );

        // 카테고리 ID를 키로 사용하는 객체로 책 데이터를 변환
        const booksByCategory = booksResponses.reduce((acc, { categoryId, books }) => {
          acc[categoryId] = books;
          return acc;
        }, {});

        setBooksByCategory(booksByCategory);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="p-16">
      <div className="flex items-center justify-center mb-8">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
      </div>
      {categories.map(category => (
        <section className="mb-8" key={category.categoryId}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{category.categoryName} Top 5</h2>
            <Link className="text-gray-600 flex gap-2 items-center" to={`/book/category?cat=${category.categoryId}`}>
              전체보기
              <ArrowForwardIosIcon fontSize={'small'} />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {booksByCategory[category.categoryId]?.slice(0, 5).map(book => (
              <BookCardH
                key={book.bookId}
                bookId={book.bookId}
                cardType="A"
                nickname={book.user?.nickname || 'Unknown'}  // Optional chaining to handle null values
                createDate={book.bookCreatedate}
                title={book.bookTitle}
                category={book.category?.categoryName || 'Unknown'}  // Optional chaining
                viewCount={book.bookViewCount}
                questionCount={book.bookQuestionCount}
                sectionCount={book.bookSectionCount}
                status={book.bookStatus}
                bookUrl={`/book/detail/${book.bookId}`} // 링크 추가
              />
            )) || <div>No books available</div>}
          </div>
        </section>
      ))}
    </main>
  );
}
