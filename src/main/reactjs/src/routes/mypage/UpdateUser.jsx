import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {Box, Button, Checkbox, FormControlLabel, IconButton, Switch, TextField} from "@mui/material";
import CustomConfirm from "../../components/modal/CustomConfirm";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

export default function UpdateUser() {
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const [userNickname, setUserNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState('닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요.');
  const [nicknamecheck, setNicknamecheck] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isProfileImageUpdated, setIsProfileImageUpdated] = useState(false); // 프로필 이미지가 수정되었는지 여부
  const [emailNotification, setEmailNotification] = useState(false); // 이메일 수신 여부
  const [kakaoNotification, setKakaoNotification] = useState(false); // 카카오톡 수신 여부



  const navi = useNavigate();

  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user";

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickname) => {
    const lengthCheck = nickname.length >= 1 && nickname.length <= 10;
    const charCheck = /^[가-힣a-zA-Z0-9]+$/.test(nickname);
    return lengthCheck && charCheck;
  };

  // 닉네임 중복 확인 함수
  const checkNickname = async () => {
    if (validateNickname(userNickname)) {
      try {
        const res = await axios.get(`/signup/user/nicknamecheck?user_nickname=${userNickname}`);
        if (res.data === 'success') {
          setNicknamecheck(true);
          setNicknameMessage("사용 가능한 닉네임입니다.");
        } else {
          setNicknamecheck(false);
          setNicknameMessage("동일한 닉네임 사용자가 있습니다. 다른 닉네임을 사용해 주세요.");
        }
      } catch (error) {
        console.error("Failed to check nickname:", error);
        setNicknameMessage("닉네임 중복 검사에 실패했습니다. 다시 시도해 주세요.");
      }
    } else {
      setNicknameMessage("닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요.");
      setNicknamecheck(false);
    }
  };

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/update/user/data");
        setUserData(response.data);
        setUserNickname(response.data.userNickname || ""); // 서버에서 가져온 닉네임 설정
      } catch (e) {
        console.error("Failed to fetch user data:", e);
      }
    };
    fetchUserData();
  }, []);

  // 파일 선택 처리 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          userImagePreview: reader.result, // 로컬에서 미리보기용 이미지 경로
          userImageFile: file, // 실제 업로드할 파일
        }));
        setIsProfileImageUpdated(true);
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽어옴
    }
  };

  // 비밀번호 재설정 모달 열기 함수
  const handlePasswordReset = () => {
    setOpenConfirm(true); // 모달 열기
  };

  // 비밀번호 재설정 모달 닫기 함수
  const handleCloseConfirm = () => {
    setOpenConfirm(false); // 모달 닫기
  };

  // 비밀번호 재설정 모달 확인 버튼 클릭 시 처리
  const handleConfirmSave = async () => {
    await handleSubmit(); // 폼 제출 실행
    if (nicknamecheck) { // 닉네임이 유효한 경우에만 이동
      setOpenConfirm(false);
      navi("/account/changepassword");
    }
  };

  // 비밀번호 재설정 모달 취소 버튼 클릭 시 처리
  const handleConfirmCancel = () => {
    setOpenConfirm(false);
    navi("/account/changepassword");
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // 닉네임이 변경된 경우에만 추가
    if (userNickname && userNickname !== userData.userNickname && nicknamecheck) {
      formData.append('userNickname', userNickname);
    }

    // 프로필 이미지가 변경된 경우에만 추가
    if (isProfileImageUpdated && userData.userImageFile) {
      formData.append('userImage', userData.userImageFile);
    }

    // 이메일 수신 여부와 카카오톡 수신 여부도 함께 전송
    formData.append('emailNotification', emailNotification);
    formData.append('kakaoNotification', kakaoNotification);


    try {
      const response = await axios.post('/update/user/formdata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 && response.data === "User update success") {
        console.log("폼 데이터를 서버로 전송했습니다.");
        navi('/');  // 성공적으로 전송되었을 때 리다이렉트
      } else {
        console.log("서버 응답 실패");
      }
    } catch (error) {
      console.error("서버로 데이터 전송 실패:", error.response ? error.response.data : error.message);
    }
  };


  return (
      <main className="flex-1 py-12 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="mb-6 text-2xl font-bold text-center">회원 정보 수정</h1>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex justify-center mb-4 relative">
              <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[#cccccc]">
                {userData && userData.userImage ? (
                    <img
                        src={userData.userImagePreview ? userData.userImagePreview : `${photopath}/${userData.userImage}`}
                        alt="User Profile"
                        className="h-full w-full object-cover rounded-full"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    U
                  </span>
                )}
              </div>
              <div className={"absolute top-0 right-0"}>
                <IconButton type="button" onClick={() => fileInputRef.current.click()}>
                  <CreateIcon/>
                </IconButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: "none"}}
                    onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TextField
                  fullWidth
                  variant={"standard"}
                  label={"Nickname"}
                  id="nickname"
                  placeholder="닉네임"
                  value={userNickname}
                  onChange={(e) => setUserNickname(e.target.value)}
              />
              <Button type="button"
                      onClick={checkNickname}
                      variant={"outlined"}
                      className={"whitespace-nowrap"}
              >중복확인</Button>
            </div>
            <p className={`text-xs ${nicknamecheck ? 'text-green-500' : 'text-red-500'}`}>
              {nicknameMessage}
            </p>
            <Button fullWidth
                    variant="outlined"
                    onClick={handlePasswordReset}>
              비밀번호 재설정
            </Button>
            <Box>
              <Box>
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={emailNotification}
                          onChange={() => setEmailNotification(!emailNotification)}
                          name="email-notifications"
                          color="primary"
                      />
                    }
                    label="이메일 정보 수신"
                />
              </Box>
              <Box>
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={kakaoNotification}
                          onChange={() => setKakaoNotification(!kakaoNotification)}
                          name="kakao-notifications"
                          color="primary"
                      />
                    }
                    label="카카오톡 정보 수신"
                />
              </Box>
            </Box>
            <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
            >
              확인
            </Button>
          </form>
        </div>

        <CustomConfirm
            openConfirm={openConfirm}
            closeConfirm={handleCloseConfirm}
            clickBtn1={handleConfirmCancel}
            clickBtn2={handleConfirmSave}
            title="비밀번호 재설정"
            content="현재 변경한 내용을 저장하시겠습니까?"
            btn1Text="저장 안함"
            btn2Text="저장"
        />
      </main>
  );
}