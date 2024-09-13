import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useParams } from "react-router-dom";
import SearchInput from "../SearchInput";

export default function AddClassMember({ onClose }) {
    const [users, setUsers] = useState([]); // 여러 사용자 저장
    const [invitedUsers, setInvitedUsers] = useState({}); // 사용자 초대 상태 저장
    const { classId } = useParams();

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user/";

    // 닉네임 검색 로직
    const handleSearch = async (nickname) => {
        try {
            const response = await fetch(`/findUsersByNickname?nickname=${nickname}`); // 여러 사용자 검색
            if (response.ok) {
                const data = await response.json();
                if (data.exists) {
                    setUsers(data.users); // 사용자 리스트 상태로 설정
                } else {
                    setUsers([]);
                    alert(data.message);
                }
            } else {
                setUsers([]);
            }
        } catch (e) {
            console.error("Failed to fetch users", e);
            setUsers([]);
        }
    };

    const handleInviteClick = async (user) => {
        if (user && classId) {
            try {
                const response = await axios.post('/myclass/invite', null, {
                    params: {
                        userId: user.userId,
                        classId: classId
                    }
                });
                if (response.status === 200) {
                    alert(`${user.userNickname}님이 성공적으로 초대되었습니다.`);
                    setInvitedUsers(prevState => ({
                        ...prevState,
                        [user.userId]: true // 초대 완료 상태를 true로 설정
                    }));
                } else {
                    alert(`${user.userNickname}님 초대에 실패하였습니다.`);
                }
            } catch (e) {
                console.error('Error inviting user:', e);
                alert('초대 중 오류가 발생하였습니다.');
            }
        }
    };

    return (
        <>
            <div className="p-6 space-y-4">
                <IconButton aria-label="close" onClick={onClose} style={{ position: 'absolute', right: 16, top: 16 }}>
                    <CloseIcon />
                </IconButton>

                <div className="relative">
                    <SearchInput onSearch={handleSearch} /> {/* 검색 시 handleSearch 실행 */}
                </div>

                {/* 검색된 사용자 리스트 표시 */}
                {users.length > 0 && (
                    <List>
                        {users.map((user) => (
                            <ListItem
                                key={user.userId}
                                secondaryAction={
                                    <Button
                                        variant="contained"
                                        onClick={() => handleInviteClick(user)}
                                        disabled={invitedUsers[user.userId]} // 초대 완료 상태라면 버튼 비활성화
                                    >
                                        {invitedUsers[user.userId] ? "초대 완료" : "초대하기"} {/* 버튼 텍스트 변경 */}
                                    </Button>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar alt={user.userNickname} src={photopath + user.userImage} />
                                </ListItemAvatar>
                                <ListItemText primary={user.userNickname} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
        </>
    );
}
