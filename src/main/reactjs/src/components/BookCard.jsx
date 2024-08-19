import {Button, IconButton} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

export default function BookCard(prop) {
    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                <Link>
                    <img src={prop.photo} alt="사진왜안들어가" style={{width:'60%', margin:'auto', display:'block'}} className="w-full h-48 rounded-t"/>
                </Link>
                
                <div className="p-4">
                    <Link>
                        <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            data-v0-t="badge">
                            {prop.nickname} · {prop.createDate}
                        </div>
                        <h3 className="mt-2 text-lg font-bold">{prop.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{prop.category}</p>
                        <p className="mt-1 text-sm text-gray-600">조회수 {prop.viewCount} | 문항수 {prop.questionCount} | 섹션수 {prop.sectionCount}</p>
                        <p className="mt-1 text-sm text-gray-600">{prop.status}</p>
                    </Link>

                    {/* A타입 -  문제집 목록, 카테고리별 문제집, 클래스 상세 - 클래스 공개 문제집, 즐겨찾기*/
                        prop.cardType === 'A' ?
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600">
                                    <FavoriteBorderIcon/>
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</Button>
                            </div> : ""
                    }

                    { /* B타입 - 마이페이지 메인 - 내가 만든 문제집, 나의 출제이력 */
                        prop.cardType === 'B' ?
                            <div className="flex items-center justify-between mt-4">
                                <IconButton className="text-red-600">
                                    <SettingsIcon/>
                                </IconButton>
                                <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">공유하기</Button>
                            </div> : ""
                    }
                    {/* C타입 - 오답노트 */
                        prop.cardType === 'C' ?
                        <div className="flex items-center justify-between mt-4">
                            <IconButton className="text-red-600">
                                <DeleteIcon/>
                            </IconButton>
                            <Button className="px-4 py-2 text-gray-600 border border-gray-600 rounded">다시 학습하기</Button>
                        </div>  : ""
                    }
                </div>
            </div>

        </>

    )
}