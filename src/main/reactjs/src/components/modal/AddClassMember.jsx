// v0 by Vercel.
// https://v0.dev/t/t1MYEyIkCsP

import {Avatar, Button, IconButton} from "@mui/material";
import SearchInput from "../SearchInput";
import {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function AddClassMember({ onClose}) {
    const [nickname,setNickname]=useState("");
    const [user,setUser]=useState(null);
    const { classId } = useParams();
    console.log("Current classId:", classId);
    const handleInputChange=(event)=>{
        setNickname(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`/findNickname?nickname=${nickname}`);
            if (response.ok) {
                const data = await response.json();
                if (data.exists) {
                    setUser(data.user); // user 객체를 상태로 설정
                } else {
                    setUser(null);
                    alert(data.message);
                }
            } else {
                setUser(null);
            }
        } catch (e) {
            console.error("Failed to fetch user", e);
            setUser(null);
        }
    };

    const handleInviteClick = async () => {
        console.log("Current user:", user);
        console.log("Current classId:", classId);

        if (user&&classId) {
            try {

                console.log("Inviting user:", user);
                console.log("Inviting class:", classId);
                const response = await axios.post('/myclass/invite', null, {
                    params: {
                        userId: user.userId,
                        classId: classId
                    }
                });
                if (response.status === 200) {
                    alert('구성원이 성공적으로 초대되었습니다.');
                } else {
                    alert('초대에 실패하였습니다.');
                }
            } catch (e) {
                console.error('Error inviting user:', e);
                alert('초대 중 오류가 발생하였습니다.');
            }
        } else {
            alert('초대할 사용자가 선택되지 않았습니다.');
        }
    };




    return (
        <>
            <div className="p-6 space-y-4">
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{ position: 'absolute', right: 16, top: 16 }}
                >
                    <CloseIcon />
                </IconButton>

                <div className="relative">
                    <SearchInput
                        value={nickname}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>
                {user && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Avatar alt={user.userNickname}  />
                                <span>{user.userNickname}</span>
                            </div>
                            <Button variant={"contained"}
                            onClick={handleInviteClick}>초대하기</Button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}