import BookCard from "../../components/BookCard";
import { useEffect, useState } from "react";
import AddClassMember from "../../components/modal/AddClassMember";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ConfirmRoleChangeModal from "../../components/modal/ConfirmRoleChangeModal";
import { Button } from "@mui/material";
import SearchInput from "../../components/SearchInput";
import CustomAlert from "../../components/modal/CustomAlert";
import Pagination from '@mui/material/Pagination'; // Material UI Pagination 가져오기
import Stack from '@mui/material/Stack';

const ITEMS_PER_PAGE = 5; // 페이지당 항목 수
const SPACING = 2; // 페이지네이션 간격
const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user"; // 중요한 photopath 유지

export default function MyclassDetail() {
  const { classId } = useParams();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션을 위한 상태
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = ITEMS_PER_PAGE; // 페이지당 보여줄 멤버 수
  const navigate = useNavigate();

  // 구성원 목록과 책 목록을 가져오는 로직
  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await axios.get(`/myclass/${classId}/members`);
        setMembers(membersResponse.data.map((member) => ({ ...member, isSelected: false })));
        setFilteredMembers(membersResponse.data);
      } catch (e) {
        console.error("Failed to fetch members", e);
      }
    };

    fetchData();
  }, [classId]);

  // 페이지가 변경될 때 보여줄 멤버를 계산하는 함수
  const currentMembers = filteredMembers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // 검색어에 따라 필터링
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = members.filter(
        (member) =>
            member.user.userNickname.toLowerCase().includes(lowerCaseQuery) ||
            member.user.userEmail.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMembers(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [searchQuery, members]);

  // 페이지 변경 핸들러
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0); // 페이지 변경 시 상단으로 스크롤
  };

  // 검색어 입력 핸들러
  const handleSearch = (keyword) => {
    setSearchQuery(keyword);
  };

  return (
      <main className="flex-1 py-12 px-6">
        <h1 className="mb-6 text-2xl font-bold">클래스 상세</h1>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <SearchInput value={searchQuery} onSearch={handleSearch} />
          </div>

          {/* 구성원 목록 */}
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
              <tr className="border-b">
                <th className="h-12 px-4 text-left">이름</th>
                <th className="h-12 px-4 text-left">프로필사진</th>
                <th className="h-12 px-4 text-left">이메일</th>
                <th className="h-12 px-4 text-left">등록일시</th>
                <th className="h-12 px-4 text-left">상태</th>
              </tr>
              </thead>
              <tbody>
              {currentMembers.map((member) => (
                  <tr key={member.classmemberId} className="border-b">
                    <td className="p-4">{member.user.userNickname}</td>
                    <td className="p-4">
                      {member.user.userImage ? (
                          <img
                              src={`${photopath}/${member.user.userImage}`} // photopath를 사용하여 이미지 URL 생성
                              alt={member.user.userNickname}
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                          />
                      ) : (
                          <span>No Image</span>
                      )}
                    </td>
                    <td className="p-4">{member.user.userEmail}</td>
                    <td className="p-4">{new Date(member.classmemberDate).toLocaleString()}</td>
                    <td className="p-4">
                      <div className={`badge ${member.classmemberRole === 2 ? "멤버" : "방장"}`}></div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="w-full flex justify-center mt-4">
            <Stack spacing={SPACING}>
              <Pagination
                  count={totalPages} // 총 페이지 수
                  page={currentPage} // 현재 페이지
                  onChange={handlePageChange} // 페이지 변경 핸들러
                  showFirstButton
                  showLastButton
              />
            </Stack>
          </div>
        </div>
      </main>
  );
}
