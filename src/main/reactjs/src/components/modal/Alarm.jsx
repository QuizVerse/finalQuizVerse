// v0 by Vercel.
// https://v0.dev/t/2KHilHCo8y0

import {Button} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Alarm() {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p>전체 알림 : 3개</p>
                    <p>읽지 않은 알림 : 1개</p>
                </div>
                <Button variant={"contained"}>모두 읽음으로 표시</Button>
            </div>
            <div className="space-y-4">
                <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                        <CheckCircleOutlineIcon/>
                        <div>
                            <p>○ ○ 클래스 일부 공개 화상스터디가 개설되었습니다.</p>
                            <p className="text-sm text-gray-500">1 days ago</p>
                        </div>
                        <Button variant={"outlined"}>삭제</Button>
                    </div>
                </div>
            </div>
        </>
    );
}