import {Button, FormControl, IconButton, TextField, Switch, FormControlLabel} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewStudy() {

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/study/";

    // State management
    const [isPublic, setIsPublic] = useState(true); // 스위치 상태
    const [coverImage, setCoverImage] = useState('/placeholder.svg');
    const [studyTitle, setStudyTitle] = useState('');
    const [studyDescription, setStudyDescription] = useState('');
    const [totalMember, setTotalMember] = useState('');
    const [passwd, setPasswd] = useState('');

    const handleVisibilityChange = (event) => {
        setIsPublic(event.target.checked);
    };

    const handleTotalMemberChange = (e) => {
        const value = e.target.value;
        // 숫자로 변환
        setTotalMember(value ? parseInt(value, 10) : 0);
    };

    const handleRoomNameChange = (e) => setStudyTitle(e.target.value);
    const handleRoomDescriptionChange = (e) => setStudyDescription(e.target.value);
    const handleRoomPasswd = (e) => setPasswd(e.target.value);

    // Submit new study
    const handleSubmit = () => {
        if (totalMember > 8) {
            alert("총 멤버 수는 8명 이상을 초과할 수 없습니다.");
            return setTotalMember(''); // 조건을 만족하면 함수 종료
        }
        const newRoomData = {
            "studyTitle": studyTitle,
            "studyDescription": studyDescription,
            "studyMemberlimit": totalMember,
            "studyImage": coverImage,
            "studyStatus": isPublic ? 1 : 0, // 스위치로 상태 결정
            "studyPasswd": isPublic ? null : passwd
        };

        console.log(newRoomData);

        axios.post(`/studys/inserts`, newRoomData)

            .then((res) => {
                console.log("응답 데이터:", res.data);
                const studyId = res.data.studyId; // 서버로부터 받은 studyId
                if (!studyId) {
                    console.error("Received undefined studyId");
                    return;
                }
                navigate(`/study/room/${studyId}`,{state: { studyTitle: studyTitle }})
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err.message);
            });
    };

    // Image Upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        const uploadForm=new FormData();
        uploadForm.append("upload",file);

        axios({
            method:'post',
            url:'/studys/upload',
            data:uploadForm,
            headers:{'Content-Type':'multipart/form-data'},
        }).then(res=>{
            console.log("saved picture", res.data.photo);
            setCoverImage(res.data.photo);
        })
    };

    // Cancel button logic
    const navigate = useNavigate();
    const handleCancel = () => {
        setStudyTitle('');
        setStudyDescription('');
        setIsPublic(false);
        setCoverImage('/placeholder.svg');
        setTotalMember('');
        navigate(-1);
    };

    return (
        <>
            <main className="flex flex-col items-center w-full p-4 md:p-10">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                            화상스터디 개설
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                label="화상스터디 이름"
                                placeholder="화상스터디 이름"
                                value={studyTitle}
                                onChange={handleRoomNameChange}
                            ></TextField>
                        </div>
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                label="화상스터디 설명"
                                placeholder="화상스터디 설명"
                                value={studyDescription}
                                onChange={handleRoomDescriptionChange}
                            ></TextField>
                        </div>
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                label="화상스터디 인원"
                                placeholder="최대 8명"
                                value={totalMember}
                                onChange={handleTotalMemberChange}
                            ></TextField>
                        </div>
                        <div className="space-y-4">
                            {/* Visibility Switch with label on the left */}
                            <div className="text-sm font-medium flex justify-between items-center">
                                {/* Left-aligned label */}
                                <span className="mr-auto">공개여부</span>

                                {/* Right-aligned switch and status */}
                                <div className="flex items-center">
                                    <Switch
                                        checked={isPublic}
                                        onChange={handleVisibilityChange}
                                        name="visibilitySwitch"
                                        color="primary"
                                    />
                                    <span>{isPublic ? "전체 공개" : "비공개"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {!isPublic && (
                                <FormControl fullWidth>
                                    <TextField
                                        value={passwd}
                                        label="비밀번호"
                                        type="password"
                                        onChange={handleRoomPasswd}
                                    />
                                </FormControl>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                화상스터디 표지
                            </label>
                            <div className="relative">
                                {/* Upload Button */}
                                <div className={"flex justify-end"}>
                                    <IconButton onClick={() => document.getElementById('file-input').click()}>
                                        <CreateIcon/>
                                    </IconButton>
                                </div>

                                <div className={"flex justify-center"}>
                                    {/* Image Preview */}
                                    <img
                                        src={photopath + coverImage}
                                        alt="Cover"
                                        className="w-36 h-36 object-cover"
                                        width="150"
                                        height="150"
                                    />
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        id="file-input"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleFileChange(e)}
                                        style={{display: 'none'}} // Hide the file input
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="items-center p-6 flex justify-between gap-4">
                        <Button
                            variant={"outlined"}
                            fullWidth
                            onClick={handleCancel}>
                            취소
                        </Button>
                        <Button
                            fullWidth
                            variant={"contained"}
                            onClick={handleSubmit}>
                            확인
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
