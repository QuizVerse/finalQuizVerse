import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";
import CustomInput from "../../components/CustomInput";
import CustomAlert from "../../components/modal/CustomAlert";
import Cookies from 'js-cookie';

export default function Leave() {
  const [reason, setReason] = useState("");
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isVerifiedPassword, setIsVerifiedPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [alertBtnText, setAlertBtnText] = useState('확인');
  const [onConfirm, setOnConfirm] = useState(null);

  const showAlert = (title, content, btnText = '확인', onConfirmCallback = null) => {
    setAlertTitle(title);
    setAlertContent(content);
    setAlertBtnText(btnText);
    setAlertVisible(true);
    setOnConfirm(() => onConfirmCallback);
  };

  const closeAlert = () => {
    setAlertVisible(false);
    if (onConfirm) {
      onConfirm();
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post("/leave/email");
      if (response.status === 200) {
        showAlert("알림", "인증코드가 이메일로 전송되었습니다.");
      } else {
        showAlert("오류", "인증코드 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (e) {
      console.error("인증 코드 전송 실패", e);
      showAlert("오류", "서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post("/leave/verify", { code: verificationCode });
      if (response.data.success) {
        showAlert("알림", "인증이 성공적으로 완료되었습니다.");
        setIsVerifiedEmail(true);
      } else {
        showAlert("오류", "인증코드가 유효하지 않습니다.");
        setIsVerifiedEmail(false);
      }
    } catch (e) {
      console.error("인증 코드 검증 실패", e);
      showAlert("오류", "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      setIsVerifiedEmail(false);
    }
  };

  const verifyPassword = async () => {
    try {
      const response = await axios.post("/leave/verify-password", { password });
      if (response.data.success) {
        showAlert("알림", "비밀번호 인증이 성공적으로 완료되었습니다.");
        setIsVerifiedPassword(true);
      } else {
        showAlert("오류", "비밀번호가 유효하지 않습니다.");
        setIsVerifiedPassword(false);
      }
    } catch (e) {
      console.error("비밀번호 검증 실패", e);
      showAlert("오류", "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      setIsVerifiedPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerifiedEmail || !isVerifiedPassword) {
      showAlert("오류", "이메일과 비밀번호 인증이 완료되지 않았습니다.");
      return;
    }

    try {
      // 탈퇴 사유 전송 및 사용자 삭제
      const response = await axios.post("/api/leave-reason", { leaveReason: reason });

      if (response.status === 200) {
        setReason("");
        Cookies.remove('jwtToken');
        Cookies.remove('refreshToken');

        showAlert("알림", "회원 탈퇴가 완료되었습니다.", "확인", () => {
          window.location.href = "/"; // 홈 화면으로 리디렉션
        });
      } else {
        showAlert("오류", "탈퇴 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버 요청 중 오류가 발생했습니다.", error);
      showAlert("오류", "탈퇴 처리에 실패했습니다.");
    }
  };

  return (
      <main className="flex-1 py-12 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="mb-6 text-2xl font-bold text-center">회원 탈퇴</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <CustomInput
                  label={"인증코드"}
                  value={verificationCode}
                  updateValue={setVerificationCode}
                  timerVisible={true}
              />
              <Box display="flex" justifyContent="space-between">
                <Button variant={'outlined'} onClick={sendVerificationCode}>
                  인증코드 발송
                </Button>
                <Button variant={"contained"} onClick={verifyCode}>
                  인증코드 확인
                </Button>
              </Box>
            </div>

            <div className="space-y-2">
              <CustomInput
                  updateValue={setPassword}
                  label={"비밀번호"}
                  type={"password"}
                  placeholder={"비밀번호"}
              />
              <Button variant={"contained"} fullWidth onClick={verifyPassword}>
                비밀번호 확인
              </Button>
            </div>

            <TextField
                label={"탈퇴사유"}
                id="reason"
                variant={"outlined"}
                multiline
                rows={3}
                fullWidth
                placeholder="탈퇴사유를 입력해주세요"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />

            <Button
                type="submit"
                variant={"contained"}
                onClick={handleSubmit}
                fullWidth
                disabled={!isVerifiedEmail || !isVerifiedPassword}
            >
              탈퇴하기
            </Button>
          </div>

          <CustomAlert
              openAlert={alertVisible}
              closeAlert={closeAlert}
              title={alertTitle}
              content={alertContent}
              btnText={alertBtnText}
          />
        </div>
      </main>
  );
}
