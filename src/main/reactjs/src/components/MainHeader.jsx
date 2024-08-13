import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function MainHeader() {
    return (
        <div>
            <header className="flex items-center justify-between w-full px-4 py-2 border-b">
                <Link to='/'>
                    <h1 className="text-xl font-bold">QuizVerse</h1>
                </Link>
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
                {/* 로그인 안 한 헤더 */
                    <div className="flex items-center space-x-2">
                        <Button>
                            <Link to='/account/login'>로그인</Link>
                        </Button>
                        <Button>
                            <Link to='/account/signup'>회원가입</Link>
                        </Button>
                    </div>
                }   
                {/* 로그인 한 헤더 */
                    <div className="flex items-center space-x-2">
                        <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm">
                            로그아웃
                        </Button>
                        <span className="text-sm">귀염둥이</span>
                        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <img className="aspect-square h-full w-full" alt="User Avatar" src="/placeholder-user.jpg" />
                        </span>
                    </div>
                }
            </header>
        </div >
    );
}