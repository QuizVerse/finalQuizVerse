import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlertContent from "./AlertContent";

/**
 * @description :
 * 버튼이 한 개 있는 모달을 원할 때 사용
 * prop으로 id를 넘겨주면 해당 Alert의 data를 가져와 출력
 * */
export default function CustomAlert(prop) {

    const clickBtn = () => {
        AlertContent[prop.id].btnFunc()
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
                    {AlertContent[prop.id].title || '모달 타이틀'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {AlertContent[prop.id].content || '모달 설명'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={clickBtn} autoFocus>
                        {AlertContent[prop.id].btnText || '확인'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

