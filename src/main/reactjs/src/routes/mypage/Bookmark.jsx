import { Pagination, Stack } from "@mui/material";
// import K from "../../image/K.jpg";
import BookCard from "../../components/BookCardM";
import React, { useState } from 'react';

const ITEMS_PER_PAGE=8;
const SPACING=2;




export default function Bookmark() {
  const items= Array.from({length:30},(_, index) => ({
    // photo:K,
    createDate:`2023-12${12-index}`,//각 항목의 날짜를 조금씩 다르게
    nickname:"엔믹스",
    title:`규진 ${index+1}`,
    category:"처음뵙겠습니다"
  }));

//페이지 관리
  const [page, setPage] = useState(1);

//페이지 변경 처리
  const handleChange=(event, value) => {
    setPage(value);
    window.scrollTo(0,0); //페이지가 바뀔 때 상단으로 스크롤
  };

  const clickBookmark2 = () => {
    alert("ddd");
  }

//현재 페이지에 표시할 항목 계산
  const itemoffset=(page-1)*ITEMS_PER_PAGE;
  const currentItems=items.slice(itemoffset, itemoffset+ITEMS_PER_PAGE);
  const pageCount=Math.ceil(items.length/ITEMS_PER_PAGE);

  return (
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">즐겨찾기</h1>
          <div className="flex items-center space-x-4">
            <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                placeholder="Name, email, etc..."
            />
            <button
                type="button"
                role="combobox"
                aria-controls="radix-:R19lufnnkr:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                data-placeholder=""
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Filter"
            >
              <span>등록일순</span>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                  aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <select
                aria-hidden="true"
                tabIndex="-1"
            >
              <option value=""></option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {currentItems.map((item, index) => (
              <BookCard
                  key={index}
                  cardType="A"
                  className={"flex-1"}
                  photo={item.photo}
                  createDate={item.createDate}
                  nickname={item.nickname}
                  title={item.title}
                  category={item.category}
                  updateBookmark={clickBookmark2}
              />
          ))}
        </div>
        {/*페이지네이션*/}
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