import SearchInput from "../../components/SearchInput";
import StudyRoomCard from "../../components/StudyRoomCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;
const SPACING = 2;

// pagenation할 자료
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function StudyList() {
    // pagenation에 필요한 변수
    const [page, setPage] = useState(1);
    const itemOffset = (page - 1) * ITEMS_PER_PAGE;
    const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
    const navi = useNavigate();

    /**
     * @description : pagenation에 필요한 함수
     * */
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const [roomList, setRoomList] = useState([]);

    const getRoomList = () => {
        axios.get(`/studys/lists`).then((res) => {
          setRoomList(res.data);
        });
      };
    
      useEffect(() => {
        getRoomList();
      }, []);

    return (
        <main className="flex flex-col items-center w-full p-4 md:p-10">
            <div className="flex items-center w-full max-w-5xl mb-6">
                <SearchInput/>
            </div>
            <div className="grid grid-cols-2 w-full max-w-5xl gap-4">
                {/* pagenation 적용할 리스트 */}
                {
                    roomList.map((item, index) => (
                        <StudyRoomCard
                            key={index}
                            title={item.studyTitle}
                            description={item.studyDescription}
                            nowMember={0}
                            totalMember={item.studyMemberlimit}
                            status={1}
                        />
                    ))}
            </div>

            {/* pagenation 버튼 */}
            <div className={"flex justify-center mt-4"}>
                <Stack spacing={SPACING}>
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            </div>
        </main>
    );
}
