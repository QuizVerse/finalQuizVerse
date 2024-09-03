import React, { useEffect, useState } from "react";
import { Button, IconButton, Menu, MenuItem, CardMedia, Snackbar } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Fade from '@mui/material/Fade';
import CustomAlert from "./modal/CustomAlert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomConfirm from "./modal/CustomConfirm";
import axios from "axios";

export default function BookCard(props) {
    const [state, setState] = useState({
        open: false,
        Transition: Fade,
    });
    const { book_Id } = useParams();
    const location = useLocation();
    const [snackMessage, setSnackMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [bookData, setBookData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";
    const itemsPerPage = 8; // 페이지당 아이템 수

    const clickBtn1 = () => {
        setConfirmVisible(false);
    };

    const clickBtn2 = () => {
        setConfirmVisible(false);
    };

    const handleBookmarkClick = () => {
        if (props.cardType === 'A') {
            props.updateBookmark();
            setSnackMessage(props.isBookmark ? "즐겨찾기에서 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
            setState({
                open: true,
                Transition: Fade,
            });
        }
    };

    const handleCopy = () => {
        setSnackMessage("클립보드에 복사되었습니다.");
        setState({
            open: true,
            Transition: Fade,
        });
    };

    const handleSnackClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    const openAlert = () => {
        setAlertVisible(true);
    };

    const closeAlert = () => {
        setAlertVisible(false);
    };

    const handleSettingClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSettingClose = () => {
        setAnchorEl(null);
    };

    const openConfirm = () => {
        setConfirmVisible(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '날짜 없음';
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const formattedDate = new Date(dateString)
            .toLocaleDateString("ko-KR", options)
            .replace(/\./g, "-")
            .replace(/ /g, "");
        return formattedDate.endsWith("-")
            ? formattedDate.slice(0, -1)
            : formattedDate;
    };

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`/book/detail/${book_Id}`);
                setBookData(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        fetchBookData();
    }, [book_Id]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const keyword = query.get("keyword");

        if (keyword) {
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.get(`/books/search?keyword=${encodeURIComponent(keyword)}`);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };

            fetchSearchResults();
        }
    }, [location.search]);

    // 페이지 변경 함수
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // 현재 페이지에 맞는 결과를 가져오기 위한 시작 및 끝 인덱스 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = searchResults.slice(startIndex, endIndex);

    // 인라인 스타일 정의
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4개의 열 생성
        gap: '20px', // 카드 사이 간격 설정
        padding: '20px', // 그리드 주변 패딩 설정
    };

    const cardStyle = {
        width: '300px', // 카드 너비 고정
        height: '300px', // 카드 높이 고정
    };

    const paginationStyle = {
        gridColumn: 'span 4', // 페이지네이션이 그리드 전체를 차지하도록 설정
        textAlign: 'center',
        marginTop: '50px', // 카드 두 번째 줄 아래 50px 간격 설정
    };

    return (
        <>
            {/* 알림 스낵바 */}
            <Snackbar
                open={state.open}
                onClose={handleSnackClose}
                TransitionComponent={state.Transition}
                message={snackMessage}
                key={state.Transition.name}
                autoHideDuration={1200}
            />

            {/* 링크 복사 Alert */}
            <CustomAlert
                title={props.title + "에 대한 링크가 생성되었습니다."}
                content={
                    <CopyToClipboard text={props.bookUrl} onCopy={handleCopy}>
                        <button>링크를 클릭하여 복사: {props.bookUrl}</button>
                    </CopyToClipboard>
                }
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />

            {/* Setting 버튼 클릭시 보이는 메뉴 */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSettingClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={handleSettingClose}>문제집 설정</MenuItem>
                <MenuItem onClick={handleSettingClose}>문제집 PDF 보기</MenuItem>
                <MenuItem onClick={handleSettingClose}>복제하기</MenuItem>
                <MenuItem onClick={handleSettingClose}>삭제하기</MenuItem>
            </Menu>

            {/* 삭제 버튼 클릭시 보이는 Confirm */}
            <CustomConfirm
                id={props.bookId}
                openConfirm={confirmVisible}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            />

            {/* 검색 결과를 카드 형태로 렌더링하는 부분 */}
            <div className="search-results" style={gridStyle}>
                {currentItems.length > 0 &&
                    currentItems.map((book, index) => (
                        <div key={index} className="book-item" style={cardStyle}>
                            <Link to={`/book/detail/${book.bookId}`}>
                                <div
                                    className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
                                    <CardMedia
                                        component="img"
                                        image={`${photopath}/${book.bookImage}`}
                                        alt="Book Image"
                                        sx={{ height: '150px', objectFit: 'contain' }} // 이미지 높이 설정
                                    />
                                    <h3 className="text-xl font-bold text-gray-800">{book.bookTitle}</h3>
                                    <div className="mt-2">
                                        <div
                                            className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {book.user ? book.user.userNickname : "알 수 없음"} · {formatDate(book.bookCreatedate)}
                                        </div>
                                        <h3 className="mt-2 text-lg font-bold">{book.title}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{book.category?.categoryName || '카테고리 없음'}</p>
                                        <p className="mt-1 text-sm text-gray-600">{book.bookStatus === 0 ? "전체 공개" :
                                            book.bookStatus === 1 ? "클래스 공개" :
                                                book.bookStatus === 2 ? "비공개" :
                                                    "알 수 없음"}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }

                {/* 페이지네이션 - 카드 두 번째 줄 밑 50px에 위치 */}
                <div className="pagination" style={paginationStyle}>
                    {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, index) => (
                        <Button key={index} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>

            {/* 개별 책 정보 표시 */}
            {bookData && (
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                    <Link to={`/book/detail/${props.bookId}`}>
                        <CardMedia
                            component="img"
                            image={`${photopath}/${bookData.bookImage}`}
                            alt="Book Image"
                            sx={{ height: 'auto', maxHeight: 600, width: '100%', objectFit: 'contain' }}
                        />
                    </Link>
                    <div className="p-4">
                        <Link to={`/book/detail/${props.bookId}`}>
                            <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {props.nickname} · {formatDate(props.createDate)}
                            </div>
                            <h3 className="mt-2 text-lg font-bold">{props.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">{props.category?.categoryName || '카테고리 없음'}</p>
                            <p className="mt-1 text-sm text-gray-600">{props.status || '상태 없음'}</p>
                        </Link>

                        {props.cardType === 'A' && (
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600" onClick={handleBookmarkClick}>
                                    {props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded" onClick={openAlert}>공유하기</Button>
                            </div>
                        )}

                        {props.cardType === 'B' && (
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600" onClick={handleSettingClick}>
                                    <SettingsIcon />
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-rounded" onClick={openAlert}>공유하기</Button>
                            </div>
                        )}

                        {props.cardType === 'C' && (
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600" onClick={openConfirm}>
                                    <DeleteIcon />
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">
                                    <Link to={props.bookUrl}>다시 학습하기</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
