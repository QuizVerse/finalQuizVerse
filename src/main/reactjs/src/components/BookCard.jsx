import {Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {red} from "@mui/material/colors";
export default function BookCard() {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <img src="/placeholder.svg" alt="Placeholder" className="w-full h-48 rounded-t"/>
            <div className="p-4">
                <div
                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    data-v0-t="badge"
                >
                    강쌤픽 · 2022.04.27
                </div>
                <h3 className="mt-2 text-lg font-bold">2024 정보처리기사 실기</h3>
                <p className="mt-1 text-sm text-gray-600">취업 / 자격증</p>
                <p className="mt-1 text-sm text-gray-600">조회수 31 | 문항수 20 | 해설수 2</p>
                <div className="flex items-center justify-between mt-4">
                    <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</Button>
                    <IconButton className="text-red-600">
                        <FavoriteBorderIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
