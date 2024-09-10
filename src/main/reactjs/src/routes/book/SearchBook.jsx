import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../../components/BookCard";
import { Pagination, Stack } from "@mui/material";

const ITEMS_PER_PAGE = 20; // 한 페이지당 보여줄 아이템 수
const SPACING = 2; // 페이지네이션 사이의 간격

export default function SearchBook() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [page, setPage] = useState(1);
    const location = useLocation();

    // 북마크 상태를 업데이트하는 함수
    const clickBookmark = async (bookId) => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            const updatedResults = searchResults.map((book) =>
                book.bookId === bookId
                    ? { ...book, isBookmark: !book.isBookmark }
                    : book
            );
            await axios.post('/bookmark/toggle', { bookId });
            setSearchResults(updatedResults);
        } catch (error) {
            console.error('Failed to toggle bookmark', error);
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/book/username', {
                    validateStatus: status => status < 500
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Failed to check login status', error);
            }
        };

        const fetchSearchResults = async () => {
            try {
                const query = new URLSearchParams(location.search);
                const keyword = query.get("keyword");

                if (keyword) {
                    const response = await axios.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
                    const books = response.data;

                    // 북마크 수, 질문 수, 섹션 수 가져오기
                    const updatedBooks = await Promise.all(
                        books.map(async (book) => {
                            const countBookmarkResponse = await axios.get(`/bookmark/countBookmarks/${book.bookId}`);
                            const countQuestionResponse = await axios.get(`/book/question/count/${book.bookId}`);
                            const countSectionResponse = await axios.get(`/book/section/count/${book.bookId}`);

                            return {
                                ...book,
                                bookmarkCount: countBookmarkResponse.data,
                                bookQuestionCount: countQuestionResponse.data,
                                bookSectionCount: countSectionResponse.data,
                            };
                        })
                    );
                    const filteredBooks = updatedBooks.filter(book => book.bookStatus === 1);
                    setSearchResults(filteredBooks);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        checkLoginStatus();
        fetchSearchResults();
    }, [location.search]);

    // 페이지네이션 관련 계산
    const pageCount = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
    const currentItems = searchResults.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <section className="grid grid-cols-5 gap-4">
                {currentItems.length > 0 ? (
                    currentItems.map(book => (
                        <div key={book.bookId}>
                            <BookCard
                                cardType="A"
                                nickname={book.userNickname}  // 사용자 닉네임 표시
                                createDate={book.bookCreatedate}
                                title={book.bookTitle}
                                category={book.category?.categoryName || 'Unknown'}
                                viewCount={book.bookViewCount}
                                bookQuestionCount={book.bookQuestionCount}
                                bookSectionCount={book.bookSectionCount}
                                bookmarkCount={book.bookmarkCount}
                                isBookmark={book.isBookmark}
                                updateBookmark={() => clickBookmark(book.bookId)}
                                isLoggedIn={isLoggedIn}
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
                        count={pageCount}
                        page={page}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            </div>
        </>
    );
}
