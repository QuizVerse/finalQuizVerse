import BookCard from "../../components/BookCard";
import { useEffect, useState } from "react";
import AddClassMember from "../../components/modal/AddClassMember";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ConfirmRoleChangeModal from "../../components/modal/ConfirmRoleChangeModal";

export default function MyclassDetail() {
  const { classId } = useParams(); // URL 파라미터에서 classId를 가져옵니다.
  const [openAdd, setOpenAdd] = useState(false); // 구성원 추가 모달의 열림 상태를 관리합니다.
  const [members, setMembers] = useState([]); // 클래스 멤버들의 목록을 관리합니다.
  const [allSelected, setAllSelected] = useState(false); // 전체 선택 체크박스의 상태를 관리합니다.
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태를 관리합니다.
  const [filteredMembers, setFilteredMembers] = useState([]); // 검색어에 따라 필터링된 멤버들을 관리합니다.
  const [userRole, setUserRole] = useState(null); // 현재 사용자의 역할(방장/멤버)을 관리합니다.
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅입니다.
  const [openRoleChange, setOpenRoleChange] = useState({ isOpen: false, action: null }); // 방장 권한 변경 모달의 상태를 관리합니다.

  // 구성원 추가 모달을 엽니다.
  const memberAdd = () => {
    setOpenAdd(true);
  };

  // 구성원 추가 모달을 닫고 페이지를 새로고침합니다.
  const handleClose = () => {
    setOpenAdd(false);
    window.location.reload();
  };

  // 페이지가 로드될 때 사용자의 역할과 멤버 목록을 가져옵니다.
  useEffect(() => {
    setOpenRoleChange({ isOpen: false, action: null }); // 방장 권한 변경 모달을 닫는 초기 상태로 설정합니다.

    const fetchUserAndMembers = async () => {
      try {
        const userResponse = await axios.get(`/myclass/${classId}/userrole`); // 사용자의 역할을 가져옵니다.
        setUserRole(userResponse.data);

        const membersResponse = await axios.get(`/myclass/${classId}/members`); // 클래스 멤버들을 가져옵니다.
        setMembers(membersResponse.data.map((member) => ({ ...member, isSelected: false }))); // 멤버 리스트를 초기화합니다.
      } catch (e) {
        console.error("Failed to fetch members", e);
      }
    };

    fetchUserAndMembers();
  }, [classId]);

  // 전체 선택 체크박스가 변경될 때 모든 멤버의 선택 상태를 업데이트합니다.
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setAllSelected(isChecked);
    setMembers((prevMembers) => prevMembers.map((member) => ({ ...member, isSelected: isChecked })));
  };

  // 개별 멤버의 선택 상태를 토글합니다.
  const handleSelectMember = (id) => {
    setMembers((prevMembers) =>
        prevMembers.map((member) =>
            member.classmemberId === id
                ? { ...member, isSelected: !member.isSelected }
                : member
        )
    );
  };

  // 선택된 멤버들을 삭제합니다.
  const memberDelete = async () => {
    const selectIds = members
        .filter(member => member.isSelected)
        .map(member => member.classmemberId);

    if (selectIds.length > 0) {
      try {
        await axios.post('/myclass/delete/members', selectIds); // 선택된 멤버들을 삭제합니다.
        setMembers(prevMembers => prevMembers
            .filter(member => !selectIds.includes(member.classmemberId))); // 삭제된 멤버들을 목록에서 제거합니다.
      } catch (error) {
        console.error("Failed to delete members", error);
      }
    }
  };

  // 사용자가 "클래스 나가기"를 선택했을 때 호출됩니다.
  const leaveClass = async () => {
    console.log("leaveClass function called");
    if (members.length > 1 && userRole === 1) {
      // 멤버가 1명 이상이고 사용자가 방장일 때
      console.log("Opening role change modal because user is a leader and there are more than 1 member");
      alert("탈퇴를 하기 위해선 방장 역할을 멤버에게 방장 역할을 넘겨주여야 합니다.");
      setOpenRoleChange({ isOpen: true, action: "leaveClass" }); // 방장 권한 변경 모달을 엽니다.
    } else {
      // 멤버가 1명이거나 사용자가 방장이 아닐 때
      console.log("Deleting class or leaving because user is not a leader or there is only one member");
      alert("해당 클래스가 삭제됩니다.");
      await realDeleteClass(); //진짜 CLASS삭제되는코드
    }
  };

  // 사용자가 "방장 권한 부여"를 선택했을 때 호출됩니다.
  const changeRole = async () => {
    console.log("changeRole function called");
    if (members.length > 1 && userRole === 1) {
      // 멤버가 1명 이상이고 사용자가 방장일 때
      console.log("Opening role change modal because user is a leader and there are more than 1 member");
      alert("방장 역할을 멤버에게 넘겨주게 되며 자신의 역할은 멤버로 변환이 됩니다.");
      setOpenRoleChange({ isOpen: true, action: "changeRole" }); // 방장 권한 변경 모달을 엽니다.
    } else {
      console.log("Cannot change role because there are not enough members");
      alert("방장을 부여할 멤버들이 없습니다.");
    }
  };

  // 클래스를 나가거나 삭제하는 함수입니다.
  const deleteClassOrLeave = async () => {
    try {
      const response = await axios.get(`/myclass/${classId}/leave`);
      if (response.data === "success") {
        console.log("Successfully left the class");
        navigate("/mypage/myclass"); // 성공적으로 나가면 마이페이지로 이동합니다.
      } else {
        console.error("Failed to leave class: Unexpected response", response.data);
      }
    } catch (e) {
      console.error("Failed to leave class", e);
    }
  };

  //CLASSDTO에서 해당 CLASS가 삭제되는거임
  const realDeleteClass = async () => {
    try {
      const response = await axios.get(`/myclass/${classId}/delete`);
      if (response.data === 'Delete class successfully') {  // 서버에서 반환한 메시지와 비교
        console.log("Successfully delete really 시작이 젤무서워 미루니");
        navigate("/mypage/myclass");
      } else {
        console.log("완벽하지 못할까봐 지금이");
      }
    } catch (e) {
      console.error("내일의 나에게 일단 미루지");
    }
  }

  // 검색어에 따라 멤버들을 필터링합니다.
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = members.filter((member) =>
        member.user.userNickname.toLowerCase().includes(lowerCaseQuery) ||
        member.user.userEmail.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMembers(filtered);
  }, [searchQuery, members]);

  // 방장 권한 변경 모달에서 "확인" 버튼을 눌렀을 때 호출됩니다.
  const confirmRoleChange = async (newLeaderId) => {
    try {
      console.log("confirmRoleChange function called with newLeaderId:", newLeaderId);
      if (openRoleChange.action === "changeRole") {
        await axios.post(`/myclass/${classId}/changeLeader`, { newLeaderId }); // 방장 권한을 변경합니다.
        alert("방장 권한이 성공적으로 변경되었습니다.");
        setOpenRoleChange(false);
        window.location.reload(); // 페이지를 새로고침합니다.
      } else if (openRoleChange.action === "leaveClass") {
        await axios.post(`/myclass/${classId}/changeLeader`, { newLeaderId }); // 방장 권한을 변경하고 클래스를 나갑니다.
        alert("해당 클래스를 나가겠습니다.");
        setOpenRoleChange(false);
        await deleteClassOrLeave(); // 클래스를 나가는 로직을 실행합니다.
      }
    } catch (e) {
      console.error("Failed to change leader", e);
    }
  };

  return (
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold">정치기 실기 스터디</h1>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                  placeholder="Name, email, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-x-2">
              {userRole === 1 && (
                  <>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        onClick={memberAdd}
                    >
                      구성원 추가
                    </button>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        onClick={memberDelete}
                    >
                      구성원 삭제
                    </button>
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        onClick={changeRole}
                    >
                      방장 권한 부여
                    </button>
                  </>
              )}
              <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  onClick={leaveClass}
              >
                클래스 나가기
              </button>
            </div>
          </div>
          {openAdd && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md">
                  <AddClassMember onClose={handleClose} />
                </div>
              </div>
          )}
          {openRoleChange.isOpen && (
              <ConfirmRoleChangeModal
                  members={members}
                  onClose={() => setOpenRoleChange(false)}
                  onConfirm={confirmRoleChange}
              />
          )}
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-10">
                  <input
                      type="checkbox"
                      aria-hidden="true"
                      tabIndex="-1"
                      value="on"
                      checked={allSelected}
                      onChange={handleSelectAll}
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  이름
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  프로필사진
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  이메일
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  등록일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  상태
                </th>
              </tr>
              </thead>
              <tbody>
              {filteredMembers.map((member) => (
                  <tr
                      key={member.classmemberId}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">
                      <input
                          type="checkbox"
                          aria-hidden="true"
                          tabIndex="-1"
                          value="on"
                          checked={member.isSelected || false}
                          onChange={() => handleSelectMember(member.classmemberId)}
                      />
                    </td>
                    <td className="p-4 align-middle">{member.user.userNickname}</td>
                    <td className="p-4 align-middle">
                      {member.user.userImage ? (
                          <img
                              src={member.user.userImage}
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
                    <td className="p-4 align-middle">{member.user.userEmail}</td>
                    <td className="p-4 align-middle">
                      {new Date(member.classmemberDate).toLocaleString()}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                        {member.classmemberRole === 2 ? "멤버" : "방장"}
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
  );
}
