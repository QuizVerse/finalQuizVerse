import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Button, TextField} from "@mui/material";

export default function FindUser() {
  const [user_email, setEmail] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");

  const navigate = useNavigate();

  const emailInput = (e) => {
    setEmail(e.target.value);
  };

  const emailBtnClick = () => {
    if (user_email) {
      axios
        .get(`/finduser`, { params: { user_email } })
        .then((response) => {
          const { exists, message } = response.data;
          setCheckEmailMsg(message);
          navigate("/account/finduser/result", {
            state: {
              email: user_email,
              message: message,
              exists: exists,
            },
          });
        })
        .catch(() => {
          setCheckEmailMsg("서버와 연결할 수 없습니다.");
          navigate("/account/finduser/result", {
            state: {
              email: user_email,
              message: "서버와 연결할 수 없습니다.",
              exists: false,
            },
          });
        });
    } else {
      setCheckEmailMsg("이메일을 입력해주세요.");
      navigate("/account/finduser/result", {
        state: {
          email: "",
          message: "이메일을 입력해주세요.",
          exists: false,
        },
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-8">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-4 p-6 text-center">
          <h2 className="text-2xl font-semibold text-center">회원정보 조회</h2>
          <p className="text-sm text-muted-foreground">
            이메일을 입력하여 가입여부가 있는 회원인지 조회할 수 있습니다.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <TextField
                fullWidth
                label="Email"
                variant={"standard"}
                size="small"
                placeholder="이메일"
                value={user_email}
                onChange={emailInput}
            />
          </div>
        </div>
        <div className="flex items-center p-6">
          <Button
              fullWidth
              type={"submit"}
              variant={"contained"}
              onClick={emailBtnClick}
          >
            조회
          </Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-red-600">{checkEmailMsg}</p>
        </div>
      </div>
    </main>
  );
}
