import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { useState } from "react";
import CustomAlert from "./modal/CustomAlert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomConfirm from "./modal/CustomConfirm";

export default function BookCard(props) {

    const siteUrl = "http://localhost:3000"
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

    // 문항수 불러오기
    const questionCount = props.questionCount || 0;

    // 섹션수 불러오기
    const sectionCount = props.sectionCount || 0;


    /**
     * @description : 삭제 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        setConfirmVisible(false);
    };

    /**
     * @description : 삭제 확인 버튼 클릭시 실행되는 로직
     * @TODO : 문제집 삭제 기능 추가
     * */
    const clickBtn2 = () => {
        setConfirmVisible(false);
    };

    // 북마크 추가 버튼 클릭 이벤트
    const handleBookmarkClick = () => {
        if (!props.isLoggedIn) {
            alert("로그인이 필요합니다!.");
            return;
        }

        try {
            props.updateBookmark();

            // Only set Snackbar message if user is logged in
            if (props.isLoggedIn) {
                setSnackMessage(props.isBookmark ? "즐겨찾기에서 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
                setState({ open: true, Transition: Fade });
            }
        } catch (error) {
            console.error("Failed to update bookmark", error);
        }
    };

    /**
     * @description : 링크 클릭시 발생하는 로직
     * */
    const handleCopy = () => () => {
        // snack message 교체
        setSnackMessage("클립보드에 복사되었습니다.");
        setState({ open: true, Transition: Fade });
    };

    /**
     * @description : 스낵바 닫힐때 발생하는 로직
     * */
    const handleSnackClose = () => {
        setState({ ...state, open: false });
    };

    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = () => {
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };

    /**
     * @description : setting 버튼 클릭했을때
     * */
    const handleSettingClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * @description : setting 닫힐 때
     * */
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
                title={`${props.title}에 대한 링크가 생성되었습니다.`}
                content={
                    <CopyToClipboard text={ siteUrl + "/book/detail/" + props.bookId} onCopy={handleCopy}>
                        <button>링크를 클릭하여 복사 : { siteUrl + "/book/detail/"+ props.bookId}</button>
                    </CopyToClipboard>
                }
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleSettingClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem onClick={handleSettingClose}>문제집 설정</MenuItem>
                <MenuItem onClick={handleSettingClose}>문제집 PDF 보기</MenuItem>
                <MenuItem onClick={handleSettingClose}>복제하기</MenuItem>
                <MenuItem onClick={handleSettingClose}>삭제하기</MenuItem>
            </Menu>
            <CustomConfirm id={12} openConfirm={confirmVisible} clickBtn1={clickBtn1} clickBtn2={clickBtn2} />
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <Link to={`/book/detail/${props.bookId}`}>
                    <img
                        src={props.photo && props.photo.startsWith("https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/2") ?
                            props.photo :
                            "/quizverse-logo.png"}
                        alt="책 이미지"
                        className="w-full h-48 rounded-t"
                    />


                </Link>

                <div className="p-4">
                    <Link>
                        <div
                            className="inline-flex w-fit items-center whitespace-nowrap px-2.5 py-0.5 text-xs font-semibold transition-colors">
                            {props.nickname || "알 수 없음"} · {formatDate(props.createDate)}
                        </div>
                        <h3 className="mt-2 text-lg font-bold">{props.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{props.category}</p>
                        <p className="mt-1 text-sm text-gray-600">저장수 {props.bookmarkCount} | 문항수 {props.bookQuestionCount} | 섹션수 {props.bookSectionCount}</p>
                        <p className="mt-1 text-sm text-gray-600">{props.status === 0 ? "비공개" : "공개"}</p>
                    </Link>

                    {/*A타입 -  문제집 목록, 카테고리별 문제집, 클래스 상세 - 클래스 공개 문제집, 즐겨찾기*/}
                    {props.cardType === 'A' && (
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600" onClick={handleBookmarkClick}>
                                {props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded" onClick={openAlert}>
                                공유하기
                            </Button>
                        </div>
                    )}
                    {/*B타입 - 마이페이지 메인 - 내가 만든 문제집, 나의 출제이력*/}
                    {props.cardType === 'B' && (
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600" onClick={handleSettingClick}>
                                <SettingsIcon />
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded" onClick={openAlert}>
                                공유하기
                            </Button>
                        </div>
                    )}
                    {/*C타입 - 오답노트*/}
                    {props.cardType === 'C' && (
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600" onClick={openConfirm}>
                                <DeleteIcon />
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">
                                <Link to={`/book/detail/${props.bookId}`}>다시 학습하기</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
