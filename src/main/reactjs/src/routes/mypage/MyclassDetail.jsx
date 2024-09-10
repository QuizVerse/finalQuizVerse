import { MenuItem, Pagination, Stack, TextField } from "@mui/material";
import BookCard from "../../components/BookCard";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import ConfirmRoleChangeModal from "../../components/modal/ConfirmRoleChangeModal";
import {Button} from "@mui/material";
import SearchInput from "../../components/SearchInput";

// 필터 옵션 정의
const conditions = [
  { value: 'popular', label: '인기순' },
  { value: 'recent', label: '최신순' },
  { value: 'title', label: '가나다순' },
];

const ITEMS_PER_PAGE = 5;  // 한 페이지당 보여줄 아이템 수
const SPACING = 2;  // 페이지네이션 사이의 간격

export default function Category() {
  const location = useLocation();
  const [categoryId, setCategoryId] = useState('');  // 현재 카테고리 ID 상태
  const [books, setBooks] = useState([]);  // 카테고리에 해당하는 책 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로그인 상태 및 유저 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // 페이지네이션 관련 상태
  const [page, setPage] = useState(1);
  const [sortCondition, setSortCondition] = useState('popular');  // 정렬 기준 상태 추가
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;

  // 로그인 체크 함수
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('/book/username', {
        validateStatus: function (status) {
          return status < 500;  // 500 미만의 상태 코드만 에러로 처리
        }
      });
      if (response.status === 200) {
        setIsLoggedIn(true);  // 로그인 상태로 변경
        setUserInfo(response.data);  // 사용자 정보 저장
      } else if (response.status === 401) {
        setIsLoggedIn(false);  // 로그인 안된 상태로 처리
      }
    } catch (error) {
      setIsLoggedIn(false);  // 로그인 안된 상태로 처리
      console.error('Failed to check login status', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const catId = params.get('cat') || '';  // URL에서 cat 파라미터 가져오기
        setCategoryId(catId);

        if (catId) {
          const response = await axios.get(`/books/category?id=${catId}`);
          let booksData = response.data;

          // 정렬 조건에 따라 책 목록 정렬
          if (sortCondition === 'recent') {
            booksData = booksData.sort((a, b) => new Date(b.bookCreatedate) - new Date(a.bookCreatedate));
          } else if (sortCondition === 'title') {
            booksData = booksData.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle, 'ko-KR'));
          } else if (sortCondition === 'popular') {
            booksData = booksData.sort((a, b) => b.bookViewCount - a.bookViewCount);
          }

          let bookmarkedBookIds = [];

          // 로그인한 경우 유저 북마크 정보를 가져와서 표시
          if (isLoggedIn) {
            const bookmarksResponse = await axios.get('/bookmark/user-bookmarks');
            bookmarkedBookIds = bookmarksResponse.data.map(book => book.bookId);
          }

          // 각 책의 문제수, 섹션수, 북마크 수 가져오기
          const updatedBooks = await Promise.all(
              booksData.map(async (book) => {
                const countBookmarkResponse = await axios.get(`/bookmark/countBookmarks/${book.bookId}`);
                const countQuestionResponse = await axios.get(`/book/question/count/${book.bookId}`);
                const countSectionResponse = await axios.get(`/book/section/count/${book.bookId}`);

                return {
                  ...book,
                  bookmarkCount: countBookmarkResponse.data,
                  bookQuestionCount: countQuestionResponse.data,
                  bookSectionCount: countSectionResponse.data,
                  isBookmark: bookmarkedBookIds.includes(book.bookId),  // 로그인한 유저의 북마크 여부
                };
              })
          );

          setBooks(updatedBooks);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
    fetchBooks();
  }, [location.search, sortCondition, isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 페이지네이션 계산
  const currentItems = books.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(books.length / ITEMS_PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);  // 페이지 이동 시 화면을 상단으로 스크롤
  };

  const handleSortChange = (event) => {
    setSortCondition(event.target.value);
  };

  // 북마크 클릭 함수
  const clickBookmark = async (bookId) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const updatedBooks = books.map((book) =>
          book.bookId === bookId ? { ...book, isBookmark: !book.isBookmark } : book
      );

      // 북마크 토글 요청
      await axios.post('/bookmark/toggle', { bookId });

      setBooks(updatedBooks);
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  };

  // 검색 시 navigate 처리
  const handleSearch = (keyword) => {
    setSearchQuery(keyword);
  };

  return (
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold">
          {classdata ? classdata.className : 'Loading...'}
        </h1>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <SearchInput
                  value={searchQuery}
                  onSearch={handleSearch}/>

            </div>
            <div className="space-x-2">
              {userRole === 1 && (
                  <>
                    <Button variant={"outlined"} onClick={memberAdd}>구성원 추가</Button>
                    <Button variant={"outlined"} onClick={memberDelete}>구성원 삭제</Button>
                    <Button variant={"outlined"} onClick={changeRole}>방장 권한 부여</Button>
                  </>
              )}
              <Button variant={"contained"} onClick={leaveClass}>클래스 나가기</Button>
            </div>
          </div>
          {openAdd && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md">
                  <AddClassMember onClose={handleClose}/>
                </div>
              </div>
          )}
          {openRoleChange.isOpen && (
              <ConfirmRoleChangeModal
                  members={members}
                  onClose={() => setOpenRoleChange(false)}
                  onConfirm={confirmRoleChange}
              />
          )}
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-10">
                  <input
                      type="checkbox"
                      aria-hidden="true"
                      tabIndex="-1"
                      value="on"
                      checked={allSelected}
                      onChange={handleSelectAll}
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  이름
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  프로필사진
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  이메일
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  등록일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  상태
                </th>
              </tr>
              </thead>
              <tbody>
              {currentMembers.map((member) => (
                  <tr
                      key={member.classmemberId}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <input
                          type="checkbox"
                          aria-hidden="true"
                          tabIndex="-1"
                          value="on"
                          checked={member.isSelected || false}
                          onChange={() => handleSelectMember(member.classmemberId)}
                      />
                    </td>
                    <td className="p-4 align-middle">{member.user.userNickname}</td>
                    <td className="p-4 align-middle">
                      {member.user.userImage ? (
                          <img
                              src={`${photopath}/${member.user.userImage}`} // photopath와 userImage를 결합하여 이미지 URL 생성
                              alt={member.user.userNickname}
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                          />
                      ) : (
                          <span>No Image</span> // 이미지가 없을 때 표시할 텍스트
                      )}
                    </td>

                    <td className="p-4 align-middle">{member.user.userEmail}</td>
                    <td className="p-4 align-middle">
                      {new Date(member.classmemberDate).toLocaleString()}
                    </td>
                    <td className="p-4 align-middle">
                      <div
                          className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                        {member.classmemberRole === 2 ? "멤버" : "방장"}
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
          {/* 페이지네이션 버튼 */}
          <div className="flex justify-center mt-4">
            {/* 이전 버튼 */}
            {pageGroup > 0 && (
                <button
                    onClick={prevPageGroup}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                >
                  이전
                </button>
            )}

            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`mx-1 px-3 py-1 rounded ${
                        currentPage === pageNumber ? "bg-primary text-white" : "bg-gray-200"
                    }`}
                >
                  {pageNumber}
                </button>
            ))}

            {/* 다음 버튼 */}
            {endPage < totalPages && (
                <button
                    onClick={nextPageGroup}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                >
                  다음
                </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">클래스 공개 문제집</h2>
        </div>
        <section className="grid grid-cols-5 gap-4">
          {currentItems.length > 0 ? (
              currentItems.map(book => (
                  <div key={book.bookId}>
                    <BookCard
                        cardType="A"
                        nickname={book.user?.nickname || 'Unknown'}
                        createDate={book.bookCreatedate}
                        title={book.bookTitle}
                        category={book.category?.categoryName || 'Unknown'}
                        viewCount={book.bookViewCount}
                        bookQuestionCount={book.bookQuestionCount}
                        bookSectionCount={book.bookSectionCount}
                        bookmarkCount={book.bookmarkCount}
                        isBookmark={book.isBookmark}  // 북마크 상태 전달
                        updateBookmark={() => clickBookmark(book.bookId)}  // 북마크 클릭 처리
                        isLoggedIn={isLoggedIn}  // 로그인 상태 전달
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
                count={pageCount}  // 전체 페이지 수
                page={page}  // 현재 페이지 번호
                onChange={handleChange}  // 페이지 변경 시 호출되는 함수
                showFirstButton  // 첫 페이지로 이동 버튼 표시
                showLastButton  // 마지막 페이지로 이동 버튼 표시
            />
          </Stack>
        </div>
      </main>
  );
}