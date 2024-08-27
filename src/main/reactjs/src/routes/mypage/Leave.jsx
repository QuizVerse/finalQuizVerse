import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import CustomInput from "../../components/CustomInput";

export default function Leave() {
  // 탈퇴 사유를 저장하기 위한 state
  const [reason, setReason] = useState("");

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

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
          alert("회원 탈퇴가 되었습니다.");
          window.location.href = "/";
        } else {
          alert("삭제 이슈.");
        }
      } else {
        // OAuth 탈퇴 처리 (쿠키 사용)
        leaveResponse = await axios.get("/leave/oauth", {
          withCredentials: true, // 쿠키를 자동으로 포함
        });

        if (leaveResponse.data === "success") {
          alert("회원 탈퇴가 되었습니다.");
          window.location.href = "/";
        } else {
          alert("삭제 이슈.");
        }
      }
    } catch (error) {
      console.error("서버 요청 중 오류가 발생했습니다.", error);
      alert("오류가 났습니다.");
    }
  };

  return (
    <main className="flex-1 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="mb-6 text-2xl font-bold text-center">회원 탈퇴</h1>
        <div className="flex justify-between mb-4">
          <Button>인증코드 발송</Button>
          <Button>인증코드 재발송</Button>
        </div>
        <div className="space-y-4">
          <div>
            <CustomInput label={"인증코드"} timerVisible={true} />
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
