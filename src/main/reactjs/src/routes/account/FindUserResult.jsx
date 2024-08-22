import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FindUserResult() {
  const location = useLocation(); // 전달된 상태 가져오기 위해
  const navigate = useNavigate();
  const { email, message, exists } = location.state || {}; // 상태에서 exists로 수정

  return (
    <main className="flex flex-col items-center justify-center flex-1 p-6">
      <h2 className="text-lg font-semibold mb-4">회원정보 조회</h2>
      <div className="space-y-2 text-center">
        {email ? (
          exists ? ( // exists로 변경
            <p>
              {" "}
              입력하신
              <span className="text-blue-600"> {email} </span>
              주소는
            </p>
          ) : (
            <p>
              {" "}
              입력하신
              <span className="text-blue-600"> {email} </span>
              주소는
            </p>
          )
        ) : (
          <p>이메일 정보를 확인할 수 없습니다.</p>
        )}
        <p>{message}</p>
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4"
        onClick={() => navigate("/account/login")}
      >
        로그인 페이지로 이동
      </button>
    </main>
  );
}
