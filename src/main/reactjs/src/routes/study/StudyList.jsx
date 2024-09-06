import SearchInput from "../../components/SearchInput";
import StudyRoomCard from "../../components/StudyRoomCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const ITEMS_PER_PAGE = 10; // 페이지당 항목 수
const SPACING = 2; // 페이지네이션 버튼 간격

export default function StudyList() {
    const [page, setPage] = useState(1);
    const itemOffset = (page - 1) * ITEMS_PER_PAGE;
    const [roomList, setRoomList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRoom, setFilteredRoom] = useState([]);
    const navi = useNavigate();

    // 페이지네이션에 필요한 항목 처리 함수
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    // 방 목록을 가져오는 함수
    const getRoomList = () => {
        axios.get(`/studys/lists`).then((res) => {
            setRoomList(res.data);
        });
    };

    useEffect(() => {
        getRoomList();
    }, []);

    // 방 들어가기 이벤트 처리 함수
    const GoRoomEvent = (studyId, studyTitle) => {
        navi(`/study/room/${studyId}/${studyTitle}`);
    }

    // 방 생성 페이지로 이동하는 함수
    const NewRoom = () => {
        navi(`/study/new`);
    }

    // 검색어에 따라 방 목록을 필터링
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = roomList.filter((room) =>
            room.studyTitle.toLowerCase().includes(lowerCaseQuery) 
            //room.user.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredRoom(filtered)
    }, [searchQuery, roomList]);
    // 페이지네이션에 맞게 현재 페이지의 항목을 계산
    const currentItems = filteredRoom.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(filteredRoom.length / ITEMS_PER_PAGE); // 총 페이지 수

    return (
        <main className="flex flex-col items-center w-full p-4 md:p-10">
            <div className="flex items-center w-full max-w-5xl mb-6">
                <input
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                    placeholder="roomName, createId"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // 검색어 변경 시 상태 업데이트
                />
                <Button onClick={NewRoom}>방생성</Button>
            </div>
            <div className="grid grid-cols-2 w-full max-w-5xl gap-4">
                {/* 페이지네이션을 적용한 리스트 */}
                {filteredRoom &&
                    currentItems.map((item, index) => (
                        <StudyRoomCard
                            key={index}
                            title={item.studyTitle}
                            description={item.studyDescription}
                            nowMember={0}
                            totalMember={item.studyMemberlimit}
                            status={1}
                            image={item.studyImage}
                            onClick={() => GoRoomEvent(item.studyId, item.studyTitle)} // 방 클릭 시 이벤트
                        />
                    )) || <div>생성된 스터디가 없습니다.</div>
                }
            </div>

            {/* 페이지네이션 버튼 */}
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
