// v0 by Vercel.
// https://v0.dev/t/Onu9RySa1RJ

import { Pagination, Stack } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useState } from 'react';

const ITEMS_PER_PAGE = 10;
const SPACING = 2;

// pagenation할 자료
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

export default function Category() {

  // pagenation에 필요한 변수
  const [page, setPage] = useState(1);
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  /**
   * @description : pagenation에 필요한 함수
  * */
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
    };

    return (

  <main className="p-4">
    <section>
      <h2 className="mb-4 text-xl font-bold">취업/자격증 문제집 Top 5</h2>
      <div className="grid grid-cols-5 gap-4 mb-8">
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
       
          <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        
      </div>
    </section>
    <section>
      <h2 className="mb-4 text-xl font-bold">취업/자격증 문제집</h2>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          role="combobox"
          aria-controls="radix-:R2jlufnnkr:"
          aria-expanded="false"
          aria-autocomplete="none"
          dir="ltr"
          data-state="closed"
          data-placeholder=""
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="filter"
        >
          <span >필터</span>
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
          tabindex="-1">
          <option value=""></option>
        </select>
      </div>
      <div className="grid grid-cols-5 gap-4">
      <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
      </div>
    </section>
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

    )
}












