import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchInput({ value, onChange, onSearch }) {
    return (
        <div className="flex items-center justify-center">
            <TextField
                placeholder="검색어를 입력해주세요."
                className="w-full max-w-md px-4 py-2 border rounded"
                type="text"
                style={{ width: "300px" }}
                value={value} // 외부에서 전달받은 value 사용
                onChange={onChange} // 외부에서 전달받은 onChange 사용
            />
            <IconButton style={{ marginLeft: "-50px" }} onClick={onSearch}>
                <SearchIcon />
            </IconButton>

           
        </div>
    );
}
