// v0 by Vercel.
// https://v0.dev/t/oJhvLMfaWGD

import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button} from "@mui/material";
import CustomConfirm from "../../components/modal/CustomConfirm";

export default function UpdateUser() {
  const [userData, setUserData] = useState(null);
  const fileInputRef=useRef(null);
  const [userNickname,setUserNickname]=useState("");
  const [nicknameMessage, setNicknameMessage] = useState('닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요.');
  const [nicknamecheck, setNicknamecheck] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  // 닉네임 유효성 검사
  const validateNickname = (nickname) => {
    const lengthCheck = nickname.length >= 1 && nickname.length <= 10;
    const charCheck = /^[가-힣a-zA-Z0-9]+$/.test(nickname);
    return lengthCheck && charCheck;
  };

  // 닉네임 중복 확인 이벤트
  const checkNickname = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    if (validateNickname(userNickname)) {
      let url = `/signup/user/nicknamecheck?user_nickname=${userNickname}`;
      axios.get(url)
          .then(res => {
            if (res.data === 'success') {
              setNicknamecheck(true);
              setNicknameMessage("사용 가능한 닉네임입니다.");
            } else {
              setNicknamecheck(false);
              setNicknameMessage("동일한 닉네임 사용자가 있습니다. 다른 닉네임을 사용해 주세요.");
            }
          });
    } else {
      setNicknameMessage("닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요.");
      setNicknamecheck(false);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/update/user/data");
        setUserData(response.data);
        setUserNickname(response.data.nickname); // 서버에서 가져온 닉네임 설정
      } catch (e) {
        console.error("Failed to fetch user data:", e);
      }
    }
    fetchUserData();
  }, []);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          userImage: reader.result,
        }));
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽음
    }
  };

  const handlePasswordReset = () => {
    setOpenConfirm(true); // 모달 열기
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false); // 모달 닫기
  };

  const handleConfirmSave = () => {
    // 저장 로직 추가 (서버로 데이터 전송 등)
    setOpenConfirm(false);
  };

  const handleConfirmCancel = () => {
    // 저장하지 않고 나가기
    setOpenConfirm(false);
    // 추가적으로 리다이렉트하거나 다른 처리를 할 수 있습니다.
  };


  return (
      <main className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          <h1 className="mb-6 text-2xl font-bold text-center">회원 정보 수정</h1>
          <div className="flex justify-center mb-4">
            <span className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full">
            {userData && userData.userImage ? (
                <img
                    src={userData.userImage}
                    alt="User Profile"
                    className="h-full w-full object-cover rounded-full"
                />
            ) : (
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                U
              </span>
            )}
            </span>
            <button className="ml-2"
                    onClick={handleFileButtonClick}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5"
              >
                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
              </svg>
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={handleFileChange}
            />
          </div>
          <form className="space-y-4">
            <div className="flex items-center space-x-2">
              <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                  for="nickname"
              >
                Nickname
              </label>
              <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                  id="nickname"
                  placeholder="닉네임"
                  value={userNickname}
                  onChange={(e) => setUserNickname(e.target.value)}
              />
              <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-shrink-0"
                  onClick={checkNickname}>
                중복확인
              </button>
            </div>
            <p className={`text-xs ${nicknamecheck ? 'text-green-500' : nicknameMessage === "닉네임은 한글/영문/숫자만 가능하며 1~10자 이내로 입력해주세요." ? 'text-black' : 'text-red-500'}`}>
              {nicknameMessage}
            </p>
            <Button variant='contained'
            onClick={handlePasswordReset}>
              비밀번호 재설정
            </Button>
            <div className="flex items-center space-x-2">
              <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                  for="email-notifications"
              >
                이메일 정보 수신
              </label>
              <button
                  type="button"
                  role="switch"
                  aria-checked="true"
                  data-state="checked"
                  value="on"
                  className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                  id="email-notifications"
              >
                <span
                    data-state="checked"
                    className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
              <input
                  type="checkbox"
                  aria-hidden="true"
                  tabindex="-1"
                  checked=""
                  value="on"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                  for="kakao-notifications"
              >
                카카오톡 정보 수신
              </label>
              <button
                  type="button"
                  role="switch"
                  aria-checked="false"
                  data-state="unchecked"
                  value="on"
                  className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                  id="kakao-notifications"
              >
                <span
                    data-state="unchecked"
                    className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                ></span>
              </button>
              <input
                  type="checkbox"
                  aria-hidden="true"
                  tabindex="-1"
                  value="on"
              />
            </div>
            <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
              확인
            </button>
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
