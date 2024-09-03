import {Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import React, {useEffect, useState} from "react";
import Review from "../../components/modal/Review";
import axios from "axios";

export default function ParentComponent() {
  const [username, setUsername] = useState(""); // 사용자 이름 저장할 상태 변수
  const [confirmVisible, setConfirmVisible] = useState(false);
  const navigate = useNavigate();
  const {bookId} = useParams(); // bookId 가져올 변수
  const [bookData, setBookData] = useState(null); // 문제집 정보 저장할 변수
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // bookId에 해당하는 책 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`/book/edit/${bookId}`);
        setBookData(bookRes.data.book);
        setSections(bookRes.data.sections);

        const questionsRes = await axios.get(`/book/questionpreview/${bookId}`);
        setQuestions(questionsRes.data);

        setLoading(false); // 모든 데이터를 성공적으로 가져온 후 로딩 상태를 false로 변경
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("데이터를 가져오는 도중 문제가 발생했습니다."); // 에러 메시지 설정
        setLoading(false); // 에러 발생 시 로딩을 종료하고 콘솔에 에러 출력
      }
    };

    fetchData(); // 데이터를 가져오는 함수 호출
  }, [bookId]);

  if (!bookData) {
    return <div>No data found</div>; // 데이터가 없을 때 표시
  }

  const openConfirm = () => {
    setConfirmVisible(true);
  };

  const closeConfirm = () => {
    setConfirmVisible(false);
  };

  const passbtn = () => {
    // 버튼1 클릭 시의 행동
    closeConfirm();
    navigate("/book/score");
  };

  const submitbtn = () => {
    // 버튼2 클릭 시의 행동
    closeConfirm();
    navigate("/book/score");
  };

  return (
      <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
        <header className="flex items-center justify-between w-full max-w-5xl p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            <DensityMediumOutlinedIcon/>
            <span className="text-lg font-semibold">{bookData.user ? bookData.user.userNickname : "로드 중..."}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg">10/{questions.length} 문항 | 10 섹션</span>
            <span className="text-lg">총 {bookData.bookTotalscore}점</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">{bookData.bookTitle}</span>
            <Button variant="contained" onClick={openConfirm}>
              시험종료
            </Button>
          </div>
        </header>
        <main className="flex flex-col items-center w-full max-w-5xl p-4 bg-white shadow-md mt-4">

          <div className="flex items-center justify-between w-full p-4 bg-blue-100">
            <span className="text-lg font-semibold text-blue-600">Q1</span>
            <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-gray-200 text-gray-800"
                data-v0-t="badge"
            >
              50점
            </div>
          </div>
          <div className="w-full p-4">
            <p className="mb-4">
              선택형 문제입니다. 문제 내용이 이렇게 어려운데 풀 수 있습니까?
            </p>
            <p className="mb-4">
              문제 지문입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
              구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게
              길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
              구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게
              길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
              구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게
              길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
              구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게
              길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
              구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게
              길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
            </p>
            <img
                src="/placeholder.svg"
                alt="Example"
                className="w-full max-w-xs mx-auto mb-4"
                width="300"
                height="200"
            />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input id="option1" type="radio" name="question1"/>
                <label for="option1">답안 1 입니다.</label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="option2" type="radio" name="question1"/>
                <label for="option2">답안 2 입니다.</label>
              </div>
              <div className="flex items-center space-x-2">
                <input id="option3" type="radio" name="question1"/>
                <label for="option3">답안 3 입니다.</label>
              </div>
            </div>
          </div>
        </main>
        <Review
            openConfirm={openConfirm}
            confirmVisible={confirmVisible}
            clickBtn1={passbtn}
            clickBtn2={submitbtn}
            bookId={bookId}
        />
      </div>
  );
}
