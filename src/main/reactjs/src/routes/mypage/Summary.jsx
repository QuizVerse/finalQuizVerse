import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";


export default function Summary() {
    const [classList, setClassList] = useState([]);
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState(null);
    const [totalBooksCount, setTotalBooksCount] = useState('');
    const [totalClassCount , setTotalClassCount] = useState('');
    const [totalSolvedCount, setTotalSolvedCount] = useState('');
    const [totalBookmarkCount, setTotalBookmarkCount] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserId();
    }, []);

    // 로그인 정보
    const fetchUserId = async () => {
        try {
            const response = await axios.get('/book/username');
            if (response.status === 200 && response.data) {
                setUserId(response.data.userId);
                const nicknameRes = await axios.get('/summary/nickname');
                if (nicknameRes.status === 200) {
                    setName(nicknameRes.data);
                }
            }
        } catch (error) {
            setUserId(null);
        }
    };

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

    return (
        <main className="flex-1 p-8">
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
                <h2 className="mb-4 text-2xl font-bold">
                    <span className="text-blue-500">{name}</span>님이 만든 문제집
                </h2>
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
                    {/* 이 곳에 북카드가 들어와야 해요 */}
                    {/*<BookCard cardType="B" className="flex-1" photo="" createDate="2024-08-17" nickname="닉네임" title="제목이랍니다" category="취업 / 자격증" />*/}
                    {/*<BookCard cardType="B" className="flex-1" photo="" createDate="2024-08-18" nickname="쿠킹호일" title="제목일걸요" category="여기는 카테고리" />*/}
                    {/*<BookCard cardType="B" className="flex-1" photo="" createDate="2000-05-16" nickname="이시연" title="R" category="보컬 / 서브기타" />*/}
                </div>
            </section>
        </main>
    );
}

const Card = ({ title, count }) => (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4" data-v0-t="card">
        <div className="p-6">
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <div className="text-3xl font-bold">{count}개</div>
        </div>
    </div>
);
