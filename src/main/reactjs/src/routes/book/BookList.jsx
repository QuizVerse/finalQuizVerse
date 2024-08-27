import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from "../../components/BookCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from "react-router-dom";
import img from "../../image/questionmark.jpg";

// API 엔드포인트 URL

const BOOKS_API_URL = '/books/category';      // 책 목록을 가져오는 엔드포인트

export default function BookList() {
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const fetchCategoriesAndBooks = async () => {
    try {

      // 카테고리 목록 가져오기
      const categoryResponse = await axios.get('/category/list');
      setCategories(categoryResponse.data);

      // 각 카테고리의 책 목록 가져오기
      const booksResponses = await Promise.all(
          categoryResponse.data.map(category =>
              axios.get(`/books/category?id=${category.categoryId}`).then(response => ([
                response.data
              ]))

          )
      );

      setBooksByCategory([...booksByCategory, booksResponses]);
      console.log(booksByCategory);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndBooks();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="p-16">
      <div className="flex items-center justify-center mb-8">
        <div
          className="w-full max-w-4xl p-16 text-center bg-gray-200 rounded"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          문제집 추천배너
        </div>
      </div>
      {categories && categories.map(category => (
        <section className="mb-8" key={category.categoryId}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{category.categoryName} Top 5</h2>
            <Link className="text-gray-600 flex gap-2 items-center" to={`/category/${category.categoryId}`}>
              전체보기
              <ArrowForwardIosIcon fontSize={'8px'} />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {booksByCategory && booksByCategory.filter(book => book.categoryName === categories.categoryName).map(book => {
              return(
              <BookCard
                key={category.categoryId}
                cardType="A"
                nickname={book.nickname}
                createDate={book.createDate}
                title={category.title}
                category={book.category}
                viewCount={book.viewCount}
                questionCount={book.questionCount}
                sectionCount={book.sectionCount}
                status={book.status}
              />
            )})}
          </div>
        </section>
      ))}
    </main>
  );
}
