import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../../components/BookCard";

export default function SearchBook() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const keyword = query.get("keyword");

        if (keyword) {
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };

            fetchSearchResults();
        }
    }, [location.search]);

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {searchResults.map((book) => (
                <BookCard
                    key={book.bookId}
                    bookId={book.bookId}
                    photo={`https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/${book.bookImage}`}
                    nickname={book.user ? book.user.userNickname : "알 수 없음"}
                    createDate={book.bookCreatedate}
                    title={book.bookTitle}
                    category={book.category?.categoryName || '카테고리 없음'}
                    viewCount={book.viewCount}
                    questionCount={book.questionCount}
                    sectionCount={book.sectionCount}
                    status={book.bookStatus === 0 ? "전체 공개" :
                        book.bookStatus === 1 ? "클래스 공개" :
                            book.bookStatus === 2 ? "비공개" :
                                "알 수 없음"}
                    cardType="A" // 적절한 cardType을 설정
                    isBookmark={book.isBookmark}
                    updateBookmark={() => { /* 북마크 업데이트 로직 */ }}
                    bookUrl={book.bookUrl}
                />
            ))}
        </div>
    );
}
