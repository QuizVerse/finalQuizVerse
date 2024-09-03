import {Button, IconButton, Menu, MenuItem} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import {useState} from "react";
import CustomAlert from "./modal/CustomAlert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CustomConfirm from "./modal/CustomConfirm";

export default function BookCard(props) {
    // snack state
    const [state, setState] = useState({
        open: false,
        Transition: Fade,
    });

    // snackMessage
    const [snackMessage, setSnackMessage] = useState("");

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);

    // setting menu state
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // confirm state
    const [confirmVisible, setConfirmVisible] = useState(false);

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

    /**
     * @description : 북마크 클릭시 발생하는 로직
     * */
    const handleBookmarkClick = () => () => {
        if(props.cardType === 'A'){
            // 북마크 상태 업데이트
            props.updateBookmark();
            // snack message 교체
            setSnackMessage(props.isBookmark ? "즐겨찾기에서 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
            // snack 상태 업데이트
            setState({
                open: true,
                Transition: Fade,
            });
        }
    };

    /**
     * @description : 링크 클릭시 발생하는 로직
     * */
    const handleCopy = () => () => {
        // snack message 교체
        setSnackMessage("클립보드에 복사되었습니다.");
        // snack 상태 업데이트
        setState({
            open: true,
            Transition: Fade,
        });
    };

    /**
     * @description : 스낵바 닫힐때 발생하는 로직
     * */
    const handleSnackClose = () => {
        setState({
            ...state,
            open: false,
        });
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


    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setConfirmVisible(true);
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
                title={props.title+"에 대한 링크가 생성되었습니다."}
                content={
                    <CopyToClipboard
                        text={props.bookUrl}
                        onCopy={handleCopy(Fade)}>
                        <button>링크를 클릭하여 복사 : {props.bookUrl}</button>
                    </CopyToClipboard>}
                openAlert={alertVisible}
                closeAlert={closeAlert}
            />

            {/* Setting 버튼 클릭시 보이는 메뉴 */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleSettingClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <MenuItem onClick={handleSettingClose}>문제집 설정</MenuItem>
                <MenuItem onClick={handleSettingClose}>문제집 PDF 보기</MenuItem>
                <MenuItem onClick={handleSettingClose}>복제하기</MenuItem>
                <MenuItem onClick={handleSettingClose}>삭제하기</MenuItem>
            </Menu>

            {/* Setting 버튼 클릭시 보이는 메뉴 */}
            <CustomConfirm
                id={12}
                openConfirm={confirmVisible}
                clickBtn1={clickBtn1}
                clickBtn2={clickBtn2}
            />
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <Link>
                    <img src={props.photo} alt="사진왜안들어가" style={{width:'60%', margin:'auto', display:'block'}} className="w-full h-48 rounded-t"/>
                </Link>

                <div className="p-4">
                    <Link>
                        <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                             data-v0-t="badge">
                            {props.nickname} · {props.createDate}
                        </div>
                        <h3 className="mt-2 text-lg font-bold">{props.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{props.category}</p>
                        <p className="mt-1 text-sm text-gray-600">조회수 {props.viewCount} | 문항수 {props.questionCount} | 섹션수 {props.sectionCount}</p>
                        <p className="mt-1 text-sm text-gray-600">{props.status}</p>
                    </Link>

                    {/* A타입 -  문제집 목록, 카테고리별 문제집, 클래스 상세 - 클래스 공개 문제집, 즐겨찾기*/
                        props.cardType === 'A' ?
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600"
                                            onClick={handleBookmarkClick()}>
                                    { props.isBookmark ? <BookmarkIcon/> : <BookmarkBorderIcon/> }
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded"
                                        onClick={openAlert}>공유하기</Button>
                            </div> : ""
                    }

                    { /* B타입 - 마이페이지 메인 - 내가 만든 문제집, 나의 출제이력 */
                        props.cardType === 'B' ?
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600"
                                            onClick={handleSettingClick}>
                                    <SettingsIcon/>
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-rounded"
                                        onClick={openAlert}>공유하기</Button>
                            </div> : ""
                    }
                    {/* C타입 - 오답노트 */
                        props.cardType === 'C' ?
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600"
                                            onClick={openConfirm}>
                                    <DeleteIcon/>
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">
                                    <Link to={props.bookUrl}>다시 학습하기</Link>
                                </Button>
                            </div>  : ""
                    }
                </div>
            </div>

        </>

    )
}