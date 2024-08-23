import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TitleIcon from "@mui/icons-material/Title";
import ArticleIcon from "@mui/icons-material/Article";

export default function EditSidebar() {
    return (
        <aside className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 flex flex-col border-gray-300 border rounded p-4">
            <IconButton>
                <AddIcon/>
            </IconButton>
            <IconButton>
                <TitleIcon/>
            </IconButton>
            <IconButton>
                <ArticleIcon/>
            </IconButton>
        </aside>
    );
}

