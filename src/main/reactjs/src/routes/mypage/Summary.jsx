import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ITEMS_PER_PAGE = 4;

export default function Summary() {
    const [classList, setClassList] = useState([]);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [totalBooksCount, setTotalBooksCount] = useState(0);
    const [totalClassCount , setTotalClassCount] = useState(0);
    const [totalSolvedCount, setTotalSolvedCount] = useState(0);
    const [totalBookmarkCount, setTotalBookmarkCount] = useState(0);
    const [error, setError] = useState(null);

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

    useEffect(() => {
        // 로그인 정보
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/summary/nickname');
                if (response.status === 200 && response.data) {
                    setUser(response.data);
                    setUserId(response.data.userId);
                }
            } catch (error) {
                setUser(null);
            }
        };

        fetchUserId();
    }, []);


    // 내가 만든 문제집 | 나의 클래스 | 나의 학습이력 | 나의 즐겨찾기
    const getBooksCount = async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`/summary/user-books/count?userId=${userId}`);
            setTotalBooksCount(res.data);
            const classres = await axios.get(`/summary/user-class/count?userId=${userId}`);
            setTotalClassCount(classres.data);
            const solvedres = await axios.get(`/summary/user-solvedbooks/count?userId=${userId}`);
            setTotalSolvedCount(solvedres.data);
            const bookmarkres = await axios.get(`/summary/user-bookmarks/count?userId=${userId}`);
            setTotalBookmarkCount(bookmarkres.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        if (userId) {
            getBooksCount();
        }
    }, [userId]);

    const fetchUserBooks = async () => {
        if (!userId) return;

        try {
            const res = await axios.get(`/publishedbook/user-books?userId=${userId}`);
            const bookWithDetails = await Promise.all(res.data.map(async (book) => {
                const [bookmarkCountResponse, questionCountResponse, sectionCountResponse] = await Promise.all([
                    axios.get(`/bookmark/countBookmarks/${book.bookId}`),
                    axios.get(`/book/question/count/${book.bookId}`),
                    axios.get(`/book/section/count/${book.bookId}`)
                ]);

                return {
                    ...book,
                    bookmarkCount: bookmarkCountResponse.data,
                    bookQuestionCount: questionCountResponse.data,
                    bookSectionCount: sectionCountResponse.data
                };
            }));

            setClassList(bookWithDetails);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserBooks();
        }
    }, [userId]);

    const handleBookDelete = (bookId) => {
        setClassList((prevClassList) => prevClassList.filter((book) => book.bookId !== bookId));
    };

    return (
        <main className="flex-1 py-12 px-6">
            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">개요</h2>
                <div className="grid grid-cols-4 gap-4">
                    <Card title="내가 만든 문제집" count={totalBooksCount} />
                    <Card title="나의 클래스" count={totalClassCount} />
                    <Card title="내가 푼 문제집" count={totalSolvedCount} />
                    <Card title="즐겨찾기한 문제집" count={totalBookmarkCount} />
                </div>
            </section>
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        <span className="text-[#3877BB]">{user.userNickname}</span>님이 만든 문제집
                    </h2>
                    <Button
                        variant="text"
                        component={Link}
                        to="/mypage/publishedbook">
                        전체보기
                        <ArrowForwardIosIcon sx={{fontSize : "12px", marginLeft : "4px", paddingBottom : "2px"}} color={"primary"}/>
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Button
                        className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center justify-center space-x-4"
                        variant="outlined"
                    >
                        <Link to="/book/new" className="flex justify-center items-center w-full h-full">
                            <div className="p-6 flex-1 flex flex-col items-center">
                                <div className="text-lg font-semibold">문제집 추가</div>
                                <div className="text-3xl font-bold">+</div>
                            </div>
                        </Link>
                    </Button>
                    {classList.length > 0 ? (
                        classList.slice(0, 3).map((book, index) => (
                            <BookCard
                                key={index}
                                bookId={book.bookId}
                                photo={`${photopath}/${book.bookImage}`}
                                cardType="B"
                                nickname={book.user?.userNickname || "Unknown"}
                                className="flex-1"
                                user={user}
                                createDate={book.bookCreatedate}
                                title={book.bookTitle}
                                bookUrl={`/book/detail/${book.bookId}`}
                                bookmarkCount={book.bookmarkCount}
                                bookQuestionCount={book.bookQuestionCount}
                                bookSectionCount={book.bookSectionCount}
                                status={book.bookStatus}
                                onDelete={handleBookDelete} // 삭제 핸들러 전달
                            />
                        ))
                    ) : (
                        <div>출제한 문제집이 없습니다.</div>
                    )}
                </div>
            </section>
        </main>
    );
}

const Card = ({ title, count }) => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-lg p-4" data-v0-t="card">
        <div className="p-6">
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <div className="text-3xl font-bold">{count}개</div>
        </div>
    </div>
);
