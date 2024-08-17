import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ConfirmContent from "./ConfirmContent";

/**
 * @description :
 * 버튼이 두개 있는 모달을 원할 때 사용
 * props으로 id를 넘겨주면 해당 Confirm의 data를 가져와 출력
 * */
export default function CustomConfirm(props) {
    let title = "";
    let content = "";
    let btn1Text = "";
    let btn2Text = "";
    let btn1Func = "";
    let btn2Func = "";

    ConfirmContent.map((e)=>{
        if(e.id === props.id) {
            title = e.title;
            content = e.content;
            btn1Text = e.btn1Text;
            btn2Text = e.btn2Text;
            btn1Func = e.btn1Func;
            btn2Func = e.btn2Func;
        }
    })

    const clickBtn1 = () => {
        btn1Func();
        props.closeConfirm();
    };

    const clickBtn2 = () => {
        btn2Func();
        props.closeConfirm();
    };

    return (
        <>
            <Dialog
                open={props.openConfirm}
                onClose={props.closeConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title || title ||'모달 제목'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* content props을 통해서 컴포넌트를 삽입할 수 있다. */}
                        {props.content || content || '모달 설명'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clickBtn1}>
                        {props.btn1Text || btn1Text || '취소'}
                    </Button>
                    <Button onClick={clickBtn2} autoFocus>
                        {props.btn2Text || btn2Text || '확인'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

