import {Button, IconButton, TextField} from "@mui/material";
import SearchInput from "./SearchInput";

export default function CategoryHeader() {
    return (
        <div className="flex justify-between px-12 py-4 items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">취업/자격증</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">초등</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">중고등</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">외국어/어학</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">컴퓨터</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">전체보기</Button>
            </div>
            <SearchInput/>
        </div>
    )
}
