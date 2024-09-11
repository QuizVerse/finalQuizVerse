import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../../components/BookCard";
import { Pagination, Stack, CircularProgress, Box } from "@mui/material";

const ITEMS_PER_PAGE = 20; // 한 페이지당 보여줄 아이템 수
const SPACING = 2; // 페이지네이션 사이의 간격

export default function SearchBook() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가
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
                setIsLoggedIn(response.status === 200);
            } catch (error) {
                console.error('Failed to check login status', error);
                setIsLoggedIn(false);
            }
        };

        const fetchSearchResults = async () => {
            setLoading(true); // 로딩 상태 시작
            setError(null); // 에러 상태 초기화
            try {
                const query = new URLSearchParams(location.search);
                const keyword = query.get("keyword");

                if (keyword) {
                    const response = await axios.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
                    const books = response.data;

                    // 북마크 수, 질문 수, 섹션 수 가져오기
                    const updatedBooks = await Promise.all(
                        books.map(async (book) => {
                            try {
                                const [countBookmarkResponse, countQuestionResponse, countSectionResponse] = await Promise.all([
                                    axios.get(`/bookmark/countBookmarks/${book.bookId}`),
                                    axios.get(`/book/question/count/${book.bookId}`),
                                    axios.get(`/book/section/count/${book.bookId}`)
                                ]);

                                return {
                                    ...book,
                                    bookmarkCount: countBookmarkResponse.data,
                                    bookQuestionCount: countQuestionResponse.data,
                                    bookSectionCount: countSectionResponse.data,
                                };
                            } catch (error) {
                                console.error(`Error fetching additional book data for bookId ${book.bookId}`, error);
                                return book;
                            }
                        })
                    );
                    setSearchResults(updatedBooks);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("검색 결과를 불러오는 중에 오류가 발생했습니다."); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 종료
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
            {loading ? (
                // 로딩 중일 때 표시할 컴포넌트
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                // 에러 발생 시 표시할 컴포넌트
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <p>{error}</p>
                </Box>
            ) : (
                <>
                    <section className="grid grid-cols-5 gap-4">
                        {currentItems.length > 0 ? (
                            currentItems.map(book => (
                                <div key={book.bookId}>
                                    <BookCard
                                        cardType="A"
                                        nickname={book.user.userNickname}  // 사용자 닉네임 표시
                                        createDate={book.bookCreatedate}
                                        title={book.bookTitle}
                                        status={book.bookStatus}
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
            )}
        </>
    );
}
