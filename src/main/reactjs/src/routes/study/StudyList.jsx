import SearchInput from "../../components/SearchInput";
import StudyRoomCard from "../../components/StudyRoomCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

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
    const [roomList, setRoomList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태를 관리합니다.
    const [filteredRoom, setFilteredRoom] = useState([]); // 검색어에 따라 필터링된 멤버들을 관리합니다.
    const [nickName, setNickname] = useState(null); // 유저 DTO 상태를 관리
    const navi = useNavigate();
    
    /**
     * @description : pagenation에 필요한 함수
     * */
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    //room list 출력
    const getRoomList = () => {
        axios.get(`/studys/lists`).then((res) => {
          setRoomList(res.data);
        });
      };
    // //사용자 정보를 가져오는 함수
    // const getUserDto = async () => {
    //     axios.get(`/book/username`).then((res) => {
    //         //닉네임불러오기
    //         setNickname(res.data.userNickname);
    //       });
    // };

      useEffect(() => {
        //getUserDto();
        getRoomList();
      }, []);
    
    //화상방 들어가는 이벤트
    const GoRoomEvent = (study_id)=>{
        navi(`/study/room/${study_id}`);
    }

    //방생성 들어가는 이벤트
    const NewRoom = ()=>{
        navi(`/study/new`);
    }

    // 검색어에 따라 멤버들을 필터링합니다.(방제목,방장id)**************************
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = roomList.filter((room) =>
            room.studyTitle.toLowerCase().includes(lowerCaseQuery) ||
            room.studyTitle.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredRoom(filtered);
    }, [searchQuery, roomList]);

    return (
        <main className="flex flex-col items-center w-full p-4 md:p-10">
            <div className="flex items-center w-full max-w-5xl mb-6">
                <input
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                    placeholder="roomName, createId"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={NewRoom}>방생성</Button>
            </div>
            <div className="grid grid-cols-2 w-full max-w-5xl gap-4">
                {/* pagenation 적용할 리스트 */}
                {
                    filteredRoom.map((item, index) => (
                        <StudyRoomCard
                            key={index}
                            title={item.studyTitle}
                            description={item.studyDescription}
                            nowMember={0}
                            totalMember={item.studyMemberlimit}
                            status={1}
                            image={item.studyImage}
                            onClick={()=>GoRoomEvent(item.studyId)}                        />
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
