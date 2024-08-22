import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TitleIcon from "@mui/icons-material/Title";
import ArticleIcon from "@mui/icons-material/Article";

export default function EditSidebar() {
    return (
        <aside className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2">
            <Button>
                <AddIcon/>
            </Button>
            <Button>
                <TitleIcon/>
            </Button>
            <Button>
                <ArticleIcon/>
            </Button>
        </aside>
    );
}

