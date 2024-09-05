import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CustomInput from "../../components/CustomInput";

export default function Leave() {
  // 탈퇴 사유를 저장하기 위한 state
  const [reason, setReason] = useState("");
  const [isVerified,setIsVerified]=useState(false);
  const[verificationCode,setVerificationCode]=useState("");


  const[alertVisible,setAlertVisible]=useState(false);
  const[alertTitle,setAlertTitle]=useState('');
  const[alertContent,setAlertContent]=useState('');
  const[alertBtnText,setAlertBtnText]=useState('확인');
  const [onConfirm, setOnConfirm] = useState(null);


  const showAlert = (title, content, btnText = '확인', onConfirmCallback = null) => {
    setAlertTitle(title);
    setAlertContent(content);
    setAlertBtnText(btnText);
    setAlertVisible(true);
    setOnConfirm(() => onConfirmCallback); // 필요할 때만 콜백을 설정합니다.
  };


  const closeAlert=()=>{
    setAlertVisible(false)
    if (onConfirm) {
      onConfirm();  // 확인 버튼을 눌렀을 때 콜백 함수 실행
    }
  };


  const sendVerificationCode=async()=>{
    try {
      const response = await axios.post("/leave/email");
      showAlert("알림","인증코드가 이메일로 전송되었습니다.");

    } catch (e) {
      console.error("인증 코드 전송 실패",e);
    }

  }

  const verifyCode=async ()=>{
    try {
      const response = await axios.post("/leave/verify", {code: verificationCode});


      if (response.data.success) {
        showAlert("알림","인증이 성공적으로 완료되었습니다.");
        setIsVerified(true);

      } else {
        showAlert("오류", "인증코드가 유효하지 않습니다.");
        setIsVerified(true);
      }


    } catch (e) {
      console.error("인증 코드 검증 실패",e);
      showAlert("오류", "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      setIsVerified(false);
    }


  }



  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!isVerified) {
      showAlert("오류", "인증이 완료되지 않았습니다.");
      return;
    }

    try {
      // 1. 탈퇴 사유를 서버로 전송
      const reasonResponse = await fetch("/api/leave-reason", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leave_reason: reason }), // JSON 형식으로 데이터 전송
      });

      if (!reasonResponse.ok) {
        console.error("탈퇴 사유 저장에 실패했습니다.");
        return;
      }

      console.log("탈퇴 사유가 성공적으로 저장되었습니다.");
      setReason(""); // 폼 제출 후 textarea 초기화

      // 2. 회원 탈퇴 처리
      const token = localStorage.getItem("token");
      let leaveResponse;

      if (token) {
        // 로컬 인증 탈퇴 처리
        leaveResponse = await axios.get("/leave/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (leaveResponse.data === "success") {
          localStorage.removeItem("token");
          showAlert("알림", "회원 탈퇴가 완료되었습니다.", "확인", () => {
            window.location.href = "/";
          });
        } else {
          showAlert("오류", "탈퇴 처리에 실패했습니다.");
        }
      } else {
        // OAuth 탈퇴 처리 (쿠키 사용)
        leaveResponse = await axios.get("/leave/oauth", {
          withCredentials: true, // 쿠키를 자동으로 포함
        });

        if (leaveResponse.data === "success") {
          showAlert("알림", "회원 탈퇴가 완료되었습니다.", "확인", () => {
            window.location.href = "/";
          });
        } else {
          showAlert("오류", "탈퇴 처리에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("서버 요청 중 오류가 발생했습니다.", error);
      showAlert("오류", "탈퇴 처리에 실패했습니다.");
    }
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-center">회원 탈퇴</h1>
        <div className="flex justify-between mb-4">
          <Button onClick={sendVerificationCode}>인증코드 발송</Button>
          <Button onClick={sendVerificationCode}>인증코드 재발송</Button>
        </div>
        <div className="space-y-4">
          <div>
            <CustomInput label={"인증코드"}
                         value={verificationCode}
                         updateValue={setVerificationCode}
                         timerVisible={true} />
          </div>
          <div className="flex items-center">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
              htmlFor="password"
            >
              Password
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-muted-foreground"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
            type="password"
            id="password"
            placeholder="비밀번호"
          />
          <p className="mt-1 text-sm text-red-500">
            * 비밀번호가 일치하지 않습니다. 다시 입력해주세요.
          </p>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="reason"
            >
              탈퇴사유
            </label>
            <form onSubmit={handleSubmit}>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                id="reason"
                placeholder="탈퇴사유를 입력해주세요"
                value={reason} // state에서 관리하는 value
                onChange={(e) => setReason(e.target.value)} // 입력 시 state 업데이트
              ></textarea>
              <Button type="submit">확인</Button>


            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
