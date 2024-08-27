// v0 by Vercel.
// https://v0.dev/t/eqToGYA3tGX

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import { Button } from "@mui/material";
import { useState } from "react";

export default function Explanation() {
  const navigate = useNavigate();

  // 버튼의 show/hide 상태
  const [showAnswer, setShowAnswer] = useState({
    myanswer: false,
    answer: false,
  });

  // 버튼 눌렀을 때 답안 show 상태
  const showContent = (btn) => {
    setShowAnswer((prevState) => ({
      ...prevState,
      [btn]: !prevState[btn],
    }));
  };

  //  문제 개수를 5개로 지정
  const questions = Array.from({ length: 5 }, (_, index) => ({
    Number: `Q${index + 1}.`,
    que: `제목 ${index + 1}222233333333333`,
    content: `내용 ${index}22${index}`,
    correct: true,
  }));

  return (
    <div className="w-full  mx-auto p-4">
      {/* 헤더 */}
      <header className="flex items-center justify-between p-4 bg-gray-200 pr-4">
        <div className="flex items-center space-x-4">
          <KeyboardArrowLeftIcon fontSize="large" onClick={() => navigate("/book/score")} />
          <div className="flex items-center gap-2 pr-4">
            <img
              className="aspect-square h-full w-full"
              alt="User Avatar"
              src="/placeholder-user.jpg"
              style={{ width: "30px", height: "30px" }}
            />
            <span>홍길동</span>
          </div>

          <div className="flex items-center gap-2  pr-4">
            <MenuBookIcon />
            <span>16/20 문항</span>
          </div>
          <div className="flex items-center gap-2  pr-4">
            <CheckCircleOutlineIcon />
            <span>80점</span>
          </div>
        </div>
        <h1 className="text-xl font-bold items-end">정보처리기사 기출문제</h1>
      </header>

      {/* 문제 해설 */}
      <main>
        <section className="mb-8">
          <div className="container mx-auto px-4 mt-8 mb-4">
            {questions.map((questions, index) => (
              <div key={index} className="p-4 mb-4 rounded-lg shadow-sm">
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    {questions.correct ? (
                      <PanoramaFishEyeOutlinedIcon
                        color="success"
                        fontSize="large"
                      />
                    ) : (
                      <CloseOutlinedIcon color="warning" fontSize="large" />
                    )}

                    <p className="font-bold text-lg">{questions.Number}</p>
                    <p className="fibt-bold text-lg">{questions.que}</p>
                  </div>
                </div>
                <p className="text-lg">{questions.content}</p>
                <img src="./image/E.jpg" alt="explanation-example" />
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outlined"
                      className="w-24"
                      onClick={() => showContent("myanswer")}
                    >
                      나의 답안
                    </Button>
                    {showAnswer.myanswer && <div className="pl-4"> 3 </div>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="contained"
                      className="w-24"
                      onClick={() => showContent("answer")}
                    >
                      정답
                    </Button>
                    {showAnswer.answer && <div className="pl-4">5 </div>}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold py-3">해설</h3>
                  <textarea
                    className="flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full min-h-[100px]"
                    placeholder="해설내용"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
