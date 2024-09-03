// v0 by Vercel.
// https://v0.dev/t/hx5RoREe1hV

import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

//필터
const conditions = [
  {
    value: "popular",
    label: "인기순",
  },
  {
    value: "recent",
    label: "최신순",
  },
  {
    value: "old",
    label: "오래된순",
  },
  {
    value: "title",
    label: "제목순",
  },
];

const ITEMS_PER_PAGE = 8;
const SPACING = 2;

export default function Bookmark({ userId }) {
  //페이지 관리
  const [page, setPage] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // 북마크 목록 가져오기
    const fetchBookmarks = async () => {
      try {
        const markresponse = await axios.get("/bookmark/list", {
          params: { user: userId },
        });
      } catch (error) {
        console.error("fetch bookmark 시래 !", error);
      }
    };
    fetchBookmarks();
  }, [userId]);

  //페이지 변경 처리
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0); //페이지가 바뀔 때 상단으로 스크롤
  };

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmarks) =>
        bookmarks.id === id
          ? { ...bookmarks, isBookmark: !bookmarks.isBookmark }
          : bookmarks
      )
    );
  };

  //현재 페이지에 표시할 항목 계산
  const itemoffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = bookmarks.slice(itemoffset, itemoffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);

  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">즐겨찾기</h1>
        <div className="flex items-center space-x-4">
          <input
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
            placeholder="Name, email, etc..."
          />
          <div className="flex items-center mb-6 space-x-4">
            <TextField
              id="outlined-select-currency"
              select
              defaultValue="popular"
            >
              {conditions &&
                conditions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <select aria-hidden="true" tabIndex="-1">
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
            isBookmark={true}
            updateBookmark={() => toggleBookmark(item.id)}
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
