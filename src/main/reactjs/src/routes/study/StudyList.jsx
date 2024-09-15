import SearchInput from "../../components/SearchInput";
import StudyRoomCard from "../../components/StudyRoomCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import StudyRoomEntry from "../../components/modal/StudyRoomEntry";
import {useNavigate} from "react-router-dom";


const ITEMS_PER_PAGE = 10; // 페이지당 항목 수
const SPACING = 2; // 페이지네이션 버튼 간격

export default function StudyList() {
    const [page, setPage] = useState(1);
    const itemOffset = (page - 1) * ITEMS_PER_PAGE;
    const [roomList, setRoomList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRoom, setFilteredRoom] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null); // 선택된 방 정보
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태 관리
    const navigate = useNavigate();

    // 페이지네이션에 필요한 항목 처리 함수
    const handleChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        console.log('Rendering roomList:', roomList);
    }, [roomList]);

    // 방 목록을 가져오는 함수
    const getRoomList = () => {
        axios.get(`/studys/lists`).then((res) => {
            //setRoomList(res.data);
            // 응답 데이터가 배열인지 확인
            if (Array.isArray(res.data)) {
                setRoomList(res.data);
            } else {
                console.error('Fetched data is not an array:', res.data);
                setRoomList([]);  // 배열이 아닌 경우 빈 배열로 설정
            }
        }).catch(error => {
            console.error('Failed to fetch room list:', error);
            setRoomList([]);  // 에러 발생 시 빈 배열로 설정
        });
    };

    useEffect(() => {
        getRoomList();
    }, []);

    // 방 생성 페이지로 이동하는 함수
    const NewRoom = () => {
        // 방 생성 페이지로 이동
        navigate(`/study/new`);
    };

    // 검색어에 따라 방 목록을 필터링
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = roomList.filter((room) =>
            room.studyTitle.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredRoom(filtered)
    }, [searchQuery, roomList]);

    // 방 클릭 시 이벤트 처리 함수
    const GoRoomEvent = (studyId, studyTitle, studyPasswd, studyStatus, nowMember, totalMember) => {
        if (nowMember >= totalMember) {
            // 인원이 가득 찬 경우 alert 메시지 출력
            alert("해당 스터디 방은 최대 인원이 가득 차 입장할 수 없습니다.");
            return; // 함수 종료하여 더 이상 입장 로직이 실행되지 않음
        }

        if (studyStatus === 0) {
            // 방 상태가 0일 경우 StudyRoomEntry 모달을 띄움
            setSelectedRoom({ studyId, studyTitle, studyPasswd });
            setModalOpen(true);
        } else {
            // 비밀번호가 필요 없을 경우 바로 방으로 이동
            //navigate(`/study/room/${studyId}`, { state: { studyTitle } });
            joinStudy(studyId, studyTitle); // 스터디 멤버 추가 요청
        }
    };
    // 스터디 멤버 추가 API 호출 함수
    const joinStudy = (studyId, studyTitle) => {
        axios.post(`/studys/joins?studyId=${studyId}`)  // studyId를 쿼리 매개변수로 추가
            .then((res) => {
                console.log(res.data);  // 성공 시 메시지 출력
                navigate(`/study/room/${studyId}`, { state: { studyTitle } });  // 방으로 이동
            })
    };

    // 페이지네이션에 맞게 현재 페이지의 항목을 계산
    const currentItems = filteredRoom.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(filteredRoom.length / ITEMS_PER_PAGE); // 총 페이지 수

    // 검색
    const handleSearch = (keyword) => {
        setSearchQuery(keyword);
    };

    return (
        <main className="flex flex-col items-center w-full p-4 md:p-10">
            <div className="flex items-center w-full max-w-5xl mb-6 justify-between">
                <SearchInput
                    placeholder="스터디 이름 입력해보세요."
                    value={searchQuery}
                    onSearch={handleSearch}/>
                <Button variant={"contained"} onClick={NewRoom}>방생성</Button>
            </div>
            <div className="grid grid-cols-2 w-full max-w-5xl gap-4">
                {/* 페이지네이션을 적용한 리스트 */}
                {filteredRoom && filteredRoom.length > 0 ? (
                    currentItems.map((item, index) => (
                        <StudyRoomCard
                            key={index}
                            title={item.studyTitle}
                            description={item.user.userNickname}
                            nowMember={item.nowMember || 0}
                            totalMember={item.studyMemberlimit}
                            status={item.studyStatus}
                            image={item.studyImage}
                            onClick={() => GoRoomEvent(item.studyId, item.studyTitle, item.studyPasswd, item.studyStatus, item.nowMember || 0, item.studyMemberlimit)} // 방 클릭 시 이벤트
                        />
                    )) 
                ) : ( 
                    <div>생성된 스터디가 없습니다.</div>
                    )
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

            {/* StudyRoomEntry 모달 */}
            {selectedRoom && (
                <StudyRoomEntry
                    studyId={selectedRoom.studyId}
                    studyTitle={selectedRoom.studyTitle}
                    studyPasswd={selectedRoom.studyPasswd}
                    open={modalOpen}
                    setOpen={setModalOpen}
                />
            )}
        </main>
    );
}
