import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Button } from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Score() {

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/user";

    const [username, setUsername] = useState("");
    const [userScore,setUserScore] = useState(0);
    const {bookId, solvedbookId} = useParams(); // bookId 가져올 변수
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const { search } = useLocation();
    const [bookData, setBookData] = useState({
        correctAnswersCount: 0,     // 맞힌 문제 수
        totalQuestions: 0,          // 전체 문제 수
        backscore: 0,               // 백분율점수
        startDay: '',               // 시험 응시 날짜
        userpoint: 0,               // 사용자의 점수 (문제 배점들의 합)
        questionIds: [],            // 사용자가 푼 문제의 questionId 리스트
        bookTotalscore: 0,          // 문제집 총점
    });


    const queryParmas=new URLSearchParams(search);
    const wrongRepeat=queryParmas.get("wrongRepeat");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 성적 정보
                const scoreResponse = await axios.get(`/book/score/${bookId}/${solvedbookId}?wrongRepeat=${wrongRepeat}`);
                console.log(scoreResponse.data);
                setBookData(scoreResponse.data);

                const userScoreResponse = await axios.get(`/book/score/userpoint/${solvedbookId}`);
                console.log(userScoreResponse.data);
                setUserScore(userScoreResponse.data);

                // 사용자 정보
                const userResponse = await axios.get(`/book/username`);
                setUsername(userResponse.data.userNickname);

                //문제집 정보
                const bookResponse = await axios.get(`/book/score/${bookId}`);
                setBookData(prevState => ({
                    ...prevState,
                    ...bookResponse.data
                }));


                // setBookData(bookResponse.data);
                console.log(bookResponse.data);
                console.log(bookData.bookTotalscore);

            } catch (error) {
                console.log("Error : ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        // fetchUserPoints();
    }, [bookId, solvedbookId]);

    if (!bookData) {
        return <div>No data found</div>; // 데이터가 없을 때 표시
    }

    const { correctAnswersCount, totalQuestions, backscore, startDay, bookTotalscore } = bookData;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/*  헤더  */}
      <header className="flex items-center justify-between p-4 bg-gray-200 pr-4">
        <div className="flex items-center space-x-4">
          <KeyboardArrowLeftIcon
            fontSize="large"
            onClick={() => navigate(`/book/detail/${bookId}`)}
          />
          <div className="flex items-center gap-2 pr-4">
            <img
              className="aspect-square h-full w-full"
              alt="User Avatar"
              src="/placeholder-user.jpg"
              style={{ width: "30px", height: "30px" }}
            />
            <span>{username}</span>
          </div>

          <div className="flex items-center gap-2  pr-4">
            <MenuBookIcon />
            <span>{correctAnswersCount}/{totalQuestions}문항</span>
          </div>
          <div className="flex items-center gap-2  pr-4">
            <CheckCircleOutlineIcon />
            <span>{backscore}점</span>
          </div>
        </div>
        <h1 className="text-xl font-bold items-end">{bookData.bookTitle}</h1>
      </header>
      <section className="bg-black text-white p-6 mb-10">
        <div className="flex justify-evenly items-center">
          <div className="space-y-2">
            <h2 className="text-lg font-bold">
                {bookData.bookTitle}
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
                  {backscore}점
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
                    {bookData.correctAnswersCount}/{bookData.totalQuestions} 문항
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
                  {bookData.startDay}
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
                {username}님의 점수는?
              </span>
              <span
                className="block text-2xl font-bold"
                style={{ color: "#626262" }}
              >
                {userScore}/{bookData.bookTotalscore}점
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 성젹표 */}
      <div className="flex justify-end p-4 space-x-2">
        <Button
          variant="outlined"
          onClick={() => navigate("/book/explanation")}
        >
          해설보기
        </Button>
        <Button variant="outlined" onClick={() => navigate(`/book/detail/${bookId}`)}>
          문제집 정보 보기
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/book/scorepreview/${bookId}`)}
        >
          성적표 PDF 출력
        </Button>
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
            {/*<tbody className="[&amp;_tr:last-child]:border-0">*/}
            {/*  {questions.map((question, index) => (*/}
            {/*    <tr*/}
            {/*      key={index}*/}
            {/*      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"*/}
            {/*    >*/}
            {/*      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">*/}
            {/*        {question.number}*/}
            {/*      </td>*/}
            {/*      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">*/}
            {/*        {question.score}*/}
            {/*      </td>*/}
            {/*      <td className="p-4 align-middle item-center [&amp;:has([role=checkbox])]:pr-0">*/}
            {/*        {question.correct ? (*/}
            {/*          <CheckIcon color="success" />*/}
            {/*        ) : (*/}
            {/*          <ClearIcon color="warning" />*/}
            {/*        )}*/}
            {/*      </td>*/}
            {/*      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">*/}
            {/*        {question.accuracy}*/}
            {/*      </td>*/}
            {/*    </tr>*/}
            {/*  ))}*/}
            {/*</tbody>*/}
          </table>
        </div>
      </div>
    </div>
  );
}
