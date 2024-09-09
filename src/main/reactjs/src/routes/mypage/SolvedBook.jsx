import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import SearchInput from "../../components/SearchInput";
import Paper from "@mui/material/Paper";

// 필터 조건
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'old', label: '오래된순' },
  { value: 'title', label: '제목순' },
];

const ITEMS_PER_PAGE = 8; // 페이지당 아이템 수
const SPACING = 2; // 페이지네이션 간격

export default function PublishedBook() {

  const [bookList, setBookList] = useState([]); // 책 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [sort, setSort] = useState('popular'); // 정렬 기준
  const [userId, setUserId] = useState(null); // 사용자 ID
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  // 페이지 변경 핸들러
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); // 페이지가 바뀔 때 상단으로 이동
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // 사용자 로그인 상태 및 ID 가져오기
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`/book/username`); // 사용자 정보 요청
      setUserId(res.data.userId);
      setIsLoggedIn(true); // 로그인 상태
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) {
    }
  }, [userId]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // 현재 페이지에 표시할 항목 계산
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentBooks = bookList.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(bookList.length / ITEMS_PER_PAGE);

  return (
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">나의 학습이력</h1>
        </div>

        <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
        >
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>문제집 이름</TableCell>
                  <TableCell>학습일시</TableCell>
                  <TableCell>제출일시</TableCell>
                  <TableCell>정답수/문항수</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {currentBooks &&
                    currentBooks.map((row) => (
                        <TableRow
                            key={row.classId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            style={{cursor: "pointer"}}
                        >
                          <TableCell component="th" scope="row">
                            {row.bookTitle}
                          </TableCell>
                          <TableCell>{row.solvedbookStart ? new Date(row.solvedbookStart).toLocaleString() : '-'}</TableCell>
                          <TableCell>{row.solvedbookEnd ? new Date(row.solvedbookEnd).toLocaleString() : '-'}</TableCell>
                          <TableCell>{new Date(row.formattedDate).toLocaleString()}</TableCell>
                          <TableCell>  {row.memberRole === 1 ? '방장' : '멤버'}</TableCell>
                        </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={"flex justify-center mt-4"}>
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
      </main>
  );
}
