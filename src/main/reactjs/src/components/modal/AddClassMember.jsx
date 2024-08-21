// v0 by Vercel.
// https://v0.dev/t/t1MYEyIkCsP

import {Avatar, Button} from "@mui/material";
import SearchInput from "../SearchInput";

export default function AddClassMember() {
    return (
        <>
            <div className="p-6 space-y-4">
                <div className="relative">
                    <SearchInput/>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <span>민지</span>
                        </div>
                        <Button variant={"outlined"}>내보내기</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <span>민석</span>
                        </div>
                        <Button variant={"contained"}>초대하기</Button>
                    </div>

                </div>
            </div>
        </>
    );
}