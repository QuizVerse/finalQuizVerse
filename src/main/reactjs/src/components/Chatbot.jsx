// v0 by Vercel.
// https://v0.dev/t/gujiiLgGWnx


import {Avatar, Button} from "@mui/material";

export default function Chatbot() {
    return (
        <>
            <div className="w-[300px] p-4 bg-blue-100 border border-blue-300 rounded-lg h-96 justify-between flex flex-col">
                <div>
                    <div className="flex items-center mb-4">
                        <Avatar></Avatar>
                        <p className="ml-2 text-sm">무엇이 궁금하신가요?</p>
                    </div>
                    <div className="flex space-x-2 mb-4">
                        <Button variant={"outlined"}>사용법</Button>
                        <Button variant={"outlined"}>문의</Button>
                        <Button variant={"outlined"}>클래스 관리</Button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                        placeholder="무엇이든 물어보세요."
                    />
                    <Button variant={"contained"}>확인</Button>
                </div>
            </div>
        </>
    );
}