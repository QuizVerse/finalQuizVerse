import {Button, IconButton, Slide} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import {useState} from "react";
import CustomAlert from "./CustomAlert";


export default function BookCard(props) {
    // snack state
    const [state, setState] = useState({
        open: false,
        Transition: Fade,
    });

    // snackMessage
    const [snackMessage, setSnackMessage] = useState("추가");

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    /**
     * @description : 북마크 클릭시 발생하는 로직
     * */
    const handleClick = (Transition) => () => {
        // 북마크 상태 업데이트
        props.updateBookmark();
        // snack message 띄우기
        setSnackMessage(props.isBookmark ? "즐겨찾기에서 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
        // snack 상태 업데이트
        setState({
            open: true,
            Transition,
        });
    };

    /**
     * @description : 북마크 닫힐때 발생하는 로직
     * */
    const handleClose = () => {
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


    return (
        <>
            {/* 즐겨찾기 추가 삭제 메서드 */}
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={snackMessage}
                key={state.Transition.name}
                autoHideDuration={1200}
            />
            <CustomAlert
                id={9}
                openAlert={alertVisible}
                closeAlert={closeAlert}
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
                                <IconButton className="text-red-600" onClick={handleClick(Fade)}>
                                    { props.isBookmark ? <BookmarkIcon/> : <BookmarkBorderIcon/> }
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded"
                                        onClick={openAlert}
                                >공유하기</Button>
                            </div> : ""
                    }

                    { /* B타입 - 마이페이지 메인 - 내가 만든 문제집, 나의 출제이력 */
                        props.cardType === 'B' ?
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600">
                                    <SettingsIcon/>
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</Button>
                            </div> : ""
                    }
                    {/* C타입 - 오답노트 */
                        props.cardType === 'C' ?
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600">
                                <DeleteIcon/>
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">다시 학습하기</Button>
                        </div>  : ""
                    }
                </div>
            </div>

        </>

    )
}