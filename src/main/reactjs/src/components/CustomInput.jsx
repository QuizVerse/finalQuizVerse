import {IconButton, TextField, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function CustomInput(props) {

    /**
     * @description :
     * input에 입력되는 값이 변경될 때마다 업데이트 해준다.
     * 부모 컴포넌트에서 prop으로 받아올 수 있다.
     *
    * */
    const updateValue = (e) => {
        props.updateValue(e.target.value);
    }

    const updatePasswordVisible = () => {
        props.updatePasswordVisible()
    }

    return (
        <div className="flex flex-col">
            <div className="flex">
                <TextField id="standard-basic"
                           label={props.label}
                           value={props.value}
                           type={props.type}
                           variant="standard"
                           placeholder={props.placeholder}
                           onChange={updateValue}
                />

                {
                    // 비밀번호 인풋인 경우 비밀번호 보이게 하는 버튼
                    /**
                    * @TODO : 비밀번호 보이기 함수 추가
                    * */
                    props.isPassword &&
                    <div>
                        <IconButton onClick={updatePasswordVisible}>
                            { props.isPasswordVisible ? <VisibilityIcon/> : <VisibilityOffIcon/> }
                        </IconButton>
                    </div>
                }

            </div>

            {
                props.captionVisible &&
                <Typography variant="caption" color={props.captionColor}>{props.captionText}</Typography>
            }
            {
                /**
                 * @TODO : 타이머 함수 추가
                 * */
                props.timerVisible &&
                    <Typography variant="caption" color={props.captionColor}>인증 제한 시간 : 03:00</Typography>
                }
        </div>
        )
}
