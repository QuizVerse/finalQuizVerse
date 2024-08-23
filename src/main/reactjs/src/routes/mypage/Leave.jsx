// v0 by Vercel.
// https://v0.dev/t/iQOyZU5fuUx

import {Button} from "@mui/material";
import CustomInput from "../../components/CustomInput";

export default function Leave() {
  const Submit =(e)=>{
    e.preventDefault();
  }

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
              <CustomInput
                  label={"인증코드"}
                  timerVisible={true}/>
            </div>
            <div className="flex items-center">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                for="password"
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
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
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
                for="reason"
              >
                탈퇴사유
              </label>
            <form>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                id="reason"
                placeholder="탈퇴사유를 입력해주세요"
              ></textarea>
            <Button>확인</Button>
            </form>
            </div>  
          </div>
        </div>
      </main>
  );
}
