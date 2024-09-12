import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Button, TextField} from "@mui/material";

export default function FindUserResult() {
  const location = useLocation(); // 전달된 상태 가져오기 위해
  const navigate = useNavigate();
  const { email, message, exists } = location.state || {}; // 상태에서 exists로 수정

  return (

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-8">
          <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
              data-v0-t="card"
          >
              <div className="flex flex-col space-y-4 p-6 text-center">
                  <h2 className="text-2xl font-semibold text-center">회원정보 조회</h2>
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
              </div>
              <div className="flex items-center p-6">
                  <Button
                      fullWidth
                      type={"submit"}
                      variant={"contained"}
                      onClick={() => navigate("/account/login")}
                  >
                      로그인 페이지로 이동
                  </Button>
              </div>
          </div>
      </main>
)
    ;
}
