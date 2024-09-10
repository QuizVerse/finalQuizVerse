// v0 by Vercel.
// https://v0.dev/t/3SShzm6vJSF

import React, {useEffect, useState} from 'react';
import { Stack, Pagination, TextField, MenuItem } from "@mui/material";
import BookCardH from "../../components/BookCardH";
import axios from "axios";

const ITEMS_PER_PAGE = 8; // 한 페이지에 표시할 아이템 수
const SPACING = 2; // 페이지네이션 버튼 간의 간격

export default function Wrong() {
  // 데이터 배열 생성: 반복되는 이미지와 내용을 포함

  // 페이지 상태 관리
  const [page, setPage] = useState(1);

  const[items,setItems]=useState([]);

    useEffect(() => {
        axios
            .get("/wrong/get/booklist")
            .then((response) => {
                console.log("Fetched data: ", response.data); // 데이터를 콘솔에 출력해서 확인
                setItems(response.data);
            })
            .catch((error) => {
                console.error("Error fetching wrong note data:", error);
            });
    }, []);
  // 페이지 변경 시 처리 함수
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  // 현재 페이지에 표시할 아이템 계산
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <main className="flex-1 p-6">
      <h1 className="mb-6 text-2xl font-bold">오답노트</h1>
      <div className="flex items-center mb-6 space-x-4">
        <input
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
          placeholder="Name, email, etc..."
        />

      </div>


      {/* BookCard 목록 출력 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {currentItems.map((item, index) => (
          <BookCardH
            key={index}
            cardType="C"
            className={"flex-1"}
            photo={item.photo}
            createDate={item.createDate}
            nickname={item.nickname}
            title={item.title}
            category={item.category}
            solvedbookId={item.solvedbookId}    // solvedbookId 전달
            wrongRepeat={item.wrongRepeat}      // wrongRepeat 전달
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Stack spacing={SPACING} justifyContent="center" direction="row" mt={4}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </main>
  );
}
