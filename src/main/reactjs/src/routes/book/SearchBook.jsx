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
    const [bookmarkedBooks, setBookmarkedBooks] = useState([]); // 북마크 상태
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가
    const location = useLocation();
    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

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

                let bookmarkedBookIds = [];

                if (keyword) {
                    const response = await axios.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
                    let books = response.data;

                    if (isLoggedIn) {
                        // 로그인된 상태라면 사용자의 북마크 정보 가져오기
                        const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
                        bookmarkedBookIds = bookmarksResponse.data.map(book => book.bookId);

                        // 북마크 정보가 있는 책들에 대해 isBookmark 값 설정
                        books = books.map(book => ({
                            ...book,
                            isBookmark: bookmarkedBookIds.includes(book.bookId)  // bookId가 북마크 목록에 있는지 확인
                        }));
                    }

                    setSearchResults(books);
                    console.log("books", books);
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
    }, [location.search, isLoggedIn]);


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
                                <BookCard
                                    key={book.bookId}
                                    bookId={book.bookId}
                                    photo={photopath+book.bookImage}
                                    cardType="A"
                                    nickname={book.user?.userNickname || 'Unknown'}
                                    createDate={book.bookCreatedate}
                                    title={book.bookTitle}
                                    category={book.category?.categoryName || 'Unknown'}
                                    bookmarkCount={book.bookmarkCount}
                                    bookQuestionCount={book.bookQuestionCount}
                                    bookSectionCount={book.bookSectionCount}
                                    status={book.bookStatus}
                                    bookUrl={`/book/detail/${book.bookId}`}
                                    updateBookmark={() => clickBookmark(book.bookId)}
                                    isBookmark={book.isBookmark}
                                    isLoggedIn={isLoggedIn}
                                />
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
