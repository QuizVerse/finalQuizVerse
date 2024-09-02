import React, { useEffect, useState } from "react";
import { Button, IconButton, Menu, MenuItem, CardMedia, Snackbar } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom"; // useLocation 훅과 useParams 훅을 import
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
    const { book_Id } = useParams(); // URL에서 book_Id를 가져옴
    const location = useLocation(); // URL의 쿼리 파라미터를 가져오기 위해 useLocation 훅 사용
    const [snackMessage, setSnackMessage] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가
    const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장할 상태

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

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
                const response = await axios.get(`/book/detail/${book_Id}`); // 책 정보 엔드포인트 호출
                setBookData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };
        fetchBookData(); // 책 정보 가져오기 호출
    }, [book_Id]);

    useEffect(() => {
        // URL의 쿼리 파라미터에서 검색어를 가져옴
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
    }, [location.search]); // location.search가 변경될 때마다 실행

    return (
        <>
            <Snackbar
                open={state.open}
                onClose={handleSnackClose}
                TransitionComponent={state.Transition}
                message={snackMessage}
                key={state.Transition.name}
                autoHideDuration={1200}
            />

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

            <CustomConfirm
                id={props.bookId}
                openConfirm={confirmVisible}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            />

            {/* 검색 결과를 렌더링하는 부분 */}
            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map((book, index) => (
                        <div key={index} className="book-item">
                            <Link to={`/book/detail/${book.bookId}`}>
                                <CardMedia
                                    component="img"
                                    image={`${photopath}/${book.bookImage}`}
                                    alt="Book Image"
                                    sx={{ height: 'auto', maxHeight: 600, width: '100%', objectFit: 'contain' }}
                                />
                            </Link>
                            <h3>{book.bookTitle}</h3>
                            <p>{book.bookDescription}</p>
                        </div>
                    ))
                ) : (
                    <p>검색된 책이 없습니다.</p>
                )}
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
                            <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" data-v0-t="badge">
                                {props.nickname} · {formatDate(props.createDate)}
                            </div>
                            <h3 className="mt-2 text-lg font-bold">{props.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">{props.category}</p>
                            <p className="mt-1 text-sm text-gray-600">조회수 {props.viewCount} | 문항수 {props.questionCount} | 섹션수 {props.sectionCount}</p>
                            <p className="mt-1 text-sm text-gray-600">{props.status}</p>
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
