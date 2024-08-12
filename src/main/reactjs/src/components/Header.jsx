import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export default function Header() {
    return (
        <header className="flex items-center justify-between w-full px-4 py-2 border-b">
            <h1 className="text-xl font-bold">QuizVerse</h1>
            <nav className="flex items-center space-x-4">
                <Button>
                    <Link to='/book/list' className="text-sm font-medium text-gray-700" >
                    문제집 목록
                    </Link>
                </Button>
                <Button>
                    <Link to='/study/list' className="text-sm font-medium text-gray-700" >
                    화상스터디
                    </Link>
                </Button>
            </nav>
            <div className="flex items-center space-x-2">
                <Button>
                    <Link to='/account/login'>로그인</Link>
                </Button>
                <Button>
                    <Link to='/account/signup'>회원가입</Link>
                </Button>
            </div>
        </header>
    );
}