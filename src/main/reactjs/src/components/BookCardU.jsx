import { Button, IconButton, Menu, MenuItem, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Fade from '@mui/material/Fade';
import { useState } from "react";
import CustomAlert from "./modal/CustomAlert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomConfirm from "./modal/CustomConfirm";

export default function BookCardU(props) {
    // Snackbar 상태 관리
    const [state, setState] = useState({
        open: false,
        Transition: Fade,
    });

    // Snackbar에 표시될 메시지
    const [snackMessage, setSnackMessage] = useState("");

    // Alert 창 상태 관리
    const [alertVisible, setAlertVisible] = useState(false);

    // Setting 메뉴 앵커 요소와 상태 관리
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Confirm 창 상태 관리
    const [confirmVisible, setConfirmVisible] = useState(false);

    /**
     * @description : 삭제 취소 버튼 클릭 시 실행되는 로직
     */
    const clickBtn1 = () => {
        setConfirmVisible(false);
    };

    /**
     * @description : 삭제 확인 버튼 클릭 시 실행되는 로직
     */
    const clickBtn2 = () => {
        setConfirmVisible(false);
    };

    /**
     * @description : 북마크 클릭 시 발생하는 로직
     */
    const handleBookmarkClick = () => {
        if (props.cardType === 'A') {
            // 북마크 상태 업데이트
            props.updateBookmark();
            // Snackbar 메시지 설정
            setSnackMessage(props.isBookmark ? "즐겨찾기에서 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
            // Snackbar 상태 열림으로 설정
            setState({
                open: true,
                Transition: Fade,
            });
        }
    };

    /**
     * @description : 링크 클릭 시 발생하는 로직 (복사)
     */
    const handleCopy = () => {
        // Snackbar 메시지 설정
        setSnackMessage("클립보드에 복사되었습니다.");
        // Snackbar 상태 열림으로 설정
        setState({
            open: true,
            Transition: Fade,
        });
    };

    /**
     * @description : Snackbar 닫힐 때 발생하는 로직
     */
    const handleSnackClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    /**
     * @description : Alert 창 열림 상태 설정
     */
    const openAlert = () => {
        setAlertVisible(true);
    };

    /**
     * @description : Alert 창 닫힘 상태 설정
     */
    const closeAlert = () => {
        setAlertVisible(false);
    };

    /**
     * @description : Setting 버튼 클릭 시 발생하는 로직
     */
    const handleSettingClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * @description : Setting 메뉴 닫힐 때 발생하는 로직
     */
    const handleSettingClose = () => {
        setAnchorEl(null);
    };

    /**
     * @description : Confirm 창 열림 상태 설정
     */
    const openConfirm = () => {
        setConfirmVisible(true);
    };

    /**
     * @description : 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
     */
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                    <CopyToClipboard
                        text={props.bookUrl}
                        onCopy={handleCopy}>
                        <button>링크를 클릭하여 복사: {props.bookUrl}</button>
                    </CopyToClipboard>}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />

            {/* Setting 버튼 클릭시 보이는 메뉴 */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSettingClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
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

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <Link to={`/book/detail/${props.bookId}`}>
                    <img src={props.photo} alt="책 이미지" style={{ width: '60%', margin: 'auto', display: 'block' }} className="w-full h-48 rounded-t" />
                </Link>

                <div className="p-4">
                    <Link to={`/book/detail/${props.bookId}`}>
                        <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                             data-v0-t="badge">
                            {props.nickname} · {formatDate(props.createDate)}
                        </div>
                        <h3 className="mt-2 text-lg font-bold">{props.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{props.category}</p>
                        <p className="mt-1 text-sm text-gray-600">조회수 {props.viewCount} | 문항수 {props.questionCount} | 섹션수 {props.sectionCount}</p>
                        <p className="mt-1 text-sm text-gray-600">{props.status}</p>
                    </Link>

                    {/* A타입 - 문제집 목록, 카테고리별 문제집, 클래스 상세 */}
                    {props.cardType === 'A' && (
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600" onClick={handleBookmarkClick}>
                                {props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded" onClick={openAlert}>공유하기</Button>
                        </div>
                    )}

                    {/* B타입 - 마이페이지 메인 */}
                    {props.cardType === 'B' && (
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600" onClick={handleSettingClick}>
                                <SettingsIcon />
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-rounded" onClick={openAlert}>공유하기</Button>
                        </div>
                    )}

                    {/* C타입 - 오답노트 */}
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
        </>
    );
}
