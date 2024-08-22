import {IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput() {
    return (
        <div className="flex items-center justify-center">
            <TextField placeholder="검색어를 입력해주세요." className="w-full max-w-md px-4 py-2 border rounded"
                       type="text"
                       style={{width:"300px"}}
            ></TextField>
            <IconButton style={{marginLeft:"-50px"}}>
                <SearchIcon/>
            </IconButton>
        </div>
    );
}