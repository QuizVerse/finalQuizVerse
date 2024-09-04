import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './bannerStyle.css';
import { Pagination } from 'swiper/modules';

export default function BookList() {

  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

  const [booksByCategory, setBooksByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndBooks = async () => {
      try {
        const categoryResponse = await axios.get('/category/list');
        const categories = categoryResponse.data;
        setCategories(categories);

        const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
        const bookmarkedBookIds = bookmarksResponse.data.map(book => book.bookId);

        const booksResponses = await Promise.all(
            categories.map(category =>
                axios.get(`/books/category?id=${category.categoryId}`)
                    .then(response => ({
                      categoryId: category.categoryId,
                      books: response.data.map(book => ({
                        ...book,
                        isBookmark: bookmarkedBookIds.includes(book.bookId),
                        bookmarkCount: 0  // 초기 값 설정
                      }))
                    }))
            )
        );

        const booksByCategory = booksResponses.reduce((acc, { categoryId, books }) => {
          acc[categoryId] = books;
          return acc;
        }, {});

        setBooksByCategory(booksByCategory);

        // 북마크 수 업데이트
        await Promise.all(
            Object.keys(booksByCategory).flatMap(categoryId =>
                booksByCategory[categoryId].map(async (book) => {
                  // 저장수
                  const countBookmarkResponse = await axios.get(`/bookmark/countBookmarks/${book.bookId}`);
                  const countBookmark = countBookmarkResponse.data;
                  // 문항수
                  const countQuestionResponse = await axios.get(`/book/question/count/${book.bookId}`);
                  const countQuestion = countQuestionResponse.data;
                  // 섹션수
                  const countSectionResponse = await axios.get(`/book/section/count/${book.bookId}`);
                  const countSection = countSectionResponse.data;
                  setBooksByCategory(prevState => ({
                    ...prevState,
                    [categoryId]: prevState[categoryId].map(b =>
                        b.bookId === book.bookId ? { ...b, bookmarkCount: countBookmark, bookSectionCount : countSection, bookQuestionCount : countQuestion } : b,

                    )
                  }));
                })
            )
        );
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndBooks();
  }, []);

  const clickBookmark = async (bookId) => {
    try {
      const category = Object.keys(booksByCategory).find(cat =>
          booksByCategory[cat].some(book => book.bookId === bookId)
      );

      const book = booksByCategory[category].find(book => book.bookId === bookId);
      const newIsBookmark = !book.isBookmark;

      await axios.post('/bookmark/toggle', { bookId });

      setBooksByCategory({
        ...booksByCategory,
        [category]: booksByCategory[category].map((book) =>
            book.bookId === bookId ? { ...book, isBookmark: newIsBookmark } : book
        ),
      });
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
      <>
        <Swiper
            pagination={{ type: 'fraction' }}
            navigation={true}
            modules={[Pagination]}
            className="mySwiper"
            style={{ height: '500px' }}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
        </Swiper>
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
                {booksByCategory[category.categoryId]?.slice(0, 5).map((book) => (
                    <BookCard
                        key={book.bookId}
                        bookId={book.bookId}
                        photo={`${photopath}/${book.bookImage}`}
                        cardType="A"
                        nickname={book.user?.userNickname || 'Unknown'}
                        createDate={book.bookCreatedate}
                        title={book.bookTitle}
                        category={book.category?.categoryName || 'Unknown'}
                        bookmarkCount={book.bookmarkCount}
                        bookQuestionCount={book.bookQuestionCount}
                        bookSectionCount={book.bookSectionCount}
                        status={book.bookStatus}
                        bookUrl={`/book/detail/${book.bookId}`} // 링크 추가
                        updateBookmark={() => clickBookmark(book.bookId)}
                        isBookmark={book.isBookmark}
                    />
                )) || <div>No books available</div>}
              </div>
            </section>
        ))}
      </>
  );
}
