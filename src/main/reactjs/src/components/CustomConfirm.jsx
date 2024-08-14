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
 * prop으로 id를 넘겨주면 해당 Confirm의 data를 가져와 출력
 * */
export default function CustomConfirm(prop) {

    const clickBtn1 = () => {
        ConfirmContent[prop.id].btn1Func()
        prop.closeConfirm();
    };

    const clickBtn2 = () => {
        ConfirmContent[prop.id].btn2Func();
        prop.closeConfirm();
    };

    return (
        <>
            <Dialog
                open={prop.openConfirm}
                onClose={prop.closeConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {ConfirmContent[prop.id].title || '모달 타이틀'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {ConfirmContent[prop.id].content || '모달 설명'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clickBtn1}>
                        {ConfirmContent[prop.id].btn1Text || '취소'}
                    </Button>
                    <Button onClick={clickBtn2} autoFocus>
                        {ConfirmContent[prop.id].btn2Text || '확인'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

