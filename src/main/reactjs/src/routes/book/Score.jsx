// v0 by Vercel.
// https://v0.dev/t/aQF3J0XBXxU
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";

export default function Score() {
  // 일단 문제 개수를 10개로 지정
  const questions = Array.from({ length: 10 }, (_, index) => ({
    number: `${index + 1}번`,
    score: "5p",
    correct: true,
    accuracy: "91%",
  }));

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/*  헤더  */}
      <header className="flex items-center justify-between p-4 bg-gray-200 pr-4">
        <div className="flex items-center space-x-4">
          <KeyboardArrowLeftIcon />
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
      <section className="bg-black text-white p-6 mb-10">
        <div className="flex justify-evenly items-center">
          <div className="space-y-2">
            <h2 className="text-lg font-bold">
              정보처리기사 2024 기출문제 1-2
            </h2>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span style={{ width: "80px" }}>백분율 환산</span>
                <span
                  className="font-bold flex-row-reverse"
                  style={{
                    width: "220px",
                    backgroundColor: "white",
                    color: "#626262",
                    textAlign: "center",
                  }}
                >
                  80점
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span style={{ width: "80px" }}>정답 문항수</span>
                <span
                  className="font-bold"
                  style={{
                    width: "220px",
                    backgroundColor: "white",
                    color: "#626262",
                    textAlign: "center",
                  }}
                >
                  16/20문항
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span style={{ width: "80px" }}>응시 일</span>
                <span
                  className="font-bold"
                  style={{
                    width: "220px",
                    backgroundColor: "white",
                    color: "#626262",
                    textAlign: "center",
                    alignContent: "end",
                  }}
                >
                  2024년 7월 28일 12시 31분
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span style={{ width: "80px" }}>소요시간</span>
                <span
                  className="font-bold"
                  style={{
                    width: "220px",
                    backgroundColor: "white",
                    color: "#626262",
                    textAlign: "center",
                  }}
                >
                  20분 54초
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <KeyboardDoubleArrowRightIcon
              style={{ fontSize: "50px" }}
            ></KeyboardDoubleArrowRightIcon>
          </div>
          <div>
            <div
              className="text-center"
              style={{
                borderRadius: "100%",
                backgroundColor: "white",
                width: "200px",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ color: "#626262" }}>
                {" "}
                인자한 혹등고래님의 점수는?
              </span>
              <span
                className="block text-2xl font-bold"
                style={{ color: "#626262" }}
              >
                80/100점
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 성젹표 */}
      <div className="flex justify-end p-4 space-x-2">
        <Button variant="outlined">해설보기</Button>
        <Button variant="outlined">문제집 리뷰 작성</Button>
        <Button variant="contained">성적표 PDF 출력</Button>
      </div>

      <div className="p-4">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-lg text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  문항번호
                </th>
                <th className="h-12 px-4 text-lg text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  배점
                </th>
                <th className="h-12 px-4 text-lg text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  정답여부
                </th>
                <th className="h-12 px-4 text-lg text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  정답률
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {questions.map((question, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    {question.number}
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    {question.score}
                  </td>
                  <td className="p-4 align-middle item-center [&amp;:has([role=checkbox])]:pr-0">
                    {question.correct ? (
                      <CheckIcon color="success" />
                    ) : (
                      <ClearIcon color="warning"></ClearIcon>
                    )}
                  </td>
                  <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    {question.accuracy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
