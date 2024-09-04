import {Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import React, {useEffect, useState} from "react";
import Review from "../../components/modal/Review";
import axios from "axios";
import PreviewSection from "../../components/questionPreview/PreviewSection";
import TestSection from "../../components/test/TestSection";

export default function ParentComponent() {
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
    navigate(`/book/score/${bookId}`);
  };

  const submitbtn = () => {
    // 버튼2 클릭 시의 행동
    closeConfirm();
    navigate(`/book/score/${bookId}`);
  };

  return (
      <div className={"space-y-8"}>
        <header className="flex items-center justify-between w-full p-4 bg-white shadow-md">
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
        <div className="space-y-4">
          {sections && sections.map((section, index) => (
              <TestSection
                  key={index}
                  index={index}
                  sectionCount={sections.length}
                  section={section}
                  book={bookData}
                  loading={loading}
                  setLoading={setLoading}
              />
          ))}
        </div>
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
