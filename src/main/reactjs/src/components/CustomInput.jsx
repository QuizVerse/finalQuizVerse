import {IconButton, TextField, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function CustomInput(prop) {
    return (
        <div className="flex flex-col">
            <div className="flex">
                <TextField id="standard-basic"
                           label={prop.label}
                           value={prop.value}
                           type={prop.type}
                           variant="standard"
                           placeholder={prop.placeholder}/>

                {
                    // 비밀번호 인풋인 경우 비밀번호 보이게 하는 버튼
                    /**
                    * @TODO : 비밀번호 보이기 함수 추가
                    * */
                    prop.isPassword &&
                    <div>
                        <IconButton>
                            <VisibilityIcon/>
                        </IconButton>
                        <IconButton>
                            <VisibilityOffIcon/>
                        </IconButton>
                    </div>
                }

            </div>

            {
                prop.captionVisible &&
                <Typography variant="caption" color={prop.captionColor}>{prop.captionText}</Typography>
            }
            {
                /**
                 * @TODO : 타이머 함수 추가
                 * */
                prop.timerVisible &&
                    <Typography variant="caption" color={prop.captionColor}>인증 제한 시간 : 03:00</Typography>
                }
        </div>
        )
}
