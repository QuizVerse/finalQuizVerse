import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomAlert from "../../components/modal/CustomAlert";
import {Box, Button, TextField, Typography} from "@mui/material";

export default function ChangePassword() {
  const [user_email, setUser_email] = useState('');
  const [auth_code, setAuth_code] = useState('');
  const [emailcheck, setEmailcheck] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [user_password, setUser_password] = useState('');
  const [user_passwordcheck, setUser_passwordcheck] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);  // 인증 코드 전송 여부 추가

  const [alertVisible, setAlertVisible] = useState(false);  // Alert 표시 여부
  const [alertTitle, setAlertTitle] = useState('');         // Alert 제목
  const [alertContent, setAlertContent] = useState('');     // Alert 내용
  const [alertBtnText, setAlertBtnText] = useState('확인');  // Alert 버튼 텍스트



  const showAlert = (title, content, btnText = '확인') => {
    setAlertTitle(title);
    setAlertContent(content);
    setAlertBtnText(btnText);
    setAlertVisible(true);  // Alert를 보이도록 설정
  };

  const closeAlert = () => {
    setAlertVisible(false);  // Alert를 닫음
  };



  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8 && password.length <= 20;
    const typeCheck = /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])/.test(password);
    return lengthCheck && typeCheck;
  };

  // 비밀번호 및 비밀번호 확인 입력이 변경될 때마다 메시지 업데이트
  useEffect(() => {
    if (user_password !== user_passwordcheck) {
      setPasswordMessage('* 비밀번호가 일치하지 않습니다. 다시 입력해주세요');
    } else if (!validatePassword(user_password)) {
      setPasswordMessage('* 비밀번호 양식을 맞춰주세요.');
    } else {
      setPasswordMessage('* 사용 가능한 비밀번호입니다.');
    }
  }, [user_password, user_passwordcheck]);

  // 타이머 관리
  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timerId); // 클린업 함수로 타이머 종료
    } else if (timeLeft === 0) {
      showAlert("인증 시간이 만료되었습니다. 다시 시도해 주세요.");

      setTimerRunning(false);
      setTimeLeft(180); // 타이머 초기화
      let url = `/change/user/deletecode?user_email=${encodeURIComponent(user_email)}`;

      axios.get(url)
          .then(res => {
            if (res.data === 'success') {
              console.log("인증 코드가 성공적으로 삭제되었습니다.");
            } else {
              console.error("인증 코드 삭제 실패.");
            }
          })
          .catch(error => {
            console.error("인증 코드 삭제 중 오류 발생:", error);
          });

    }
  }, [timeLeft, timerRunning]);

  // 인증번호 보내기 및 재발송 이벤트
  const sendEmail = () => {
    let url = `/change/user/password?user_email=${encodeURIComponent(user_email)}`;
    axios.get(url)
        .then(res => {
          if (res.data === 'success') {
            showAlert("인증 코드가 이메일로 발송되었습니다.");
            setTimerRunning(true); // 타이머 시작
            setTimeLeft(180); // 타이머를 다시 3분으로 초기화
            setIsCodeSent(true); // 인증 코드 전송 상태 업데이트
          }else if (res.data === 'nouser') {
            showAlert("오류",'회원이 아닙니다. 회원 가입 후 시도해주세요.');}

          else {
            showAlert("오류","이메일 전송 실패");
          }
        })
        .catch(error => {
          console.error("Error sending email:", error);
          showAlert("오류","이메일 전송 중 오류가 발생했습니다.");
        });
  };

  // 이메일 인증 코드 맞는지 확인 이벤트
  const checkEmail = () => {
    let url = `/change/user/emailcheck?user_email=${encodeURIComponent(user_email)}&auth_code=${auth_code}`;
    axios.get(url)
        .then(res => {
          if (res.data === 'success') {
            setEmailcheck(true);
            showAlert("이메일 인증이 성공적으로 완료되었습니다.");
            setTimerRunning(false); // 인증 성공 시 타이머 중지
          } else {
            setEmailcheck(false);
            showAlert("오류","인증 코드가 일치하지 않습니다.");
          }
        });
  }

  // 타이머 표시용 포맷
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드를 방지한다.
    if (!emailcheck) {
      showAlert("오류","이메일 인증을 먼저 완료해주세요.");
      return;
    }
    if (user_password !== user_passwordcheck) {
      showAlert("오류","비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!validatePassword(user_password)) {
      showAlert("오류","비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    // 서버로 데이터 전송
    axios.post('/change/user/updatepassword', new URLSearchParams({
      user_email: user_email,
      user_password: user_password
    }))
        .then(res => {
          if (res.data === 'success') {
            showAlert("비밀번호가 성공적으로 변경되었습니다.");
          } else {
            showAlert("오류","비밀번호 변경 실패.");
          }
        })
        .catch(error => {
          console.error("비밀번호 변경 중 오류 발생:", error);
          showAlert("오류","비밀번호 변경 중 오류가 발생했습니다.");
        });
  };

  return (
      <main className="flex flex-col items-center justify-center flex-1 w-full p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                비밀번호 재설정
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Box sx={{mb: 2}} className={"flex items-center gap-2"}>
                  <TextField
                      fullWidth
                      label="Email"
                      variant={"standard"}
                      size="small"
                      placeholder="이메일"
                      value={user_email}
                      onChange={(e) => setUser_email(e.target.value)}
                  />
                  <Button
                      variant="outlined"
                      onClick={sendEmail}
                      sx={{mt: 1, float: 'right'}}
                      className={"whitespace-nowrap"}
                  >
                    인증코드 발송
                  </Button>
                </Box>
              </div>
              <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="auth-code"
                >
                  Authentication code
                </label>
                <div className="flex items-center space-x-2">
                  <TextField
                      fullWidth
                      label="인증 코드"
                      variant="standard"
                      size="small"
                      placeholder="인증 코드"
                      value={auth_code} // 사용자 입력 코드
                      onChange={(e) => setAuth_code(e.target.value)} // 입력 값 상태로 업데이트
                      disabled={!isCodeSent} // 인증 코드 전송 여부에 따라 입력 필드 비활성화/활성화
                  />
                  <Button
                      type="button"
                      variant={"outlined"}
                      onClick={checkEmail}
                      disabled={!isCodeSent} // 인증 코드 전송 여부에 따라 버튼 비활성화/활성화
                  >
                    확인
                  </Button>
                </div>
                <Typography variant="caption" display="block">
                  인증 제한 시간: {formatTime(timeLeft)}
                </Typography>
              </div>

              <div className="space-y-2">
                <Box sx={{mb: 2}}>
                  <TextField
                      fullWidth
                      label="Password"
                      variant="standard"
                      type="password"
                      size="small"
                      placeholder="비밀번호"
                      value={user_password}
                      onChange={(e) => setUser_password(e.target.value)}
                      disabled={!emailcheck} // 이메일 인증 완료 여부에 따라 비밀번호 필드 비활성화/활성화
                  />
                  <p className="text-xs text-muted-foreground">영문/숫자/특수문자 2가지 이상 조합 (8~20자)</p>
                </Box>
                <Box sx={{mb: 2}}>
                  <TextField
                      fullWidth
                      label="Password Check"
                      variant="standard"
                      type="password"
                      size="small"
                      placeholder="비밀번호 확인"
                      value={user_passwordcheck}
                      onChange={(e) => setUser_passwordcheck(e.target.value)}
                      disabled={!emailcheck} // 이메일 인증 완료 여부에 따라 비밀번호 확인 필드 비활성화/활성화
                  />
                  <Typography variant="caption" className={`text-xs ${passwordMessage.includes('사용 가능한') ? 'text-green-500' : 'text-red-500'}`}>
                    {passwordMessage}
                  </Typography>
                </Box>
              </div>

            </div>
            <div className="flex items-center p-6">
              <Button
                  type="submit"
                  fullWidth
                  variant={"contained"}
                  disabled={!emailcheck} // 이메일 인증 완료 여부에 따라 제출 버튼 비활성화/활성화
                  >
                확인
              </Button>
            </div>
            <CustomAlert
                openAlert={alertVisible}
                closeAlert={closeAlert}
                title={alertTitle}
                content={alertContent}
                btnText={alertBtnText}
            />

          </form>
        </div>
      </main>
  );
}
