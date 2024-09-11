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
import axios from "axios";

export default function BookCard(props) {

    const { user } = props;

    const siteUrl = "https://www.quizverse.kro.kr"
    const [state, setState] = useState({
        open: false,
        Transition: Fade,
    });

    // Snackbar에 표시될 메시지
    const [snackMessage, setSnackMessage] = useState("");

    // Alert 창 상태 관리
    const [alertTitle, setAlertTitle] = useState("");
    const [alertVisible, setAlertVisible] = useState(false);
    const [copyAlertVisible, setCopyAlertVisible] = useState(false);

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
     * */
    const clickBtn2 = () => {
        console.log("왜이럼", props.bookId)

        axios.delete('/publishedbook/delete/' + props.bookId, {
            data: user // DELETE 요청에서 바디 데이터 전달
        }).then(res => {
            console.log(res);
            setConfirmVisible(false);
            setAnchorEl(false);

            // 부모 컴포넌트에 삭제된 책 ID 전달
            if (props.onDelete) {
                props.onDelete(props.bookId);
            }
        }).catch(error => {
            console.error(error);
        });
    };

    // 문제집 복제 기능
    const handleCopyBook = () => {
        if (!user) {
            openAlert("로그인이 필요한 서비스입니다.");
            return;
        }

        axios.post('/publishedbook/copy/' + props.bookId, user)
            .then(res => {
                setSnackMessage("문제집이 성공적으로 복제되었습니다.");
                setState({ open: true, Transition: Fade });
            })
            .catch(error => {
                console.error("복제 실패", error);
            });
    };

    // 북마크 추가 버튼 클릭 이벤트
    const handleBookmarkClick = () => {
        if (!props.isLoggedIn) {
            openAlert("로그인이 필요한 서비스 입니다.");
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
    const handleCopy = () => {
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
    const openCopyAlert = () => {
        setCopyAlertVisible(true);
    };

    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (title) => {
        setAlertTitle(title)
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setCopyAlertVisible(false);
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
                        <Button>링크를 클릭하여 복사 : { siteUrl + "/book/detail/"+ props.bookId}</Button>
                    </CopyToClipboard>
                }
                openAlert={copyAlertVisible}
                closeAlert={closeAlert} />

            {/* 문제집 삭제 confirm */}
            <CustomConfirm
                id={12}
                openConfirm={confirmVisible}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2} />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleSettingClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <MenuItem><Link to={"/book/update/"+props.bookId}>문제집 설정</Link></MenuItem>
                <MenuItem><Link to={"/book/questionpreviewPDF/"+props.bookId}>문제집 미리보기</Link></MenuItem>
                <MenuItem onClick={handleCopyBook}>복제하기</MenuItem>
                <MenuItem onClick={openConfirm}>삭제하기</MenuItem>
            </Menu>
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
                            className="items-center whitespace-nowrap text-xs transition-colors text-ellipsis overflow-hidden">
                            {props.nickname || "알 수 없음"} · {formatDate(props.createDate)}
                        </div>
                        <h3 className="mt-2 text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">{props.title}</h3>
                        {props.isWrong && (
                            <p className="mt-1 text-sm text-gray-600">문항수 {props.bookQuestionCount}</p>
                        )}
                        {!props.isWrong && (
                            <>
                                <p className="mt-1 text-sm text-gray-600">{props.category}</p>
                                <p className="mt-1 text-sm text-gray-600">즐겨찾기 {props.bookmarkCount} |
                                    문항수 {props.bookQuestionCount} | 섹션수 {props.bookSectionCount}</p>
                                <p className="mt-1 text-sm text-gray-600">{props.status === 0 ? "공개" : props.status === 1 ? "클래스 공개" : "비공개"}</p>
                            </>
                        )}
                    </Link>

                    {/*A타입 -  문제집 목록, 카테고리별 문제집, 클래스 상세 - 클래스 공개 문제집, 즐겨찾기*/}
                    {props.cardType === 'A' && (
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600" onClick={handleBookmarkClick}>
                                {props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded" onClick={openCopyAlert}>
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
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded" onClick={openCopyAlert}>
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
                                <Link to={props.wrongUrl}>다시 학습하기</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}