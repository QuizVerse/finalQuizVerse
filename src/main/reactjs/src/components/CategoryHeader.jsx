import {Button, IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function CategoryHeader() {
    return (
        <div className="flex justify-between px-12 py-4">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">취업/자격증</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">초등</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">중고등</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">외국어/어학</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">컴퓨터</Button>
                <Button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full">전체보기</Button>
            </div>
            <div className="flex items-center justify-center mb-4">
                <TextField placeholder="검색어를 입력해주세요." className="w-full max-w-md px-4 py-2 border rounded" type="text"></TextField>
                <IconButton className="p-2 ml-2 text-gray-600 bg-gray-100 rounded">
                    <SearchIcon/>
                </IconButton>
            </div>
        </div>
    )
}
